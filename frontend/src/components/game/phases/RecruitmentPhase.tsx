import React from 'react';
import { useGameStore } from '../../../stores/gameStore';
import { gameData } from '../../../data/gameData';
import TeamMemberCard from '../ui/TeamMemberCard';

const RecruitmentPhase: React.FC = () => {
  const { selectedTeam, budget, setCurrentPhase } = useGameStore();

  const canProceed = selectedTeam.length > 0;

  const handleProceedToHeist = () => {
    if (canProceed) {
      setCurrentPhase('heist-selection-phase');
    }
  };

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-daemon-text-bright">🎯 Recruit Your Crew</h2>
        <p className="text-daemon-text-muted max-w-2xl mx-auto">
          Choose your team wisely. Each specialist brings unique skills to the job.
        </p>
      </div>

      {/* Team Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Available Members */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold text-daemon-text-bright">Available Specialists</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {gameData.team_members.map((member) => (
              <TeamMemberCard 
                key={member.id} 
                member={member} 
                isSelected={selectedTeam.some(m => m.id === member.id)}
                canAfford={budget >= member.cost}
                showAddRemove={true}
              />
            ))}
          </div>
        </div>

        {/* Selected Team */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-daemon-text-bright">Your Crew</h3>
          <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-4 min-h-[300px]">
            {selectedTeam.length === 0 ? (
              <div className="flex items-center justify-center h-full text-daemon-text-muted">
                Select team members...
              </div>
            ) : (
              <div className="space-y-3">
                {selectedTeam.map((member) => (
                  <div
                    key={member.id}
                    className="bg-daemon-surface border border-daemon-secondary rounded-lg p-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-daemon-text-bright">{member.name}</div>
                        <div className="text-sm text-daemon-text-muted">{member.specialty}</div>
                      </div>
                      <TeamMemberCard 
                        member={member} 
                        isSelected={true}
                        canAfford={true}
                        showAddRemove={true}
                        compact={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
              canProceed
                ? 'bg-daemon-primary hover:bg-daemon-primaryHover text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
            onClick={handleProceedToHeist}
            disabled={!canProceed}
          >
            Plan Heist
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentPhase;