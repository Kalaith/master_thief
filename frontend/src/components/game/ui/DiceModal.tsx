import React, { useState, useEffect } from 'react';
import type { TeamMember, Encounter, EncounterResult, OutcomeType } from '../../../types/game';
import { gameData } from '../../../data/gameData';

interface DiceModalProps {
  member: TeamMember;
  encounter: Encounter;
  onResult: (result: EncounterResult) => void;
  onClose: () => void;
}

const DiceModal: React.FC<DiceModalProps> = ({ member, encounter, onResult, onClose }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [result, setResult] = useState<EncounterResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    // Auto-start rolling when modal opens
    const timer = setTimeout(() => {
      setIsRolling(true);
      setShowResult(false);

      // Simulate dice rolling animation
      setTimeout(() => {
        const roll = Math.floor(Math.random() * 20) + 1;
        const skillBonus = member.skills[encounter.primary_skill] || 0;
        const attributeModifier = encounter.primary_attribute ? 
          Math.floor((member.attributes[encounter.primary_attribute] - 10) / 2) : 0;
        const total = roll + skillBonus + attributeModifier;

        // Determine outcome
        let outcome: OutcomeType;
        if (roll === 1) {
          outcome = 'critical_failure';
        } else if (roll === 20) {
          outcome = 'critical_success';
        } else if (total >= encounter.difficulty + 5) {
          outcome = 'success';
        } else if (total >= encounter.difficulty) {
          outcome = 'neutral';
        } else {
          outcome = 'failure';
        }

        const encounterResult: EncounterResult = {
          member,
          encounter,
          roll,
          attributeModifier,
          skillBonus,
          equipmentBonus: 0,
          situationalModifiers: 0,
          total,
          outcome,
          experienceGained: outcome === 'success' || outcome === 'critical_success' ? 10 : 5,
          stressInflicted: outcome === 'failure' || outcome === 'critical_failure' ? 10 : 5,
          narrativeDescription: 'Dice roll completed'
        };

        setDiceValue(roll);
        setResult(encounterResult);
        setIsRolling(false);
        setShowResult(true);
      }, 1500);
    }, 500);

    return () => clearTimeout(timer);
  }, [member, encounter, onResult]);

  const handleContinue = () => {
    if (result) {
      onResult(result);
    }
  };

  const getOutcomeTitle = (outcome: OutcomeType): string => {
    switch (outcome) {
      case 'critical_failure':
        return 'Critical Failure!';
      case 'failure':
        return 'Failure';
      case 'neutral':
        return 'Partial Success';
      case 'success':
        return 'Success!';
      case 'critical_success':
        return 'Critical Success!';
    }
  };

  const getOutcomeColor = (outcome: OutcomeType): string => {
    switch (outcome) {
      case 'critical_failure':
        return 'text-noir-danger';
      case 'failure':
        return 'text-noir-warning';
      case 'neutral':
        return 'text-noir-info';
      case 'success':
        return 'text-noir-success';
      case 'critical_success':
        return 'text-noir-primary';
    }
  };

  const getRandomOutcomeDescription = (outcome: OutcomeType): string => {
    const descriptions = gameData.outcome_descriptions[outcome];
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-noir-panel border border-noir-secondary rounded-lg p-8 max-w-md w-full mx-4">
        {/* Dice Container */}
        <div className="text-center mb-6">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 bg-noir-surface border-2 border-noir-secondary rounded-lg text-2xl font-bold transition-transform duration-300 ${
              isRolling ? 'animate-bounce' : ''
            }`}
          >
            {diceValue !== null ? diceValue : '🎲'}
          </div>
        </div>

        {/* Roll Information */}
        <div className="text-center mb-6">
          {!showResult ? (
            <p className="text-noir-text-muted">Rolling...</p>
          ) : (
            result && (
              <div className="space-y-2">
                <p className="text-noir-text">
                  <strong>{member.name}</strong> rolled {result.roll} + {result.skillBonus} = {result.total}
                </p>
                <p className="text-noir-text-muted text-sm">Target: {encounter.difficulty}</p>
              </div>
            )
          )}
        </div>

        {/* Outcome Result */}
        {showResult && result && (
          <div className="space-y-4 mb-6">
            <div className={`text-center text-xl font-bold ${getOutcomeColor(result.outcome)}`}>
              {getOutcomeTitle(result.outcome)}
            </div>
            <div className="text-center text-noir-text">
              {getRandomOutcomeDescription(result.outcome)}
            </div>
          </div>
        )}

        {/* Continue Button */}
        {showResult && (
          <div className="text-center">
            <button
              onClick={handleContinue}
              className="py-3 px-6 bg-noir-primary hover:bg-noir-primaryHover text-white rounded-lg font-semibold transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Close button (X) in corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-noir-text-muted hover:text-noir-text transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default DiceModal;