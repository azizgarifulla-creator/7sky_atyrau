import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Camera, Heart, Sparkles, Flame } from 'lucide-react';

export const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Music,
      title: t('liveMusic'),
      price: '15 000 KZT',
      description: 'Живая музыка с саксофоном создаст незабываемую атмосферу',
      gradient: 'from-primary/20 to-accent/20'
    },
    {
      icon: Camera,
      title: t('photography'),
      price: '20 000 KZT',
      description: 'Профессиональная фото и видеосъемка ваших особенных моментов',
      gradient: 'from-gold/20 to-rose/20'
    },
    {
      icon: Heart,
      title: t('proposal'),
      price: '25 000 KZT',
      description: 'Романтическое оформление для предложения руки и сердца или дня рождения',
      gradient: 'from-rose/20 to-primary/20'
    },
    {
      icon: Sparkles,
      title: t('coldFountain2'),
      price: '8 000 KZT',
      description: 'Эффектные холодные фонтаны для яркого завершения вечера',
      gradient: 'from-accent/20 to-gold/20'
    },
    {
      icon: Flame,
      title: t('coldFountain4'),
      price: '12 000 KZT',
      description: 'Грандиозное шоу с четырьмя холодными фонтанами',
      gradient: 'from-primary/20 to-accent/20'
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background"></div>
      <div className="absolute top-20 left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              {t('additionalServices')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Дополните ваш вечер особенными услугами, которые сделают его поистине незабываемым
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group hover:shadow-dome transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <CardHeader className="relative z-10 text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-sunset rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <div className="text-2xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
                    {service.price}
                  </div>
                </CardHeader>

                <CardContent className="relative z-10">
                  <p className="text-foreground/70 text-center leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 max-w-4xl mx-auto shadow-elegant">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Создайте идеальный вечер
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Комбинируйте наши услуги для создания уникального опыта. Наша команда поможет вам 
              организовать незабываемое событие с вниманием к каждой детали.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};