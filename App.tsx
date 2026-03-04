
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import QuoteEstimator from './components/QuoteEstimator';
import Footer from './components/Footer';
import Reveal from './components/Reveal';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import { QuoteRequest } from './types';

const App: React.FC = () => {
  // State to handle service selection flow (Services -> Quote)
  const [selectedServiceType, setSelectedServiceType] = useState<QuoteRequest['type']>('standard');

  const handleServiceSelect = (type: QuoteRequest['type']) => {
    setSelectedServiceType(type);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        
        {/* Trusted By Section */}
        <section className="py-12 bg-white border-y border-slate-100">
          <div className="container mx-auto px-4 text-center">
            <Reveal>
              <p className="text-slate-400 font-semibold uppercase tracking-widest text-xs mb-8">Trusted by Bellevue Families Since 2010</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-50">
                <span className="text-2xl font-bold">HOMEADVISOR</span>
                <span className="text-2xl font-bold">THUMBTACK</span>
                <span className="text-2xl font-bold">YELP ELITE</span>
                <span className="text-2xl font-bold">ANGI'S LIST</span>
                <span className="text-2xl font-bold">GOOGLE GUARANTEED</span>
              </div>
            </Reveal>
          </div>
        </section>

        <Services onSelectService={handleServiceSelect} />
        <About />
        <Reviews />
        <QuoteEstimator initialType={selectedServiceType} />
        <FAQ />

        {/* Final CTA */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <Reveal className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
               <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
               <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
               
               <h2 className="text-4xl md:text-6xl font-bold mb-6 serif">Ready for a spotless home?</h2>
               <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Join over 5,000 happy King County residents who trust us with their keys. Book your first cleaning in under 60 seconds.</p>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <a href="#quote" className="bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-[length:200%_100%] animate-shimmer text-white px-12 py-5 rounded-full text-lg font-bold shadow-xl hover:-translate-y-1 transition-transform">
                   Book Now
                 </a>
                 <a href="tel:4255550199" className="bg-white/10 backdrop-blur-md text-white px-12 py-5 rounded-full text-lg font-bold hover:bg-white/20 transition-all border border-white/20">
                   Call (425) 555-0199
                 </a>
               </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
