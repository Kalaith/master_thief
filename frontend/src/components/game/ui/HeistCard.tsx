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
        return 'text-daemon-success border-daemon-success';
      case 'Medium':
        return 'text-daemon-warning border-daemon-warning';
      case 'Hard':
        return 'text-daemon-danger border-daemon-danger';
      default:
        return 'text-daemon-text border-daemon-secondary';
    }
  };

  return (
    <div
      className={`bg-daemon-panel border rounded-lg p-6 cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-daemon-primary shadow-infernal'
          : 'border-daemon-secondary hover:border-daemon-primary'
      }`}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-daemon-text-bright">{heist.name}</h3>
        <div
          className={`px-2 py-1 rounded text-xs font-semibold border ${getDifficultyColor(
            heist.difficulty
          )}`}
        >
          {heist.difficulty}
        </div>
      </div>

      {/* Payout */}
      <div className="mb-4">
        <span className="text-daemon-text-muted text-sm">Potential: </span>
        <span className="text-daemon-gold font-semibold text-lg">
          ${heist.potential_payout.toLocaleString()}
        </span>
      </div>

      {/* Description */}
      <p className="text-daemon-text text-sm mb-4">{heist.description}</p>

      {/* Encounters Preview */}
      <div className="space-y-2">
        <h4 className="text-daemon-text-bright font-semibold text-sm">Challenges:</h4>
        <ul className="space-y-1">
          {heist.encounters.map((encounter, index) => (
            <li key={index} className="text-daemon-text-muted text-xs flex items-center gap-2">
              <span className="w-1 h-1 bg-daemon-primary rounded-full"></span>
              {encounter.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HeistCard;