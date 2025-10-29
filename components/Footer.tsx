
import React from 'react';
import { ChevronUpIcon } from './Icons';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToSection }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 dark:bg-zinc-950 light:bg-zinc-100 border-t border-zinc-800 dark:border-zinc-800 light:border-zinc-200">
      <div className="container mx-auto px-6 py-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-zinc-500 dark:text-zinc-500 light:text-zinc-500 text-sm">
            &copy; {currentYear} J. Doe. All Rights Reserved.
          </p>
          <p className="text-zinc-600 dark:text-zinc-600 light:text-zinc-400 text-xs mt-2 md:mt-0">
            Built with a cyberpunk vibe.
          </p>
        </div>
        <button
          onClick={() => scrollToSection('home')}
          aria-label="Back to top"
          className="absolute -top-6 right-6 bg-amber-400 text-zinc-900 rounded-full p-2 hover:bg-amber-300 transition-all duration-300 shadow-lg shadow-amber-400/20 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
        >
          <ChevronUpIcon className="w-6 h-6" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
