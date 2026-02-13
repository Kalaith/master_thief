import React from 'react';
import { useGameStore } from '../../stores/gameStore';
import {
  Target,
  Map,
  UserPlus,
  Users,
  Shield,
  DollarSign,
  Trophy,
  RotateCcw,
} from 'lucide-react';

interface GameHeaderProps {
  activeTab: 'game' | 'missions' | 'recruitment' | 'team' | 'equipment';
  onTabChange: (
    tab: 'game' | 'missions' | 'recruitment' | 'team' | 'equipment'
  ) => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ activeTab, onTabChange }) => {
  const {
    budget,
    heistsCompleted,
    activeAutomatedHeists,
    selectedTeam,
    equipmentInventory,
    newGame,
  } = useGameStore();

  const handleNewGame = () => {
    if (
      window.confirm(
        'Are you sure you want to start a new game? All progress will be lost!'
      )
    ) {
      newGame();
    }
  };

  return (
    <header className="bg-heist-dark/60 backdrop-blur-sm border-b border-heist-border shadow-hud-panel">
      <div className="container mx-auto px-6 py-4">
        {/* Top Row: Title and Stats */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-3xl font-bold text-cyan-400 tracking-tight">
                MASTER THIEF
              </h1>
              <span className="text-gray-400 text-sm font-mono uppercase tracking-wider">
                Heist Operations Terminal
              </span>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            {/* Budget Display */}
            <div className="flex items-center gap-2 bg-heist-panel/80 px-4 py-2 rounded border border-heist-border backdrop-blur-sm">
              <DollarSign className="w-4 h-4 text-amber-300" />
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs font-mono uppercase">
                  Budget
                </span>
                <span className="text-amber-300 font-bold font-mono text-lg">
                  ${budget.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Heists Completed */}
            <div className="flex items-center gap-2 bg-heist-panel/80 px-4 py-2 rounded border border-heist-border backdrop-blur-sm">
              <Trophy className="w-4 h-4 text-cyan-400" />
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs font-mono uppercase">
                  Completed
                </span>
                <span className="text-cyan-400 font-bold font-mono text-lg">
                  {heistsCompleted}
                </span>
              </div>
            </div>

            {/* New Game Button */}
            <button
              onClick={handleNewGame}
              className="flex items-center gap-2 bg-red-600/80 hover:bg-red-500 text-white px-4 py-2 rounded font-medium transition-all duration-200 border border-red-500/50 hover:shadow-cyan-glow"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => onTabChange('game')}
            className={`flex items-center gap-2 px-4 py-2 rounded font-medium transition-all duration-200 ${
              activeTab === 'game'
                ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50 shadow-cyan-glow'
                : 'bg-heist-panel/60 text-gray-400 border border-heist-border hover:border-cyan-400/30 hover:text-cyan-400'
            }`}
          >
            <Target className="w-4 h-4" />
            <span className="font-mono">Operations</span>
            {activeAutomatedHeists.length > 0 && (
              <span className="bg-cyan-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {activeAutomatedHeists.length}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('missions')}
            data-tutorial="missions-tab"
            className={`flex items-center gap-2 px-4 py-2 rounded font-medium transition-all duration-200 ${
              activeTab === 'missions'
                ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50 shadow-cyan-glow'
                : 'bg-heist-panel/60 text-gray-400 border border-heist-border hover:border-cyan-400/30 hover:text-cyan-400'
            }`}
          >
            <Map className="w-4 h-4" />
            <span className="font-mono">Targets</span>
          </button>

          <button
            onClick={() => onTabChange('recruitment')}
            className={`flex items-center gap-2 px-4 py-2 rounded font-medium transition-all duration-200 ${
              activeTab === 'recruitment'
                ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50 shadow-cyan-glow'
                : 'bg-heist-panel/60 text-gray-400 border border-heist-border hover:border-cyan-400/30 hover:text-cyan-400'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span className="font-mono">Recruit</span>
          </button>

          <button
            onClick={() => onTabChange('team')}
            className={`flex items-center gap-2 px-4 py-2 rounded font-medium transition-all duration-200 ${
              activeTab === 'team'
                ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50 shadow-cyan-glow'
                : 'bg-heist-panel/60 text-gray-400 border border-heist-border hover:border-cyan-400/30 hover:text-cyan-400'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="font-mono">Crew</span>
            {selectedTeam.length > 0 && (
              <span className="bg-purple-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {selectedTeam.length}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('equipment')}
            data-tutorial="equipment-tab"
            className={`flex items-center gap-2 px-4 py-2 rounded font-medium transition-all duration-200 ${
              activeTab === 'equipment'
                ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/50 shadow-cyan-glow'
                : 'bg-heist-panel/60 text-gray-400 border border-heist-border hover:border-cyan-400/30 hover:text-cyan-400'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span className="font-mono">Gear</span>
            {equipmentInventory.length > 0 && (
              <span className="bg-amber-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {equipmentInventory.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
