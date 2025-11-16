import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useGameStore } from '../../../stores/gameStore';
import TeamAssignment from '../TeamAssignment';
import type { AutomatedHeist } from '../../../types/game';

interface MissionsPageProps {
  onBackToGame: () => void;
}

const MissionsPage: React.FC<MissionsPageProps> = ({ onBackToGame }) => {
  const { activeAutomatedHeists, automatedHeists, selectedTeam } = useGameStore();
  const [selectedHeist, setSelectedHeist] = useState<string | null>(null);
  const [missionForTeamAssignment, setMissionForTeamAssignment] = useState<AutomatedHeist | null>(null);

  // No longer need component-level timer - it's now global in the store

  const availableHeists = automatedHeists.filter((heist) => {
    // Show heists that are always available (no unlock conditions) or tutorial heists
    return !heist.unlockConditions || heist.unlockConditions.length === 0 ||
           heist.unlockConditions.some(condition =>
             condition.includes('always available') || condition.includes('Tutorial')
           );
  });

  // If no heists are available, show the first few as a fallback for development
  const displayHeists = availableHeists.length > 0 ? availableHeists : automatedHeists.slice(0, 4);

  const canStartHeist = (heist: AutomatedHeist) => {
    return selectedTeam.length >= heist.requirements.minTeamSize &&
           selectedTeam.length <= heist.requirements.maxTeamSize;
  };

  const handleStartHeist = (heist: AutomatedHeist) => {
    if (canStartHeist(heist)) {
      setMissionForTeamAssignment(heist);
    } else {
      // Provide feedback about why the mission can't be started
      if (selectedTeam.length < heist.requirements.minTeamSize) {
        toast.error(`You need at least ${heist.requirements.minTeamSize} team members to start this mission.`);
      } else if (selectedTeam.length > heist.requirements.maxTeamSize) {
        toast.error(`You can only have ${heist.requirements.maxTeamSize} team members for this mission.`);
      } else {
        toast.error('Unable to start mission. Please check team requirements.');
      }
    }
  };

  const handleTeamAssignmentConfirm = () => {
    if (missionForTeamAssignment) {
      // Mission already started in useTeamAssignment hook
      setMissionForTeamAssignment(null);
      toast.success(`Mission "${missionForTeamAssignment.name}" started! Check the Active Missions section to monitor progress.`);
    }
  };

  const handleTeamAssignmentCancel = () => {
    setMissionForTeamAssignment(null);
  };

  return (
    <div className="space-y-6">
      {/* Show team assignment screen if a mission is selected */}
      {missionForTeamAssignment && (
        <TeamAssignment
          mission={missionForTeamAssignment}
          onConfirm={handleTeamAssignmentConfirm}
          onCancel={handleTeamAssignmentCancel}
        />
      )}

      {/* Show main missions page only when not assigning team */}
      {!missionForTeamAssignment && (
        <>
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-serif font-bold text-gold-300">🎯 Operations Center</h2>
            <p className="text-noir-200 max-w-2xl mx-auto">
              View available missions and monitor your ongoing operations.
            </p>
          </div>

      {/* Available Heists Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-serif font-bold text-gold-300">Available Missions</h3>

        {displayHeists.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🔒</div>
            <p className="text-noir-400">No missions available yet. Complete more heists to unlock new operations.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {displayHeists.map((heist) => (
              <div key={heist.id} className="bg-noir-800 border-2 border-gold-500/20 rounded-xl p-4 hover:border-gold-500/40 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-serif font-bold text-gold-300 mb-1">{heist.name}</h4>
                    <p className="text-noir-200 text-sm mb-2">{heist.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-blood-500 font-bold">${heist.rewards.basePayout}</div>
                    <div className="text-noir-400 text-xs">{heist.duration}h</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-noir-700 rounded p-2">
                    <div className="text-noir-400 text-xs">Risk Level</div>
                    <div className={`font-bold text-sm ${
                      heist.riskLevel <= 3 ? 'text-emerald-400' :
                      heist.riskLevel <= 6 ? 'text-yellow-400' : 'text-blood-500'
                    }`}>
                      {heist.riskLevel}/10
                    </div>
                  </div>
                  <div className="bg-noir-700 rounded p-2">
                    <div className="text-noir-400 text-xs">Team Size</div>
                    <div className="text-noir-200 font-bold text-sm">
                      {heist.requirements.minTeamSize}-{heist.requirements.maxTeamSize}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedHeist(selectedHeist === heist.id ? null : heist.id)}
                    className="flex-1 py-2 px-3 bg-noir-700 hover:bg-noir-600 text-noir-200 rounded-lg text-sm transition-colors"
                  >
                    {selectedHeist === heist.id ? 'Hide Details' : 'View Details'}
                  </button>
                  <button
                    onClick={() => handleStartHeist(heist)}
                    disabled={!canStartHeist(heist)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-colors ${
                      canStartHeist(heist)
                        ? 'bg-gradient-to-r from-blood-500 to-gold-500 hover:from-blood-600 hover:to-gold-400 text-noir-900'
                        : 'bg-noir-600 text-noir-500 cursor-not-allowed'
                    }`}
                  >
                    Start Mission
                  </button>
                </div>

                {selectedHeist === heist.id && (
                  <div className="mt-3 pt-3 border-t border-noir-600">
                    <div className="text-sm text-noir-300 space-y-1">
                      <div><strong>Duration:</strong> {heist.duration} hours</div>
                      <div><strong>Risk:</strong> {heist.riskLevel}/10</div>
                      <div><strong>Reward:</strong> ${heist.rewards.basePayout}</div>
                      <div><strong>Experience:</strong> {Math.floor(heist.rewards.basePayout * heist.rewards.experienceMultiplier)} XP</div>
                      {heist.requirements.requiredSkills && (
                        <div><strong>Required Skills:</strong> {Object.entries(heist.requirements.requiredSkills).map(([skill, level]) => `${skill} ${level}+`).join(', ')}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Missions Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-serif font-bold text-gold-300">Active Missions</h3>

        {activeAutomatedHeists.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="text-xl font-serif text-noir-300 mb-2">No Active Missions</h3>
            <p className="text-noir-400">Select a mission above to send your team on an operation.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeAutomatedHeists.map((activeHeist, index) => (
              <div key={index} className="bg-noir-800 border-2 border-gold-500/30 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-gold-300 mb-2">
                      {activeHeist.heist.name}
                    </h3>
                    <p className="text-noir-200 text-sm">{activeHeist.heist.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-blood-500 font-bold text-lg">
                      {Math.max(0, Math.floor(activeHeist.timeRemaining / 60))}h {activeHeist.timeRemaining % 60}m
                    </div>
                    <div className="text-noir-400 text-xs">Time Remaining</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-noir-700 rounded p-3">
                    <div className="text-noir-400 text-xs">Risk Level</div>
                    <div className={`font-bold ${
                      activeHeist.heist.riskLevel <= 3 ? 'text-emerald-400' :
                      activeHeist.heist.riskLevel <= 6 ? 'text-yellow-400' : 'text-blood-500'
                    }`}>
                      {activeHeist.heist.riskLevel}/10
                    </div>
                  </div>
                  <div className="bg-noir-700 rounded p-3">
                    <div className="text-noir-400 text-xs">Team Size</div>
                    <div className="text-noir-200 font-bold">{activeHeist.team.length} members</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-noir-400 text-xs mb-2">Team Members:</div>
                  {activeHeist.team.map((member) => (
                    <div key={member.id} className="flex justify-between items-center bg-noir-700 rounded p-2">
                      <div className="flex items-center gap-2">
                        <span className="text-noir-200 text-sm">{member.name}</span>
                        <span className="text-noir-400 text-xs">({member.specialty})</span>
                      </div>
                      <div className="text-right text-xs">
                        <div className="text-noir-400">HP: {member.derivedStats.health}</div>
                        <div className="text-noir-400">Fatigue: {member.fatigue}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-center pt-6">
        <button
          onClick={onBackToGame}
          className="py-3 px-8 bg-gradient-to-r from-blood-500 to-gold-500 hover:from-blood-600 hover:to-gold-400 text-noir-900 rounded-xl font-serif font-bold transition-all duration-200"
        >
          Back to Game
        </button>
      </div>
        </>
      )}
    </div>
  );
};

export default MissionsPage;