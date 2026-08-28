import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { fetchProjects, fetchLocations, fetchDevelopers } from '../api';
import { Project, Location, Developer } from '../types';
import ProjectCard from '../components/ProjectCard';

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

  return (
    <div className="w-full pt-32 pb-24 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-primary font-display font-bold text-xs uppercase tracking-[0.2em] mb-3">
            <span>Selected Portfolio</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display font-bold text-4xl md:text-5xl text-secondary mb-4 uppercase tracking-tight"
          >
            Selected Projects
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-secondary/80 text-lg max-w-2xl mx-auto font-body"
          >
            Discover premium developments across Saudi Arabia, curated for discerning clients and investors.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-8 items-end border-b border-secondary/10 pb-8 mb-16">
          <div className="w-full md:w-1/3">
            <label className="block font-display font-bold text-xs uppercase tracking-widest text-secondary/60 mb-2">Filter by City</label>
            <select 
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full bg-surface border-b-2 border-secondary/20 text-secondary font-display font-semibold py-2.5 px-3 focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="">All Locations</option>
              {locations.map(l => (
                <option key={l.id} value={l.name}>{l.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
          {filteredProjects.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-20 text-secondary/60 font-display font-semibold">
              No projects found matching your criteria.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
