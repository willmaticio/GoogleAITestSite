
import React, { useState } from 'react';
import { FALLBACK_ABOUT_TEXT } from '../constants';
import { generateAboutText } from '../services/geminiService';

// Fix: Explicitly type SectionTitle as a React Functional Component to ensure props like 'children' are correctly handled by TypeScript.
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-4xl md:text-5xl font-gothic text-amber-400 mb-8 text-center" style={{ filter: 'drop-shadow(0 0 3px #F5C518)' }}>
    {children}
  </h2>
);

const About: React.FC = () => {
    const [prompt, setPrompt] = useState("Summarize my background in cybersecurity, AI agents, and education outreach. Tone: confident, human.");
    const [generatedText, setGeneratedText] = useState(FALLBACK_ABOUT_TEXT);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateAboutText(prompt);
            setGeneratedText(result);
        } catch (e) {
            const err = e as Error;
            setError(`Generation failed: ${err.message}. Using fallback text.`);
            setGeneratedText(FALLBACK_ABOUT_TEXT);
        } finally {
            setIsLoading(false);
        }
    };
    
  return (
    <section id="about" className="py-20 md:py-32">
        <div className="container mx-auto px-6">
            <SectionTitle>About Me</SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Generated About Text */}
                <div className="bg-zinc-900 dark:bg-zinc-900 light:bg-zinc-100 p-8 rounded-lg border border-zinc-800 dark:border-zinc-800 light:border-zinc-200">
                    <h3 className="text-2xl font-bold text-zinc-200 dark:text-zinc-200 light:text-zinc-800 mb-4">Bio</h3>
                    <p id="aboutText" className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 leading-relaxed whitespace-pre-wrap">
                        {generatedText}
                    </p>
                </div>

                {/* AI Generator Panel */}
                <div className="bg-zinc-900 dark:bg-zinc-900 light:bg-zinc-100 p-8 rounded-lg border border-zinc-800 dark:border-zinc-800 light:border-zinc-200">
                    <h3 className="text-2xl font-bold text-zinc-200 dark:text-zinc-200 light:text-zinc-800 mb-4 flex items-center">
                        <span className="text-amber-400 mr-2 text-3xl">✦</span> AI Bio Generator
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-500 light:text-zinc-500 mb-4">
                        Use Gemini to generate a new bio. Provide context and desired tone.
                        <strong className="block mt-2 text-amber-500">Note: API calls should be server-side in production.</strong>
                    </p>
                    <textarea
                        id="aboutPrompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full h-32 p-3 bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-200 text-zinc-300 dark:text-zinc-300 light:text-zinc-700 rounded-md border border-zinc-700 dark:border-zinc-700 light:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
                        placeholder="e.g., Emphasize my work with open-source tools..."
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="mt-4 w-full px-6 py-3 bg-amber-400 text-zinc-900 font-bold rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 disabled:bg-zinc-600 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                           <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                        ) : 'Generate with Gemini'}
                    </button>
                    {error && <p className="text-red-400 mt-4 text-sm text-center">{error}</p>}
                </div>
            </div>
        </div>
    </section>
  );
};

export default About;
