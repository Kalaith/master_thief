import React from 'react';
import { useGameStore } from '../../../stores/gameStore';

const ResultsPhase: React.FC = () => {
  const {
    budget,
    playerProgress,
    resetForNextHeist,
    setCurrentPhase
  } = useGameStore();

  // For now, we'll assume the last heist was successful if budget increased
  // In a full implementation, we'd store detailed results
  const heistSuccess = true; // Placeholder - would be determined by stored results
  const payout = 1000; // Placeholder - would be from stored results
  const experience = 500; // Placeholder - would be from stored results

  const handlePlanNextHeist = () => {
    resetForNextHeist();
  };

  const handleViewStats = () => {
    // Could navigate to a stats screen in the future
    setCurrentPhase('recruitment-phase');
  };

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-daemon-text-bright">
          {heistSuccess ? '🎉 Heist Successful!' : '💀 Heist Failed'}
        </h2>
        <p className="text-daemon-text-muted max-w-2xl mx-auto">
          {heistSuccess 
            ? "Your automated crew completed the mission successfully!" 
            : "The automated heist encountered complications..."
          }
        </p>
      </div>

      {/* Heist Outcome */}
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-8">
          <div className="text-6xl mb-4">
            {heistSuccess ? '💰' : '🚨'}
          </div>
          <div className="text-xl text-daemon-text mb-4">
            {heistSuccess 
              ? "Mission accomplished! Funds have been added to your account." 
              : "The operation failed. Better luck next time."
            }
          </div>
          
          {heistSuccess && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-daemon-text-bright">Rewards Earned</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-daemon-surface border border-daemon-secondary rounded p-4">
                  <span className="text-daemon-text">Heist Payout</span>
                  <span className="text-daemon-gold font-bold text-xl">+${payout.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center bg-daemon-surface border border-daemon-secondary rounded p-4">
                  <span className="text-daemon-text">Experience Gained</span>
                  <span className="text-daemon-primary font-bold text-xl">+{experience} XP</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Current Status */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-daemon-text-bright mb-4 text-center">Current Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">💵</div>
            <div className="text-2xl font-bold text-daemon-gold">${budget.toLocaleString()}</div>
            <div className="text-daemon-text-muted">Available Budget</div>
          </div>
          
          <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-daemon-primary">{playerProgress.level}</div>
            <div className="text-daemon-text-muted">Player Level</div>
          </div>
          
          <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-daemon-text-bright">{playerProgress.totalExperience}</div>
            <div className="text-daemon-text-muted">Total Experience</div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-daemon-text-bright mb-4 text-center">Heist Statistics</h3>
        
        <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-daemon-success">{playerProgress.totalExperience}</div>
              <div className="text-daemon-text-muted">Total XP Earned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-daemon-gold">{budget.toLocaleString()}</div>
              <div className="text-daemon-text-muted">Current Funds</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-daemon-primary">{playerProgress.level}</div>
              <div className="text-daemon-text-muted">Player Level</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-daemon-text-bright">1</div>
              <div className="text-daemon-text-muted">Heists Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Action */}
      <div className="text-center pt-6 space-x-4">
        <button
          onClick={handlePlanNextHeist}
          className="py-3 px-8 bg-daemon-primary hover:bg-daemon-primaryHover text-white rounded-lg font-semibold transition-colors"
        >
          Plan Next Heist
        </button>
        
        <button
          onClick={handleViewStats}
          className="py-3 px-8 border border-daemon-secondary text-daemon-text hover:bg-daemon-surface rounded-lg transition-colors"
        >
          View Character Stats
        </button>
      </div>
    </div>
  );
};

export default ResultsPhase;