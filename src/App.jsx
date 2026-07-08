import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Categories from './components/Categories';
import Skills from './components/Skills';
import Customer from './components/Customer';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categories/>
      <Skills/>
      <Customer />
      <Footer />
      
    </div>
  );
}

export default App;