
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Reveal from './Reveal';

const faqs = [
  {
    question: "Do I need to be home during the cleaning?",
    answer: "No, you don't! Most of our Bellevue clients provide us with a key code or leave a key in a secure lockbox. We are fully bonded and insured for your peace of mind."
  },
  {
    question: "What cleaning supplies do you use?",
    answer: "We bring our own professional-grade, eco-friendly supplies and equipment (vacuums, mops, etc.). If you have specific products you'd prefer us to use, just let us know!"
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer: "Your happiness is our priority. If you aren't 100% satisfied, call us within 24 hours and we'll come back to re-clean the specific areas for free. That's our CleanPro Satisfaction Guarantee."
  },
  {
    question: "Are you pet friendly?",
    answer: "Absolutely! We love pets. We just ask that aggressive pets be secured, but generally, our team is very comfortable working around cats and dogs."
  },
  {
    question: "How do I pay?",
    answer: "We accept all major credit cards. Payment is processed securely online after the cleaning is completed to your satisfaction."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <Reveal>
          <div className="text-center mb-16">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
              <HelpCircle size={24} />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600">Everything you need to know about our service.</p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div 
                className={`border rounded-2xl transition-all duration-300 ${openIndex === idx ? 'border-blue-600 bg-blue-50/50 shadow-md' : 'border-slate-200 hover:border-blue-300 bg-white'}`}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span className={`font-bold text-lg ${openIndex === idx ? 'text-blue-900' : 'text-slate-700'}`}>
                    {faq.question}
                  </span>
                  {openIndex === idx ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-slate-400" />}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
