
import React from 'react';
import { GithubIcon, LinkedInIcon, TwitterIcon } from './Icons';

// Fix: Explicitly type SectionTitle as a React Functional Component to ensure props like 'children' are correctly handled by TypeScript.
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-4xl md:text-5xl font-gothic text-amber-400 mb-12 text-center" style={{ filter: 'drop-shadow(0 0 3px #F5C518)' }}>
    {children}
  </h2>
);

const socialLinks = [
  { icon: GithubIcon, url: 'https://github.com', name: 'GitHub' },
  { icon: LinkedInIcon, url: 'https://linkedin.com', name: 'LinkedIn' },
  { icon: TwitterIcon, url: 'https://x.com', name: 'Twitter/X' },
];

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32 animated-grid">
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle>Contact</SectionTitle>
        <div className="max-w-xl mx-auto text-center">
            <p className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 mb-8">
                Have a project in mind or just want to connect? Feel free to reach out. I'm always open to discussing new opportunities and collaborations.
            </p>
            <a 
                href="mailto:contact@example.com?subject=Project Inquiry&body=Hi J.,%0D%0A%0D%0AI'd like to discuss..."
                className="inline-block px-10 py-4 bg-amber-400 text-zinc-900 font-bold rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-400/20 focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50 text-lg"
            >
                contact@example.com
            </a>

            <div className="mt-12 flex justify-center space-x-8">
                {socialLinks.map(({ icon: Icon, url, name }) => (
                    <a 
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={name}
                        className="text-zinc-500 dark:text-zinc-500 light:text-zinc-500 hover:text-amber-400 transition-colors duration-300 transform hover:scale-110"
                    >
                       <Icon className="w-8 h-8"/>
                    </a>
                ))}
            </div>
             <p className="text-sm text-zinc-600 dark:text-zinc-600 light:text-zinc-400 mt-12">
                Note: The button above uses `mailto:`. For a form, connect to a service like Formspree or Netlify Forms.
            </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
