import React from 'react';
import type { HeistTarget } from '../../../types/game';

interface HeistCardProps {
  heist: HeistTarget;
  isSelected: boolean;
  onSelect: () => void;
}

const HeistCard: React.FC<HeistCardProps> = ({ heist, isSelected, onSelect }) => {
  const getDifficultyColor = (difficulty: HeistTarget['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-emerald-400 border-emerald-400';
      case 'Medium':
        return 'text-gold-400 border-gold-400';
      case 'Hard':
        return 'text-blood-500 border-blood-500';
      default:
        return 'text-noir-400 border-noir-400';
    }
  };

  const getDifficultyGlow = (difficulty: HeistTarget['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'shadow-emerald';
      case 'Medium':
        return 'shadow-gold';
      case 'Hard':
        return 'shadow-noir';
      default:
        return '';
    }
  };

  return (
    <div
      className={`bg-noir-800 border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 heist-card ${
        isSelected
          ? `border-gold-500 shadow-gold-lg transform -translate-y-1`
          : 'border-noir-600 hover:border-gold-500 hover:shadow-gold'
      }`}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-serif font-bold text-gold-300">{heist.name}</h3>
        <div
          className={`px-3 py-1 rounded-lg text-xs font-bold border-2 ${getDifficultyColor(
            heist.difficulty
          )} ${isSelected ? getDifficultyGlow(heist.difficulty) : ''}`}
        >
          {heist.difficulty}
        </div>
      </div>

      {/* Payout */}
      <div className="mb-4 bg-noir-700 p-3 rounded-lg border border-gold-500/30">
        <span className="text-noir-300 text-sm">Potential Take: </span>
        <span className="text-gold-300 font-bold text-xl">
          ${heist.potential_payout.toLocaleString()}
        </span>
      </div>

      {/* Description */}
      <p className="text-noir-200 text-sm mb-5 italic leading-relaxed">{heist.description}</p>

      {/* Encounters Preview */}
      <div className="space-y-3">
        <h4 className="text-gold-300 font-serif font-semibold text-base border-b border-gold-500/30 pb-1">
          The Job:
        </h4>
        <ul className="space-y-2">
          {heist.encounters.map((encounter, index) => (
            <li key={index} className="text-noir-300 text-sm flex items-center gap-3">
              <span className="w-2 h-2 bg-blood-500 rounded-full flex-shrink-0"></span>
              <span className="font-medium text-noir-200">{encounter.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Noir atmosphere decoration */}
      <div className="mt-4 pt-3 border-t border-gold-500/20 text-center">
        <span className="text-xs text-gold-400 font-serif italic">
          "Every job tells a story..."
        </span>
      </div>
    </div>
  );
};

export default HeistCard;