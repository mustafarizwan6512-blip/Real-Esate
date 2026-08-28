import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface pt-20 pb-10 border-t border-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-1 mb-6">
              <span className="font-display font-bold text-2xl tracking-wide text-secondary">REFER</span>
              <span className="font-display font-bold text-2xl tracking-wide text-primary">ESTATES</span>
            </Link>
            <p className="text-secondary-dark/80 text-sm leading-relaxed mb-6">
              Premium Saudi Real Estate. Curating exceptional living and investment opportunities across the Kingdom.
            </p>
            <div className="flex gap-4">
              <a href="https://www.tiktok.com/@referestates" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                {/* TikTok icon approximation */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.28 6.28 0 005 15.65a6.29 6.29 0 005.36 6.22 6.29 6.29 0 007.13-5.82V8.9a8.16 8.16 0 004.77 1.52V6.97a4.93 4.93 0 01-2.67-.28z"/></svg>
              </a>
              <a href="https://www.instagram.com/referestates?igsi=NGlwdXVmOGwzcW15" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61593521009451" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm tracking-widest uppercase text-secondary mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li><a href="/#home" className="text-secondary-dark/80 hover:text-primary text-sm transition-colors">Home</a></li>
              <li><a href="/#projects" className="text-secondary-dark/80 hover:text-primary text-sm transition-colors">Projects</a></li>
              <li><a href="/#about" className="text-secondary-dark/80 hover:text-primary text-sm transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm tracking-widest uppercase text-secondary mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link to="#" className="text-secondary-dark/80 hover:text-primary text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="text-secondary-dark/80 hover:text-primary text-sm transition-colors">Terms & Conditions</Link></li>
              <li><Link to="#" className="text-secondary-dark/80 hover:text-primary text-sm transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm tracking-widest uppercase text-secondary mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://wa.me/966536609534" className="flex items-center gap-3 text-secondary-dark/80 hover:text-primary text-sm transition-colors">
                  <Phone size={16} />
                  <span>+966 53 660 9534</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@referestates.com" className="flex items-center gap-3 text-secondary-dark/80 hover:text-primary text-sm transition-colors">
                  <Mail size={16} />
                  <span>info@referestates.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-secondary-dark/80 text-sm">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <span>Riyadh, Saudi Arabia</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-dark/60 text-xs">
            &copy; {new Date().getFullYear()} REFERESTATES. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
