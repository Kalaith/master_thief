import React from 'react';
import { useGameStore } from '../../../stores/gameStore';

const GameOverview: React.FC = () => {
  const { budget, selectedTeam, heistsCompleted, activeAutomatedHeists } = useGameStore();

  console.log('GameOverview component rendered');

  return (
    <div className="space-y-8">
      {/* Game Overview Header */}
      <div className="text-center space-y-4 bg-noir-800 p-8 rounded-xl border-2 border-gold-500">
        <h2 className="text-4xl font-serif font-bold text-gold-300">🎭 Master Thief Dashboard</h2>
        <p className="text-noir-200 max-w-3xl mx-auto text-lg leading-relaxed">
          Welcome to your criminal empire. Monitor your operations, manage your syndicate, and plan your next big score.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-noir-800 border-2 border-gold-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">💰</div>
            <div>
              <div className="text-noir-400 text-sm">War Chest</div>
              <div className="text-gold-300 font-bold text-xl">${budget.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="bg-noir-800 border-2 border-gold-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">🏆</div>
            <div>
              <div className="text-noir-400 text-sm">Jobs Completed</div>
              <div className="text-blood-500 font-bold text-xl">{heistsCompleted}</div>
            </div>
          </div>
        </div>

        <div className="bg-noir-800 border-2 border-gold-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">👥</div>
            <div>
              <div className="text-noir-400 text-sm">Team Size</div>
              <div className="text-emerald-400 font-bold text-xl">{selectedTeam.length}/4</div>
            </div>
          </div>
        </div>

        <div className="bg-noir-800 border-2 border-gold-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">🎯</div>
            <div>
              <div className="text-noir-400 text-sm">Active Missions</div>
              <div className="text-yellow-400 font-bold text-xl">{activeAutomatedHeists.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Missions */}
      {activeAutomatedHeists.length > 0 && (
        <div className="bg-noir-800 border-2 border-gold-500/30 rounded-xl p-6">
          <h3 className="text-2xl font-serif font-bold text-gold-300 mb-4">Active Operations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeAutomatedHeists.map((heist, index) => (
              <div key={index} className="bg-noir-700 border border-gold-500/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-serif font-bold text-gold-300">{heist.heist.name}</h4>
                  <div className="text-blood-500 font-bold">
                    {Math.max(0, Math.floor(heist.timeRemaining / 60))}h {heist.timeRemaining % 60}m
                  </div>
                </div>
                <p className="text-noir-200 text-sm mb-2">{heist.heist.description}</p>
                <div className="text-noir-400 text-xs">Team: {heist.team.length} members</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const GamePage: React.FC = () => {
  return <GameOverview />;
};

export default GamePage;