import React, { useState, useCallback, useEffect } from 'react';
import { BannerForm } from './components/BannerForm';
import { AssetGrid } from './components/AssetGrid';
import { BannerFormState, GeneratedAsset, PlatformId } from './types';
import { generateBannerForPlatform } from './services/geminiService';

enum Tab {
  THUMBNAILS = 'thumbnails',
  BANNERS = 'banners',
  SOCIAL = 'social'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.BANNERS); // Default to Banners as per request
  
  // API Key State
  const [hasApiKey, setHasApiKey] = useState(false);
  const [isCheckingKey, setIsCheckingKey] = useState(true);

  // Form State
  const [formState, setFormState] = useState<BannerFormState>({
    selectedPlatforms: [],
    headline: '',
    tagline: '',
    cta: '',
    theme: '',
    primaryColor: '#6366f1', // Indigo-600
    secondaryColor: '#ec4899', // Pink-500
    accentColor: '#fbbf24', // Amber-400
    optimizeSafeZones: true,
    logo: null,
    headshot: null
  });

  // Results State
  const [generatedAssets, setGeneratedAssets] = useState<GeneratedAsset[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Check for API Key on mount
  useEffect(() => {
    const checkKey = async () => {
      try {
        if (window.aistudio) {
          const has = await window.aistudio.hasSelectedApiKey();
          setHasApiKey(has);
        }
      } catch (e) {
        console.error("Failed to check API key status", e);
      } finally {
        setIsCheckingKey(false);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      try {
        await window.aistudio.openSelectKey();
        setHasApiKey(true);
      } catch (e) {
        console.error("Failed to select API key", e);
      }
    }
  };

  const handleGenerate = useCallback(async () => {
    if (formState.selectedPlatforms.length === 0) return;

    setIsGenerating(true);
    
    // Initialize loading states for all selected platforms
    const initialAssets: GeneratedAsset[] = formState.selectedPlatforms.map(pid => ({
      platformId: pid,
      imageUrl: '',
      loading: true
    }));
    setGeneratedAssets(initialAssets);

    // Process concurrently (or semi-concurrently depending on limits)
    // We update state as each one finishes to show progress
    const promises = formState.selectedPlatforms.map(async (pid) => {
      try {
        const imageUrl = await generateBannerForPlatform(pid, formState);
        setGeneratedAssets(prev => prev.map(a => 
          a.platformId === pid ? { ...a, loading: false, imageUrl } : a
        ));
      } catch (error) {
        setGeneratedAssets(prev => prev.map(a => 
          a.platformId === pid ? { ...a, loading: false, error: 'Failed to generate' } : a
        ));
      }
    });

    await Promise.allSettled(promises);
    setIsGenerating(false);
  }, [formState]);

  if (isCheckingKey) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-black text-gray-500">
        <svg className="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (!hasApiKey) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-black text-white p-8">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center font-bold text-4xl text-white shadow-2xl mb-8">
          CS
        </div>
        <h1 className="text-4xl font-bold mb-4 text-center">Creator Studio AI</h1>
        <p className="text-gray-400 text-lg mb-8 max-w-lg text-center">
          To generate professional brand assets using <strong>Gemini 3 Pro</strong>, please connect a paid API key.
        </p>
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button 
            onClick={handleSelectKey}
            className="w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11.536 9.636 10.122 10.636 8.707 9.222 6.586 11.343 5.172 10.929 3.757 9.515 1.929 11.343 4 13.414 5.414 12 7.586 14.142 9 12.728 10.414 14.142 12 12.557a6.002 6.002 0 017.743-5.743z" /></svg>
            Connect API Key
          </button>
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-center text-sm text-gray-500 hover:text-gray-300 underline underline-offset-4"
          >
            Learn about billing requirements
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-black text-gray-200 font-sans overflow-hidden">
      
      {/* Top Navigation Bar */}
      <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-gray-900 shrink-0 z-10">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
                CS
            </div>
            <span className="font-bold text-lg tracking-tight text-white">Creator Studio AI</span>
        </div>

        {/* Pills Navigation */}
        <nav className="flex items-center p-1 bg-black rounded-full border border-gray-800">
          <button 
            onClick={() => setActiveTab(Tab.THUMBNAILS)}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === Tab.THUMBNAILS ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Thumbnails
          </button>
          <button 
            onClick={() => setActiveTab(Tab.SOCIAL)}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === Tab.SOCIAL ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Social Graphics
          </button>
          <button 
            onClick={() => setActiveTab(Tab.BANNERS)}
            className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === Tab.BANNERS ? 'bg-primary-600/20 text-primary-400 border border-primary-900' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Profile Banners
          </button>
        </nav>

        <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-gray-800 border border-gray-700"></div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden relative">
        {activeTab === Tab.BANNERS ? (
            <>
                {/* Left Sidebar Form */}
                <BannerForm 
                    formState={formState} 
                    setFormState={setFormState} 
                    onSubmit={handleGenerate}
                    isGenerating={isGenerating}
                />
                
                {/* Right Preview Area */}
                <div className="flex-1 bg-[#0a0a0a] relative flex flex-col">
                    <AssetGrid assets={generatedAssets} />
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
                        backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`,
                        backgroundSize: '32px 32px'
                    }}></div>
                </div>
            </>
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                <p>Select "Profile Banners" to access the new Gemini 3 powered features.</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default App;