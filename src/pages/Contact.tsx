import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { submitLead } from '../api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    whatsapp: '',
    email: '',
    city: '',
    budget: '',
    propertyType: '',
    purpose: '',
    bedrooms: '',
    requirements: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitLead(formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div id="contact" className="w-full py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Context Section */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-bold text-5xl md:text-6xl text-secondary mb-6 leading-tight"
            >
              Let's Find Your Next Property.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-secondary/80 text-lg max-w-md mb-12"
            >
              Share your requirements and a REFERESTATES advisor will personally check our internal database for the best matches. Experience bespoke real estate curation tailored to your exact specifications.
            </motion.p>
          </div>
          <div className="hidden lg:block w-full aspect-[4/3] bg-surface overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Luxury property" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:col-span-7 bg-surface border border-secondary/10 p-8 md:p-12 relative shadow-sm">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-display font-bold text-[10px] tracking-widest uppercase text-secondary/60 mb-2">Full Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="e.g. Abdullah Al-Farsi" className="w-full bg-transparent border-b border-secondary/20 py-2 focus:outline-none focus:border-primary text-secondary placeholder-secondary/30" />
                </div>
                <div>
                  <label className="block font-display font-bold text-[10px] tracking-widest uppercase text-secondary/60 mb-2">Country of Residence</label>
                  <input required name="country" value={formData.country} onChange={handleChange} type="text" placeholder="e.g. Saudi Arabia" className="w-full bg-transparent border-b border-secondary/20 py-2 focus:outline-none focus:border-primary text-secondary placeholder-secondary/30" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block font-display font-bold text-[10px] tracking-widest uppercase text-secondary/60 mb-2">WhatsApp Number</label>
                  <input required name="whatsapp" value={formData.whatsapp} onChange={handleChange} type="tel" placeholder="+966 5X XXX XXXX" className="w-full bg-transparent border-b border-secondary/20 py-2 focus:outline-none focus:border-primary text-secondary placeholder-secondary/30" />
                </div>
                <div>
                  <label className="block font-display font-bold text-[10px] tracking-widest uppercase text-secondary/60 mb-2">Email Address</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="your@email.com" className="w-full bg-transparent border-b border-secondary/20 py-2 focus:outline-none focus:border-primary text-secondary placeholder-secondary/30" />
                </div>
              </div>

              <div>
                <label className="block font-display font-bold text-[10px] tracking-widest uppercase text-secondary/60 mb-2">Additional Requirements (Optional)</label>
                <textarea name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Specific amenities, preferred views..." rows={3} className="w-full bg-transparent border-b border-secondary/20 py-2 focus:outline-none focus:border-primary text-secondary placeholder-secondary/30 resize-none"></textarea>
              </div>

              <div className="mt-4 flex justify-end">
                <button disabled={isSubmitting} type="submit" className="bg-primary text-cream font-display font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-primary-dark transition-colors flex items-center gap-2 disabled:opacity-50">
                  <span>Submit Request</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-surface flex flex-col items-center justify-center text-center p-8 z-10"
            >
              <CheckCircle size={64} className="text-primary mb-6" />
              <h3 className="font-display font-bold text-3xl text-secondary mb-4">Request Received</h3>
              <p className="text-secondary/70 max-w-sm mb-8">
                Thank you for sharing your requirements. A REFERESTATES advisor will review your details and contact you shortly with curated property matches.
              </p>
              <button 
                onClick={() => {
                  setFormData({name:'',country:'',whatsapp:'',email:'',city:'',budget:'',propertyType:'',purpose:'',bedrooms:'',requirements:''});
                  setIsSubmitted(false);
                }}
                className="border border-secondary text-secondary font-display font-bold text-[10px] tracking-widest uppercase px-6 py-3 hover:bg-secondary/5 transition-colors"
              >
                Submit Another Request
              </button>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
