import React from 'react'
import Navbar from '../components/nonUser/navbar/Navbar';
import HeroPage from '../components/nonUser/heroPage/HeroPage';
import Services from '../components/nonUser/services/Services';
import Stats from '../components/nonUser/stats/Stats';
import Contact from '../components/nonUser/contacts/Contacts';


const Hero = () => {
  return (
    <div>
      <Navbar />
      <HeroPage />
      <Services />
      <Stats />
      <Contact />
    </div>
  )
}

export default Hero