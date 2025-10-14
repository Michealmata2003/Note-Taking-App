import React from 'react'
import Navbar from '../components/layouts/navbar/Navbar';
import HeroPage from '../components/ui/heroPage/HeroPage';
import Services from '../components/ui/services/Services';
import Stats from '../components/ui/stats/Stats';
import Contact from '../components/ui/contacts/Contacts';
import Footer from '../components/layouts/footer/Footer';


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
  )
}

export default Hero