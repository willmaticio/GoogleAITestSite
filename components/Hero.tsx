
import React from 'react';

interface HeroProps {
    scrollToSection: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center animated-grid">
        <div className="container mx-auto px-6 text-center relative z-10">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-gothic text-amber-400 mb-4" style={{ filter: 'drop-shadow(0 0 5px #F5C518)' }}>
                J. Doe
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 dark:text-zinc-300 light:text-zinc-700 font-medium mb-2 tracking-wider">
                Cybersecurity & AI Engineer
            </p>
            <p className="max-w-3xl mx-auto text-lg text-zinc-400 dark:text-zinc-400 light:text-zinc-600 mb-8">
                Crafting intelligent, secure systems for a resilient digital future. Fusing advanced AI with robust cybersecurity to solve tomorrow's challenges today.
            </p>
            <div className="flex justify-center space-x-4">
                <button 
                    onClick={() => scrollToSection('projects')}
                    className="px-8 py-3 bg-amber-400 text-zinc-900 font-bold rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-400/20 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50"
                >
                    View Projects
                </button>
                <button 
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-3 bg-transparent border-2 border-amber-400 text-amber-400 font-bold rounded-full hover:bg-amber-400 hover:text-zinc-900 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50"
                >
                    Contact Me
                </button>
            </div>
        </div>
    </section>
  );
};

export default Hero;
