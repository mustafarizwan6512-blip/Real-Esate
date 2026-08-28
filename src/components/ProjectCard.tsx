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
  return (
    <Link to={linkTarget} className="group block bg-surface border border-transparent hover:border-primary/30 transition-colors duration-500">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EBE5DA]">
        <img 
          src={project.images[0]} 
          alt={project.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-10">
          <StatusBadge status={project.status} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-semibold text-xl text-secondary">{project.name}</h3>
          <span className="font-display font-semibold text-xs tracking-wider text-secondary-dark/60 pt-1 uppercase">{project.city}</span>
        </div>
        <p className="text-secondary/80 text-sm font-medium mb-6">By {project.developer}</p>
        
        <div className="mt-auto flex items-center text-primary font-display font-bold text-xs tracking-widest uppercase group-hover:text-primary-dark transition-colors">
          <span className="border-b border-primary/30 group-hover:border-primary-dark pb-1">Explore Project</span>
          <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
