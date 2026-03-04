
import React from 'react';
import { Sparkles, CheckCircle2, Star } from 'lucide-react';
import Reveal from './Reveal';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50 -z-10 rounded-l-[100px] hidden lg:block"></div>
      
      <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm animate-bounce">
            <Sparkles size={16} />
            Bellevue's #1 Rated Maid Service
          </div>
          
          <h1 className="text-5xl md:text-7xl leading-tight font-bold text-slate-900">
            Come Home to a <span className="text-blue-600">Fresh, Clean</span> Living Space.
          </h1>
          
          <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
            Professional home cleaning services tailored to your busy Bellevue lifestyle. 
            Reliable, vetted, and guaranteed to make you smile.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#quote" className="bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-[length:200%_100%] animate-shimmer text-white text-center px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:-translate-y-1 transition-transform">
              Get an Instant Quote
            </a>
            <a href="#services" className="bg-white border-2 border-slate-200 text-slate-800 text-center px-10 py-5 rounded-full text-lg font-bold hover:border-blue-300 transition-all">
              Our Services
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <CheckCircle2 className="text-green-500" size={20} />
              <span>Bonded & Insured</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <CheckCircle2 className="text-green-500" size={20} />
              <span>Background Checked</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-medium col-span-2 md:col-span-1">
              <CheckCircle2 className="text-green-500" size={20} />
              <span>Satisfaction Guarantee</span>
            </div>
          </div>
        </Reveal>
        
        <Reveal delay={200} className="relative">
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" 
              alt="Clean Home Interior" 
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Floating Stats Card */}
          <div className="absolute -bottom-10 -left-6 z-20 hidden sm:block animate-float">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-5">
                <div className="bg-yellow-100 p-4 rounded-full text-yellow-500">
                    <Star size={24} fill="currentColor" />
                </div>
                <div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-900">4.9/5</span>
                        <span className="text-sm font-semibold text-slate-400">Rating</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex -space-x-3">
                            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                            <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="User" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                        </div>
                        <p className="text-xs text-slate-500 font-medium">2,500+ Happy Neighbors</p>
                    </div>
                </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
