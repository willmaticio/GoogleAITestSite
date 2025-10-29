
import React, { useState, useMemo } from 'react';
import type { Project, Category } from '../types';
import { PROJECTS, CATEGORIES } from '../constants';
import { GithubIcon, ExternalLinkIcon } from './Icons';

// Fix: Explicitly type SectionTitle as a React Functional Component to ensure props like 'children' are correctly handled by TypeScript.
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-4xl md:text-5xl font-gothic text-amber-400 mb-12 text-center" style={{ filter: 'drop-shadow(0 0 3px #F5C518)' }}>
    {children}
  </h2>
);

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
    <div className="bg-zinc-900 dark:bg-zinc-900 light:bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 group transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-400/10 hover:border-amber-400/50">
        <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" />
        <div className="p-6">
            <h3 className="text-xl font-bold text-zinc-200 dark:text-zinc-200 light:text-zinc-800 mb-2">{project.title}</h3>
            <p className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 mb-4 text-sm h-16">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-200 text-amber-400 dark:text-amber-400 light:text-amber-600 text-xs font-semibold rounded-full group-hover:animate-pulse">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex justify-end space-x-4 mt-4">
                {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-400 transition-colors">
                        <GithubIcon className="w-6 h-6" />
                    </a>
                )}
                {project.liveUrl && (
                     <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-400 transition-colors">
                        <ExternalLinkIcon className="w-6 h-6" />
                    </a>
                )}
            </div>
        </div>
    </div>
);


const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return PROJECTS;
    }
    return PROJECTS.filter(project => project.category.includes(activeCategory));
  }, [activeCategory]);

  return (
    <section id="projects" className="py-20 md:py-32">
        <div className="container mx-auto px-6">
            <SectionTitle>Projects</SectionTitle>
            
            {/* Filter Bar */}
            <div className="flex justify-center flex-wrap gap-3 mb-12">
                {CATEGORIES.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 border-2 ${
                            activeCategory === category
                                ? 'bg-amber-400 text-zinc-900 border-amber-400'
                                : 'bg-transparent text-zinc-400 dark:text-zinc-400 light:text-zinc-600 border-zinc-700 dark:border-zinc-700 light:border-zinc-300 hover:border-amber-400 hover:text-amber-400'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    </section>
  );
};

export default Projects;
