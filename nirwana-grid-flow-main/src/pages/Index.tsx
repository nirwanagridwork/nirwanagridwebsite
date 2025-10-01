import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Tech from '@/components/Tech';
import Product from '@/components/Product';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero />;
      case 'about':
        return <About />;
      case 'tech':
        return <Tech />;
      case 'product':
        return <Product />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-background dark">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      {renderSection()}
      <Footer activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  );
};

export default Index;
