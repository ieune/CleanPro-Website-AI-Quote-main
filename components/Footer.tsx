
import React from 'react';
import { Facebook, Instagram, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 text-center">
        
        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">C</div>
          <span className="text-xl font-bold text-white">Clean<span className="text-blue-500">Pro</span></span>
        </div>

        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Bellevue's premier home cleaning service. <br /> Making homes shine from Medina to Issaquah.
        </p>

        {/* Socials */}
        <div className="flex justify-center gap-6 mb-8">
          <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
            <Twitter size={20} />
          </a>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium text-slate-500 mb-8">
          <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
          <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          <a href="#reviews" className="hover:text-blue-400 transition-colors">Reviews</a>
          <a href="#quote" className="hover:text-blue-400 transition-colors">Get a Quote</a>
        </div>

        {/* Legal / Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} CleanPro. All rights reserved.</p>
          <div className="hidden md:block w-1 h-1 bg-slate-700 rounded-full"></div>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-slate-400">Privacy Policy</span>
            <span className="cursor-pointer hover:text-slate-400">Terms of Service</span>
          </div>
          <div className="hidden md:block w-1 h-1 bg-slate-700 rounded-full"></div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart size={10} className="text-red-500 fill-red-500" />
            <span>in Washington</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
