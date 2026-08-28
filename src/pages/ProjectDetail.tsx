import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  fetchProject, 
  fetchRelatedProjects, 
  submitLead, 
  fetchGeneralSettings 
} from '../api';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { trackWhatsAppClick, trackLeadSubmission, trackPhoneClick, trackBrochureDownload } from '../utils/analytics';
import { 
  MapPin, 
  Building2, 
  Calendar, 
  DollarSign, 
  Maximize2, 
  Compass, 
  FileText, 
  Share2, 
  MessageSquare, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  ZoomIn, 
  Eye, 
  Car, 
  Trees, 
  Waves, 
  Dumbbell, 
  Coffee, 
  ShoppingBag, 
  Navigation, 
  Award, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2,
  Layers,
  Bed,
  Bath,
  KeyRound,
  ArrowUpRight
} from 'lucide-react';

// Helper to pick appropriate icon for dynamic names
function renderDynamicIcon(iconName?: string, className: string = "w-5 h-5") {
  const name = (iconName || '').toLowerCase();
  if (name.includes('pool') || name.includes('water') || name.includes('waves')) return <Waves className={className} />;
  if (name.includes('gym') || name.includes('fitness') || name.includes('dumbbell')) return <Dumbbell className={className} />;
  if (name.includes('tree') || name.includes('garden') || name.includes('park') || name.includes('nature')) return <Trees className={className} />;
  if (name.includes('car') || name.includes('park') || name.includes('garage')) return <Car className={className} />;
  if (name.includes('shield') || name.includes('security') || name.includes('safe')) return <ShieldCheck className={className} />;
  if (name.includes('coffee') || name.includes('lounge') || name.includes('cafe')) return <Coffee className={className} />;
  if (name.includes('shop') || name.includes('retail') || name.includes('store')) return <ShoppingBag className={className} />;
  if (name.includes('compass') || name.includes('location') || name.includes('map')) return <Compass className={className} />;
  if (name.includes('sparkle') || name.includes('smart') || name.includes('tech')) return <Sparkles className={className} />;
  if (name.includes('award') || name.includes('concierge') || name.includes('vip')) return <Award className={className} />;
  if (name.includes('heart') || name.includes('play') || name.includes('child')) return <Heart className={className} />;
  if (name.includes('bed')) return <Bed className={className} />;
  if (name.includes('bath')) return <Bath className={className} />;
  if (name.includes('key')) return <KeyRound className={className} />;
  if (name.includes('layer') || name.includes('floor')) return <Layers className={className} />;
  if (name.includes('dollar') || name.includes('price')) return <DollarSign className={className} />;
  return <Building2 className={className} />;
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contactSettings, setContactSettings] = useState({ whatsapp: '966536609534', phone: '+966 53 660 9534', email: 'info@referestates.com' });

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Form State
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    country: 'Saudi Arabia',
    preferred_contact: 'WhatsApp',
    purpose: 'Investment',
    budget: '',
    bedrooms: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);
      
      // Fetch project details
      fetchProject(id)
        .then(data => {
          setProject(data);
          
          // Update browser SEO title and description
          if (data) {
            document.title = data.seo_title || `${data.name} | REFERESTATES`;
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc && (data.seo_description || data.short_description)) {
              metaDesc.setAttribute('content', data.seo_description || data.short_description || '');
            }
          }

          // Fetch related properties
          fetchRelatedProjects(data.id, data.city, data.category)
            .then(setRelatedProjects)
            .catch(console.error);
        })
        .catch(err => {
          console.error('Error fetching project:', err);
          setError('We could not locate this property. It may have been archived or moved.');
        })
        .finally(() => setLoading(false));
    }

    // Fetch site contact settings
    fetchGeneralSettings().then(setContactSettings).catch(console.error);
  }, [id]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen || !project?.images?.length) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setActiveImageIndex((prev) => (prev + 1) % project.images.length);
      if (e.key === 'ArrowLeft') setActiveImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, project?.images]);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.name,
          text: `Explore ${project?.name} in ${project?.city} on REFERESTATES`,
          url: window.location.href
        });
      } catch (e) {
        // Share cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    setSubmitting(true);

    try {
      await submitLead({
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        whatsapp: formState.phone,
        country: formState.country,
        city: project.city,
        property_id: project.id,
        property_name: project.name,
        propertyType: project.category,
        purpose: formState.purpose,
        budget: formState.budget,
        bedrooms: formState.bedrooms || project.bedrooms,
        preferred_contact: formState.preferred_contact,
        message: formState.message || `Inquiring about ${project.name} in ${project.city}.`,
        source: 'Property Page'
      });

      setSubmitSuccess(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        country: 'Saudi Arabia',
        preferred_contact: 'WhatsApp',
        purpose: 'Investment',
        budget: '',
        bedrooms: '',
        message: ''
      });
    } catch (err) {
      console.error('Submission error:', err);
      alert('Unable to submit inquiry at this moment. Please reach out via WhatsApp for immediate assistance.');
    } finally {
      setSubmitting(false);
    }
  };

  const formattedPrice = useMemo(() => {
    if (!project?.starting_price) return null;
    return new Intl.NumberFormat('en-SA', {
      style: 'currency',
      currency: project.currency || 'SAR',
      maximumFractionDigits: 0
    }).format(project.starting_price);
  }, [project?.starting_price, project?.currency]);

  const whatsappUrl = useMemo(() => {
    if (!project) return `https://wa.me/${contactSettings.whatsapp}`;
    const text = encodeURIComponent(`Hello REFERESTATES, I'm interested in ${project.name} in ${project.city}. I would like to receive more information.`);
    return `https://wa.me/${contactSettings.whatsapp}?text=${text}`;
  }, [project, contactSettings.whatsapp]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream text-secondary flex flex-col items-center justify-center pt-24">
        <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
        <p className="font-display font-bold text-xs uppercase tracking-[0.2em] text-primary">
          Loading Project Details
        </p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-cream text-secondary flex flex-col items-center justify-center px-4 pt-24 text-center">
        <div className="max-w-md space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-surface border border-secondary/10 flex items-center justify-center text-primary">
            <Building2 size={28} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-secondary uppercase">Project Not Found</h1>
          <p className="text-sm text-secondary/70 leading-relaxed font-body">
            {error || "The requested development is currently not accessible or may have been moved."}
          </p>
          <div className="pt-2">
            <Link 
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-cream font-display font-bold text-xs uppercase tracking-[0.15em] transition-colors"
            >
              <ArrowRight size={14} className="rotate-180" />
              <span>Explore Selected Projects</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": project.name,
    "description": project.short_description || project.description,
    "image": project.hero_image_url || project.images[0] || "/al-rehab-center.webp",
    "url": typeof window !== 'undefined' ? window.location.href : `https://referestates.com/projects/${project.slug || project.id}`,
    "offers": {
      "@type": "Offer",
      "price": project.starting_price || 390000,
      "priceCurrency": project.currency || "SAR",
      "availability": project.status === 'Sold Out' ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      "validFrom": "2026-01-01"
    },
    "containedInPlace": {
      "@type": "Place",
      "name": project.location || project.city,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": project.city,
        "addressCountry": "SA"
      }
    }
  };

  return (
    <div className="w-full bg-cream text-secondary">
      <SEO 
        title={`${project.name} | ${project.city} Real Estate | REFERESTATES`}
        description={project.seo_description || project.short_description || `${project.name} in ${project.city}. Starting price ${formattedPrice || 'SAR 390k'}. Discover specifications, floor plans, and Wafi escrow details with REFERESTATES.`}
        image={project.hero_image_url || project.images[0]}
        canonical={`https://referestates.com/projects/${project.slug || project.id}`}
        jsonLd={projectJsonLd}
        keywords={[
          project.name,
          `${project.name} ${project.city}`,
          project.developer || "Saudi Real Estate",
          "Saudi Off Plan",
          "Wafi Escrow Protection",
          "Jeddah Luxury Property"
        ]}
      />

      {/* =========================================================================
          1. CINEMATIC HERO SECTION
          ========================================================================= */}
      <section className="relative min-h-[85vh] flex flex-col justify-between pt-28 pb-12 overflow-hidden">
        {/* Background Image & Video Layers */}
        <div className="absolute inset-0 z-0">
          <img 
            src={project.hero_image_url || project.images[0]} 
            alt={`${project.name} - ${project.category || 'Luxury Property'} in ${project.city}, Saudi Arabia`}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          {/* Brand Gradient matching Home hero */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/60 to-secondary/30" />
        </div>

        {/* Top Floating Badge Bar & Breadcrumbs */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col sm:flex-row sm:items-center justify-between pt-4 gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <Link to="/projects" className="text-cream/70 hover:text-cream text-xs font-display uppercase tracking-wider transition-colors">
              ← All Projects
            </Link>
            <span className="text-cream/30 text-xs">/</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-cream font-display font-bold text-[10px] uppercase tracking-[0.15em]">
              <span className="w-1.5 h-1.5 rounded-full bg-cream animate-pulse" />
              {project.status || 'Under Construction'}
            </span>
            <span className="hidden sm:inline-block text-cream/40 text-xs">|</span>
            <span className="hidden sm:inline-block text-cream/80 text-xs font-display font-semibold tracking-wider uppercase">
              REFERESTATES Curated Project
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleShare}
              className="p-2.5 bg-secondary/80 backdrop-blur-md border border-cream/20 text-cream hover:text-primary hover:border-primary transition-colors flex items-center gap-1.5 text-xs font-display"
              title="Share Project"
            >
              <Share2 size={15} />
              <span className="hidden sm:inline">Share</span>
            </button>
            {copiedLink && (
              <span className="text-[11px] bg-primary text-cream font-display font-bold px-3 py-1 shadow-lg">
                Link Copied
              </span>
            )}
          </div>
        </div>

        {/* Center Hero Editorial Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12">
          <div className="max-w-3xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 text-primary font-display font-bold text-xs sm:text-sm tracking-[0.2em] uppercase"
            >
              <MapPin size={15} className="text-primary" />
              <span className="text-cream/90">{project.location || project.city}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-6xl md:text-7xl text-cream mb-4 uppercase tracking-tight leading-[1.08]"
            >
              {project.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-cream/90 font-body leading-relaxed max-w-2xl"
            >
              {project.short_description || project.description?.substring(0, 180)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <a
                href="#inquire"
                className="bg-primary text-cream font-display font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-lg"
              >
                <span>Inquire About Project</span>
                <ArrowRight size={14} />
              </a>

              <a
                href="#overview"
                className="bg-transparent border border-cream/50 text-cream font-display font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-cream hover:text-secondary transition-colors flex items-center gap-2"
              >
                <span>View Details & Specs</span>
                <ChevronRight size={14} className="text-primary" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Hero Quick Specs Bar */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 bg-surface border border-secondary/10 shadow-xl">
            {/* Spec 1: Price */}
            <div className="space-y-1 border-r border-secondary/10 pr-3 sm:pr-4 last:border-0">
              <span className="block text-[10px] font-display font-bold uppercase tracking-[0.2em] text-primary">Starting Price</span>
              <p className="text-xs sm:text-sm md:text-base font-display font-bold text-secondary break-words">
                {formattedPrice ? formattedPrice : 'Price on Inquiry'}
              </p>
            </div>

            {/* Spec 2: Type */}
            <div className="space-y-1 border-r border-secondary/10 pr-3 sm:pr-4 last:border-0">
              <span className="block text-[10px] font-display font-bold uppercase tracking-[0.2em] text-primary">Property Type</span>
              <p className="text-[11px] sm:text-xs md:text-sm font-display font-bold text-secondary break-words leading-snug">
                {project.category || project.property_type || 'Residential'}
              </p>
            </div>

            {/* Spec 3: Status */}
            <div className="space-y-1 border-r border-secondary/10 pr-3 sm:pr-4 last:border-0">
              <span className="block text-[10px] font-display font-bold uppercase tracking-[0.2em] text-primary">Status</span>
              <p className="text-xs sm:text-sm md:text-base font-display font-bold text-secondary break-words">
                {project.status || 'Under Construction'}
              </p>
            </div>

            {/* Spec 4: Location */}
            <div className="space-y-1">
              <span className="block text-[10px] font-display font-bold uppercase tracking-[0.2em] text-primary">Location</span>
              <p className="text-xs sm:text-sm md:text-base font-display font-bold text-secondary break-words">
                {project.location || (project.district ? `${project.district}, ${project.city}` : project.city)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. PROJECT OVERVIEW (Brand Editorial Layout)
          ========================================================================= */}
      <section id="overview" className="py-24 sm:py-32 bg-cream border-b border-secondary/10 relative scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-primary font-display font-bold text-xs uppercase tracking-[0.2em]">
                <div className="w-8 h-[2px] bg-primary" />
                <span>Project Narrative</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-secondary uppercase tracking-tight leading-tight">
                Designed for the way you want to live.
              </h2>
              {project.developer && (
                <p className="text-xs uppercase tracking-wider text-secondary/60 pt-2 font-display font-semibold">
                  Developed by <span className="text-primary font-bold">{project.developer}</span>
                </p>
              )}
            </div>

            <div className="lg:col-span-7 space-y-6 text-secondary/80 text-base sm:text-lg leading-relaxed font-body">
              <p>{project.description}</p>
              {project.notes && !project.notes.startsWith('{') && (
                <p className="text-sm text-secondary/70 italic border-l-2 border-primary/40 pl-4 py-1">
                  {project.notes}
                </p>
              )}
            </div>
          </div>

          {/* Quick Specifications Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {project.location && (
              <div className="p-5 bg-surface border border-secondary/10 hover:border-primary/40 transition-colors">
                <Compass className="w-5 h-5 text-primary mb-3" />
                <span className="block text-[10px] uppercase font-display font-bold tracking-widest text-secondary/60">Location</span>
                <p className="text-sm font-display font-semibold text-secondary mt-1 truncate">{project.location}</p>
              </div>
            )}

            {project.category && (
              <div className="p-5 bg-surface border border-secondary/10 hover:border-primary/40 transition-colors">
                <Building2 className="w-5 h-5 text-primary mb-3" />
                <span className="block text-[10px] uppercase font-display font-bold tracking-widest text-secondary/60">Type</span>
                <p className="text-sm font-display font-semibold text-secondary mt-1 truncate">{project.category}</p>
              </div>
            )}

            {project.size && (
              <div className="p-5 bg-surface border border-secondary/10 hover:border-primary/40 transition-colors">
                <Maximize2 className="w-5 h-5 text-primary mb-3" />
                <span className="block text-[10px] uppercase font-display font-bold tracking-widest text-secondary/60">Area / Size</span>
                <p className="text-sm font-display font-semibold text-secondary mt-1 truncate">{project.size}</p>
              </div>
            )}

            {project.bedrooms && (
              <div className="p-5 bg-surface border border-secondary/10 hover:border-primary/40 transition-colors">
                <Bed className="w-5 h-5 text-primary mb-3" />
                <span className="block text-[10px] uppercase font-display font-bold tracking-widest text-secondary/60">Bedrooms</span>
                <p className="text-sm font-display font-semibold text-secondary mt-1 truncate">{project.bedrooms}</p>
              </div>
            )}

            {project.handover_date && (
              <div className="p-5 bg-surface border border-secondary/10 hover:border-primary/40 transition-colors">
                <Calendar className="w-5 h-5 text-primary mb-3" />
                <span className="block text-[10px] uppercase font-display font-bold tracking-widest text-secondary/60">Handover</span>
                <p className="text-sm font-display font-semibold text-secondary mt-1 truncate">{project.handover_date}</p>
              </div>
            )}

            {project.status && (
              <div className="p-5 bg-surface border border-secondary/10 hover:border-primary/40 transition-colors">
                <Sparkles className="w-5 h-5 text-primary mb-3" />
                <span className="block text-[10px] uppercase font-display font-bold tracking-widest text-secondary/60">Availability</span>
                <p className="text-sm font-display font-semibold text-secondary mt-1 truncate">{project.status}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. KEY HIGHLIGHTS
          ========================================================================= */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="py-24 bg-surface border-b border-secondary/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 text-primary font-display font-bold text-xs uppercase tracking-[0.2em]">
                <Sparkles size={14} />
                <span>Distinguished Attributes</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary uppercase">
                Key Project Highlights
              </h2>
              <p className="text-sm text-secondary/70 font-body">
                Carefully engineered architectural elements and strategic advantages that set this development apart.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.highlights.map((h, index) => {
                const isObj = typeof h === 'object';
                const title = isObj ? h.title : h;
                const desc = isObj ? h.description : 'Exceptional craftsmanship tailored for contemporary Saudi living.';
                const icon = isObj ? h.icon : undefined;

                return (
                  <div
                    key={index}
                    className="p-8 bg-cream border border-secondary/10 hover:border-primary/30 transition-all duration-300 group hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                      {renderDynamicIcon(icon || title, "w-6 h-6 text-primary")}
                    </div>
                    <h3 className="font-display font-bold text-lg text-secondary mb-2 group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-secondary/70 leading-relaxed font-body">
                      {desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          4. CINEMATIC GALLERY & FULLSCREEN LIGHTBOX
          ========================================================================= */}
      {project.images && project.images.length > 0 && (
        <section id="gallery" className="py-24 bg-cream border-b border-secondary/10 relative scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-display font-bold text-xs uppercase tracking-[0.2em]">
                  <Eye size={14} />
                  <span>Visual Showcase</span>
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary uppercase">
                  Architectural & Interior Gallery
                </h2>
              </div>
              <p className="text-xs uppercase tracking-wider text-secondary/60 font-display font-semibold">
                Click any image to view in fullscreen mode ({project.images.length} Photos)
              </p>
            </div>

            {/* Masonry-Style Curated Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Primary Large Feature Photo */}
              <div 
                onClick={() => openLightbox(0)}
                className="md:col-span-8 group relative aspect-[16/10] overflow-hidden cursor-pointer bg-surface border border-secondary/10"
              >
                <img
                  src={project.images[0]}
                  alt={`${project.name} - View 1`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs uppercase tracking-widest text-cream font-display font-bold">Primary Exterior & Facade</span>
                    <span className="p-2 bg-cream text-secondary">
                      <ZoomIn size={16} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Side Stack 1 */}
              {project.images[1] && (
                <div 
                  onClick={() => openLightbox(1)}
                  className="md:col-span-4 group relative aspect-[4/3] md:aspect-auto overflow-hidden cursor-pointer bg-surface border border-secondary/10"
                >
                  <img
                    src={project.images[1]}
                    alt={`${project.name} - View 2`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-xs uppercase tracking-widest text-cream font-display font-bold">Curated Living Spaces</span>
                  </div>
                </div>
              )}

              {/* Bottom Row Images */}
              {project.images.slice(2, 6).map((img, idx) => (
                <div
                  key={idx + 2}
                  onClick={() => openLightbox(idx + 2)}
                  className="md:col-span-3 group relative aspect-[4/3] overflow-hidden cursor-pointer bg-surface border border-secondary/10"
                >
                  <img
                    src={img}
                    alt={`${project.name} - View ${idx + 3}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 bg-secondary/80 text-cream">
                      <ZoomIn size={18} />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* View Full Gallery Trigger if more than 6 photos */}
            {project.images.length > 6 && (
              <div className="text-center pt-8">
                <button
                  onClick={() => openLightbox(0)}
                  className="px-8 py-4 bg-surface hover:bg-secondary hover:text-cream border border-secondary/20 text-secondary font-display font-bold text-xs uppercase tracking-[0.15em] transition-colors"
                >
                  View All {project.images.length} High-Resolution Photographs
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          LIGHTBOX MODAL
          ========================================================================= */}
      <AnimatePresence>
        {lightboxOpen && project.images && project.images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-secondary/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Lightbox Top Header */}
            <div className="flex items-center justify-between text-cream w-full z-10">
              <div className="space-y-0.5">
                <h4 className="text-sm font-display font-bold uppercase tracking-wider text-primary">{project.name}</h4>
                <p className="text-[11px] text-cream/70 tracking-wider font-display">
                  Photo {activeImageIndex + 1} of {project.images.length}
                </p>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-3 text-cream/80 hover:text-cream bg-cream/10 hover:bg-cream/20 transition-colors"
                title="Close Lightbox (Esc)"
              >
                <X size={20} />
              </button>
            </div>

            {/* Center Main Lightbox Stage */}
            <div className="relative flex items-center justify-center flex-1 my-4 overflow-hidden">
              <button
                onClick={() => setActiveImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)}
                className="absolute left-2 sm:left-6 z-20 p-3 bg-secondary/80 hover:bg-primary text-cream border border-cream/20 transition-all hover:scale-110"
                title="Previous Image"
              >
                <ChevronLeft size={24} />
              </button>

              <motion.img
                key={activeImageIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                src={project.images[activeImageIndex]}
                alt={`${project.name} preview`}
                className="max-h-[78vh] max-w-[92vw] object-contain shadow-2xl"
                referrerPolicy="no-referrer"
              />

              <button
                onClick={() => setActiveImageIndex((prev) => (prev + 1) % project.images.length)}
                className="absolute right-2 sm:right-6 z-20 p-3 bg-secondary/80 hover:bg-primary text-cream border border-cream/20 transition-all hover:scale-110"
                title="Next Image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Lightbox Bottom Thumbnails Strip */}
            <div className="flex justify-center gap-2 overflow-x-auto py-2 max-w-4xl mx-auto scrollbar-thin">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-14 h-10 sm:w-18 sm:h-12 flex-shrink-0 overflow-hidden border-2 transition-all ${
                    i === activeImageIndex ? 'border-primary scale-105 opacity-100' : 'border-transparent opacity-40 hover:opacity-80'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          5. PROPERTY SPECIFICATIONS & UNIT CONFIGURATIONS
          ========================================================================= */}
      <section className="py-24 bg-surface border-b border-secondary/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 text-primary font-display font-bold text-xs uppercase tracking-[0.2em]">
                <FileText size={14} />
                <span>Technical Specifications</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary uppercase">
                Detailed Property Specs
              </h2>
              <p className="text-sm text-secondary/70 leading-relaxed font-body">
                Comprehensive data covering room configurations, built-up area metrics, furnishing specifications, and master developer details.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-cream border border-secondary/10 divide-y divide-secondary/10">
                {project.bedrooms && (
                  <div className="flex items-center justify-between p-5">
                    <span className="text-xs uppercase tracking-wider text-secondary/60 font-display font-bold flex items-center gap-2">
                      <Bed size={15} className="text-primary" />
                      <span>Bedrooms / Units</span>
                    </span>
                    <span className="text-sm font-display font-bold text-secondary">{project.bedrooms}</span>
                  </div>
                )}

                {project.bathrooms && (
                  <div className="flex items-center justify-between p-5">
                    <span className="text-xs uppercase tracking-wider text-secondary/60 font-display font-bold flex items-center gap-2">
                      <Bath size={15} className="text-primary" />
                      <span>Bathrooms</span>
                    </span>
                    <span className="text-sm font-display font-bold text-secondary">{project.bathrooms}</span>
                  </div>
                )}

                {project.size && (
                  <div className="flex items-center justify-between p-5">
                    <span className="text-xs uppercase tracking-wider text-secondary/60 font-display font-bold flex items-center gap-2">
                      <Maximize2 size={15} className="text-primary" />
                      <span>Built-Up Area (BUA)</span>
                    </span>
                    <span className="text-sm font-display font-bold text-secondary">{project.size}</span>
                  </div>
                )}

                {project.furnished_status && (
                  <div className="flex items-center justify-between p-5">
                    <span className="text-xs uppercase tracking-wider text-secondary/60 font-display font-bold flex items-center gap-2">
                      <Layers size={15} className="text-primary" />
                      <span>Furnishing Specification</span>
                    </span>
                    <span className="text-sm font-display font-bold text-secondary">{project.furnished_status}</span>
                  </div>
                )}

                {project.developer && (
                  <div className="flex items-center justify-between p-5">
                    <span className="text-xs uppercase tracking-wider text-secondary/60 font-display font-bold flex items-center gap-2">
                      <Building2 size={15} className="text-primary" />
                      <span>Developer / Master Builder</span>
                    </span>
                    <span className="text-sm font-display font-bold text-secondary">{project.developer}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CURATED AMENITIES
          ========================================================================= */}
      {project.amenities && project.amenities.length > 0 && (
        <section className="py-24 bg-cream border-b border-secondary/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-2 text-primary font-display font-bold text-xs uppercase tracking-[0.2em]">
                <Award size={14} />
                <span>Lifestyle Privileges</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary uppercase">
                Curated Amenities & Services
              </h2>
              <p className="text-sm text-secondary/70 font-body">
                Residential infrastructure tailored for wellness, security, and refined living.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.amenities.map((a, idx) => {
                const isObj = typeof a === 'object';
                const title = isObj ? a.title : a;
                const desc = isObj ? a.description : undefined;
                const icon = isObj ? a.icon : undefined;

                return (
                  <div
                    key={idx}
                    className="p-6 bg-surface border border-secondary/10 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary mb-4">
                        {renderDynamicIcon(icon || title, "w-5 h-5 text-primary")}
                      </div>
                      <h3 className="font-display font-bold text-secondary text-base mb-1">
                        {title}
                      </h3>
                      {desc && (
                        <p className="text-xs text-secondary/70 leading-relaxed font-body">
                          {desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          7. LOCATION & NEARBY DESTINATIONS
          ========================================================================= */}
      {project.nearby_places && project.nearby_places.length > 0 && (
        <section className="py-24 bg-surface border-b border-secondary/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 space-y-3">
              <div className="flex items-center gap-2 text-primary font-display font-bold text-xs uppercase tracking-[0.2em]">
                <MapPin size={14} />
                <span>Prime Connectivity</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary uppercase">
                Location & Landmarks
              </h2>
              <p className="text-sm text-secondary/70 leading-relaxed font-body">
                Positioned strategically within {project.district ? `${project.district}, ${project.city}` : project.city}, offering effortless transit to essential arterial hubs, financial centers, and premier destinations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.nearby_places.map((place, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-5 bg-cream border border-secondary/10 hover:border-primary/30 transition-colors"
                >
                  <div className="space-y-1">
                    <h4 className="text-sm font-display font-bold text-secondary">{place.name}</h4>
                    <span className="text-[10px] uppercase tracking-wider text-primary font-display font-bold">{place.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-display font-bold text-secondary block">{place.distance}</span>
                    {place.time && <span className="text-[10px] text-secondary/60 block font-body">Approx. {place.time}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          8. WHY THIS PROPERTY (REFERESTATES Advisory Perspective)
          ========================================================================= */}
      {project.why_consider && project.why_consider.length > 0 && (
        <section className="py-24 bg-cream border-b border-secondary/10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16 space-y-3">
              <div className="flex items-center gap-2 text-primary font-display font-bold text-xs uppercase tracking-[0.2em]">
                <ShieldCheck size={14} />
                <span>Advisory Evaluation</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary uppercase">
                Why Consider This Opportunity?
              </h2>
              <p className="text-sm text-secondary/70 leading-relaxed font-body">
                An objective assessment prepared by REFERESTATES to assist private buyers and investors in evaluating qualitative project merits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.why_consider.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-surface border border-secondary/10 hover:border-primary/30 transition-colors space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-secondary text-cream text-xs font-display font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <h3 className="font-display font-bold text-secondary text-base uppercase">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-secondary/70 leading-relaxed font-body pl-11">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          9. REFERESTATES ADVISORY DIFFERENTIATOR (Matching Home Page Banner)
          ========================================================================= */}
      <section className="py-24 bg-secondary text-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-primary font-display font-bold text-xs uppercase tracking-[0.2em]">
                <Award size={14} />
                <span>The REFERESTATES Advantage</span>
              </div>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-cream uppercase">
                Your Property Search, Made Simpler.
              </h3>
              <p className="text-sm text-cream/80 leading-relaxed font-body max-w-2xl">
                REFERESTATES is an independent luxury real estate referral and discovery advisory. We curate exceptional residential and investment assets across the Kingdom and connect you directly with authorized developers and vetted representatives.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-end">
              <a
                href="#inquire"
                className="bg-primary text-cream font-display font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-primary-dark transition-colors text-center"
              >
                Inquire With Advisor
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-cream/50 text-cream font-display font-bold text-xs uppercase tracking-[0.15em] px-8 py-4 hover:bg-cream hover:text-secondary transition-colors flex items-center justify-center gap-2 text-center"
              >
                <MessageSquare size={16} />
                <span>WhatsApp Connect</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. DIRECT LEAD / INQUIRY FORM
          ========================================================================= */}
      <section id="inquire" className="py-24 sm:py-32 bg-surface border-b border-secondary/10 relative scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 text-primary font-display font-bold text-xs uppercase tracking-[0.2em]">
              <FileText size={14} />
              <span>Direct Property Inquiry</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-secondary uppercase">
              Interested in {project.name}?
            </h2>
            <p className="text-sm sm:text-base text-secondary/70 max-w-xl mx-auto font-body">
              Tell us what you are looking for and a dedicated REFERESTATES advisor will provide unit availability, current pricing schedules, and private viewing arrangements.
            </p>
          </div>

          <div className="p-8 sm:p-12 bg-cream border border-secondary/10 shadow-sm relative">
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-16 h-16 bg-primary/10 text-primary mx-auto flex items-center justify-center border border-primary/20">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-2xl text-secondary uppercase">Inquiry Received</h3>
                  <p className="text-sm text-secondary/70 max-w-md mx-auto leading-relaxed font-body">
                    Thank you for your interest in <span className="text-primary font-bold">{project.name}</span>. A REFERESTATES senior advisor has been assigned to your request and will reach out shortly.
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-xs uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={16} />
                    <span>Chat on WhatsApp Now</span>
                  </a>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-8 py-4 bg-surface border border-secondary/20 hover:border-primary text-secondary font-display font-bold text-xs uppercase tracking-[0.15em] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-display font-bold uppercase tracking-widest text-secondary">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={handleFormChange}
                      placeholder="e.g. Tariq Al-Mansour"
                      className="w-full px-4 py-3.5 bg-surface border border-secondary/20 text-secondary placeholder:text-secondary/40 font-body text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-xs font-display font-bold uppercase tracking-widest text-secondary">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleFormChange}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3.5 bg-surface border border-secondary/20 text-secondary placeholder:text-secondary/40 font-body text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="space-y-2">
                    <label className="block text-xs font-display font-bold uppercase tracking-widest text-secondary">
                      Phone / WhatsApp Number <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formState.phone}
                      onChange={handleFormChange}
                      placeholder="+966 5X XXX XXXX"
                      className="w-full px-4 py-3.5 bg-surface border border-secondary/20 text-secondary placeholder:text-secondary/40 font-body text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-2">
                    <label className="block text-xs font-display font-bold uppercase tracking-widest text-secondary">
                      Country of Residence
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formState.country}
                      onChange={handleFormChange}
                      placeholder="Saudi Arabia, UAE, UK, etc."
                      className="w-full px-4 py-3.5 bg-surface border border-secondary/20 text-secondary placeholder:text-secondary/40 font-body text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Buying Purpose */}
                  <div className="space-y-2">
                    <label className="block text-xs font-display font-bold uppercase tracking-widest text-secondary">
                      Purchasing Purpose
                    </label>
                    <select
                      name="purpose"
                      value={formState.purpose}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3.5 bg-surface border border-secondary/20 text-secondary font-body text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
                    >
                      <option value="Investment">Investment / High Yield</option>
                      <option value="Personal Residence">Personal Family Residence</option>
                      <option value="Vacation Home">Vacation / Second Home</option>
                      <option value="Corporate Portfolio">Corporate Asset</option>
                    </select>
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="space-y-2">
                    <label className="block text-xs font-display font-bold uppercase tracking-widest text-secondary">
                      Preferred Contact Method
                    </label>
                    <select
                      name="preferred_contact"
                      value={formState.preferred_contact}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3.5 bg-surface border border-secondary/20 text-secondary font-body text-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
                    >
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Phone Call">Direct Phone Call</option>
                      <option value="Email">Email Only</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-xs font-display font-bold uppercase tracking-widest text-secondary">
                    Specific Requirements or Questions
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formState.message}
                    onChange={handleFormChange}
                    placeholder="Tell us about desired unit types, floor level preferences, or schedule for viewing..."
                    className="w-full px-4 py-3.5 bg-surface border border-secondary/20 text-secondary placeholder:text-secondary/40 font-body text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Form Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-primary hover:bg-primary-dark text-cream font-display font-bold text-xs uppercase tracking-[0.15em] transition-colors shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <span>Request Property Information</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-secondary/60 text-center mt-3 font-body">
                    Your details are kept strictly private under REFERESTATES client governance.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. RELATED PROJECTS ("You May Also Like")
          ========================================================================= */}
      {relatedProjects.length > 0 && (
        <section className="py-24 bg-cream relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-display font-bold text-xs uppercase tracking-[0.2em]">
                  <Sparkles size={14} />
                  <span>Curated Portfolio</span>
                </div>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary uppercase">
                  You May Also Like
                </h2>
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center text-primary font-display font-bold text-xs tracking-widest uppercase hover:text-primary-dark transition-colors"
              >
                <span className="border-b border-primary/30 pb-1">View All Projects</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((rel) => (
                <div key={rel.id}>
                  <ProjectCard project={rel} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          12. FLOATING WHATSAPP BUTTON (Property-specific encoded message)
          ========================================================================= */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 group rounded-full"
        title="Chat with a REFERESTATES Advisor on WhatsApp"
      >
        <MessageSquare size={22} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-xs font-display font-bold tracking-wider pr-1">
          WhatsApp Advisor
        </span>
      </a>

    </div>
  );
}
