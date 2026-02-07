import React from 'react';
import { useTeamAssignment } from '../../hooks/useTeamAssignment';
import { MissionService } from '../../services/missionService';
import { useGameStore } from '../../stores/gameStore';
import type { AutomatedHeist } from '../../types/game';
import toast from 'react-hot-toast';
import { formatDuration } from '../../utils/timeFormatting';

interface TeamAssignmentProps {
  mission: AutomatedHeist;
  onConfirm: () => void;
  onCancel: () => void;
}

const TeamAssignment: React.FC<TeamAssignmentProps> = ({ mission, onConfirm, onCancel }) => {
  const { assignedTeam, availableCharacters, toggleTeamMember, isTeamValid, assignTeamForMission } = useTeamAssignment();
  const { activeAutomatedHeists } = useGameStore();

  const canStartMission = MissionService.canStartNewMission(activeAutomatedHeists.length).canStart;

  const handleConfirm = () => {
    const success = assignTeamForMission(mission, onConfirm);
    if (!success) {
      const validation = MissionService.validateTeamForMission(assignedTeam, mission);
      toast.error(validation.message!);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4 bg-heist-panel border border-heist-border p-8 rounded-xl shadow-hud-panel">
        <h2 className="text-4xl font-bold text-cyan-400 uppercase tracking-wide">Team Assignment</h2>
        <p className="text-gray-300 max-w-2xl mx-auto font-mono">
          Select team members for the mission: <span className="text-cyan-400">{mission.name}</span>
        </p>
      </div>

      {/* Active Mission Warning */}
      {!canStartMission && (
        <div className="bg-red-600/20 border-2 border-red-500/50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="text-red-400 text-2xl">⚠️</div>
            <div>
              <h3 className="text-red-300 font-bold uppercase tracking-wide">Active Mission in Progress</h3>
              <p className="text-red-200 text-sm font-mono">
                You cannot start a new mission while you have {activeAutomatedHeists.length} active mission{activeAutomatedHeists.length > 1 ? 's' : ''}.
                Please wait for the current mission{activeAutomatedHeists.length > 1 ? 's' : ''} to complete.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-heist-panel border border-heist-border rounded-xl p-6 shadow-hud-panel">
        <h3 className="text-2xl font-bold text-cyan-400 mb-4 uppercase tracking-wide">
          Mission Details
        </h3>
        <p className="text-gray-300 mb-4 font-mono">{mission.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-400 font-mono uppercase">Duration:</span>
            <div className="text-cyan-400 font-semibold font-mono">{formatDuration(mission.duration)}</div>
          </div>
          <div>
            <span className="text-gray-400 font-mono uppercase">Risk Level:</span>
            <div className={`font-semibold font-mono ${MissionService.getMissionRiskColor(mission.riskLevel)}`}>
              {mission.riskLevel}/10
            </div>
          </div>
          <div>
            <span className="text-gray-400 font-mono uppercase">Team Size:</span>
            <div className="text-cyan-400 font-semibold font-mono">
              {assignedTeam.length} / {mission.requirements.minTeamSize}-{mission.requirements.maxTeamSize}
            </div>
          </div>
          <div>
            <span className="text-gray-400 font-mono uppercase">Reward:</span>
            <div className="text-amber-300 font-semibold font-mono">${mission.rewards.basePayout.toLocaleString()}</div>
          </div>
        </div>

        {mission.requirements.requiredSkills && (
          <div className="mt-4">
            <span className="text-gray-400 text-sm font-mono uppercase">Required Skills:</span>
            <div className="text-cyan-400 text-sm font-mono">{MissionService.getMissionRequirementsText(mission)}</div>
          </div>
        )}
      </div>

      <div className="bg-heist-panel border border-heist-border rounded-xl p-6 shadow-hud-panel">
        <h3 className="text-xl font-bold text-cyan-400 mb-4 uppercase tracking-wide">Available Team Members</h3>
        
        {/* Selected Team Summary */}
        {assignedTeam.length > 0 && (
          <div className="mb-4 p-3 bg-cyan-400/10 border border-cyan-400/30 rounded-lg">
            <h4 className="text-cyan-400 font-semibold text-sm mb-2 font-mono uppercase tracking-wide">Selected Team ({assignedTeam.length})</h4>
            <div className="flex flex-wrap gap-2">
              {assignedTeam.map((member) => (
                <div key={member.id} className="px-2 py-1 bg-cyan-400/20 text-cyan-300 text-xs rounded border border-cyan-400/40 font-mono">
                  {member.name}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {availableCharacters.map((member) => {
            const isSelected = assignedTeam.some(m => m.id === member.id);
            return (
              <div
                key={member.id}
                onClick={() => canStartMission && toggleTeamMember(member)}
                className={`relative p-4 rounded-lg border-2 transition-all duration-200 ${
                  !canStartMission
                    ? 'border-heist-border bg-heist-dark opacity-50 cursor-not-allowed'
                    : isSelected
                    ? 'border-cyan-400 bg-gradient-to-br from-cyan-400/20 to-cyan-600/10 shadow-lg shadow-cyan-500/20 cursor-pointer hover:border-cyan-300'
                    : 'border-heist-border bg-heist-dark hover:border-cyan-400/50 hover:bg-heist-panel cursor-pointer'
                }`}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-black text-sm font-bold">✓</span>
                  </div>
                )}

                <div className="flex justify-between items-start">
                  <div className={`flex-1 ${isSelected ? 'opacity-90' : ''}`}>
                    <h5 className={`font-bold uppercase tracking-wide ${isSelected ? 'text-cyan-300' : 'text-gray-200'}`}>
                      {member.name}
                    </h5>
                    <p className="text-gray-400 text-sm font-mono">{member.characterClass} • {member.specialty}</p>
                    <div className="mt-2 space-y-1">
                      {Object.entries(member.skills).slice(0, 3).map(([skill, level]) => (
                        <div key={skill} className="text-xs text-gray-300 font-mono capitalize">
                          {skill}: <span className="text-cyan-400">{level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className={`text-xs font-semibold font-mono ${isSelected ? 'text-cyan-400' : 'text-gray-400'}`}>
                      Level {member.progression.level}
                    </div>
                    <div className={`text-xs font-mono ${isSelected ? 'text-cyan-400' : 'text-gray-400'}`}>
                      HP: {member.derivedStats.health}
                    </div>
                    {isSelected && (
                      <div className="mt-1 px-2 py-1 bg-cyan-400/20 rounded text-xs font-bold text-cyan-400 border border-cyan-400/30 uppercase tracking-wide">
                        SELECTED
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onCancel}
          className="py-3 px-6 border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black rounded-xl font-bold uppercase tracking-wide transition-all duration-200"
        >
          ← Back to Missions
        </button>

        <button
          onClick={handleConfirm}
          disabled={!isTeamValid(mission) || !canStartMission}
          className={`py-3 px-6 rounded-xl font-bold uppercase tracking-wide transition-all duration-200 shadow-lg ${
            isTeamValid(mission) && canStartMission
              ? 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-400 text-white shadow-purple-glow'
              : 'bg-heist-dark/60 text-gray-600 cursor-not-allowed border border-heist-border'
          }`}
        >
          Start Mission →
        </button>
      </div>
    </div>
  );
};

export default TeamAssignment;