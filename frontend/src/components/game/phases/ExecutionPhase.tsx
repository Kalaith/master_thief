import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../../stores/gameStore';
import type { TeamMember, EncounterResult } from '../../../types/game';
import DiceModal from '../ui/DiceModal';

const ExecutionPhase: React.FC = () => {
  const {
    selectedHeist,
    selectedTeam,
    currentEncounter,
    setCurrentEncounter,
    addEncounterResult,
    setCurrentPhase,
  } = useGameStore();

  const [showDiceModal, setShowDiceModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    setCurrentEncounter(0);
  }, [setCurrentEncounter]);

  if (!selectedHeist || selectedTeam.length === 0) {
    return (
      <div className="text-center">
        <p className="text-daemon-text-muted">No heist or team selected</p>
      </div>
    );
  }

  const currentEncounterData = selectedHeist.encounters[currentEncounter];
  const totalEncounters = selectedHeist.encounters.length;
  const progress = (currentEncounter / totalEncounters) * 100;

  const handleSelectMember = (member: TeamMember) => {
    setSelectedMember(member);
    setShowDiceModal(true);
  };

  const handleDiceResult = (result: EncounterResult) => {
    addEncounterResult(result);
    setShowDiceModal(false);
    setSelectedMember(null);

    // Move to next encounter or results
    if (currentEncounter + 1 >= totalEncounters) {
      setCurrentPhase('results-phase');
    } else {
      setCurrentEncounter(currentEncounter + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-daemon-text-bright">⚡ Heist in Progress</h2>
        
        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="bg-daemon-surface rounded-full h-3 border border-daemon-secondary">
            <div
              className="h-full bg-daemon-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-daemon-text-muted text-sm mt-2">
            Encounter {currentEncounter + 1} of {totalEncounters}
          </p>
        </div>
      </div>

      {/* Current Encounter */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-semibold text-daemon-text-bright mb-3">
            {currentEncounterData.name}
          </h3>
          <p className="text-daemon-text mb-4">{currentEncounterData.description}</p>
          
          <div className="text-sm text-daemon-text-muted">
            Primary skill: <span className="capitalize text-daemon-text">{currentEncounterData.primary_skill}</span>
            {' • '}
            Difficulty: <span className="text-daemon-text">{currentEncounterData.difficulty}</span>
          </div>
        </div>

        {/* Team Selection */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-daemon-text-bright">Choose your specialist:</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedTeam.map((member) => {
              const skillValue = member.skills[currentEncounterData.primary_skill] || 0;
              
              return (
                <div
                  key={member.id}
                  className="bg-daemon-surface border border-daemon-secondary rounded-lg p-4 cursor-pointer hover:border-daemon-primary transition-colors"
                  onClick={() => handleSelectMember(member)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-semibold text-daemon-text-bright">{member.name}</h5>
                    <span className="text-daemon-gold">+{skillValue} bonus</span>
                  </div>
                  <div className="text-sm text-daemon-text-muted mb-2">{member.specialty}</div>
                  <div className="text-sm">
                    <span className="capitalize text-daemon-text-muted">{currentEncounterData.primary_skill}:</span>
                    <span className="text-daemon-text ml-2">{skillValue}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dice Modal */}
      {showDiceModal && selectedMember && (
        <DiceModal
          member={selectedMember}
          encounter={currentEncounterData}
          onResult={handleDiceResult}
          onClose={() => {
            setShowDiceModal(false);
            setSelectedMember(null);
          }}
        />
      )}
    </div>
  );
};

export default ExecutionPhase;