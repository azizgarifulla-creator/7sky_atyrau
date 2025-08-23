import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star, MessageCircle } from 'lucide-react';

export const Hero = () => {
  const { t } = useLanguage();

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with dome-inspired elements */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-sunset bg-clip-text text-transparent">
                {t('heroTitle')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              {t('heroSubtitle')}
            </p>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              {t('heroDescription')}
            </p>
          </div>

          {/* Special offer badge */}
          <div className="mb-12 animate-fade-in delay-300">
            <div className="inline-block bg-gradient-dome border border-primary/30 rounded-2xl p-6 shadow-dome">
              <div className="text-primary font-bold text-sm mb-2">
                {t('birthdayOffer')}
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">
                {t('birthdayDiscount')}
              </div>
              <div className="text-accent font-semibold text-lg">
                7SKY_ATYRAU
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in delay-500">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToBooking}
              className="px-8 py-4 text-lg font-semibold"
            >
              <MessageCircle className="w-5 h-5" />
              {t('bookNow')}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('https://instagram.com/7sky_atyrau', '_blank')}
              className="px-8 py-4 text-lg border-primary/30 hover:border-primary"
            >
              <Star className="w-5 h-5" />
              {t('followUs')}
            </Button>
          </div>

          {/* Key info */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-muted-foreground animate-fade-in delay-700">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{t('location')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>{t('workingHours')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative dome shapes */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1200 300" className="w-full h-auto text-border/20">
          <path
            d="M0,300 Q150,200 300,250 T600,230 T900,240 T1200,250 L1200,300 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};