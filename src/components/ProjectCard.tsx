import React from 'react';
import { Project } from '../types';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function StatusBadge({ status }: { status: Project['status'] }) {
  let bg = 'bg-secondary';
  let text = 'text-cream';
  
  if (status === 'Sold Out') {
    bg = 'bg-dark/80';
  } else if (status === 'Limited Availability') {
    bg = 'bg-primary';
  } else if (status === 'Available') {
    bg = 'bg-secondary';
  } else if (status === 'Coming Soon') {
    bg = 'bg-secondary-dark/60';
  } else {
    bg = 'bg-dark/40';
  }

  return (
    <span className={`inline-block px-3 py-1 font-display font-bold text-[10px] tracking-widest uppercase ${bg} ${text}`}>
      {status}
    </span>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const linkTarget = `/projects/${project.slug || project.id}`;
  const formattedPrice = project.starting_price 
    ? (project.starting_price >= 1000000 
      ? `From SAR ${(project.starting_price / 1000000).toFixed(1)}M` 
      : `From SAR ${(project.starting_price / 1000).toFixed(0)}k`) 
    : null;

  return (
    <Link to={linkTarget} className="group block bg-surface border border-secondary/10 hover:border-primary/40 transition-all duration-300 shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EBE5DA]">
        <img 
          src={project.images[0] || "/al-rehab-center.webp"} 
          alt={`${project.name} - ${project.category || 'Luxury Property'} in ${project.city}, Saudi Arabia by ${project.developer}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
          <StatusBadge status={project.status} />
          {formattedPrice && (
            <span className="inline-block px-2.5 py-1 bg-surface/90 backdrop-blur-sm text-secondary font-display font-bold text-[10px] uppercase tracking-wider border border-secondary/10">
              {formattedPrice}
            </span>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-display font-bold text-lg text-secondary group-hover:text-primary transition-colors">{project.name}</h3>
          <span className="font-display font-semibold text-xs tracking-wider text-secondary-dark/60 pt-1 uppercase">{project.city}</span>
        </div>
        <p className="text-secondary/70 text-xs font-medium mb-4">By {project.developer}</p>
        
        <div className="mt-auto flex items-center justify-between text-primary font-display font-bold text-xs tracking-widest uppercase group-hover:text-primary-dark transition-colors pt-3 border-t border-secondary/10">
          <span className="border-b border-primary/30 group-hover:border-primary-dark pb-0.5">Explore Details</span>
          <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
