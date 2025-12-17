import React from 'react';
import { PLATFORMS } from '../constants';
import { PlatformId } from '../types';

interface PlatformSelectorProps {
  selected: PlatformId[];
  onChange: (selected: PlatformId[]) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({ selected, onChange }) => {
  const togglePlatform = (id: PlatformId) => {
    if (selected.includes(id)) {
      onChange(selected.filter(p => p !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const categories = Array.from(new Set(Object.values(PLATFORMS).map(p => p.category)));

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Target Platforms</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(category => (
          <div key={category} className="space-y-2">
            <h4 className="text-xs font-medium text-gray-500">{category}</h4>
            <div className="space-y-2">
              {Object.values(PLATFORMS)
                .filter(p => p.category === category)
                .map(platform => {
                  const isSelected = selected.includes(platform.id);
                  return (
                    <label 
                      key={platform.id} 
                      className={`flex items-center p-3 rounded-lg border transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-primary-600/10 border-primary-500 text-white' 
                          : 'bg-gray-850 border-gray-700 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isSelected}
                        onChange={() => togglePlatform(platform.id)}
                      />
                      <div className={`w-4 h-4 rounded border flex items-center justify-center mr-3 ${
                        isSelected ? 'bg-primary-500 border-primary-500' : 'border-gray-500'
                      }`}>
                         {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className="text-sm font-medium">{platform.label}</span>
                    </label>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};