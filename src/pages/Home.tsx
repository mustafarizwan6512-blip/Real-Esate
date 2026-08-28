import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { fetchProjects, fetchWebsiteContent } from '../api';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import Contact from './Contact';
import heroImage from '../assets/images/regenerated_image_1787896302535.jpg';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [content, setContent] = useState<Record<string, string>>({
    hero_heading: 'A NEW ERA OF LUXURY REAL ESTATE',
    hero_subtitle: 'Discover exclusive properties, premium developments, and unparalleled coastal living in Saudi Arabia.',
    hero_cta: 'Explore Properties',
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

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center pt-20 overflow-hidden scroll-mt-20">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Saudi Arabia Luxury Real Estate" 
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display font-bold text-5xl md:text-7xl text-cream mb-6 uppercase tracking-tight whitespace-pre-line"
          >
            {content.hero_heading || 'Find Your Place in \nSaudi Arabia.'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-lg md:text-xl text-cream/90 max-w-2xl mx-auto mb-10 whitespace-pre-line"
          >
            {content.hero_subtitle || 'Discover exceptional properties and visionary projects across Saudi Arabia with REFERESTATES.'}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a href="/#projects" className="bg-primary text-cream font-display font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-primary-dark transition-colors w-full sm:w-auto text-center">
              {content.hero_cta || 'Explore Projects'}
            </a>
            <a href="/#contact" className="bg-transparent border border-cream/50 text-cream font-display font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-cream hover:text-secondary transition-colors w-full sm:w-auto text-center">
              Find My Property
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. Hero Discovery */}
      <section className="bg-surface py-12 border-b border-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <h3 className="font-display font-semibold text-lg text-secondary uppercase tracking-widest whitespace-nowrap">What are you looking for?</h3>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <select className="bg-transparent border-b-2 border-secondary/20 text-secondary font-display font-semibold uppercase tracking-wider py-2 focus:outline-none focus:border-primary w-full md:w-48 appearance-none cursor-pointer">
                <option value="buy">Buy a Home</option>
                <option value="invest">Investment</option>
                <option value="explore">Explore Projects</option>
              </select>
              <select className="bg-transparent border-b-2 border-secondary/20 text-secondary font-display font-semibold uppercase tracking-wider py-2 focus:outline-none focus:border-primary w-full md:w-48 appearance-none cursor-pointer">
                <option value="riyadh">Riyadh</option>
                <option value="jeddah">Jeddah</option>
                <option value="makkah">Makkah</option>
                <option value="madinah">Madinah</option>
              </select>
              <a href="/#contact" className="hidden md:flex items-center text-primary hover:text-primary-dark transition-colors p-2">
                <ArrowRight size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Brand Introduction */}
      <section id="about" className="py-24 md:py-32 bg-cream scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display font-bold text-4xl md:text-5xl text-secondary mb-8 leading-tight whitespace-pre-line">
                {content.about_heading || 'Real Estate.\nReimagined for\nSaudi Arabia.'}
              </h2>
              <p className="text-secondary/80 text-lg leading-relaxed mb-8 max-w-lg whitespace-pre-line">
                {content.about_text || 'REFERESTATES connects clients with selected real-estate projects and opportunities across Saudi Arabia. We provide personal guidance and curate exceptional properties for discerning local and international buyers.'}
              </p>
              <Link to="/about" className="inline-flex items-center text-primary font-display font-bold text-xs tracking-widest uppercase hover:text-primary-dark transition-colors">
                <span className="border-b border-primary/30 hover:border-primary-dark pb-1">Discover Our Approach</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[3/4] md:aspect-square bg-surface overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Modern Saudi Architecture" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Featured Projects */}
      <section id="projects" className="py-24 bg-surface scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-secondary mb-4">Explore Selected Projects</h2>
              <p className="text-secondary/80 text-lg">Discover carefully selected developments across Saudi Arabia.</p>
            </div>
            <Link to="/projects" className="inline-flex items-center text-primary font-display font-bold text-xs tracking-widest uppercase hover:text-primary-dark transition-colors">
              <span className="border-b border-primary/30 pb-1">View All Projects</span>
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

      {/* 5. International Buyers */}
      <section className="py-24 md:py-32 bg-secondary text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1541888081682-1d5427387cc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-6 max-w-3xl mx-auto whitespace-pre-line">
            {content.international_heading || 'Looking to Buy Property in Saudi Arabia From Abroad?'}
          </h2>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto mb-12 whitespace-pre-line">
            {content.international_text || 'REFERESTATES helps international buyers discover suitable properties and projects in Saudi Arabia through a simple, guided experience.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12 text-left">
            <div className="border-l border-cream/20 pl-6">
              <h4 className="font-display font-bold uppercase tracking-wider text-sm mb-2">Discover</h4>
              <p className="text-cream/60 text-sm">Discover suitable projects and explore unique opportunities.</p>
            </div>
            <div className="border-l border-cream/20 pl-6">
              <h4 className="font-display font-bold uppercase tracking-wider text-sm mb-2">Understand</h4>
              <p className="text-cream/60 text-sm">Understand locations and check current availability.</p>
            </div>
            <div className="border-l border-cream/20 pl-6">
              <h4 className="font-display font-bold uppercase tracking-wider text-sm mb-2">Connect</h4>
              <p className="text-cream/60 text-sm">Receive personal guidance directly with REFERESTATES.</p>
            </div>
          </div>
          <a href="https://wa.me/966536609534" className="inline-block bg-primary text-cream font-display font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-primary-dark transition-colors">
            Speak With an Advisor
          </a>
        </div>
      </section>

      {/* 6. Why Us & How It Works (Combined for elegance) */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* How It Works */}
            <div>
              <h2 className="font-display font-bold text-3xl text-secondary mb-12">How It Works</h2>
              <div className="space-y-12 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-secondary/20 before:to-transparent">
                {[
                  { step: "01", title: "Tell Us What You Need", desc: "Share your location, property preferences and requirements." },
                  { step: "02", title: "Explore Suitable Options", desc: "REFERESTATES identifies relevant projects and opportunities." },
                  { step: "03", title: "Compare & Decide", desc: "Our team helps you understand the options available." },
                  { step: "04", title: "Move Forward", desc: "Connect with REFERESTATES and proceed with confidence." }
                ].map((item, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-secondary bg-cream text-secondary font-display font-bold text-xs z-10 shrink-0 group-hover:bg-primary group-hover:text-cream group-hover:border-primary transition-colors">
                      {item.step}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] ml-4 md:ml-0 p-6 bg-surface border border-secondary/10 group-hover:border-primary/30 transition-colors">
                      <h3 className="font-display font-bold text-secondary mb-2">{item.title}</h3>
                      <p className="text-secondary/70 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Why Us */}
            <div>
              <h2 className="font-display font-bold text-3xl text-secondary mb-12">Why REFERESTATES?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Saudi Arabia Focused", desc: "Focused purely on the Saudi real-estate market." },
                  { title: "Curated Opportunities", desc: "Discover selected projects and prime opportunities." },
                  { title: "Local & International", desc: "Serving buyers in Saudi Arabia and internationally." },
                  { title: "Personal Guidance", desc: "Get assistance based on your actual requirements." },
                  { title: "Clear Information", desc: "Understand projects without overwhelming data overload." },
                  { title: "Modern Experience", desc: "A simple and modern way to discover Saudi real estate." }
                ].map((item, i) => (
                  <div key={i} className="border-t border-secondary/20 pt-6">
                    <h4 className="font-display font-bold text-secondary mb-2">{item.title}</h4>
                    <p className="text-secondary/70 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-secondary/80"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-cream mb-6 whitespace-pre-line">
            {content.final_cta_heading || 'Your Next Property Could Start With One Conversation.'}
          </h2>
          <p className="text-cream/80 text-lg mb-10 max-w-2xl mx-auto whitespace-pre-line">
            {content.final_cta_text || 'Tell REFERESTATES what you\'re looking for, and we\'ll help you explore the right opportunities.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="/#contact" className="bg-primary text-cream font-display font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-primary-dark transition-colors w-full sm:w-auto">
              Find My Property
            </a>
            <a href="https://wa.me/966536609534" className="bg-transparent border border-cream/50 text-cream font-display font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-cream hover:text-secondary transition-colors w-full sm:w-auto">
              WhatsApp REFERESTATES
            </a>
          </div>
        </div>
      </section>

      {/* 8. Contact Form (Embedded) */}
      <Contact />
    </div>
  );
}
