import React from 'react';
import type { TeamMember } from '../../../types/game';
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

  const getSkillBarColor = (value: number) => {
    if (value >= 8) return 'bg-daemon-success';
    if (value >= 6) return 'bg-daemon-warning';
    return 'bg-daemon-info';
  };

  if (compact) {
    return (
      <button
        onClick={handleToggleSelection}
        className="text-sm text-daemon-danger hover:text-daemon-primaryHover transition-colors"
      >
        Remove
      </button>
    );
  }

  return (
    <div
      className={`bg-daemon-panel border rounded-lg p-4 transition-all duration-200 ${
        isSelected
          ? 'border-daemon-primary shadow-infernal'
          : canAfford
          ? 'border-daemon-secondary hover:border-daemon-primary cursor-pointer'
          : 'border-gray-600 opacity-50 cursor-not-allowed'
      }`}
      onClick={showAddRemove && (canAfford || isSelected) ? handleToggleSelection : undefined}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="font-semibold text-daemon-text-bright">{member.name}</div>
        <div className="text-daemon-gold font-semibold">${member.cost.toLocaleString()}</div>
      </div>

      {/* Specialty */}
      <div className="text-daemon-text-muted text-sm mb-2">{member.specialty}</div>

      {/* Background */}
      <div className="text-daemon-text text-sm mb-4">{member.background}</div>

      {/* Skills */}
      <div className="space-y-2 mb-4">
        {Object.entries(member.skills).map(([skill, value]) => (
          <div key={skill} className="flex items-center gap-2">
            <span className="text-xs text-daemon-text-muted capitalize w-16">{skill}</span>
            <div className="flex-1 bg-daemon-surface rounded-full h-2">
              <div
                className={`h-full rounded-full transition-all duration-300 ${getSkillBarColor(value)}`}
                style={{ width: `${(value / 10) * 100}%` }}
              />
            </div>
            <span className="text-xs text-daemon-text-muted w-6 text-right">{value}</span>
          </div>
        ))}
      </div>

      {/* Special Ability */}
      <div className="text-xs text-daemon-text-muted bg-daemon-surface p-2 rounded border border-daemon-secondary">
        {member.special_ability}
      </div>

      {/* Action Button (only shown when showAddRemove is true) */}
      {showAddRemove && (
        <button
          onClick={handleToggleSelection}
          disabled={!canAfford && !isSelected}
          className={`w-full mt-3 py-2 px-3 rounded text-sm font-semibold transition-colors ${
            isSelected
              ? 'bg-daemon-danger hover:bg-red-600 text-white'
              : canAfford
              ? 'bg-daemon-primary hover:bg-daemon-primaryHover text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSelected ? 'Remove' : 'Add to Crew'}
        </button>
      )}
    </div>
  );
};

export default TeamMemberCard;