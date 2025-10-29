import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from './Icons';

interface HeaderProps {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  scrollToSection: (id: string) => void;
}

// Fix: Explicitly type NavLink as a React Functional Component to ensure special props like 'key' and 'children' are correctly handled by TypeScript.
const NavLink: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="relative text-zinc-300 dark:text-zinc-300 light:text-zinc-700 hover:text-amber-400 dark:hover:text-amber-400 light:hover:text-amber-400 transition-colors duration-300 group text-lg"
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

const Header: React.FC<HeaderProps> = ({ theme, setTheme, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'AI Advancements', id: 'ai-advancements'},
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/80 dark:bg-zinc-950/80 light:bg-zinc-50/80 backdrop-blur-lg border-b border-zinc-800 dark:border-zinc-800 light:border-zinc-200' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-gothic text-amber-400 cursor-pointer" onClick={() => scrollToSection('home')}>
          J. Doe
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink key={link.id} onClick={() => handleLinkClick(link.id)}>{link.label}</NavLink>
          ))}
          <button onClick={toggleTheme} className="text-zinc-300 dark:text-zinc-300 light:text-zinc-700 hover:text-amber-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-zinc-950 rounded-full p-1">
            {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
            <button onClick={toggleTheme} className="text-zinc-300 dark:text-zinc-300 light:text-zinc-700 hover:text-amber-400 transition-colors mr-4 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-zinc-950 rounded-full p-1">
                {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-zinc-300 dark:text-zinc-300 light:text-zinc-700 focus:outline-none">
                {isMenuOpen ? <CloseIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
            </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-zinc-950/95 dark:bg-zinc-950/95 light:bg-zinc-50/95 backdrop-blur-md transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col items-center space-y-6 py-8">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => handleLinkClick(link.id)} className="text-2xl text-zinc-300 dark:text-zinc-300 light:text-zinc-700 hover:text-amber-400 transition-colors">
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;