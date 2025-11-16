import React from 'react';
import { useTeamAssignment } from '../../hooks/useTeamAssignment';
import { MissionService } from '../../services/missionService';
import { useGameStore } from '../../stores/gameStore';
import type { AutomatedHeist } from '../../types/game';
import toast from 'react-hot-toast';

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
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif font-bold text-gold-300">👥 Team Assignment</h2>
        <p className="text-noir-200 max-w-2xl mx-auto">
          Select team members for the mission: {mission.name}
        </p>
      </div>

      {/* Active Mission Warning */}
      {!canStartMission && (
        <div className="bg-blood-500/20 border-2 border-blood-500/50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="text-blood-400 text-2xl">⚠️</div>
            <div>
              <h3 className="text-blood-300 font-bold">Active Mission in Progress</h3>
              <p className="text-blood-200 text-sm">
                You cannot start a new mission while you have {activeAutomatedHeists.length} active mission{activeAutomatedHeists.length > 1 ? 's' : ''}. 
                Please wait for the current mission{activeAutomatedHeists.length > 1 ? 's' : ''} to complete.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-noir-800 border-2 border-gold-500/30 rounded-xl p-6">
        <h3 className="text-2xl font-serif font-bold text-gold-300 mb-4">
          Mission Details
        </h3>
        <p className="text-noir-200 mb-4">{mission.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-noir-400">Duration:</span>
            <div className="text-noir-200 font-semibold">{mission.duration} hours</div>
          </div>
          <div>
            <span className="text-noir-400">Risk Level:</span>
            <div className={`font-semibold ${MissionService.getMissionRiskColor(mission.riskLevel)}`}>
              {mission.riskLevel}/10
            </div>
          </div>
          <div>
            <span className="text-noir-400">Team Size:</span>
            <div className="text-noir-200 font-semibold">
              {assignedTeam.length} / {mission.requirements.minTeamSize}-{mission.requirements.maxTeamSize}
            </div>
          </div>
          <div>
            <span className="text-noir-400">Reward:</span>
            <div className="text-blood-500 font-semibold">${mission.rewards.basePayout}</div>
          </div>
        </div>

        {mission.requirements.requiredSkills && (
          <div className="mt-4">
            <span className="text-noir-400 text-sm">Required Skills:</span>
            <div className="text-noir-200 text-sm">{MissionService.getMissionRequirementsText(mission)}</div>
          </div>
        )}
      </div>

      <div className="bg-noir-800 border-2 border-gold-500/20 rounded-xl p-6">
        <h3 className="text-xl font-serif font-bold text-gold-300 mb-4">Available Team Members</h3>
        
        {/* Selected Team Summary */}
        {assignedTeam.length > 0 && (
          <div className="mb-4 p-3 bg-gold-500/10 border border-gold-500/30 rounded-lg">
            <h4 className="text-gold-300 font-semibold text-sm mb-2">Selected Team ({assignedTeam.length})</h4>
            <div className="flex flex-wrap gap-2">
              {assignedTeam.map((member) => (
                <div key={member.id} className="px-2 py-1 bg-gold-500/20 text-gold-200 text-xs rounded border border-gold-500/40">
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
                    ? 'border-noir-600 bg-noir-800 opacity-50 cursor-not-allowed'
                    : isSelected
                    ? 'border-gold-400 bg-gradient-to-br from-gold-500/20 to-gold-600/10 shadow-lg shadow-gold-500/20 cursor-pointer'
                    : 'border-noir-600 bg-noir-700 hover:border-gold-500/50 hover:bg-noir-600 cursor-pointer'
                }`}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-noir-900 text-sm font-bold">✓</span>
                  </div>
                )}

                <div className="flex justify-between items-start">
                  <div className={`flex-1 ${isSelected ? 'opacity-90' : ''}`}>
                    <h5 className={`font-bold ${isSelected ? 'text-gold-200' : 'text-noir-200'}`}>
                      {member.name}
                    </h5>
                    <p className="text-noir-400 text-sm">{member.characterClass} • {member.specialty}</p>
                    <div className="mt-2 space-y-1">
                      {Object.entries(member.skills).slice(0, 3).map(([skill, level]) => (
                        <div key={skill} className="text-xs text-noir-300">
                          {skill}: {level}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className={`text-xs font-semibold ${isSelected ? 'text-gold-300' : 'text-noir-400'}`}>
                      Level {member.progression.level}
                    </div>
                    <div className={`text-xs ${isSelected ? 'text-gold-300' : 'text-noir-400'}`}>
                      HP: {member.derivedStats.health}
                    </div>
                    {isSelected && (
                      <div className="mt-1 px-2 py-1 bg-gold-500/20 rounded text-xs font-bold text-gold-300 border border-gold-500/30">
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
          className="py-3 px-6 border-2 border-gold-500 text-gold-300 hover:bg-gold-500 hover:text-noir-900 rounded-xl font-serif font-bold transition-all duration-200"
        >
          ← Back to Missions
        </button>

        <button
          onClick={handleConfirm}
          disabled={!isTeamValid(mission) || !canStartMission}
          className={`py-3 px-6 rounded-xl font-bold transition-colors ${
            isTeamValid(mission) && canStartMission
              ? 'bg-gradient-to-r from-blood-500 to-gold-500 hover:from-blood-600 hover:to-gold-400 text-noir-900'
              : 'bg-noir-600 text-noir-500 cursor-not-allowed'
          }`}
        >
          Start Mission
        </button>
      </div>
    </div>
  );
};

export default TeamAssignment;