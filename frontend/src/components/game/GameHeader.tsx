import React from 'react';
import { useGameStore } from '../../stores/gameStore';

interface GameHeaderProps {
  activeTab: 'game' | 'missions' | 'recruitment' | 'team' | 'equipment';
  onTabChange: (tab: 'game' | 'missions' | 'recruitment' | 'team' | 'equipment') => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ activeTab, onTabChange }) => {
  const { budget, heistsCompleted, activeAutomatedHeists, selectedTeam, equipmentInventory, newGame } = useGameStore();

  const handleNewGame = () => {
    if (window.confirm('Are you sure you want to start a new game? All progress will be lost!')) {
      newGame();
    }
  };

  return (
    <header className="bg-noir-800 border-b-2 border-gold-500 p-6 shadow-gold">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-serif font-bold text-gold-300">
            🎭 Master Thief
          </h1>
          <span className="text-gold-400 font-serif text-lg italic">
            Criminal Empire
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onTabChange('game')}
              className={`px-4 py-2 rounded-lg font-serif font-bold transition-all duration-200 ${
                activeTab === 'game'
                  ? 'bg-gradient-to-r from-blood-500 to-gold-500 text-noir-900'
                  : 'bg-noir-700 text-noir-200 hover:bg-noir-600'
              }`}
            >
              🎯 Game
            </button>
            <button
              onClick={() => onTabChange('missions')}
              className={`px-4 py-2 rounded-lg font-serif font-bold transition-all duration-200 ${
                activeTab === 'missions'
                  ? 'bg-gradient-to-r from-blood-500 to-gold-500 text-noir-900'
                  : 'bg-noir-700 text-noir-200 hover:bg-noir-600'
              }`}
            >
              📋 Missions ({activeAutomatedHeists.length})
            </button>
            <button
              onClick={() => onTabChange('recruitment')}
              className={`px-4 py-2 rounded-lg font-serif font-bold transition-all duration-200 ${
                activeTab === 'recruitment'
                  ? 'bg-gradient-to-r from-blood-500 to-gold-500 text-noir-900'
                  : 'bg-noir-700 text-noir-200 hover:bg-noir-600'
              }`}
            >
              🎭 Recruitment
            </button>
            <button
              onClick={() => onTabChange('team')}
              className={`px-4 py-2 rounded-lg font-serif font-bold transition-all duration-200 ${
                activeTab === 'team'
                  ? 'bg-gradient-to-r from-blood-500 to-gold-500 text-noir-900'
                  : 'bg-noir-700 text-noir-200 hover:bg-noir-600'
              }`}
            >
              👥 Team ({selectedTeam.length})
            </button>
            <button
              onClick={() => onTabChange('equipment')}
              className={`px-4 py-2 rounded-lg font-serif font-bold transition-all duration-200 ${
                activeTab === 'equipment'
                  ? 'bg-gradient-to-r from-blood-500 to-gold-500 text-noir-900'
                  : 'bg-noir-700 text-noir-200 hover:bg-noir-600'
              }`}
            >
              ⚔️ Equipment ({equipmentInventory.length})
            </button>
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-2 bg-noir-700 px-4 py-2 rounded-lg border border-gold-500/30">
            <span className="text-noir-300 font-medium">War Chest:</span>
            <span className="text-gold-300 font-bold text-xl">${budget.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 bg-noir-700 px-4 py-2 rounded-lg border border-blood-500/30">
            <span className="text-noir-300 font-medium">Jobs Done:</span>
            <span className="text-blood-500 font-bold text-xl">{heistsCompleted}</span>
          </div>
          <button
            onClick={handleNewGame}
            className="bg-blood-600 hover:bg-blood-700 text-white px-4 py-2 rounded-lg font-medium transition-colors border border-blood-500/50"
          >
            New Game
          </button>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;