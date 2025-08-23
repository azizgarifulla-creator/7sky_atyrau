import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Instagram, MessageCircle, CreditCard, MapPin, Clock, Heart } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-dome-dark border-t border-border/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-sunset rounded-full flex items-center justify-center shadow-glow">
                <span className="text-primary-foreground font-bold text-lg">7S</span>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
                  7th SKY
                </h3>
                <p className="text-xs text-muted-foreground">ROOFTOP DOME EST. 2024</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t('heroDescription')}
            </p>
            <div className="flex gap-4">
              <Button
                variant="hero"
                size="sm"
                onClick={() => window.open('https://instagram.com/7sky_atyrau', '_blank')}
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </Button>
              <Button
                variant="hero"
                size="sm"
                onClick={() => window.open('https://wa.me/7708000000', '_blank')}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('packages')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('services')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {t('book')}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-4">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">{t('location')}</span>
              </div>
              <div className="flex items-start">
                <Clock className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">{t('workingHours')}</span>
              </div>
              <div className="flex items-start">
                <Instagram className="w-4 h-4 text-primary mr-2 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">{t('instagram')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border/30 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © 2024 7th Sky Rooftop Dome. Все права защищены.
            </p>
            <div className="flex items-center text-muted-foreground text-sm">
              <span>Создано с</span>
              <Heart className="w-4 h-4 text-rose mx-1 fill-current" />
              <span>для незабываемых моментов</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};