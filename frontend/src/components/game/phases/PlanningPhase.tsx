import React from 'react';
import { useGameStore } from '../../../stores/gameStore';

const PlanningPhase: React.FC = () => {
  const { selectedHeist, selectedTeam, setCurrentPhase } = useGameStore();

  const handleBackToHeistSelection = () => {
    setCurrentPhase('heist-selection-phase');
  };

  const handleStartHeist = () => {
    setCurrentPhase('execution-phase');
  };

  if (!selectedHeist) {
    return (
      <div className="text-center">
        <p className="text-daemon-text-muted">No heist selected</p>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-daemon-success';
      case 'Medium':
        return 'text-daemon-warning';
      case 'Hard':
        return 'text-daemon-danger';
      default:
        return 'text-daemon-text';
    }
  };

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-daemon-text-bright">📋 Final Preparations</h2>
        <p className="text-daemon-text-muted max-w-2xl mx-auto">
          Review the intel and finalize your approach.
        </p>
      </div>

      {/* Planning Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Target Intel */}
        <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-6">
          <h3 className="text-xl font-semibold text-daemon-text-bright mb-4">{selectedHeist.name}</h3>
          
          <p className="text-daemon-text mb-4">{selectedHeist.description}</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-daemon-text-muted">Difficulty:</span>
              <span className={`font-semibold ${getDifficultyColor(selectedHeist.difficulty)}`}>
                {selectedHeist.difficulty}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-daemon-text-muted">Potential Payout:</span>
              <span className="text-daemon-gold font-semibold">
                ${selectedHeist.potential_payout.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Encounters */}
          <div className="space-y-4">
            <h4 className="font-semibold text-daemon-text-bright">Encounters:</h4>
            {selectedHeist.encounters.map((encounter, index) => (
              <div
                key={index}
                className="bg-daemon-surface border border-daemon-secondary rounded p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold text-daemon-text-bright">
                    {index + 1}. {encounter.name}
                  </h5>
                  <span className="text-xs text-daemon-text-muted">
                    Difficulty: {encounter.difficulty}
                  </span>
                </div>
                <p className="text-daemon-text text-sm mb-2">{encounter.description}</p>
                <div className="flex justify-between text-xs">
                  <span className="text-daemon-text-muted">
                    Primary skill: <span className="capitalize text-daemon-text">{encounter.primary_skill}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crew Summary */}
        <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-6">
          <h3 className="text-xl font-semibold text-daemon-text-bright mb-4">Your Crew</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedTeam.map((member) => (
              <div
                key={member.id}
                className="bg-daemon-surface border border-daemon-secondary rounded p-4"
              >
                <div className="text-center">
                  <div className="font-semibold text-daemon-text-bright mb-1">{member.name}</div>
                  <div className="text-sm text-daemon-text-muted">{member.specialty}</div>
                </div>
                
                {/* Key Skills for this heist */}
                <div className="mt-3 space-y-1">
                  {selectedHeist.encounters.map((encounter) => {
                    const skillValue = member.skills[encounter.primary_skill];
                    return (
                      <div key={encounter.primary_skill} className="flex justify-between text-xs">
                        <span className="capitalize text-daemon-text-muted">{encounter.primary_skill}:</span>
                        <span className="text-daemon-text">{skillValue}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          onClick={handleBackToHeistSelection}
          className="py-3 px-6 border border-daemon-secondary text-daemon-text hover:bg-daemon-surface rounded-lg transition-colors"
        >
          Change Target
        </button>
        
        <button
          onClick={handleStartHeist}
          className="py-3 px-6 bg-daemon-primary hover:bg-daemon-primaryHover text-white rounded-lg font-semibold transition-colors"
        >
          Execute Heist
        </button>
      </div>
    </div>
  );
};

export default PlanningPhase;