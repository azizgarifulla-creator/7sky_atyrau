import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Packages } from '@/components/Packages';
import { Services } from '@/components/Services';
import { Booking } from '@/components/Booking';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Packages />
      <Services />
      <Booking />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;