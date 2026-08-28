import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { trackWhatsAppClick } from '../utils/analytics';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';
  const showSolid = isScrolled || !isHome;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          showSolid 
            ? "bg-surface/95 backdrop-blur-md shadow-sm py-4 border-b border-secondary/10" 
            : "bg-gradient-to-b from-secondary/80 to-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-1 z-50 group">
            <span className={cn(
              "font-display font-bold text-2xl tracking-wide transition-colors",
              showSolid ? "text-secondary" : "text-cream"
            )}>REFER</span>
            <span className="font-display font-bold text-2xl tracking-wide text-primary">ESTATES</span>
          </Link>

          <div className="hidden lg:flex flex-1 justify-center items-center gap-8 xl:gap-10">
            <Link 
              to="/" 
              className={cn(
                "font-display font-bold text-xs tracking-[0.15em] uppercase hover:text-primary transition-colors",
                showSolid ? "text-secondary" : "text-cream"
              )}
            >
              Home
            </Link>
            <Link 
              to="/projects" 
              className={cn(
                "font-display font-bold text-xs tracking-[0.15em] uppercase hover:text-primary transition-colors",
                showSolid ? "text-secondary" : "text-cream"
              )}
            >
              Projects
            </Link>
            <a 
              href="/#about" 
              className={cn(
                "font-display font-bold text-xs tracking-[0.15em] uppercase hover:text-primary transition-colors",
                showSolid ? "text-secondary" : "text-cream"
              )}
            >
              About
            </a>
            <Link 
              to="/contact" 
              className={cn(
                "font-display font-bold text-xs tracking-[0.15em] uppercase hover:text-primary transition-colors",
                showSolid ? "text-secondary" : "text-cream"
              )}
            >
              Contact
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="https://wa.me/966536609534" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => trackWhatsAppClick('navbar_cta')}
              className="bg-primary text-cream px-5 py-2.5 font-display font-bold text-xs tracking-wider uppercase hover:bg-primary-dark transition-all duration-200 shadow-md flex items-center gap-2"
            >
              <MessageSquare size={14} />
              <span>WhatsApp Advisory</span>
            </a>
          </div>

          <button 
            className={cn(
              "lg:hidden z-50 p-2 focus:outline-none transition-colors",
              showSolid ? "text-secondary" : "text-cream"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={26} className="text-secondary" /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-cream z-40 flex flex-col justify-between p-8 pt-28 transition-transform duration-300 lg:hidden overflow-y-auto",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="flex flex-col gap-6">
          <Link 
            to="/" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="font-display font-bold text-2xl uppercase tracking-widest text-secondary hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/projects" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="font-display font-bold text-2xl uppercase tracking-widest text-secondary hover:text-primary transition-colors"
          >
            Selected Projects
          </Link>
          <a 
            href="/#about" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="font-display font-bold text-2xl uppercase tracking-widest text-secondary hover:text-primary transition-colors"
          >
            About Us
          </a>
          <Link 
            to="/contact" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="font-display font-bold text-2xl uppercase tracking-widest text-secondary hover:text-primary transition-colors"
          >
            Contact Advisory
          </Link>
        </div>
        
        <div className="pt-8 border-t border-secondary/10 flex flex-col gap-4">
          <a 
            href="https://wa.me/966536609534" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('mobile_menu_cta')}
            className="w-full py-4 bg-primary text-cream font-display font-bold text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2"
          >
            <MessageSquare size={16} />
            <span>WhatsApp: +966 53 660 9534</span>
          </a>
        </div>
      </div>
    </>
  );
}
