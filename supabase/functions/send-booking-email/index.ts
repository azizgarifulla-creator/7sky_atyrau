import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingData {
  dome_type: string;
  selected_time: string;
  phone: string;
  wishes?: string;
  additional_services: Array<{
    id: string;
    name: string;
    price: string;
  }>;
  base_price: number;
  services_price: number;
  total_price: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { booking }: { booking: BookingData } = await req.json();

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert booking into database
    const { data: bookingRecord, error: dbError } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single();

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`);
    }

    // Send email using Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const domeTypeText = booking.dome_type === 'small' ? 'Маленький купол' : 'Большой купол';
    const servicesText = booking.additional_services.length > 0 
      ? booking.additional_services.map(s => `• ${s.name} - ${s.price}`).join('\n')
      : 'Нет дополнительных услуг';

    const emailContent = `
Новое бронирование!

Тип купола: ${domeTypeText}
Время: ${booking.selected_time}
Телефон клиента: ${booking.phone}
Пожелания: ${booking.wishes || 'Не указаны'}

Дополнительные услуги:
${servicesText}

Базовая стоимость: ${booking.base_price.toLocaleString()} ₸
Стоимость услуг: ${booking.services_price.toLocaleString()} ₸
ОБЩАЯ СУММА: ${booking.total_price.toLocaleString()} ₸

Статус оплаты: Ожидает оплаты
ID бронирования: ${bookingRecord.id}

Время создания: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "7sky@lovable.app",
        to: "sevsky.06@gmail.com",
        subject: `Новое бронирование - ${domeTypeText} на ${booking.selected_time}`,
        text: emailContent,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      throw new Error(`Email sending failed: ${errorText}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        booking_id: bookingRecord.id,
        message: "Booking created and email sent successfully" 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});