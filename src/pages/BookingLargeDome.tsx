import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, Users, Phone, MessageSquare, CreditCard, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';

const BookingLargeDome = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [phone, setPhone] = useState('');
  const [wishes, setWishes] = useState('');
  const [additionalServices, setAdditionalServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Supabase client
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  
  // Временные слоты для большого купола (3 часа аренды)
  const timeSlots = [
    '18:00-21:00', '21:00-00:00', '00:00-03:00', '03:00-06:00'
  ];
  
  // Забронированные слоты (в реальном приложении это будет из базы данных)
  const bookedSlots = ['21:00-00:00'];
  
  const services = [
    { id: 'decoration', name: t('decoration'), price: '8000 ₸', numPrice: 8000 },
    { id: 'music', name: t('musicSetup'), price: '5000 ₸', numPrice: 5000 },
    { id: 'flowers', name: t('flowers'), price: '12000 ₸', numPrice: 12000 },
    { id: 'photographer', name: t('photographer'), price: '20000 ₸', numPrice: 20000 },
    { id: 'karaoke', name: 'Караоке система', price: '7000 ₸', numPrice: 7000 },
    { id: 'dj', name: 'DJ и звуковое оборудование', price: '25000 ₸', numPrice: 25000 }
  ];

  // Base price for large dome
  const BASE_PRICE = 40000;

  // Calculate total price
  const calculateTotal = () => {
    const servicesPrice = additionalServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + (service ? service.numPrice : 0);
    }, 0);
    return BASE_PRICE + servicesPrice;
  };

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setAdditionalServices([...additionalServices, serviceId]);
    } else {
      setAdditionalServices(additionalServices.filter(s => s !== serviceId));
    }
  };

  const handleBooking = async () => {
    if (!selectedTime) {
      toast({
        title: "Ошибка",
        description: "Выберите время бронирования",
        variant: "destructive"
      });
      return;
    }
    
    if (!phone) {
      toast({
        title: "Ошибка", 
        description: "Введите номер телефона",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const servicesPrice = additionalServices.reduce((total, serviceId) => {
        const service = services.find(s => s.id === serviceId);
        return total + (service ? service.numPrice : 0);
      }, 0);

      const totalPrice = BASE_PRICE + servicesPrice;

      const selectedServices = additionalServices.map(serviceId => {
        const service = services.find(s => s.id === serviceId);
        return {
          id: service?.id || '',
          name: service?.name || '',
          price: service?.price || ''
        };
      });

      const bookingData = {
        dome_type: 'large',
        selected_time: selectedTime,
        phone,
        wishes,
        additional_services: selectedServices,
        base_price: BASE_PRICE,
        services_price: servicesPrice,
        total_price: totalPrice
      };

      // Send booking data to email function
      const { data, error } = await supabase.functions.invoke('send-booking-email', {
        body: { booking: bookingData }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Бронирование создано",
        description: "Данные отправлены администратору. Переходим к оплате...",
      });

      // Redirect to Kaspi with total amount
      setTimeout(() => {
        window.open('https://pay.kaspi.kz/pay/nultwafm', '_blank');
      }, 1500);

    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать бронирование. Попробуйте еще раз.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero section with blurred dome background */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
          style={{
            backgroundImage: "url('/src/assets/hero-dome.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-background/40" />
        
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              Большой купол
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Идеальное место для компании до 12 человек
          </p>
        </div>
      </section>

      {/* Booking section */}
      <section className="py-20 bg-gradient-dome">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Time slots */}
          <Card className="border-border/50 shadow-elegant mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                <Clock className="w-6 h-6 text-primary mr-3" />
                Выберите время (3 часа аренды)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {timeSlots.map((time) => {
                  const isBooked = bookedSlots.includes(time);
                  return (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "dome" : isBooked ? "secondary" : "hero"}
                      className={`h-20 text-lg font-semibold ${
                        isBooked ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={isBooked}
                      onClick={() => !isBooked && setSelectedTime(time)}
                    >
                      <div className="text-center">
                        <div>{time}</div>
                        {isBooked && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Забронировано
                          </div>
                        )}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Contact form */}
          <Card className="border-border/50 shadow-elegant mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                <Phone className="w-6 h-6 text-primary mr-3" />
                Контактная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="phone" className="text-foreground">Номер телефона *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 777 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="wishes" className="text-foreground">Ваши пожелания</Label>
                <Textarea
                  id="wishes"
                  placeholder="Расскажите о ваших пожеланиях к оформлению или особых требованиях..."
                  value={wishes}
                  onChange={(e) => setWishes(e.target.value)}
                  className="mt-2 min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional services */}
          <Card className="border-border/50 shadow-elegant mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                <Users className="w-6 h-6 text-primary mr-3" />
                Дополнительные услуги
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center space-x-3">
                    <Checkbox 
                      id={service.id}
                      checked={additionalServices.includes(service.id)}
                      onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                    />
                    <Label 
                      htmlFor={service.id} 
                      className="flex-1 flex justify-between items-center cursor-pointer"
                    >
                      <span className="text-foreground">{service.name}</span>
                      <span className="text-primary font-semibold">{service.price}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Food information */}
          <Card className="border-border/50 shadow-elegant mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground flex items-center">
                <MessageSquare className="w-5 h-5 text-primary mr-3" />
                Информация о питании
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-foreground/80">
                <p>
                  🥐🍰 У нас нет собственной кухни, но мы предлагаем меню нашего партнёра – ресторана Bretzel и поможем оформить предзаказ
                </p>
                <p>
                  🍱 Также можно принести свою еду с собой
                </p>
                <p className="text-destructive font-medium">
                  🚫🥂 Алкоголь и напитки приносить запрещено
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Booking summary and payment */}
          <Card className="border-primary/30 shadow-glow">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                <CreditCard className="w-6 h-6 text-primary mr-3" />
                Оплата и подтверждение
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedTime && (
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Детали бронирования:</h4>
                    <p className="text-foreground/80">Время: {selectedTime}</p>
                    <p className="text-foreground/80">Купол: Большой (до 12 человек)</p>
                    <p className="text-foreground/80">Длительность: 3 часа</p>
                  </div>
                )}

                {/* Price breakdown */}
                <div className="bg-muted/20 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-foreground mb-2">Расчет стоимости:</h4>
                  <div className="flex justify-between text-foreground/80">
                    <span>Базовая стоимость купола:</span>
                    <span>{BASE_PRICE.toLocaleString()} ₸</span>
                  </div>
                  {additionalServices.length > 0 && (
                    <>
                      <div className="text-sm text-foreground/60 mt-2 mb-1">Дополнительные услуги:</div>
                      {additionalServices.map(serviceId => {
                        const service = services.find(s => s.id === serviceId);
                        if (!service) return null;
                        return (
                          <div key={serviceId} className="flex justify-between text-sm text-foreground/70 pl-4">
                            <span>• {service.name}</span>
                            <span>{service.numPrice.toLocaleString()} ₸</span>
                          </div>
                        );
                      })}
                    </>
                  )}
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg text-foreground">
                      <span>ИТОГО К ОПЛАТЕ:</span>
                      <span className="text-primary">{calculateTotal().toLocaleString()} ₸</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-primary/10 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/80">
                    После нажатия кнопки бронирование будет отправлено администратору на почту, 
                    затем вы будете перенаправлены на Kaspi для оплаты суммы {calculateTotal().toLocaleString()} ₸.
                  </p>
                </div>

                <Button 
                  variant="dome" 
                  size="lg" 
                  className="w-full text-lg"
                  onClick={handleBooking}
                  disabled={!selectedTime || !phone || isLoading}
                >
                  <CreditCard className="w-5 h-5" />
                  {isLoading ? 'Отправка...' : `Забронировать и оплатить ${calculateTotal().toLocaleString()} ₸`}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookingLargeDome;