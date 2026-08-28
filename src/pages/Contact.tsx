import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { submitLead } from '../api';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { trackLeadSubmission, trackWhatsAppClick } from '../utils/analytics';

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
      trackLeadSubmission('contact_page_form', formData.propertyType || formData.city || 'general_inquiry');
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isStandalonePage = typeof window !== 'undefined' && window.location.pathname === '/contact';

  return (
    <div id="contact" className={`w-full py-24 scroll-mt-20 ${isStandalonePage ? 'pt-32 min-h-screen bg-cream' : ''}`}>
      {isStandalonePage && (
        <SEO 
          title="Contact VIP Advisory | REFERESTATES Saudi Real Estate"
          description="Speak directly with licensed Saudi real estate advisors in Riyadh and Jeddah. Request confidential off-plan allocations, floor plans, and Wafi escrow details."
          canonical="https://referestates.com/contact"
          keywords={["Contact Saudi Real Estate Advisor", "REFERESTATES Riyadh", "Jeddah Property Inquiries"]}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {isStandalonePage && (
          <Breadcrumbs items={[{ label: 'Contact Advisory' }]} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Context Section */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-primary font-display font-bold text-xs uppercase tracking-[0.2em] mb-3">
                <MessageSquare size={14} />
                <span>Private Consultation</span>
              </div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-secondary mb-6 leading-tight uppercase tracking-tight"
              >
                Let's Find Your Next Property.
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-secondary/80 text-base md:text-lg max-w-md mb-8 font-body leading-relaxed"
              >
                Share your requirements and a licensed REFERESTATES advisor will personally check our internal database for the best off-plan and luxury property matches.
              </motion.p>

              {/* Direct Contacts */}
              <div className="space-y-3 pt-2 mb-8">
                <a
                  href="https://wa.me/966536609534"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('contact_page_direct')}
                  className="flex items-center gap-3 text-secondary hover:text-primary transition-colors text-sm font-display font-semibold"
                >
                  <div className="w-8 h-8 bg-primary/10 flex items-center justify-center text-primary">
                    <Phone size={14} />
                  </div>
                  <span>+966 53 660 9534 (Direct / WhatsApp)</span>
                </a>
                <a
                  href="mailto:info@referestates.com"
                  className="flex items-center gap-3 text-secondary hover:text-primary transition-colors text-sm font-display font-semibold"
                >
                  <div className="w-8 h-8 bg-primary/10 flex items-center justify-center text-primary">
                    <Mail size={14} />
                  </div>
                  <span>info@referestates.com</span>
                </a>
                <div className="flex items-center gap-3 text-secondary/70 text-sm font-display">
                  <div className="w-8 h-8 bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin size={14} />
                  </div>
                  <span>Riyadh & Jeddah, Kingdom of Saudi Arabia</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block w-full aspect-[4/3] bg-surface overflow-hidden border border-secondary/10">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Curated Saudi Luxury Real Estate Inquiries - REFERESTATES" 
                loading="lazy"
                decoding="async"
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
                    <label className="block font-display font-bold text-[10px] tracking-widest uppercase text-secondary/70 mb-2">Full Name *</label>
                    <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="e.g. Abdullah Al-Farsi" className="w-full bg-transparent border-b border-secondary/20 py-2 focus:outline-none focus:border-primary text-secondary placeholder-secondary/30 text-sm font-body" />
                  </div>
                  <div>
                    <label className="block font-display font-bold text-[10px] tracking-widest uppercase text-secondary/70 mb-2">Country of Residence *</label>
                    <input required name="country" value={formData.country} onChange={handleChange} type="text" placeholder="Saudi Arabia, UAE, UK, USA..." className="w-full bg-transparent border-b border-secondary/20 py-2 focus:outline-none focus:border-primary text-secondary placeholder-secondary/30 text-sm font-body" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block font-display font-bold text-[10px] tracking-widest uppercase text-secondary/70 mb-2">WhatsApp / Phone *</label>
                    <input required name="whatsapp" value={formData.whatsapp} onChange={handleChange} type="tel" placeholder="+966 5X XXX XXXX" className="w-full bg-transparent border-b border-secondary/20 py-2 focus:outline-none focus:border-primary text-secondary placeholder-secondary/30 text-sm font-body" />
                  </div>
                  <div>
                    <label className="block font-display font-bold text-[10px] tracking-widest uppercase text-secondary/70 mb-2">Email Address *</label>
                    <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="your@email.com" className="w-full bg-transparent border-b border-secondary/20 py-2 focus:outline-none focus:border-primary text-secondary placeholder-secondary/30 text-sm font-body" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block font-display font-bold text-[10px] tracking-widest uppercase text-secondary/70 mb-2">Preferred City</label>
                    <select name="city" value={formData.city} onChange={handleChange} className="w-full bg-transparent border-b border-secondary/20 py-2 focus:outline-none focus:border-primary text-secondary text-sm font-body cursor-pointer">
                      <option value="">Any Location in Saudi Arabia</option>
                      <option value="Jeddah">Jeddah</option>
                      <option value="Riyadh">Riyadh</option>
                      <option value="Makkah">Makkah</option>
                      <option value="Madinah">Madinah</option>
                      <option value="NEOM">NEOM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-display font-bold text-[10px] tracking-widest uppercase text-secondary/70 mb-2">Target Property Type</label>
                    <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full bg-transparent border-b border-secondary/20 py-2 focus:outline-none focus:border-primary text-secondary text-sm font-body cursor-pointer">
                      <option value="">Any Property Type</option>
                      <option value="Commercial Center / Showroom">Commercial Center / Showroom</option>
                      <option value="Luxury Residential Suite">Luxury Residential Suite</option>
                      <option value="Off-Plan Development">Off-Plan Development</option>
                      <option value="Penthouse / Villa">Penthouse / Villa</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-display font-bold text-[10px] tracking-widest uppercase text-secondary/70 mb-2">Additional Requirements (Optional)</label>
                  <textarea name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Specific developments of interest (e.g. AL REHAB CENTER), budget range, floor level..." rows={3} className="w-full bg-transparent border-b border-secondary/20 py-2 focus:outline-none focus:border-primary text-secondary placeholder-secondary/30 resize-none text-sm font-body"></textarea>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[11px] text-secondary/60 font-body">
                    Protected by Saudi PDPL data confidentiality standards.
                  </p>
                  <button disabled={isSubmitting} type="submit" className="bg-primary text-cream font-display font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-primary-dark transition-colors flex items-center gap-2 disabled:opacity-50 w-full sm:w-auto justify-center shadow-md">
                    <span>{isSubmitting ? 'Sending Request...' : 'Submit Request'}</span>
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
                <h3 className="font-display font-bold text-3xl text-secondary mb-4 uppercase">Inquiry Received</h3>
                <p className="text-secondary/70 max-w-sm mb-8 font-body text-sm leading-relaxed">
                  Thank you for sharing your requirements. A REFERESTATES senior advisor will review your criteria and contact you shortly with bespoke matches.
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
    </div>
  );
}
