import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Sparkles, Music, Camera, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Packages = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const packages = [
    {
      id: 'couple',
      icon: Heart,
      title: t('couplePackage'),
      price: t('couplePrice'),
      features: [
        t('domeRental'),
        t('romanticSetup'),
        t('rosePetals'),
        t('backgroundMusic')
      ],
      gradient: 'bg-gradient-to-br from-rose/20 to-primary/20',
      popular: false
    },
    {
      id: 'small-group',
      icon: Users,
      title: t('smallGroupPackage'),
      price: t('smallGroupPrice'),
      features: [
        t('domeRental'),
        t('tableSetup'),
        t('backgroundMusic')
      ],
      gradient: 'bg-gradient-to-br from-primary/20 to-accent/20',
      popular: true
    },
    {
      id: 'large-group',
      icon: Sparkles,
      title: t('largeGroupPackage'),
      price: t('largeGroupPrice'),
      features: [
        t('domeRental'),
        t('tableSetup'),
        t('karaoke'),
        t('audioSystem')
      ],
      gradient: 'bg-gradient-to-br from-gold/20 to-primary/20',
      popular: false
    }
  ];

  const handleBooking = (packageId: string) => {
    if (packageId === 'couple') {
      navigate('/booking/small-dome');
    } else if (packageId === 'small-group') {
      navigate('/booking/small-dome');
    } else if (packageId === 'large-group') {
      navigate('/booking/large-dome');
    }
  };

  return (
    <section id="packages" className="py-20 bg-gradient-dome">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              {t('packages')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Выберите идеальный пакет для вашего незабываемого вечера в небесных куполах
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => {
            const IconComponent = pkg.icon;
            return (
              <Card key={pkg.id} className={`relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-dome group ${pkg.gradient}`}>
                {pkg.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-sunset text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-glow">
                    Популярный
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-sunset rounded-2xl flex items-center justify-center shadow-dome group-hover:shadow-glow transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground mb-2">
                    {pkg.title}
                  </CardTitle>
                  <div className="text-3xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
                    {pkg.price}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-primary mb-3">{t('included')}</p>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-foreground/80">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant={pkg.popular ? "dome" : "hero"} 
                    size="lg" 
                    className="w-full"
                    onClick={() => handleBooking(pkg.id)}
                  >
                    {t('bookNow')}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Cinema evening section */}
        <div className="mt-20 text-center">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 max-w-2xl mx-auto shadow-elegant">
            <div className="flex items-center justify-center mb-6">
              <Camera className="w-8 h-8 text-primary mr-3" />
              <h3 className="text-2xl font-bold text-foreground">{t('cinemaEvening')}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-muted/30 rounded-2xl p-4">
                <div className="text-xl font-bold text-primary mb-2">4 500 ₸</div>
                <p className="text-sm text-foreground/80">{t('cinemaTicketPuff')}</p>
              </div>
              <div className="bg-muted/30 rounded-2xl p-4">
                <div className="text-xl font-bold text-primary mb-2">4 000 ₸</div>
                <p className="text-sm text-foreground/80">{t('cinemaTicketChair')}</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-4">{t('howManySeats')}</p>
            <Button variant="hero" size="lg" onClick={() => navigate('/booking/small-dome')}>
              <Gift className="w-5 h-5" />
              Забронировать кино-вечер
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};