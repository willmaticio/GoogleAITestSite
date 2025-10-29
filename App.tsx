import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import AiAdvancements from './components/AiAdvancements';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme) {
            setTheme(savedTheme);
        } else if (prefersDark) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div className="bg-zinc-950 dark:bg-zinc-950 light:bg-zinc-50 text-zinc-300 dark:text-zinc-300 light:text-zinc-700 transition-colors duration-300">
            <Header theme={theme} setTheme={setTheme} scrollToSection={scrollToSection}/>
            <main>
                <Hero scrollToSection={scrollToSection} />
                <About />
                <Projects />
                <AiAdvancements />
                <Contact />
            </main>
            <Footer scrollToSection={scrollToSection} />
        </div>
    );
};

export default App;