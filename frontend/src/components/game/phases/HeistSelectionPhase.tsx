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
    <div className="space-y-6">
      {/* Phase Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-daemon-text-bright">🏛️ Choose Your Target</h2>
        <p className="text-daemon-text-muted max-w-2xl mx-auto">
          Select a heist that matches your crew's capabilities.
        </p>
      </div>

      {/* Heist Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gameData.heist_targets.map((heist) => (
          <HeistCard
            key={heist.id}
            heist={heist}
            isSelected={selectedHeist?.id === heist.id}
            onSelect={() => handleSelectHeist(heist)}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          onClick={handleBackToRecruitment}
          className="py-3 px-6 border border-daemon-secondary text-daemon-text hover:bg-daemon-surface rounded-lg transition-colors"
        >
          Back to Recruitment
        </button>
        
        <button
          onClick={handleProceedToPlanning}
          disabled={!canProceed}
          className={`py-3 px-6 rounded-lg font-semibold transition-colors ${
            canProceed
              ? 'bg-daemon-primary hover:bg-daemon-primaryHover text-white'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          Review Plan
        </button>
      </div>
    </div>
  );
};

export default HeistSelectionPhase;