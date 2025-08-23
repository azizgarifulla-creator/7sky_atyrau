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
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-accent/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse delay-500"></div>
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

          {/* Enhanced special offer badge */}
          <div className="mb-12 animate-fade-in delay-300">
            <div className="inline-block bg-gradient-dome border-2 border-primary/40 rounded-3xl p-8 shadow-dome backdrop-blur-sm">
              <div className="text-primary font-bold text-lg mb-3">
                {t('birthdayOffer')}
              </div>
              <div className="text-3xl font-bold text-foreground mb-3 bg-gradient-sunset bg-clip-text text-transparent">
                {t('birthdayDiscount')}
              </div>
              <div className="text-accent font-bold text-xl bg-muted/20 px-4 py-2 rounded-xl">
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