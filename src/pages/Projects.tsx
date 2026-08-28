import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { fetchProjects, fetchLocations } from '../api';
import { Project, Location } from '../types';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { Building, Filter } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    Promise.all([fetchProjects(), fetchLocations()])
      .then(([proj, loc]) => {
        setProjects(proj);
        setFilteredProjects(proj);
        setLocations(loc);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    let result = projects;
    if (cityFilter) result = result.filter(p => p.city === cityFilter);
    setFilteredProjects(result);
  }, [cityFilter, projects]);

  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "REFERESTATES Luxury Properties Portfolio",
    "description": "Curated selection of verified off-plan and luxury properties across Saudi Arabia.",
    "itemListElement": filteredProjects.map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": p.name,
      "url": `https://referestates.com/projects/${p.slug || p.id}`
    }))
  };

  return (
    <div className="w-full pt-32 pb-24 min-h-screen bg-cream">
      <SEO 
        title="Curated Real Estate Developments in Saudi Arabia | REFERESTATES"
        description="Browse our portfolio of luxury off-plan projects, commercial centers, and residential apartments across Riyadh and Jeddah. Official developer-direct pricing."
        canonical="https://referestates.com/projects"
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

        {/* Filters and Counters */}
        <div className="flex flex-col sm:flex-row gap-6 justify-between items-center border-b border-secondary/10 pb-6 mb-12 bg-surface p-4 border">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter size={16} className="text-primary" />
            <span className="font-display font-bold text-xs uppercase tracking-wider text-secondary">Filter by Location:</span>
            <select 
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              aria-label="Filter properties by city"
              className="bg-cream border border-secondary/20 text-secondary font-display font-semibold text-xs uppercase tracking-wider py-2 px-3 focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="">All Locations ({projects.length})</option>
              {locations.map(l => (
                <option key={l.id} value={l.name}>{l.name}</option>
              ))}
            </select>
          </div>

          <div className="text-xs font-display font-bold uppercase tracking-wider text-secondary/60">
            Showing <span className="text-primary">{filteredProjects.length}</span> Verified Developments
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
          {filteredProjects.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-20 text-secondary/60 font-display font-semibold bg-surface border border-secondary/10 p-8">
              No projects found matching the selected filter.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
