import React from 'react';
import { useGameStore } from '../../../stores/gameStore';
import { UserPlus, DollarSign, Heart, TrendingUp } from 'lucide-react';

interface RecruitmentPageProps {
  onBackToGame: () => void;
}

const RecruitmentPage: React.FC<RecruitmentPageProps> = ({ onBackToGame }) => {
  const { availableCharacters, budget, selectedTeam, addTeamMember, tutorial, nextTutorialStep } = useGameStore();

  const handleRecruit = (character: typeof availableCharacters[0]) => {
    addTeamMember(character);

    // Advance tutorial if active
    if (tutorial.active) {
      if (tutorial.currentStep === 'recruit-first-character' && selectedTeam.length === 0) {
        // Just recruited first character
        setTimeout(() => nextTutorialStep(), 500);
      } else if (tutorial.currentStep === 'recruit-second-character' && selectedTeam.length === 1) {
        // Just recruited second character
        setTimeout(() => nextTutorialStep(), 500);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4 bg-heist-panel border border-heist-border p-8 rounded-xl shadow-hud-panel">
        <div className="flex items-center justify-center gap-3 mb-2">
          <UserPlus className="w-10 h-10 text-cyan-400" />
          <h2 className="text-4xl font-bold text-cyan-400 uppercase tracking-wide">Recruitment Center</h2>
        </div>
        <p className="text-gray-300 max-w-2xl mx-auto font-mono">
          Hire skilled operatives for your crew. Each member brings unique talents to the operation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableCharacters.map((character) => (
          <div key={character.id} className="bg-heist-panel border border-heist-border rounded-xl p-6 hover:border-cyan-400/50 hover:shadow-cyan-glow transition-all duration-200 shadow-hud-panel">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-1 uppercase tracking-wide">{character.name}</h3>
                <p className="text-gray-400 text-sm capitalize font-mono">{character.specialty}</p>
              </div>
              <div className="flex items-center gap-1 bg-amber-400/10 border border-amber-400/30 rounded px-2 py-1">
                <DollarSign className="w-4 h-4 text-amber-300" />
                <span className="text-amber-300 font-bold font-mono">{character.cost}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-heist-dark/60 border border-heist-border rounded p-2">
                <div className="flex items-center gap-1 text-gray-400 text-xs font-mono uppercase mb-1">
                  <TrendingUp className="w-3 h-3" />
                  Level
                </div>
                <div className="text-cyan-400 font-bold font-mono">{character.progression.level}</div>
              </div>
              <div className="bg-heist-dark/60 border border-heist-border rounded p-2">
                <div className="flex items-center gap-1 text-gray-400 text-xs font-mono uppercase mb-1">
                  <Heart className="w-3 h-3" />
                  Health
                </div>
                <div className="text-emerald-400 font-bold font-mono">{character.derivedStats.health}</div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="text-gray-400 text-xs font-mono uppercase">Primary Skills:</div>
              {Object.entries(character.skills).slice(0, 3).map(([skill, value]) => (
                <div key={skill} className="flex justify-between text-sm font-mono">
                  <span className="text-gray-300 capitalize">{skill.replace('_', ' ')}</span>
                  <span className="text-cyan-400 font-bold">{value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handleRecruit(character)}
              disabled={budget < character.cost || selectedTeam.length >= 4}
              className="w-full py-2 px-4 bg-cyan-400/20 hover:bg-cyan-400/30 disabled:bg-heist-dark border border-cyan-400 disabled:border-heist-border text-cyan-400 disabled:text-gray-600 rounded font-mono font-bold uppercase transition-all duration-200 hover:shadow-cyan-glow disabled:cursor-not-allowed"
            >
              {budget < character.cost ? 'Insufficient Funds' : selectedTeam.length >= 4 ? 'Crew Full' : 'Recruit'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentPage;