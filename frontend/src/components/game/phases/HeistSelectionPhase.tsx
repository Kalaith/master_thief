import React from 'react';
import { useGameStore } from '../../../stores/gameStore';
import { gameData } from '../../../data/gameData';
import HeistCard from '../ui/HeistCard';

const HeistSelectionPhase: React.FC = () => {
  const { selectedHeist, setCurrentPhase, selectHeist } = useGameStore();

  const canProceed = selectedHeist !== null;

  const handleBackToRecruitment = () => {
    setCurrentPhase('recruitment-phase');
  };

  const handleProceedToPlanning = () => {
    if (canProceed) {
      setCurrentPhase('planning-phase');
    }
  };

  const handleSelectHeist = (heist: typeof gameData.heist_targets[0]) => {
    selectHeist(heist);
  };

  return (
    <div className="space-y-8">
      {/* Phase Header */}
      <div className="text-center space-y-4 bg-noir-800 p-8 rounded-xl border-2 border-gold-500">
        <h2 className="text-4xl font-serif font-bold text-gold-300">🏛️ Select Your Mark</h2>
        <p className="text-noir-200 max-w-3xl mx-auto text-lg leading-relaxed">
          Every target tells a story. Choose wisely - some stories end in glory, others in 
          concrete shoes at the bottom of the river.
        </p>
        <div className="text-gold-400 font-serif italic">
          "The bigger the risk, the bigger the reward."
        </div>
      </div>

      {/* Target Intelligence */}
      <div className="bg-noir-800 border border-gold-500/30 rounded-xl p-6">
        <h3 className="text-xl font-serif font-bold text-gold-300 mb-4">🕵️ Available Opportunities</h3>
        <div className="text-noir-300 text-sm space-y-2">
          <p>• <strong>Easy Jobs:</strong> Low risk, modest rewards. Good for building reputation.</p>
          <p>• <strong>Medium Jobs:</strong> Balanced risk/reward. Requires skill and planning.</p>
          <p>• <strong>Hard Jobs:</strong> High stakes, high rewards. Only for experienced crews.</p>
        </div>
      </div>

      {/* Heist Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {gameData.heist_targets.map((heist) => (
          <HeistCard
            key={heist.id}
            heist={heist}
            isSelected={selectedHeist?.id === heist.id}
            onSelect={() => handleSelectHeist(heist)}
          />
        ))}
      </div>

      {/* Selected Heist Details */}
      {selectedHeist && (
        <div className="bg-noir-800 border-2 border-gold-500 rounded-xl p-6">
          <h3 className="text-xl font-serif font-bold text-gold-300 mb-4">📋 Job Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-gold-300">Target Assessment:</h4>
              <div className="text-noir-200 space-y-2">
                <p><strong>Location:</strong> {selectedHeist.name}</p>
                <p><strong>Difficulty:</strong> {selectedHeist.difficulty}</p>
                <p><strong>Estimated Take:</strong> ${selectedHeist.potential_payout.toLocaleString()}</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-gold-300">Security Analysis:</h4>
              <div className="text-noir-300 space-y-1">
                {selectedHeist.encounters.map((encounter, index) => (
                  <p key={index} className="text-sm">
                    • {encounter.name} ({encounter.primary_skill})
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          onClick={handleBackToRecruitment}
          className="py-3 px-6 border-2 border-gold-500 text-gold-300 hover:bg-gold-500 hover:text-noir-900 rounded-xl font-serif font-bold transition-all duration-200"
        >
          ← Back to Crew
        </button>
        
        <button
          onClick={handleProceedToPlanning}
          disabled={!canProceed}
          className={`py-4 px-8 rounded-xl font-serif font-bold text-lg transition-all duration-300 ${
            canProceed
              ? 'bg-gradient-to-r from-blood-500 to-gold-500 hover:from-blood-600 hover:to-gold-400 text-noir-900 shadow-gold transform hover:scale-105'
              : 'bg-noir-600 text-noir-400 cursor-not-allowed'
          }`}
        >
          {canProceed ? '📝 Review the Plan' : 'Choose Your Target First'}
        </button>
      </div>
    </div>
  );
};

export default HeistSelectionPhase;