import React from 'react';
import { BannerFormState, PlatformId } from '../types';
import { PlatformSelector } from './PlatformSelector';

interface BannerFormProps {
  formState: BannerFormState;
  setFormState: React.Dispatch<React.SetStateAction<BannerFormState>>;
  onSubmit: () => void;
  isGenerating: boolean;
}

export const BannerForm: React.FC<BannerFormProps> = ({ formState, setFormState, onSubmit, isGenerating }) => {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (key: 'headshot' | 'logo') => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormState(prev => ({ ...prev, [key]: e.target.files![0] }));
    }
  };

  const removeFile = (key: 'headshot' | 'logo') => {
      setFormState(prev => ({ ...prev, [key]: null }));
  };

  return (
    <div className="bg-gray-900 border-r border-gray-800 p-6 h-full overflow-y-auto w-full md:w-[450px] shrink-0 flex flex-col gap-8">
      
      {/* Section A: Platforms */}
      <PlatformSelector 
        selected={formState.selectedPlatforms} 
        onChange={(platforms) => setFormState(prev => ({ ...prev, selectedPlatforms: platforms }))} 
      />

      <hr className="border-gray-800" />

      {/* Section B: Text Inputs */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Brand Content</h3>
        
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Headline / Name</label>
          <input
            type="text"
            name="headline"
            value={formState.headline}
            onChange={handleInputChange}
            placeholder="e.g. John Doe"
            className="w-full bg-gray-850 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Subtitle / Tagline</label>
          <input
            type="text"
            name="tagline"
            value={formState.tagline}
            onChange={handleInputChange}
            placeholder="e.g. Helping you scale with AI"
            className="w-full bg-gray-850 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Call to Action (CTA)</label>
          <input
            type="text"
            name="cta"
            value={formState.cta}
            onChange={handleInputChange}
            placeholder="e.g. Link in Bio"
            className="w-full bg-gray-850 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      <hr className="border-gray-800" />

      {/* Section C: Visuals */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Visual Identity</h3>
            <label className="flex items-center space-x-2 cursor-pointer group">
                <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${formState.optimizeSafeZones ? 'bg-primary-600' : 'bg-gray-700'}`}>
                    <div className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${formState.optimizeSafeZones ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
                <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={formState.optimizeSafeZones}
                    onChange={(e) => setFormState(prev => ({...prev, optimizeSafeZones: e.target.checked}))}
                />
                <span className="text-xs text-gray-500 group-hover:text-gray-300">Smart Safe Zones</span>
            </label>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Visual Theme / Vibe</label>
          <textarea
            name="theme"
            value={formState.theme}
            onChange={handleInputChange}
            placeholder="e.g. Modern minimalist office, dark cyberpunk city, abstract blue gradients..."
            rows={3}
            className="w-full bg-gray-850 border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
          />
        </div>

        {/* Brand Colors */}
        <div className="grid grid-cols-3 gap-3">
            <div>
                <label className="block text-[10px] font-medium text-gray-400 mb-1 uppercase tracking-wide">Primary</label>
                <div className="flex flex-col gap-2">
                    <input
                        type="color"
                        name="primaryColor"
                        value={formState.primaryColor}
                        onChange={handleInputChange}
                        className="h-8 w-full rounded border border-gray-700 cursor-pointer bg-transparent p-0"
                    />
                    <input
                        type="text"
                        name="primaryColor"
                        value={formState.primaryColor}
                        onChange={handleInputChange}
                        className="w-full bg-gray-850 border border-gray-700 rounded-md p-1.5 text-white text-[10px] text-center uppercase"
                    />
                </div>
            </div>
            <div>
                <label className="block text-[10px] font-medium text-gray-400 mb-1 uppercase tracking-wide">Secondary</label>
                <div className="flex flex-col gap-2">
                    <input
                        type="color"
                        name="secondaryColor"
                        value={formState.secondaryColor}
                        onChange={handleInputChange}
                        className="h-8 w-full rounded border border-gray-700 cursor-pointer bg-transparent p-0"
                    />
                    <input
                        type="text"
                        name="secondaryColor"
                        value={formState.secondaryColor}
                        onChange={handleInputChange}
                        className="w-full bg-gray-850 border border-gray-700 rounded-md p-1.5 text-white text-[10px] text-center uppercase"
                    />
                </div>
            </div>
             <div>
                <label className="block text-[10px] font-medium text-gray-400 mb-1 uppercase tracking-wide">Accent</label>
                <div className="flex flex-col gap-2">
                    <input
                        type="color"
                        name="accentColor"
                        value={formState.accentColor}
                        onChange={handleInputChange}
                        className="h-8 w-full rounded border border-gray-700 cursor-pointer bg-transparent p-0"
                    />
                    <input
                        type="text"
                        name="accentColor"
                        value={formState.accentColor}
                        onChange={handleInputChange}
                        className="w-full bg-gray-850 border border-gray-700 rounded-md p-1.5 text-white text-[10px] text-center uppercase"
                    />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            {/* Logo Upload */}
            <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Logo (Optional)</label>
                <div className={`relative border border-dashed rounded-lg p-2 text-center transition-colors h-24 flex flex-col items-center justify-center ${formState.logo ? 'border-primary-500 bg-primary-900/10' : 'border-gray-600 hover:bg-gray-800'}`}>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange('logo')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={!!formState.logo}
                    />
                    {formState.logo ? (
                        <div className="flex flex-col items-center z-10 w-full px-1">
                            <span className="text-primary-400 font-bold text-xs mb-1 truncate w-full">{formState.logo.name}</span>
                            <button 
                                onClick={() => removeFile('logo')}
                                className="text-[10px] bg-gray-800 text-gray-300 px-2 py-1 rounded hover:text-white"
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div className="text-gray-400 flex flex-col items-center gap-1">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            <span className="text-[10px]">Upload Logo</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Headshot Upload */}
            <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Headshot (Optional)</label>
                <div className={`relative border border-dashed rounded-lg p-2 text-center transition-colors h-24 flex flex-col items-center justify-center ${formState.headshot ? 'border-primary-500 bg-primary-900/10' : 'border-gray-600 hover:bg-gray-800'}`}>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange('headshot')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={!!formState.headshot}
                    />
                    {formState.headshot ? (
                        <div className="flex flex-col items-center z-10 w-full px-1">
                            <span className="text-primary-400 font-bold text-xs mb-1 truncate w-full">{formState.headshot.name}</span>
                            <button 
                                onClick={() => removeFile('headshot')}
                                className="text-[10px] bg-gray-800 text-gray-300 px-2 py-1 rounded hover:text-white"
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div className="text-gray-400 flex flex-col items-center gap-1">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            <span className="text-[10px]">Upload Photo</span>
                        </div>
                    )}
                </div>
            </div>
        </div>

      </div>

      <div className="mt-auto pt-4 pb-12">
        <button
            onClick={onSubmit}
            disabled={isGenerating || formState.selectedPlatforms.length === 0}
            className={`w-full py-4 px-6 rounded-lg font-bold text-white shadow-lg transition-all transform active:scale-95 ${
                isGenerating 
                ? 'bg-gray-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 shadow-primary-500/20'
            }`}
        >
            {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Kit...
                </span>
            ) : (
                `Generate ${formState.selectedPlatforms.length > 0 ? formState.selectedPlatforms.length : ''} Assets`
            )}
        </button>
      </div>

    </div>
  );
};