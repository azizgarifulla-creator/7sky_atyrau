import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Instagram, MessageCircle, CreditCard, MapPin, Clock, Star } from 'lucide-react';

export const Contact = () => {
  const { t } = useLanguage();

  const contactLinks = [
    {
      icon: Instagram,
      title: 'Instagram',
      description: '@7sky_atyrau',
      action: () => window.open('https://instagram.com/7sky_atyrau', '_blank'),
      gradient: 'from-rose/20 to-accent/20'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: '+7 778 974 7122',
      action: () => window.open('https://wa.me/77789747122', '_blank'),
      gradient: 'from-primary/20 to-gold/20'
    },
    {
      icon: CreditCard,
      title: 'Kaspi RED',
      description: 'Оплата услуг',
      action: () => window.open('https://pay.kaspi.kz/pay/nultwafm', '_blank'),
      gradient: 'from-accent/20 to-primary/20'
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background"></div>
      <div className="absolute top-20 right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              {t('contact')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {contactLinks.map((contact, index) => {
            const IconComponent = contact.icon;
            return (
              <Card key={index} 
                    className="group cursor-pointer hover:shadow-dome transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden"
                    onClick={contact.action}>
                <div className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <CardContent className="relative z-10 text-center p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-sunset rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {contact.title}
                  </h3>
                  <p className="text-muted-foreground">{contact.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Location and hours */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50 shadow-elegant overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-gold/10 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <MapPin className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-bold text-foreground">Наш адрес</h3>
                  </div>
                  <p className="text-foreground/80 text-lg">{t('location')}</p>
                  <p className="text-muted-foreground mt-2">
                    Расположены на крыше здания с потрясающим видом на город
                  </p>
                </div>

                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <Clock className="w-6 h-6 text-primary mr-3" />
                    <h3 className="text-xl font-bold text-foreground">Время работы</h3>
                  </div>
                  <p className="text-foreground/80 text-lg">{t('workingHours')}</p>
                  <p className="text-muted-foreground mt-2">
                    Ежедневно для создания незабываемых вечеров
                  </p>
                </div>
              </div>

              <div className="text-center mt-8 pt-8 border-t border-border/30">
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl font-bold text-foreground">7th Sky Rooftop Dome</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Создано в 2024 году для особенных моментов вашей жизни
                </p>
                <Button 
                  variant="dome" 
                  size="lg"
                  onClick={() => window.open('https://wa.me/77789747122?text=Здравствуйте! Хочу узнать больше о 7th Sky.', '_blank')}
                >
                  <MessageCircle className="w-5 h-5" />
                  Связаться с нами
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};