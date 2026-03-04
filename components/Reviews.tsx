
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Reveal from './Reveal';

const reviews = [
  {
    id: 1,
    name: "Jennifer M.",
    location: "Clyde Hill",
    text: "Saved my sanity! With three kids and a full-time job, cleaning was the last thing on my mind. The team was punctual, thorough, and surprisingly quiet. The house smells amazing!",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Mark T.",
    location: "Somerset",
    text: "I've tried three different services in Bellevue and these guys are by far the best. They actually moved the furniture to vacuum behind it. Professional and detailed.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Sarah L.",
    location: "Downtown Bellevue",
    text: "Love the eco-friendly products. My cat has allergies so this was a must for me. The team was super respectful of my space and did a fantastic job on the bathrooms.",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const Reviews: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="py-24 bg-blue-600 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <Reveal>
          <div className="text-center mb-12 text-white">
            <h2 className="text-blue-200 font-bold uppercase tracking-widest text-sm mb-4">What Neighbors Say</h2>
            <h3 className="text-4xl font-bold serif">Bellevue's Most Trusted Team</h3>
          </div>
        </Reveal>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative">
            <Quote className="absolute top-8 left-8 text-blue-100 w-16 h-16 -z-0" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full border-4 border-blue-50 overflow-hidden mb-6 shadow-md">
                <img src={reviews[current].avatar} alt={reviews[current].name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(reviews[current].rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-xl md:text-2xl text-slate-700 italic mb-8 leading-relaxed font-light">
                "{reviews[current].text}"
              </p>

              <div>
                <h4 className="text-lg font-bold text-slate-900">{reviews[current].name}</h4>
                <p className="text-blue-500 text-sm font-medium">{reviews[current].location}</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prev}
            className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/30"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={next}
            className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all border border-white/30"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-all ${current === idx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
