import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Send } from 'lucide-react';
import { trackWhatsAppClick, trackPhoneClick } from '../utils/analytics';

interface MobileStickyBarProps {
  propertyName?: string;
}

export default function MobileStickyBar({ propertyName }: MobileStickyBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past 150px
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-surface/95 backdrop-blur-md border-t border-secondary/15 p-3 shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        
        {/* Direct Call */}
        <a
          href="tel:+966536609534"
          onClick={() => trackPhoneClick('mobile_sticky_bar')}
          className="flex-1 py-3 px-2 bg-cream text-secondary border border-secondary/20 flex items-center justify-center gap-1.5 text-[11px] font-display font-bold uppercase tracking-wider active:bg-secondary/10"
        >
          <Phone size={14} className="text-primary" />
          <span>Call</span>
        </a>

        {/* WhatsApp CTA */}
        <a
          href={`https://wa.me/966536609534?text=${encodeURIComponent(
            propertyName 
              ? `Hello REFERESTATES, I would like to inquire about ${propertyName}.` 
              : 'Hello REFERESTATES, I am interested in your curated Saudi property portfolio.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('mobile_sticky_bar', propertyName)}
          className="flex-[1.5] py-3 px-3 bg-primary text-cream flex items-center justify-center gap-1.5 text-[11px] font-display font-bold uppercase tracking-wider active:bg-primary-dark shadow-md"
        >
          <MessageSquare size={14} />
          <span>WhatsApp</span>
        </a>

        {/* Inquire / Scroll to Contact */}
        <a
          href="#contact"
          className="flex-1 py-3 px-2 bg-secondary text-cream flex items-center justify-center gap-1.5 text-[11px] font-display font-bold uppercase tracking-wider active:bg-secondary/90"
        >
          <Send size={13} className="text-primary" />
          <span>Inquire</span>
        </a>

      </div>
    </div>
  );
}
