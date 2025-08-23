import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { MessageCircle, MapPin } from 'lucide-react';

export const Header = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-sunset rounded-full flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-lg">7S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
                7th SKY
              </h1>
              <p className="text-xs text-muted-foreground">ROOFTOP DOME</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t('home')}
            </button>
            <button 
              onClick={() => scrollToSection('packages')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t('packages')}
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t('services')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t('contact')}
            </button>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Button 
              variant="dome" 
              size="sm"
              onClick={() => scrollToSection('booking')}
              className="hidden sm:flex"
            >
              <MessageCircle className="w-4 h-4" />
              {t('book')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};