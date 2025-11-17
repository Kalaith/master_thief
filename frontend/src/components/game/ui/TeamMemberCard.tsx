import React from 'react';
import type { TeamMember, Rarity } from '../../../types/game';
import { useGameStore } from '../../../stores/gameStore';
import { DollarSign, Sparkles } from 'lucide-react';

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

  const rarityConfig = {
    common: {
      text: 'text-slate-400',
      border: 'border-slate-400',
      glow: 'shadow-slate-400/20',
      bg: 'bg-slate-400/10'
    },
    uncommon: {
      text: 'text-emerald-400',
      border: 'border-emerald-400',
      glow: 'shadow-emerald-400/30',
      bg: 'bg-emerald-400/10'
    },
    rare: {
      text: 'text-blue-400',
      border: 'border-blue-400',
      glow: 'shadow-blue-400/30',
      bg: 'bg-blue-400/10'
    },
    epic: {
      text: 'text-purple-400',
      border: 'border-purple-400',
      glow: 'shadow-purple-glow',
      bg: 'bg-purple-400/10'
    },
    legendary: {
      text: 'text-amber-400',
      border: 'border-amber-400',
      glow: 'shadow-amber-glow',
      bg: 'bg-amber-400/10'
    }
  };

  const getSkillBarColor = (value: number) => {
    if (value >= 8) return 'from-emerald-500 to-emerald-400';
    if (value >= 6) return 'from-cyan-500 to-cyan-400';
    return 'from-purple-500 to-purple-400';
  };

  if (compact) {
    return (
      <button
        onClick={handleToggleSelection}
        className="text-sm text-red-400 hover:text-red-300 transition-colors font-mono"
      >
        Remove
      </button>
    );
  }

  const rarity = rarityConfig[member.rarity];

  return (
    <div
      className={`relative bg-heist-panel border ${rarity.border} rounded-xl p-4 shadow-hud-panel transition-all duration-300 ${
        isSelected
          ? `${rarity.glow} transform -translate-y-1`
          : canAfford
          ? 'hover:border-cyan-400/50 hover:shadow-cyan-glow cursor-pointer'
          : 'opacity-50 cursor-not-allowed'
      }`}
      onClick={showAddRemove && (canAfford || isSelected) ? handleToggleSelection : undefined}
    >
      {/* Rarity indicator bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${rarity.bg} rounded-t-xl`} />

      {/* Header with Name and Cost */}
      <div className="flex justify-between items-start mb-3 mt-1">
        <div>
          <div className="font-bold text-white text-base uppercase tracking-wide">{member.name}</div>
          <div className={`text-xs font-mono uppercase tracking-wide ${rarity.text}`}>
            {member.rarity}
          </div>
        </div>
        <div className="flex items-center gap-1 bg-amber-400/10 border border-amber-400/30 rounded px-2 py-1">
          <DollarSign className="w-4 h-4 text-amber-300" />
          <span className="text-amber-300 font-bold font-mono">{member.cost.toLocaleString()}</span>
        </div>
      </div>

      {/* Specialty */}
      <div className="text-gray-300 text-sm font-medium font-mono mb-2 border-l-2 border-cyan-400/50 pl-2">
        {member.specialty}
      </div>

      {/* Background */}
      <div className="text-gray-400 text-xs mb-4 leading-relaxed">{member.background}</div>

      {/* Skills */}
      <div className="space-y-2 mb-4">
        {Object.entries(member.skills).map(([skill, value]) => (
          <div key={skill} className="flex items-center gap-2">
            <span className="text-xs text-gray-400 capitalize w-18 font-mono uppercase">{skill}</span>
            <div className="flex-1 bg-heist-dark rounded-full h-2 border border-heist-border overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 bg-gradient-to-r ${getSkillBarColor(value)}`}
                style={{ width: `${(value / 10) * 100}%` }}
              />
            </div>
            <span className="text-xs text-cyan-400 w-6 text-right font-bold font-mono">{value}</span>
          </div>
        ))}
      </div>

      {/* Special Ability */}
      <div className="text-xs text-gray-300 bg-purple-400/10 p-3 rounded border border-purple-400/30">
        <div className="flex items-center gap-1 text-purple-400 font-mono uppercase mb-1">
          <Sparkles className="w-3 h-3" />
          Special Ability
        </div>
        <div className="text-gray-300">{member.special_ability}</div>
      </div>

      {/* Action Button (only shown when showAddRemove is true) */}
      {showAddRemove && (
        <button
          onClick={handleToggleSelection}
          disabled={!canAfford && !isSelected}
          className={`w-full mt-4 py-3 px-4 rounded font-bold font-mono uppercase text-sm transition-all duration-200 ${
            isSelected
              ? 'bg-red-600/20 hover:bg-red-600/30 border border-red-400 text-red-400'
              : canAfford
              ? 'bg-cyan-400/20 hover:bg-cyan-400/30 border border-cyan-400 text-cyan-400 hover:shadow-cyan-glow'
              : 'bg-heist-dark border border-heist-border text-gray-600 cursor-not-allowed'
          }`}
        >
          {isSelected ? 'Remove from Crew' : 'Recruit to Crew'}
        </button>
      )}
    </div>
  );
};

export default TeamMemberCard;