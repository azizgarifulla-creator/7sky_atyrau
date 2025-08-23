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
      title: t('kaspiRed'),
      description: t('paymentServices'),
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
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contactDescription')}
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto mb-12 md:mb-16">
          {contactLinks.map((contact, index) => {
            const IconComponent = contact.icon;
            return (
              <Card key={index} 
                    className="group cursor-pointer hover:shadow-dome transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden"
                    onClick={contact.action}>
                <div className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <CardContent className="relative z-10 text-center p-6 md:p-8">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-sunset rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {contact.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">{contact.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Location and hours */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50 shadow-elegant overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-gold/10 p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary mr-3" />
                    <h3 className="text-lg md:text-xl font-bold text-foreground">{t('ourAddress')}</h3>
                  </div>
                  <p className="text-foreground/80 text-base md:text-lg">{t('location')}</p>
                  <p className="text-muted-foreground mt-2 text-sm md:text-base">
                    {t('addressDescription')}
                  </p>
                </div>

                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary mr-3" />
                    <h3 className="text-lg md:text-xl font-bold text-foreground">{t('workingTime')}</h3>
                  </div>
                  <p className="text-foreground/80 text-base md:text-lg">{t('workingHours')}</p>
                  <p className="text-muted-foreground mt-2 text-sm md:text-base">
                    {t('workingDescription')}
                  </p>
                </div>
              </div>

              <div className="text-center mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border/30">
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-primary mr-3" />
                  <h3 className="text-lg md:text-xl font-bold text-foreground">{t('rooftopDome')}</h3>
                </div>
                <p className="text-muted-foreground mb-4 md:mb-6 text-sm md:text-base">
                  {t('companyDescription')}
                </p>
                <Button 
                  variant="dome" 
                  size="lg"
                  className="text-sm md:text-base px-6 md:px-8"
                  onClick={() => window.open(`https://wa.me/77789747122?text=${t('bookNow')}! ${t('bookDescription')}`, '_blank')}
                >
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                  {t('contactUs')}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};