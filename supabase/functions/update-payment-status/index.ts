import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { booking_id, payment_status }: { booking_id: string; payment_status: string } = await req.json();

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Update payment status
    const { data: booking, error: updateError } = await supabase
      .from('bookings')
      .update({ 
        payment_status,
        updated_at: new Date().toISOString()
      })
      .eq('id', booking_id)
      .select()
      .single();

    if (updateError) {
      throw new Error(`Database error: ${updateError.message}`);
    }

    // Send payment confirmation email if paid
    if (payment_status === 'paid') {
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      if (resendApiKey) {
        const domeTypeText = booking.dome_type === 'small' ? 'Маленький купол' : 'Большой купол';
        
        const confirmationEmail = `
Оплата подтверждена! ✅

Детали бронирования:
Тип купола: ${domeTypeText}
Время: ${booking.selected_time}
Телефон клиента: ${booking.phone}
Общая сумма: ${booking.total_price.toLocaleString()} ₸

Статус оплаты: ОПЛАЧЕНО
ID бронирования: ${booking.id}

Время оплаты: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}
        `;

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "7sky@lovable.app",
            to: "sevsky.06@gmail.com",
            subject: `✅ Оплата подтверждена - ${domeTypeText}`,
            text: confirmationEmail,
          }),
        });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        booking,
        message: "Payment status updated successfully" 
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