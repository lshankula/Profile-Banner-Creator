import React from 'react';
import { GeneratedAsset } from '../types';
import { PLATFORMS } from '../constants';

interface AssetGridProps {
  assets: GeneratedAsset[];
}

export const AssetGrid: React.FC<AssetGridProps> = ({ assets }) => {
  if (assets.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500 h-full p-12 text-center">
        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-300 mb-2">Ready to Design</h2>
        <p className="max-w-md">Select your target platforms and define your brand identity on the left to generate a complete profile kit using Gemini 3.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8">Generated Brand Kit</h2>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {assets.map((asset) => {
            const platform = PLATFORMS[asset.platformId];
            
            return (
              <div key={asset.platformId} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-xl flex flex-col">
                <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-850">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-200">{platform.label}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-700 text-gray-400">{platform.aspectRatio}</span>
                  </div>
                  {asset.imageUrl && !asset.loading && (
                    <a 
                      href={asset.imageUrl} 
                      download={`${platform.id}_banner.png`}
                      className="text-xs font-bold text-primary-400 hover:text-primary-300 flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Download
                    </a>
                  )}
                </div>

                <div className="relative bg-gray-900 w-full min-h-[300px] flex items-center justify-center p-4">
                  {/* Aspect Ratio Container */}
                  {asset.loading ? (
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-8 w-8 bg-primary-600 rounded-full animate-bounce mb-2"></div>
                        <span className="text-gray-500 text-sm">Rendering with Gemini Nano...</span>
                    </div>
                  ) : asset.error ? (
                    <div className="text-red-400 p-4 text-center">
                        <p className="font-bold">Generation Failed</p>
                        <p className="text-sm">{asset.error}</p>
                    </div>
                  ) : (
                    <img 
                      src={asset.imageUrl} 
                      alt={platform.label} 
                      className="w-full h-auto rounded shadow-sm object-cover"
                    />
                  )}
                </div>
                
                <div className="p-3 bg-gray-850 text-xs text-gray-500 border-t border-gray-700">
                    <span className="font-semibold text-gray-400">Smart Safe Zone:</span> {platform.safeZoneInstruction}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};