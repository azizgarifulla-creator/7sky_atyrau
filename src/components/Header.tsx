import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MessageCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-sunset rounded-full flex items-center justify-center shadow-glow">
              <span className="text-primary-foreground font-bold text-base md:text-lg">7S</span>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
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
          <div className="flex items-center space-x-2 md:space-x-4">
            <LanguageSelector />
            <Button 
              variant="dome" 
              size="sm"
              onClick={() => scrollToSection('booking')}
              className="hidden sm:flex text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              {t('book')}
            </Button>
            
            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden p-2">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <nav className="flex flex-col space-y-6 mt-8">
                  <button 
                    onClick={() => scrollToSection('home')}
                    className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    {t('home')}
                  </button>
                  <button 
                    onClick={() => scrollToSection('packages')}
                    className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    {t('packages')}
                  </button>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    {t('services')}
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    {t('contact')}
                  </button>
                  <Button 
                    variant="dome" 
                    onClick={() => scrollToSection('booking')}
                    className="mt-6 w-full"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t('book')}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};