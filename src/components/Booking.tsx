import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, CreditCard, Clock, Users, MapPin, Phone } from 'lucide-react';

export const Booking = () => {
  const { t } = useLanguage();

  const timeSlots = [
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00'
  ];

  const quickBookingOptions = [
    { icon: Users, text: 'Романтический вечер (2 чел.)', price: '20 000 ₸' },
    { icon: Users, text: 'Компания друзей (3-6 чел.)', price: '28 000 ₸' },
    { icon: Users, text: 'Большая компания (до 12 чел.)', price: '40 000 ₸' },
    { icon: Users, text: 'Кино-вечер (пуфик)', price: '4 500 ₸' },
    { icon: Users, text: 'Кино-вечер (стул)', price: '4 000 ₸' },
  ];

  const openWhatsApp = (message: string) => {
    const whatsappNumber = "77789747122";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const openKaspi = () => {
    window.open('https://pay.kaspi.kz/pay/nultwafm', '_blank');
  };

  return (
    <section id="booking" className="py-20 bg-gradient-dome relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              {t('book')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Забронируйте ваш незабываемый вечер в небесных куполах
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Quick booking options */}
          <Card className="border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground flex items-center">
                <Clock className="w-6 h-6 text-primary mr-3" />
                Быстрое бронирование
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickBookingOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <div key={index} 
                       className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-primary/30"
                       onClick={() => openWhatsApp(`Хочу забронировать: ${option.text} (${option.price})`)}>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-sunset rounded-lg flex items-center justify-center mr-3">
                        <IconComponent className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{option.text}</p>
                        <p className="text-sm text-muted-foreground">Нажмите для бронирования</p>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-primary">{option.price}</div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Contact and payment info */}
          <div className="space-y-6">
            {/* WhatsApp booking */}
            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center">
                  <MessageCircle className="w-6 h-6 text-primary mr-3" />
                  {t('whatsappBooking')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Напишите нам в WhatsApp для быстрого бронирования и уточнения деталей
                </p>
                <Button 
                  variant="dome" 
                  size="lg" 
                  className="w-full"
                  onClick={() => openWhatsApp('Здравствуйте! Хочу забронировать купол в 7th Sky.')}
                >
                  <MessageCircle className="w-5 h-5" />
                  Написать в WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Kaspi RED */}
            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground flex items-center">
                  <CreditCard className="w-6 h-6 text-primary mr-3" />
                  {t('kaspiRed')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Удобная оплата через Kaspi RED
                </p>
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={openKaspi}
                >
                  <CreditCard className="w-5 h-5" />
                  Оплатить через Kaspi
                </Button>
              </CardContent>
            </Card>

            {/* Location and hours */}
            <Card className="border-border/50 shadow-elegant">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-foreground">{t('location')}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-foreground">{t('workingHours')}</span>
                  </div>
                   <div className="flex items-center">
                     <Phone className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                     <span className="text-foreground">+7 778 974 7122</span>
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Time slots */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">Доступное время</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-4xl mx-auto">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant="hero"
                className="aspect-square"
                onClick={() => openWhatsApp(`Хочу забронировать на ${time}`)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};