import React from 'react';
import type { TeamMember, Rarity } from '../../../types/game';
import { useGameStore } from '../../../stores/gameStore';

interface TeamMemberCardProps {
  member: TeamMember;
  isSelected: boolean;
  canAfford: boolean;
  showAddRemove?: boolean;
  compact?: boolean;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  member,
  isSelected,
  canAfford,
  showAddRemove = false,
  compact = false,
}) => {
  const { addTeamMember, removeTeamMember } = useGameStore();

  const handleToggleSelection = () => {
    if (isSelected) {
      removeTeamMember(member.id);
    } else {
      addTeamMember(member);
    }
  };

  const getRarityColor = (rarity: Rarity) => {
    switch (rarity) {
      case 'common': return 'text-rarity-common border-rarity-common';
      case 'uncommon': return 'text-rarity-uncommon border-rarity-uncommon';
      case 'rare': return 'text-rarity-rare border-rarity-rare';
      case 'epic': return 'text-rarity-epic border-rarity-epic';
      case 'legendary': return 'text-rarity-legendary border-rarity-legendary';
      default: return 'text-noir-400 border-noir-400';
    }
  };

  const getRarityGlow = (rarity: Rarity) => {
    switch (rarity) {
      case 'common': return '';
      case 'uncommon': return 'shadow-emerald';
      case 'rare': return 'shadow-royal';
      case 'epic': return 'shadow-noir';
      case 'legendary': return 'shadow-gold';
      default: return '';
    }
  };

  const getSkillBarColor = (value: number) => {
    if (value >= 8) return 'bg-emerald-500'; // Success green
    if (value >= 6) return 'bg-gold-400'; // Warning gold  
    return 'bg-royal-400'; // Info purple
  };

  if (compact) {
    return (
      <button
        onClick={handleToggleSelection}
        className="text-sm text-blood-500 hover:text-gold-500 transition-colors"
      >
        Remove
      </button>
    );
  }

  const rarityColorClass = getRarityColor(member.rarity);
  const rarityGlowClass = getRarityGlow(member.rarity);

  return (
    <div
      className={`bg-noir-800 border-2 rounded-xl p-4 transition-all duration-300 member-card ${rarityColorClass} ${
        isSelected
          ? `${rarityGlowClass} transform -translate-y-1`
          : canAfford
          ? 'hover:border-gold-500 cursor-pointer'
          : 'border-noir-600 opacity-50 cursor-not-allowed'
      }`}
      onClick={showAddRemove && (canAfford || isSelected) ? handleToggleSelection : undefined}
    >
      {/* Header with Name and Rarity Badge */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-serif font-bold text-gold-300 text-lg">{member.name}</div>
          <div className={`text-xs font-semibold uppercase tracking-wide ${rarityColorClass.split(' ')[0]}`}>
            {member.rarity}
          </div>
        </div>
        <div className="text-gold-300 font-bold text-lg">${member.cost.toLocaleString()}</div>
      </div>

      {/* Specialty */}
      <div className="text-noir-200 text-sm font-medium mb-2">{member.specialty}</div>

      {/* Background */}
      <div className="text-noir-300 text-sm mb-4 italic leading-relaxed">{member.background}</div>

      {/* Skills */}
      <div className="space-y-2 mb-4">
        {Object.entries(member.skills).map(([skill, value]) => (
          <div key={skill} className="flex items-center gap-2">
            <span className="text-xs text-noir-300 capitalize w-18 font-medium">{skill}</span>
            <div className="flex-1 bg-noir-700 rounded-full h-2 border border-noir-600">
              <div
                className={`h-full rounded-full transition-all duration-300 ${getSkillBarColor(value)}`}
                style={{ width: `${(value / 10) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gold-300 w-6 text-right font-bold">{value}</span>
          </div>
        ))}
      </div>

      {/* Special Ability */}
      <div className="text-xs text-noir-200 bg-noir-700 p-3 rounded-lg border border-gold-500/30">
        <span className="text-gold-300 font-semibold">Special: </span>
        {member.special_ability}
      </div>

      {/* Action Button (only shown when showAddRemove is true) */}
      {showAddRemove && (
        <button
          onClick={handleToggleSelection}
          disabled={!canAfford && !isSelected}
          className={`w-full mt-4 py-3 px-4 rounded-lg text-sm font-bold transition-all duration-200 ${
            isSelected
              ? 'bg-blood-500 hover:bg-blood-600 text-gold-300 shadow-noir'
              : canAfford
              ? 'bg-gold-500 hover:bg-gold-400 text-noir-900 shadow-gold'
              : 'bg-noir-600 text-noir-400 cursor-not-allowed'
          }`}
        >
          {isSelected ? 'Remove from Crew' : 'Recruit to Crew'}
        </button>
      )}
    </div>
  );
};

export default TeamMemberCard;