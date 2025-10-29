import React, { useState, useEffect, useRef } from 'react';
import { generateVideo, generateLowLatencyStream, analyzeVideo, editImage } from '../services/geminiService';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-4xl md:text-5xl font-gothic text-amber-400 mb-12 text-center" style={{ filter: 'drop-shadow(0 0 3px #F5C518)' }}>
    {children}
  </h2>
);

const AiPanel: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
  <div className="bg-zinc-900 dark:bg-zinc-900 light:bg-zinc-100 p-6 md:p-8 rounded-2xl border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 flex flex-col min-h-[500px]">
    <h3 className="text-2xl font-bold text-zinc-200 dark:text-zinc-200 light:text-zinc-800 mb-2 flex items-center">
      <span className="text-amber-400 mr-3 text-3xl">✧</span> {title}
    </h3>
    <p className="text-zinc-500 dark:text-zinc-500 light:text-zinc-500 mb-6 flex-shrink-0">{description}</p>
    <div className="flex-grow flex flex-col">{children}</div>
  </div>
);

const sharedButtonClasses = "w-full px-6 py-3 bg-amber-400 text-zinc-900 font-bold rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 disabled:bg-zinc-600 disabled:cursor-not-allowed flex items-center justify-center";
const sharedInputClasses = "w-full p-3 bg-zinc-800 dark:bg-zinc-800 light:bg-zinc-200 text-zinc-300 dark:text-zinc-300 light:text-zinc-700 rounded-md border border-zinc-700 dark:border-zinc-700 light:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors";

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const VideoGenerationPanel: React.FC = () => {
    const [prompt, setPrompt] = useState('A neon hologram of a cat driving a cyberpunk car at top speed');
    const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [apiKeyNeeded, setApiKeyNeeded] = useState(false);

    useEffect(() => {
        window.aistudio.hasSelectedApiKey().then(hasKey => {
            if (!hasKey) setApiKeyNeeded(true);
        });
    }, []);

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        setVideoUrl(null);
        try {
            const url = await generateVideo(prompt, aspectRatio);
            setVideoUrl(url);
        } catch (e: any) {
            const errorMessage = e.message || 'An unknown error occurred.';
            setError(`Generation failed: ${errorMessage}`);
            if (errorMessage.includes('Requested entity was not found')) {
                setApiKeyNeeded(true);
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSelectKey = async () => {
        await window.aistudio.openSelectKey();
        setApiKeyNeeded(false);
    };

    return (
        <AiPanel title="Veo Video Generation" description="Generate a short video from a text prompt using Veo. Generation can take a few minutes.">
            {apiKeyNeeded ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-center text-zinc-400 mb-4">An API key is required for video generation.</p>
                     <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline text-sm mb-4">Billing Information</a>
                    <button onClick={handleSelectKey} className={sharedButtonClasses}>Select API Key</button>
                </div>
            ) : (
                <>
                    <textarea value={prompt} onChange={e => setPrompt(e.target.value)} className={`${sharedInputClasses} h-24 mb-4`} placeholder="Enter a video prompt..."></textarea>
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <label className="text-zinc-400">Aspect Ratio:</label>
                        <button onClick={() => setAspectRatio('16:9')} className={`px-4 py-1 rounded-full text-sm ${aspectRatio === '16:9' ? 'bg-amber-400 text-zinc-900' : 'bg-zinc-800 text-zinc-300'}`}>16:9</button>
                        <button onClick={() => setAspectRatio('9:16')} className={`px-4 py-1 rounded-full text-sm ${aspectRatio === '9:16' ? 'bg-amber-400 text-zinc-900' : 'bg-zinc-800 text-zinc-300'}`}>9:16</button>
                    </div>
                    <button onClick={handleGenerate} disabled={isLoading} className={`${sharedButtonClasses} mt-auto`}>
                        {isLoading && <LoadingSpinner />}
                        {isLoading ? 'Generating Video...' : 'Generate with Veo'}
                    </button>
                    {error && <p className="text-red-400 mt-4 text-sm text-center">{error}</p>}
                    {videoUrl && (
                        <div className="mt-4 flex-grow flex items-center justify-center bg-black rounded-lg">
                            <video src={videoUrl} controls autoPlay loop className="max-w-full max-h-48 rounded-lg" />
                        </div>
                    )}
                </>
            )}
        </AiPanel>
    );
};

const LowLatencyPanel: React.FC = () => {
    const [prompt, setPrompt] = useState('Tell me a very short cyberpunk story.');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [streamedResponse, setStreamedResponse] = useState('');

    const handleGenerate = async () => {
        setIsLoading(true);
        setError(null);
        setStreamedResponse('');
        try {
            await generateLowLatencyStream(prompt, chunk => {
                setStreamedResponse(prev => prev + chunk);
            });
        } catch (e: any) {
            setError(`Streaming failed: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <AiPanel title="Low-Latency Responses" description="Get rapid, streaming text responses from Gemini Flash Lite.">
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} className={`${sharedInputClasses} h-24 mb-4`} placeholder="Enter a prompt..."></textarea>
             <button onClick={handleGenerate} disabled={isLoading} className={`${sharedButtonClasses}`}>
                {isLoading && <LoadingSpinner />}
                {isLoading ? 'Streaming...' : 'Generate Stream'}
            </button>
             {error && <p className="text-red-400 mt-4 text-sm text-center">{error}</p>}
             <div className="mt-4 p-4 bg-zinc-800 rounded-lg min-h-[100px] flex-grow">
                <p className="text-zinc-300 whitespace-pre-wrap">{streamedResponse}</p>
             </div>
        </AiPanel>
    );
};

const VideoUnderstandingPanel: React.FC = () => {
    const [prompt, setPrompt] = useState('Summarize the main events in this video.');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            setVideoFile(file);
            setVideoPreview(URL.createObjectURL(file));
            setResult('');
            setError(null);
        }
    }
    
    const handleAnalyze = async () => {
        if (!videoFile) {
            setError("Please upload a video file first.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setResult('');
        try {
            const analysis = await analyzeVideo(videoFile, prompt);
            setResult(analysis);
        } catch (e: any) {
            setError(`Analysis failed: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AiPanel title="Video Understanding" description="Upload a short video and ask Gemini Pro to analyze its contents.">
            <input type="file" accept="video/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className={`${sharedInputClasses} !text-center !py-3 mb-4`}>
                {videoFile ? `Selected: ${videoFile.name}` : 'Upload Video'}
            </button>
            {videoPreview && <video src={videoPreview} controls className="w-full h-32 object-contain mb-4 bg-black rounded-lg" />}
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} className={`${sharedInputClasses} mb-4`} placeholder="Ask something about the video..."></textarea>
            <button onClick={handleAnalyze} disabled={isLoading || !videoFile} className={sharedButtonClasses}>
                {isLoading && <LoadingSpinner />}
                Analyze Video
            </button>
            {error && <p className="text-red-400 mt-4 text-sm text-center">{error}</p>}
            {result && <div className="mt-4 p-4 bg-zinc-800 rounded-lg flex-grow"><p className="text-zinc-300">{result}</p></div>}
        </AiPanel>
    );
};

const ImageEditingPanel: React.FC = () => {
    const [prompt, setPrompt] = useState('Add a retro, grainy film filter.');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setOriginalImage(URL.createObjectURL(file));
            setEditedImage(null);
            setError(null);
        }
    };

    const handleEdit = async () => {
        if (!imageFile) {
            setError("Please upload an image first.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setEditedImage(null);
        try {
            const resultUrl = await editImage(imageFile, prompt);
            setEditedImage(resultUrl);
        } catch (e: any) {
            setError(`Editing failed: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AiPanel title="Image Editing" description="Upload an image and use a text prompt to edit it with Gemini Flash Image.">
             <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
             <button onClick={() => fileInputRef.current?.click()} className={`${sharedInputClasses} !text-center !py-3 mb-4`}>
                {imageFile ? `Selected: ${imageFile.name}` : 'Upload Image'}
            </button>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} className={`${sharedInputClasses} mb-4`} placeholder="Describe your edit..."></textarea>
            <button onClick={handleEdit} disabled={isLoading || !imageFile} className={`${sharedButtonClasses} mb-4`}>
                {isLoading && <LoadingSpinner />}
                Edit Image
            </button>
            {error && <p className="text-red-400 mt-4 text-sm text-center">{error}</p>}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                    <p className="text-zinc-500 text-sm mb-2">Original</p>
                    {originalImage ? <img src={originalImage} className="w-full h-32 object-contain rounded-lg bg-black" /> : <div className="w-full h-32 rounded-lg bg-zinc-800"></div>}
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-zinc-500 text-sm mb-2">Edited</p>
                    {editedImage ? <img src={editedImage} className="w-full h-32 object-contain rounded-lg bg-black" /> : <div className="w-full h-32 rounded-lg bg-zinc-800"></div>}
                </div>
            </div>
        </AiPanel>
    );
};


const AiAdvancements: React.FC = () => {
    return (
        <section id="ai-advancements" className="py-20 md:py-32">
            <div className="container mx-auto px-6">
                <SectionTitle>AI Advancements</SectionTitle>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <VideoGenerationPanel />
                    <LowLatencyPanel />
                    <VideoUnderstandingPanel />
                    <ImageEditingPanel />
                </div>
            </div>
        </section>
    );
};

export default AiAdvancements;