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

  // Group members by rarity for better organization
  const membersByRarity = gameData.team_members.reduce((acc, member) => {
    if (!acc[member.rarity]) acc[member.rarity] = [];
    acc[member.rarity].push(member);
    return acc;
  }, {} as Record<string, typeof gameData.team_members>);

  const rarityOrder = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

  return (
    <div className="space-y-8">
      {/* Phase Header */}
      <div className="text-center space-y-4 bg-noir-800 p-8 rounded-xl border-2 border-gold-500">
        <h2 className="text-4xl font-serif font-bold text-gold-300">🎯 Assemble Your Syndicate</h2>
        <p className="text-noir-200 max-w-3xl mx-auto text-lg leading-relaxed">
          Choose your associates carefully. In this business, the right crew makes the difference 
          between wealth and prison. Each specialist brings their own... particular talents.
        </p>
        <div className="text-gold-400 font-serif italic">
          "Respect is earned through excellence."
        </div>
      </div>

      {/* Team Selection */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Available Members */}
        <div className="xl:col-span-3 space-y-6">
          <div className="flex items-center gap-4 border-b border-gold-500/30 pb-3">
            <h3 className="text-2xl font-serif font-bold text-gold-300">Available Associates</h3>
            <span className="text-noir-400 text-sm">
              ({gameData.team_members.length} specialists in the network)
            </span>
          </div>
          
          {/* Members grouped by rarity */}
          {rarityOrder.map((rarity) => {
            const members = membersByRarity[rarity] || [];
            if (members.length === 0) return null;
            
            return (
              <div key={rarity} className="space-y-4">
                <div className="flex items-center gap-3">
                  <h4 className={`text-lg font-bold capitalize rarity-${rarity}`}>
                    {rarity} Tier
                  </h4>
                  <div className="flex-1 h-px bg-gradient-to-r from-current to-transparent opacity-30"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {members.map((member) => (
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
            );
          })}
        </div>

        {/* Selected Team */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gold-500/30 pb-3">
            <h3 className="text-xl font-serif font-bold text-gold-300">Your Crew</h3>
            <span className="text-blood-500 font-bold">({selectedTeam.length})</span>
          </div>
          
          <div className="bg-noir-800 border-2 border-gold-500 rounded-xl p-6 min-h-[400px]">
            {selectedTeam.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="text-6xl opacity-30">👥</div>
                <div className="text-noir-400 font-medium">
                  Recruit your team to begin...
                </div>
                <div className="text-gold-400 font-serif italic text-sm">
                  "Every legend starts with a first hire"
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedTeam.map((member) => (
                  <div
                    key={member.id}
                    className={`bg-noir-700 border-2 rounded-lg p-4 rarity-${member.rarity}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-serif font-bold text-gold-300">{member.name}</div>
                        <div className="text-sm text-noir-300">{member.specialty}</div>
                        <div className={`text-xs font-bold uppercase rarity-${member.rarity}`}>
                          {member.rarity}
                        </div>
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
                
                {/* Crew Summary */}
                <div className="border-t border-gold-500/30 pt-4 mt-4">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-noir-300">Total Cost:</span>
                      <span className="text-gold-300 font-bold">
                        ${selectedTeam.reduce((sum, m) => sum + m.cost, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-noir-300">Remaining Budget:</span>
                      <span className={budget >= selectedTeam.reduce((sum, m) => sum + m.cost, 0) ? 'text-emerald-400' : 'text-blood-500'}>
                        ${(budget - selectedTeam.reduce((sum, m) => sum + m.cost, 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            className={`w-full py-4 px-6 rounded-xl font-serif font-bold text-lg transition-all duration-300 ${
              canProceed
                ? 'bg-gradient-to-r from-blood-500 to-gold-500 hover:from-blood-600 hover:to-gold-400 text-noir-900 shadow-gold transform hover:scale-105'
                : 'bg-noir-600 text-noir-400 cursor-not-allowed'
            }`}
            onClick={handleProceedToHeist}
            disabled={!canProceed}
          >
            {canProceed ? '🎯 Plan the Job' : 'Select Your Crew First'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentPhase;