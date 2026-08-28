import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled 
            ? "bg-cream/50 backdrop-blur-lg shadow-sm py-4 border-b border-secondary/10" 
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-1 z-50">
            <span className="font-display font-bold text-2xl tracking-wide text-secondary">REFER</span>
            <span className="font-display font-bold text-2xl tracking-wide text-primary">ESTATES</span>
          </Link>

          <div className="hidden md:flex flex-1 justify-center items-center gap-12">
            <a href="/#home" className="font-bold text-xs tracking-[0.15em] uppercase text-secondary hover:text-primary transition-colors">Home</a>
            <a href="/#projects" className="font-bold text-xs tracking-[0.15em] uppercase text-secondary hover:text-primary transition-colors">Projects</a>
            <a href="/#about" className="font-bold text-xs tracking-[0.15em] uppercase text-secondary hover:text-primary transition-colors">About</a>
            <a href="/#contact" className="font-bold text-xs tracking-[0.15em] uppercase text-secondary hover:text-primary transition-colors">Contact</a>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="https://wa.me/966536609534" target="_blank" rel="noopener noreferrer" className="font-bold text-sm tracking-wider uppercase text-secondary hover:text-primary transition-colors">
              WhatsApp Us
            </a>
          </div>

          <button 
            className="md:hidden z-50 text-secondary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-cream z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <a href="/#home" onClick={() => setIsMobileMenuOpen(false)} className="font-display font-semibold text-2xl uppercase tracking-widest text-secondary hover:text-primary transition-colors">Home</a>
        <a href="/#projects" onClick={() => setIsMobileMenuOpen(false)} className="font-display font-semibold text-2xl uppercase tracking-widest text-secondary hover:text-primary transition-colors">Projects</a>
        <a href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="font-display font-semibold text-2xl uppercase tracking-widest text-secondary hover:text-primary transition-colors">About</a>
        <a href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="font-display font-semibold text-2xl uppercase tracking-widest text-secondary hover:text-primary transition-colors">Contact</a>
        
        <a href="https://wa.me/966536609534" className="text-secondary font-bold text-lg uppercase mt-4">
          WhatsApp: +966 53 660 9534
        </a>
      </div>
    </>
  );
}

function NavLink({ to, children }: { to: string, children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "font-bold text-xs tracking-[0.15em] uppercase transition-colors relative group",
        isActive ? "text-primary" : "text-secondary hover:text-primary"
      )}
    >
      {children}
      <span className={cn(
        "absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-300",
        isActive ? "w-full" : "w-0 group-hover:w-full"
      )}></span>
    </Link>
  );
}

function MobileNavLink({ to, children }: { to: string, children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "font-display font-semibold text-2xl uppercase tracking-widest",
        isActive ? "text-primary" : "text-secondary"
      )}
    >
      {children}
    </Link>
  );
}
