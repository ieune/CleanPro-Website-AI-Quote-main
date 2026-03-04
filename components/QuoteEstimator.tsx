
import React, { useState, useEffect } from 'react';
import { getAIQuote } from '../services/geminiService';
import { QuoteRequest, QuoteResponse } from '../types';
import { Home, Bath, Square, Loader2, Sparkles, CheckCircle, Calendar, Clock, User, Mail, Phone, ArrowRight, ArrowLeft, Confetti, AlertCircle } from 'lucide-react';
import Reveal from './Reveal';

type Step = 'input' | 'quote' | 'schedule' | 'details' | 'success';

interface QuoteEstimatorProps {
  initialType: QuoteRequest['type'];
}

const QuoteEstimator: React.FC<QuoteEstimatorProps> = ({ initialType }) => {
  const [step, setStep] = useState<Step>('input');
  const [inputStep, setInputStep] = useState(0); // 0: Rooms, 1: Type, 2: Add-ons
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  
  // Form Data
  const [formData, setFormData] = useState<QuoteRequest>({
    rooms: 2,
    bathrooms: 2,
    sqft: 1500,
    type: 'standard',
    extras: []
  });

  // Update form data when props change (from Services section click)
  useEffect(() => {
    setFormData(prev => ({ ...prev, type: initialType }));
  }, [initialType]);

  // Booking Data
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });

  const getNextDays = () => {
    const dates = [];
    for (let i = 1; i <= 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await getAIQuote(formData);
      setQuote(result);
      setStep('quote');
    } catch (error) {
      console.error(error);
      setError("Unable to generate quote at this moment. Please check your connection or try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingDate && bookingTime) setStep('details');
  };

  const handleFinalBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API booking
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 2000);
  };

  const toggleExtra = (extra: string) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(extra) 
        ? prev.extras.filter(e => e !== extra)
        : [...prev.extras, extra]
    }));
  };

  const nextInputStep = () => setInputStep(prev => Math.min(prev + 1, 2));
  const prevInputStep = () => setInputStep(prev => Math.max(prev - 1, 0));

  return (
    <section id="quote" className="py-24 bg-slate-50 min-h-[800px]">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <Reveal className="text-center mb-10">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Instant AI Quote & Booking</h2>
          <p className="text-lg text-slate-600">From estimate to booked in under 60 seconds.</p>
        </Reveal>

        <Reveal delay={200} className="bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px] flex flex-col md:flex-row">
          
          {/* Left Side: Progress / Visuals */}
          <div className="md:w-1/3 bg-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-8">
                 <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">W</div>
                 <span className="font-bold">Booking Flow</span>
               </div>
               
               <div className="space-y-6">
                 <div className={`flex items-center gap-4 transition-opacity ${step === 'input' ? 'opacity-100' : 'opacity-50'}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'input' ? 'border-blue-500 text-blue-500' : 'border-slate-500 text-slate-400'}`}>1</div>
                   <span className={step === 'input' ? 'text-white' : 'text-slate-400'}>Home Details</span>
                 </div>
                 <div className={`flex items-center gap-4 transition-opacity ${step === 'quote' ? 'opacity-100' : 'opacity-50'}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'quote' ? 'border-blue-500 text-blue-500' : 'border-slate-500 text-slate-400'}`}>2</div>
                   <span className={step === 'quote' ? 'text-white' : 'text-slate-400'}>Your Quote</span>
                 </div>
                 <div className={`flex items-center gap-4 transition-opacity ${step === 'schedule' ? 'opacity-100' : 'opacity-50'}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'schedule' ? 'border-blue-500 text-blue-500' : 'border-slate-500 text-slate-400'}`}>3</div>
                   <span className={step === 'schedule' ? 'text-white' : 'text-slate-400'}>Schedule</span>
                 </div>
                 <div className={`flex items-center gap-4 transition-opacity ${step === 'details' ? 'opacity-100' : 'opacity-50'}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 'details' ? 'border-blue-500 text-blue-500' : 'border-slate-500 text-slate-400'}`}>4</div>
                   <span className={step === 'details' ? 'text-white' : 'text-slate-400'}>Contact Info</span>
                 </div>
               </div>
             </div>

             <div className="relative z-10 mt-12">
               <p className="text-slate-400 text-sm">Need help? Call us</p>
               <p className="text-lg font-bold">(425) 555-0199</p>
             </div>
          </div>

          {/* Right Side: Content Forms */}
          <div className="md:w-2/3 p-8 lg:p-12 relative">
            
            {/* STEP 1: INPUT */}
            {step === 'input' && (
              <form onSubmit={handleQuoteSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="text-2xl font-bold text-slate-900">Tell us about your home</h3>
                   <span className="text-sm font-bold text-slate-400">Step {inputStep + 1}/3</span>
                </div>
                
                {/* Progress Bar */}
                <div className="flex gap-2 mb-6">
                   {[0, 1, 2].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= inputStep ? 'bg-blue-600' : 'bg-slate-200'}`} />
                   ))}
                </div>

                {/* Sub-step 0: Rooms */}
                {inputStep === 0 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                          <Home size={16} /> Bedrooms
                        </label>
                        <input 
                          type="number" 
                          value={formData.rooms}
                          onChange={(e) => setFormData({...formData, rooms: parseInt(e.target.value)})}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                          <Bath size={16} /> Bathrooms
                        </label>
                        <input 
                          type="number" 
                          value={formData.bathrooms}
                          onChange={(e) => setFormData({...formData, bathrooms: parseInt(e.target.value)})}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-step 1: Type */}
                {inputStep === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Cleaning Type</label>
                      <div className="grid grid-cols-1 gap-3">
                        {(['standard', 'deep', 'move'] as const).map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({...formData, type})}
                            className={`py-4 px-4 rounded-xl text-left font-semibold border-2 transition-all flex items-center justify-between ${
                              formData.type === type 
                              ? 'border-blue-600 bg-blue-50 text-blue-700' 
                              : 'border-slate-100 hover:border-slate-200 text-slate-600 bg-slate-50'
                            }`}
                          >
                            <span>{type.charAt(0).toUpperCase() + type.slice(1)} Clean</span>
                            {formData.type === type && <CheckCircle size={20} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-step 2: Add-ons */}
                {inputStep === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Add-ons (Optional)</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Fridge', 'Oven', 'Windows', 'Cabinets', 'Laundry'].map(extra => (
                          <button
                            key={extra}
                            type="button"
                            onClick={() => toggleExtra(extra)}
                            className={`px-4 py-3 rounded-xl text-sm font-bold border-2 transition-all flex items-center justify-between ${
                              formData.extras.includes(extra)
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                            }`}
                          >
                            <span>+ {extra}</span>
                            {formData.extras.includes(extra) && <CheckCircle size={16} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 animate-in fade-in">
                    <AlertCircle size={16} className="shrink-0" />
                    {error}
                  </div>
                )}

                <div className="flex gap-4 mt-auto pt-6">
                   {inputStep > 0 && (
                       <button 
                        type="button"
                        onClick={prevInputStep}
                        className="px-6 py-4 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                       >
                         Back
                       </button>
                   )}
                   
                   {inputStep < 2 ? (
                       <button 
                        type="button"
                        onClick={nextInputStep}
                        className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2"
                       >
                         Next <ArrowRight size={18} />
                       </button>
                   ) : (
                       <button 
                        type="submit" 
                        disabled={loading}
                        className="flex-1 py-4 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-[length:200%_100%] animate-shimmer text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                       >
                         {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
                         {loading ? 'Analyzing...' : (
                           formData.extras.length > 0 
                             ? `Calculate with ${formData.extras.length} Add-on${formData.extras.length > 1 ? 's' : ''}`
                             : 'Calculate Quote'
                         )}
                       </button>
                   )}
                </div>
              </form>
            )}

            {/* STEP 2: QUOTE RESULT */}
            {step === 'quote' && quote && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900">Your Personalized Estimate</h3>
                
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center">
                  <p className="text-sm text-blue-600 font-bold uppercase mb-2">Estimated Total</p>
                  <p className="text-5xl font-bold text-slate-900">{quote.estimatedPrice}</p>
                  <p className="text-slate-500 mt-2">Duration: {quote.duration}</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Sparkles className="text-yellow-500 shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-slate-900 mb-1">Our Recommendation</p>
                      <p className="text-slate-600 italic">"{quote.recommendation}"</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-auto">
                   <button 
                    onClick={() => setStep('input')}
                    className="flex-1 py-4 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                   >
                     Back
                   </button>
                   <button 
                    onClick={() => setStep('schedule')}
                    className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
                   >
                     Book Now <ArrowRight size={18} />
                   </button>
                </div>
              </div>
            )}

            {/* STEP 3: SCHEDULE */}
            {step === 'schedule' && (
              <form onSubmit={handleScheduleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col">
                <h3 className="text-2xl font-bold text-slate-900">Pick a Time</h3>
                
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Calendar size={16} /> Select Date
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {getNextDays().map((d, i) => {
                      const val = d.toISOString().split('T')[0];
                      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
                      const dayNum = d.getDate();
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setBookingDate(val)}
                          className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center ${bookingDate === val ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-200 text-slate-900 bg-white'}`}
                        >
                          <span className="text-xs font-bold uppercase">{dayName}</span>
                          <span className="text-xl font-bold">{dayNum}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Clock size={16} /> Select Start Window
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM'].map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setBookingTime(t)}
                        className={`p-3 rounded-xl border-2 transition-all font-bold text-sm ${bookingTime === t ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-200 text-slate-900 bg-white'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-auto">
                   <button 
                    type="button"
                    onClick={() => setStep('quote')}
                    className="flex-1 py-4 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                   >
                     Back
                   </button>
                   <button 
                    type="submit"
                    disabled={!bookingDate || !bookingTime}
                    className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     Continue <ArrowRight size={18} />
                   </button>
                </div>
              </form>
            )}

            {/* STEP 4: DETAILS */}
            {step === 'details' && (
              <form onSubmit={handleFinalBooking} className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col">
                 <h3 className="text-2xl font-bold text-slate-900">Final Details</h3>

                 <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="text" 
                        required
                        placeholder="Full Name"
                        value={contactInfo.name}
                        onChange={e => setContactInfo({...contactInfo, name: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="email" 
                        required
                        placeholder="Email Address"
                        value={contactInfo.email}
                        onChange={e => setContactInfo({...contactInfo, email: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input 
                        type="tel" 
                        required
                        placeholder="Phone Number"
                        value={contactInfo.phone}
                        onChange={e => setContactInfo({...contactInfo, phone: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                 </div>

                 <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600">
                    <p><strong>Booking Summary:</strong></p>
                    <p>{formData.type.toUpperCase()} Clean • {bookingDate} @ {bookingTime}</p>
                 </div>

                 <div className="flex gap-4 mt-auto">
                   <button 
                    type="button"
                    onClick={() => setStep('schedule')}
                    className="flex-1 py-4 border-2 border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all"
                   >
                     Back
                   </button>
                   <button 
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-[length:200%_100%] animate-shimmer text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl"
                   >
                     {loading ? <Loader2 className="animate-spin" /> : 'Confirm Booking'}
                   </button>
                </div>
              </form>
            )}

            {/* STEP 5: SUCCESS */}
            {step === 'success' && (
              <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle className="text-green-500 w-12 h-12" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">You're All Set!</h3>
                <p className="text-slate-600 mb-8 max-w-sm">
                  Thanks {contactInfo.name.split(' ')[0]}! We've sent a confirmation email to <strong>{contactInfo.email}</strong>. 
                  See you on {bookingDate}!
                </p>
                <button 
                  onClick={() => {
                    setStep('input');
                    setQuote(null);
                    setBookingDate('');
                    setBookingTime('');
                    setContactInfo({name: '', email: '', phone: ''});
                  }}
                  className="px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-full hover:bg-slate-200 transition-colors"
                >
                  Book Another
                </button>
              </div>
            )}
            
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default QuoteEstimator;
