import React from 'react';
import { useGameStore } from '../../../stores/gameStore';
import { DollarSign, Trophy, Users, Target, Clock, Timer } from 'lucide-react';

const GameOverview: React.FC = () => {
  const { budget, selectedTeam, heistsCompleted, activeAutomatedHeists } = useGameStore();

  console.log('GameOverview component rendered');

  return (
    <div className="space-y-6">
      {/* Game Overview Header */}
      <div className="text-center space-y-4 bg-heist-panel border border-heist-border p-8 rounded-xl shadow-hud-panel">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Target className="w-10 h-10 text-cyan-400" />
          <h2 className="text-4xl font-bold text-cyan-400 uppercase tracking-wide">Operations Dashboard</h2>
        </div>
        <p className="text-gray-300 max-w-3xl mx-auto text-base leading-relaxed font-mono">
          Monitor active operations, manage your crew, and plan your next big score.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-heist-panel border border-amber-400/30 rounded-xl p-6 hover:shadow-amber-glow transition-all">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-amber-300" />
            <div>
              <div className="text-gray-400 text-xs font-mono uppercase">Budget</div>
              <div className="text-amber-300 font-bold text-2xl font-mono">${budget.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="bg-heist-panel border border-cyan-400/30 rounded-xl p-6 hover:shadow-cyan-glow transition-all">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-cyan-400" />
            <div>
              <div className="text-gray-400 text-xs font-mono uppercase">Jobs Completed</div>
              <div className="text-cyan-400 font-bold text-2xl font-mono">{heistsCompleted}</div>
            </div>
          </div>
        </div>

        <div className="bg-heist-panel border border-purple-400/30 rounded-xl p-6 hover:shadow-purple-glow transition-all">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-400" />
            <div>
              <div className="text-gray-400 text-xs font-mono uppercase">Crew Size</div>
              <div className="text-purple-400 font-bold text-2xl font-mono">{selectedTeam.length}/4</div>
            </div>
          </div>
        </div>

        <div className="bg-heist-panel border border-emerald-400/30 rounded-xl p-6 hover:shadow-emerald-400/30 transition-all">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-emerald-400" />
            <div>
              <div className="text-gray-400 text-xs font-mono uppercase">Active Ops</div>
              <div className="text-emerald-400 font-bold text-2xl font-mono">{activeAutomatedHeists.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Missions */}
      {activeAutomatedHeists.length > 0 && (
        <div className="bg-heist-panel border border-heist-border rounded-xl p-6 shadow-hud-panel">
          <h3 className="flex items-center gap-2 text-xl font-bold text-cyan-400 mb-6 uppercase tracking-wide">
            <Timer className="w-6 h-6" />
            Active Operations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeAutomatedHeists.map((heist, index) => (
              <div key={index} className="bg-heist-dark/60 border border-cyan-400/30 rounded-lg p-4 hover:shadow-cyan-glow transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-base font-bold text-cyan-400 uppercase tracking-wide flex-1">{heist.heist.name}</h4>
                  <div className="flex items-center gap-1 text-amber-300 font-bold font-mono text-sm bg-amber-400/10 px-2 py-1 rounded border border-amber-400/30">
                    <Clock className="w-3 h-3" />
                    {Math.max(0, Math.floor(heist.timeRemaining / 60))}h {heist.timeRemaining % 60}m
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-3 leading-relaxed">{heist.heist.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-gray-500 font-mono">
                    <Users className="w-3 h-3" />
                    <span>{heist.team.length} OPERATORS</span>
                  </div>
                  <div className="text-purple-400 font-mono">
                    RISK: {heist.heist.riskLevel}/10
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {activeAutomatedHeists.length === 0 && (
        <div className="bg-heist-panel border border-heist-border rounded-xl p-12 text-center shadow-hud-panel">
          <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-400 mb-2 uppercase tracking-wide">No Active Operations</h3>
          <p className="text-gray-500 font-mono text-sm">Navigate to Targets to select a mission and deploy your crew.</p>
        </div>
      )}
    </div>
  );
};

const GamePage: React.FC = () => {
  return <GameOverview />;
};

export default GamePage;