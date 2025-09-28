import React from 'react';
import { useGameStore } from '../../../stores/gameStore';

interface MissionsPageProps {
  onBackToGame: () => void;
}

const MissionsPage: React.FC<MissionsPageProps> = ({ onBackToGame }) => {
  const { activeAutomatedHeists } = useGameStore();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif font-bold text-gold-300">📋 Active Missions</h2>
        <p className="text-noir-200 max-w-2xl mx-auto">
          Monitor your ongoing operations and track mission progress.
        </p>
      </div>

      {activeAutomatedHeists.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏛️</div>
          <h3 className="text-xl font-serif text-noir-300 mb-2">No Active Missions</h3>
          <p className="text-noir-400">Select a heist from the game tab to start an operation.</p>
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

      <div className="text-center pt-6">
        <button
          onClick={onBackToGame}
          className="py-3 px-8 bg-gradient-to-r from-blood-500 to-gold-500 hover:from-blood-600 hover:to-gold-400 text-noir-900 rounded-xl font-serif font-bold transition-all duration-200"
        >
          Back to Game
        </button>
      </div>
    </div>
  );
};

export default MissionsPage;