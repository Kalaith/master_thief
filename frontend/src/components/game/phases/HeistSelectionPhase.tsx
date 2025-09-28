import React from 'react';
import { useGameStore } from '../../../stores/gameStore';
import { automatedHeists } from '../../../data/automatedHeists';
import type { AutomatedHeist } from '../../../types/game';

const HeistSelectionPhase: React.FC = () => {
  const { selectedTeam, setCurrentPhase, startAutomatedHeist } = useGameStore();

  const handleBackToRecruitment = () => {
    setCurrentPhase('recruitment-phase');
  };

  const handleStartAutomatedHeist = (heist: AutomatedHeist) => {
    if (selectedTeam.length >= heist.requirements.minTeamSize) {
      startAutomatedHeist(heist, selectedTeam);
      setCurrentPhase('planning-phase');
    }
  };

  // Filter heists based on team size
  const availableHeists = automatedHeists.filter(heist => 
    selectedTeam.length >= heist.requirements.minTeamSize
  );

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
          <p>• <strong>Quick Jobs:</strong> Low risk, steady income. Good for building reputation.</p>
          <p>• <strong>Standard Heists:</strong> Balanced risk/reward. Requires skill and planning.</p>
          <p>• <strong>Major Operations:</strong> High stakes, high rewards. Only for experienced crews.</p>
          <p>• <strong>Legendary Scores:</strong> Epic rewards, endgame content. Maximum risk.</p>
        </div>
      </div>

      {/* Heist Options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {availableHeists.map((heist) => (
          <div 
            key={heist.id} 
            className="bg-noir-700 border-2 border-gold-500/30 rounded-xl p-6 hover:border-gold-500 transition-colors duration-200"
          >
            <h4 className="text-xl font-serif font-bold text-gold-300 mb-3">{heist.name}</h4>
            <p className="text-noir-200 text-sm mb-4">{heist.description}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-noir-300">Payout:</span>
                <span className="text-gold-300 font-bold">${heist.rewards.basePayout.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-noir-300">Duration:</span>
                <span className="text-noir-200">{heist.duration} hours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-noir-300">Risk Level:</span>
                <span className={`font-bold ${
                  heist.riskLevel <= 3 ? 'text-emerald-400' :
                  heist.riskLevel <= 6 ? 'text-yellow-400' : 'text-blood-500'
                }`}>
                  {heist.riskLevel}/10
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-noir-300">Team Size:</span>
                <span className="text-noir-200">{heist.requirements.minTeamSize}-{heist.requirements.maxTeamSize}</span>
              </div>
            </div>

            {heist.requirements.requiredSkills && (
              <div className="mb-4">
                <div className="text-xs text-noir-400 mb-2">Required Skills:</div>
                {Object.entries(heist.requirements.requiredSkills).map(([skill, level]) => (
                  <div key={skill} className="text-xs text-noir-300 flex justify-between">
                    <span className="capitalize">{skill}:</span>
                    <span>{level}+</span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => handleStartAutomatedHeist(heist)}
              disabled={selectedTeam.length < heist.requirements.minTeamSize}
              className={`w-full py-3 px-4 rounded-lg font-serif font-bold transition-all duration-200 ${
                selectedTeam.length >= heist.requirements.minTeamSize
                  ? 'bg-gradient-to-r from-blood-500 to-gold-500 hover:from-blood-600 hover:to-gold-400 text-noir-900'
                  : 'bg-noir-600 text-noir-400 cursor-not-allowed'
              }`}
            >
              {selectedTeam.length >= heist.requirements.minTeamSize ? 'Start Heist' : 'Need More Team Members'}
            </button>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          onClick={handleBackToRecruitment}
          className="py-3 px-6 border-2 border-gold-500 text-gold-300 hover:bg-gold-500 hover:text-noir-900 rounded-xl font-serif font-bold transition-all duration-200"
        >
          ← Back to Crew
        </button>
        
        <div className="text-noir-400 text-sm">
          {availableHeists.length} heists available for your team size
        </div>
      </div>
    </div>
  );
};

export default HeistSelectionPhase;