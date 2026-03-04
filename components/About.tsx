
import React from 'react';
import { MapPin, Award, Users } from 'lucide-react';
import Reveal from './Reveal';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&q=80&w=800" 
                alt="Our Cleaning Team" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
              <p className="text-slate-900 font-bold text-lg mb-1">Local & Trusted</p>
              <p className="text-slate-500 text-sm">Serving the Greater Seattle & Eastside area for over 14 years.</p>
            </div>
          </Reveal>
          
          <Reveal delay={200} className="space-y-6">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Our Story</h2>
            <h3 className="text-4xl font-bold text-slate-900">More Than Just a Cleaning Service.</h3>
            
            <p className="text-slate-600 text-lg leading-relaxed">
              Founded right here in Bellevue, CleanPro began with a simple mission: to give busy professionals and families their weekends back. What started as a small team has grown into the Eastside's most trusted home care partner.
            </p>
            
            <p className="text-slate-600 text-lg leading-relaxed">
              We aren't a faceless franchise. We are your neighbors, dedicated to maintaining the beauty and comfort of your home with eco-friendly products and meticulous attention to detail.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Bellevue Based</h4>
                  <p className="text-sm text-slate-500">Local HQ</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Award Winning</h4>
                  <p className="text-sm text-slate-500">Best of 425 Mag</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Vetted Team</h4>
                  <p className="text-sm text-slate-500">100% Background Checked</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
