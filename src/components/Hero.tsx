import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star, MessageCircle } from 'lucide-react';
import domeBackground from '@/assets/dome-background.jpg';

export const Hero = () => {
  const { t } = useLanguage();

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with real dome photo */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-110"
          style={{ backgroundImage: `url(${domeBackground})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background/80"></div>
        <div className="absolute inset-0 bg-gradient-hero/20"></div>
        {/* Enhanced decorative elements */}
        <div className="absolute top-10 md:top-20 left-5 md:left-10 w-24 h-24 md:w-40 md:h-40 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-32 h-32 md:w-60 md:h-60 bg-accent/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 md:left-1/3 w-48 h-48 md:w-96 md:h-96 bg-gold/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 pt-16 md:pt-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <div className="mb-6 md:mb-8 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="bg-gradient-sunset bg-clip-text text-transparent">
                {t('heroTitle')}
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-3 md:mb-4">
              {t('heroSubtitle')}
            </p>
            <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto px-4">
              {t('heroDescription')}
            </p>
          </div>

          {/* Enhanced special offer badge */}
          <div className="mb-8 md:mb-12 animate-fade-in delay-300 px-4">
            <div className="inline-block bg-gradient-dome border-2 border-primary/40 rounded-3xl p-6 md:p-8 shadow-dome backdrop-blur-sm max-w-sm md:max-w-none mx-auto">
              <div className="text-primary font-bold text-base md:text-lg mb-2 md:mb-3">
                {t('birthdayOffer')}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-2 md:mb-3 bg-gradient-sunset bg-clip-text text-transparent">
                {t('birthdayDiscount')}
              </div>
              <div className="text-accent font-bold text-lg md:text-xl bg-muted/20 px-3 md:px-4 py-2 rounded-xl">
                7SKY_ATYRAU
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-12 animate-fade-in delay-500 px-4">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToBooking}
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              {t('bookNow')}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('https://instagram.com/7sky_atyrau', '_blank')}
              className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg border-primary/30 hover:border-primary"
            >
              <Star className="w-4 h-4 md:w-5 md:h-5" />
              {t('followUs')}
            </Button>
          </div>

          {/* Key info */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center text-muted-foreground animate-fade-in delay-700 px-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
              <span className="text-sm md:text-base text-center sm:text-left">{t('location')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
              <span className="text-sm md:text-base text-center sm:text-left">{t('workingHours')}</span>
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