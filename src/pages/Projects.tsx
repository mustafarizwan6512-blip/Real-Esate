import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { fetchProjects } from '../api';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { Building } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(console.error);
  }, []);

  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "REFERESTATES Luxury Properties Portfolio",
    "description": "Curated selection of verified off-plan and luxury properties across Saudi Arabia.",
    "itemListElement": projects.map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": p.name,
      "url": `https://www.referestates.com/projects/${p.slug || p.id}`
    }))
  };

  return (
    <div className="w-full pt-32 pb-24 min-h-screen bg-cream">
      <SEO 
        title="Curated Real Estate Developments in Saudi Arabia | REFERESTATES"
        description="Browse our portfolio of luxury off-plan projects, commercial centers, and residential apartments across Riyadh and Jeddah. Official developer-direct pricing."
        canonical="https://www.referestates.com/projects"
        jsonLd={projectsJsonLd}
        keywords={["Saudi Real Estate Portfolio", "Jeddah Property", "Riyadh Developments", "Off-Plan Saudi Projects"]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Properties & Developments' }]} />

        {/* Clear H1 Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-primary font-display font-bold text-xs uppercase tracking-[0.2em] mb-3">
            <Building size={14} />
            <span>Kingdom-Wide Portfolio</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-4xl md:text-5xl text-secondary mb-4 uppercase tracking-tight"
          >
            Curated Real Estate Developments
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-secondary/80 text-base md:text-lg max-w-2xl mx-auto font-body"
          >
            Discover verified off-plan opportunities, mixed-use commercial centers, and luxury residential suites across Saudi Arabia.
          </motion.p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
          {projects.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full text-center py-20 text-secondary/60 font-display font-semibold bg-surface border border-secondary/10 p-8">
              No projects available at the moment.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
