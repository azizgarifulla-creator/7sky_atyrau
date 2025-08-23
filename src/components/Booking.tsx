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
    { icon: Users, text: t('romanticEvening'), price: '20 000 ₸' },
    { icon: Users, text: t('friendsCompany'), price: '28 000 ₸' },
    { icon: Users, text: t('largeCompany'), price: '40 000 ₸' },
    { icon: Users, text: t('cinemaEveningPuff'), price: '4 500 ₸' },
    { icon: Users, text: t('cinemaEveningChair'), price: '4 000 ₸' },
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
            {t('bookDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Quick booking options */}
          <Card className="border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold text-foreground flex items-center">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary mr-3" />
                {t('quickBooking')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickBookingOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <div key={index} 
                       className="flex items-center justify-between p-3 md:p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/30 hover:shadow-md active:scale-[0.98]"
                       onClick={() => openWhatsApp(`${t('bookNow')}: ${option.text} (${option.price})`)}>
                    <div className="flex items-center min-w-0 flex-1">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-sunset rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-foreground text-sm md:text-base leading-tight">{option.text}</p>
                        <p className="text-xs md:text-sm text-muted-foreground">{t('clickToBook')}</p>
                      </div>
                    </div>
                    <div className="text-base md:text-lg font-bold text-primary ml-2 flex-shrink-0">{option.price}</div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Contact and payment info */}
          <div className="space-y-4 md:space-y-6">
            {/* WhatsApp booking */}
            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl font-bold text-foreground flex items-center">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-primary mr-3" />
                  {t('whatsappBooking')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm md:text-base">
                  {t('whatsappDescription')}
                </p>
                <Button 
                  variant="dome" 
                  size="lg" 
                  className="w-full text-sm md:text-base"
                  onClick={() => openWhatsApp(`${t('bookNow')}! ${t('bookDescription')}`)}
                >
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                  {t('writeToWhatsapp')}
                </Button>
              </CardContent>
            </Card>

            {/* Kaspi RED */}
            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl font-bold text-foreground flex items-center">
                  <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-primary mr-3" />
                  {t('kaspiRed')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm md:text-base">
                  {t('kaspiDescription')}
                </p>
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full text-sm md:text-base"
                  onClick={openKaspi}
                >
                  <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
                  {t('payThroughKaspi')}
                </Button>
              </CardContent>
            </Card>

            {/* Location and hours */}
            <Card className="border-border/50 shadow-elegant">
              <CardContent className="pt-6">
                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm md:text-base leading-relaxed">{t('location')}</span>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm md:text-base leading-relaxed">{t('workingHours')}</span>
                  </div>
                   <div className="flex items-start">
                     <Phone className="w-4 h-4 md:w-5 md:h-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                     <span className="text-foreground text-sm md:text-base leading-relaxed">+7 778 974 7122</span>
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Time slots */}
        <div className="mt-12 md:mt-16 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 md:mb-8">{t('availableTime')}</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4 max-w-4xl mx-auto">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant="hero"
                className="aspect-square text-sm md:text-base font-medium"
                onClick={() => openWhatsApp(`${t('bookNow')} ${time}`)}
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