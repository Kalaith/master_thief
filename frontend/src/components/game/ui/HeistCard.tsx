import React from 'react';
import type { HeistTarget } from '../../../types/game';
import { DollarSign, AlertTriangle, Clock } from 'lucide-react';

interface HeistCardProps {
  heist: HeistTarget;
  isSelected: boolean;
  onSelect: () => void;
}

const HeistCard: React.FC<HeistCardProps> = ({ heist, isSelected, onSelect }) => {
  const getDifficultyColor = (difficulty: HeistTarget['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-emerald-400 border-emerald-400 bg-emerald-400/10';
      case 'Medium':
        return 'text-amber-400 border-amber-400 bg-amber-400/10';
      case 'Hard':
        return 'text-red-400 border-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 border-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div
      className={`bg-heist-panel border rounded-xl p-6 cursor-pointer transition-all duration-300 shadow-hud-panel ${
        isSelected
          ? `border-cyan-400 shadow-cyan-glow-lg transform -translate-y-1 animate-pulse-cyan`
          : 'border-heist-border hover:border-cyan-400/50 hover:shadow-cyan-glow'
      }`}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-cyan-400 uppercase tracking-wide">{heist.name}</h3>
        <div
          className={`px-3 py-1 rounded text-xs font-bold font-mono border uppercase ${getDifficultyColor(
            heist.difficulty
          )}`}
        >
          {heist.difficulty}
        </div>
      </div>

      {/* Payout */}
      <div className="mb-4 bg-heist-dark/60 p-3 rounded border border-amber-400/30 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-amber-300" />
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs font-mono uppercase">Potential Take</span>
            <span className="text-amber-300 font-bold font-mono text-xl">
              ${heist.potential_payout.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-5 leading-relaxed border-l-2 border-cyan-400/50 pl-3">
        {heist.description}
      </p>

      {/* Encounters Preview */}
      <div className="space-y-3">
        <h4 className="flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wide border-b border-heist-border pb-2">
          <AlertTriangle className="w-4 h-4" />
          Mission Objectives
        </h4>
        <ul className="space-y-2">
          {heist.encounters.map((encounter, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-300 text-sm">
              <div className="w-6 h-6 bg-cyan-400/20 border border-cyan-400/50 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-400 font-mono text-xs font-bold">{index + 1}</span>
              </div>
              <span className="font-medium">{encounter.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* HUD-style footer */}
      <div className="mt-4 pt-3 border-t border-heist-border flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
          <Clock className="w-3 h-3" />
          <span>SELECT TARGET TO PROCEED</span>
        </div>
        {isSelected && (
          <div className="text-xs font-mono text-cyan-400 animate-pulse">▶ SELECTED</div>
        )}
      </div>
    </div>
  );
};

export default HeistCard;
