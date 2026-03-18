import Navbar from '../components/layout/Navbar';
import HeroPage from '../components/landing/HeroPage';
import Services from '../components/landing/Services';
import Stats from '../components/landing/Stats';
import Contact from '../components/landing/Contacts';
import Footer from '../components/layout/Footer';

const Hero = () => {
  return (
    <div>
      <Navbar />
      <HeroPage />
      <Services />
      <Stats />
      <Contact />
      <Footer />
    </div>
  );
}

export default Hero;