import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Building2, MapPin, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { fetchProjects, fetchWebsiteContent } from '../api';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import Contact from './Contact';
import SEO from '../components/SEO';
import heroImage from '../assets/images/regenerated_image_1787896302535.jpg';
import { trackWhatsAppClick } from '../utils/analytics';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [content, setContent] = useState<Record<string, string>>({
    hero_heading: 'A NEW ERA OF LUXURY REAL ESTATE',
    hero_subtitle: 'Discover exclusive properties, premium developments, and unparalleled coastal living in Saudi Arabia.',
    hero_cta: 'Explore Projects',
    about_heading: 'Redefining Luxury Living in Saudi Arabia',
    about_text: 'At REFERESTATES, we specialize in curating the finest properties across the Kingdom. From the futuristic landscapes of NEOM to the pristine coastlines of Jeddah and the vibrant heart of Riyadh, we connect discerning clients with extraordinary homes. Our approach is built on exclusivity, precision, and an intimate understanding of the Saudi luxury market.',
    international_heading: 'Looking to Buy Property in Saudi Arabia From Abroad?',
    international_text: 'REFERESTATES helps international buyers discover suitable properties and projects in Saudi Arabia through a simple, guided experience.',
    final_cta_heading: 'Your Next Property Could Start With One Conversation.',
    final_cta_text: 'Tell REFERESTATES what you\'re looking for, and we\'ll help you explore the right opportunities.'
  });

  useEffect(() => {
    fetchProjects().then(data => {
      setProjects(data.filter(p => p.featured).slice(0, 3));
    }).catch(console.error);
    
    fetchWebsiteContent('homepage').then(data => {
      if (Object.keys(data).length > 0) {
        setContent(prev => ({ ...prev, ...data }));
      }
    }).catch(console.error);
  }, []);

  // Home Page Schema.org
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "REFERESTATES",
    "url": "https://referestates.com",
    "image": "https://referestates.com/al-rehab-center.webp",
    "telephone": "+966536609534",
    "priceRange": "SAR 390,000 - SAR 50,000,000+",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Riyadh",
      "addressRegion": "Riyadh Province",
      "addressCountry": "SA"
    },
    "description": "Curating high-yield luxury real estate, off-plan commercial centers, and residential apartments across Riyadh and Jeddah.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Saudi Prime Developments",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Place",
            "name": "AL REHAB CENTER Jeddah",
            "description": "Premium Mixed-Use Commercial & Residential Suites from SAR 390k"
          }
        }
      ]
    }
  };

  return (
    <div className="w-full">
      {/* 0. SEO Meta Manager */}
      <SEO 
        title="REFERESTATES | Saudi Arabia Luxury Real Estate & Prime Off-Plan Developments"
        description="Discover luxury off-plan developments, commercial centers, and residential apartments in Riyadh and Jeddah. Inquire on AL REHAB CENTER starting at SAR 390k."
        canonical="https://referestates.com/"
        jsonLd={homeJsonLd}
        keywords={[
          "Saudi Real Estate",
          "Al Rehab Center Jeddah",
          "Jeddah Off Plan Property",
          "Riyadh Luxury Real Estate",
          "Tamleek Al Nahdi",
          "Wafi Escrow Saudi Arabia",
          "Saudi Property Investment"
        ]}
      />

      {/* 1. Hero Section with Clear H1 & Strong CTAs */}
      <section id="home" className="relative h-screen min-h-[620px] flex items-center justify-center pt-20 overflow-hidden scroll-mt-20">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="REFERESTATES - Saudi Arabia Luxury Real Estate and Visionary Developments" 
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/50 to-secondary/30"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center mt-16 sm:mt-20">
          
          {/* Semantic H1 Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display font-bold text-4xl sm:text-6xl md:text-7xl text-cream mb-6 uppercase tracking-tight whitespace-pre-line leading-none"
          >
            {content.hero_heading || 'A New Era of \nLuxury Real Estate.'}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-cream/90 max-w-2xl mx-auto mb-10 font-body leading-relaxed"
          >
            {content.hero_subtitle || 'Discover exceptional properties, off-plan investment centers, and visionary developments across Riyadh, Jeddah, and Saudi Arabia.'}
          </motion.p>

          {/* Strong Primary CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link 
              to="/projects" 
              className="bg-primary text-cream font-display font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-primary-dark transition-all duration-200 w-full sm:w-auto text-center shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2"
            >
              <span>{content.hero_cta || 'Explore Projects'}</span>
              <ArrowRight size={16} />
            </Link>

            <a 
              href="https://wa.me/966536609534?text=Hello%20REFERESTATES,%20I%20would%20like%20to%20consult%20with%20an%20advisor." 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('hero_cta')}
              className="bg-cream text-secondary font-display font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-cream/90 transition-all duration-200 w-full sm:w-auto text-center shadow-lg"
            >
              Consult an Advisor
            </a>
          </motion.div>

        </div>
      </section>

      {/* 2. Hero Quick Discovery Filter */}
      <section className="bg-surface py-12 border-b border-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <h2 className="font-display font-semibold text-lg text-secondary uppercase tracking-widest whitespace-nowrap">Find Properties By Category</h2>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <select 
                aria-label="Filter by Property Type"
                className="bg-transparent border-b-2 border-secondary/20 text-secondary font-display font-semibold uppercase tracking-wider py-2 focus:outline-none focus:border-primary w-full md:w-48 cursor-pointer"
              >
                <option value="all">All Properties</option>
                <option value="commercial">Commercial & Retail</option>
                <option value="residential">Luxury Residential</option>
                <option value="off-plan">Off-Plan Developments</option>
              </select>
              <select 
                aria-label="Filter by City"
                className="bg-transparent border-b-2 border-secondary/20 text-secondary font-display font-semibold uppercase tracking-wider py-2 focus:outline-none focus:border-primary w-full md:w-48 cursor-pointer"
              >
                <option value="all">All Cities</option>
                <option value="jeddah">Jeddah</option>
                <option value="riyadh">Riyadh</option>
                <option value="makkah">Makkah</option>
                <option value="madinah">Madinah</option>
              </select>
              <Link to="/projects" className="hidden md:flex items-center text-primary hover:text-primary-dark transition-colors p-2" aria-label="Search properties">
                <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Brand Introduction */}
      <section id="about" className="py-24 md:py-32 bg-cream scroll-mt-20 border-b border-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 text-primary font-display font-bold text-xs uppercase tracking-[0.2em] mb-4">
                <Building2 size={14} />
                <span>Saudi Luxury Property Advisory</span>
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-secondary mb-8 leading-tight whitespace-pre-line">
                {content.about_heading || 'Real Estate.\nReimagined for\nSaudi Arabia.'}
              </h2>
              <p className="text-secondary/80 text-lg leading-relaxed mb-8 max-w-lg whitespace-pre-line font-body">
                {content.about_text || 'REFERESTATES connects clients with selected real-estate projects and opportunities across Saudi Arabia. We provide personal guidance and curate exceptional properties for discerning local and international buyers.'}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/projects/al-rehab-center" className="inline-flex items-center text-primary font-display font-bold text-xs tracking-widest uppercase hover:text-primary-dark transition-colors">
                  <span className="border-b border-primary/30 hover:border-primary-dark pb-1">Explore AL REHAB CENTER</span>
                  <ArrowRight size={16} className="ml-2" />
                </Link>
                <span className="text-secondary/30">•</span>
                <Link to="/projects" className="inline-flex items-center text-secondary font-display font-bold text-xs tracking-widest uppercase hover:text-primary transition-colors">
                  <span className="border-b border-secondary/30 hover:border-primary pb-1">Full Portfolio</span>
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[3/4] md:aspect-square bg-surface overflow-hidden border border-secondary/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Modern Architecture in Saudi Arabia - Curated by REFERESTATES" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Featured Projects Gallery */}
      <section id="projects" className="py-24 bg-surface scroll-mt-20 border-b border-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-primary font-display font-bold text-xs uppercase tracking-[0.2em] mb-3">
                <MapPin size={14} />
                <span>Prime Off-Plan & Ready Portfolio</span>
              </div>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-secondary">Curated Saudi Developments</h2>
              <p className="text-secondary/70 text-base md:text-lg mt-2 font-body">
                Discover carefully verified mixed-use, residential, and commercial developments across Riyadh and Jeddah.
              </p>
            </div>
            <Link to="/projects" className="inline-flex items-center text-primary font-display font-bold text-xs tracking-widest uppercase hover:text-primary-dark transition-colors">
              <span className="border-b border-primary/30 pb-1">View Full Directory</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. International Buyers & Global Advisory */}
      <section className="py-24 md:py-32 bg-secondary text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1541888081682-1d5427387cc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cream/10 border border-cream/20 text-primary font-display font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
            <span>Global Investor Desk</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-6 max-w-3xl mx-auto whitespace-pre-line tracking-tight">
            {content.international_heading || 'Looking to Buy Property in Saudi Arabia From Abroad?'}
          </h2>
          <p className="text-cream/80 text-base md:text-lg max-w-2xl mx-auto mb-12 whitespace-pre-line font-body leading-relaxed">
            {content.international_text || 'REFERESTATES helps international buyers discover suitable properties and projects in Saudi Arabia through a simple, guided experience.'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 text-left">
            <div className="border-l border-cream/20 pl-6">
              <h3 className="font-display font-bold uppercase tracking-wider text-sm mb-2 text-cream">Discover Opportunities</h3>
              <p className="text-cream/70 text-xs font-body leading-relaxed">Access verified off-plan developments with clear pricing, construction milestones, and high projected rental yields.</p>
            </div>
            <div className="border-l border-cream/20 pl-6">
              <h3 className="font-display font-bold uppercase tracking-wider text-sm mb-2 text-cream">Foreign Ownership Directives</h3>
              <p className="text-cream/70 text-xs font-body leading-relaxed">Navigate Saudi real estate regulations, REGA compliance, and title deed registration with dedicated bilingual advisors.</p>
            </div>
            <div className="border-l border-cream/20 pl-6">
              <h3 className="font-display font-bold uppercase tracking-wider text-sm mb-2 text-cream">Escrow Fund Safety</h3>
              <p className="text-cream/70 text-xs font-body leading-relaxed">All payments held in regulated Wafi bank escrow accounts released only upon certified construction audit milestones.</p>
            </div>
          </div>

          <a 
            href="https://wa.me/966536609534?text=Hello%20REFERESTATES,%20I%20am%20an%20international%20buyer%20interested%20in%20Saudi%20real%20estate." 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => trackWhatsAppClick('international_section')}
            className="inline-block bg-primary text-cream font-display font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-primary-dark transition-colors shadow-lg"
          >
            Speak With an International Advisor
          </a>
        </div>
      </section>

      {/* 7. Final Call to Action (#2) */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-secondary/85"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-cream mb-6 whitespace-pre-line tracking-tight">
            {content.final_cta_heading || 'Your Next Property Could Start With One Conversation.'}
          </h2>
          <p className="text-cream/80 text-base md:text-lg mb-10 max-w-2xl mx-auto whitespace-pre-line font-body">
            {content.final_cta_text || 'Tell REFERESTATES what you\'re looking for, and we\'ll help you explore the right opportunities.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="/#contact" className="bg-primary text-cream font-display font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-primary-dark transition-colors w-full sm:w-auto shadow-lg">
              Inquire Online
            </a>
            <a 
              href="https://wa.me/966536609534" 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('final_cta_section')}
              className="bg-transparent border border-cream/50 text-cream font-display font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-cream hover:text-secondary transition-colors w-full sm:w-auto"
            >
              WhatsApp REFERESTATES
            </a>
          </div>
        </div>
      </section>

      {/* 10. Contact Form Section */}
      <Contact />
    </div>
  );
}
