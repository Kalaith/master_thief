import React from 'react';
import { useGameStore } from '../../../stores/gameStore';

interface RecruitmentPageProps {
  onBackToGame: () => void;
}

const RecruitmentPage: React.FC<RecruitmentPageProps> = ({ onBackToGame }) => {
  const { availableCharacters, budget, selectedTeam, addTeamMember } = useGameStore();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif font-bold text-gold-300">🎭 Recruitment Office</h2>
        <p className="text-noir-200 max-w-2xl mx-auto">
          Hire skilled operatives for your criminal enterprise. Choose wisely - each member brings unique talents to your team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableCharacters.map((character) => (
          <div key={character.id} className="bg-noir-800 border-2 border-gold-500/30 rounded-xl p-6 hover:border-gold-500/50 transition-all duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-gold-300 mb-1">{character.name}</h3>
                <p className="text-noir-400 text-sm capitalize">{character.specialty}</p>
              </div>
              <div className="text-right">
                <div className="text-blood-500 font-bold text-lg">${character.cost}</div>
                <div className="text-noir-400 text-xs">Cost</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-noir-700 rounded p-2">
                <div className="text-noir-400 text-xs">Level</div>
                <div className="text-noir-200 font-bold">{character.progression.level}</div>
              </div>
              <div className="bg-noir-700 rounded p-2">
                <div className="text-noir-400 text-xs">Health</div>
                <div className="text-emerald-400 font-bold">{character.derivedStats.health}</div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="text-noir-400 text-xs">Primary Skills:</div>
              {Object.entries(character.skills).slice(0, 3).map(([skill, value]) => (
                <div key={skill} className="flex justify-between text-sm">
                  <span className="text-noir-300 capitalize">{skill.replace('_', ' ')}</span>
                  <span className="text-gold-400 font-bold">{value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => addTeamMember(character)}
              disabled={budget < character.cost || selectedTeam.length >= 4}
              className="w-full py-2 px-4 bg-gradient-to-r from-blood-500 to-gold-500 hover:from-blood-600 hover:to-gold-400 disabled:from-noir-600 disabled:to-noir-600 text-noir-900 disabled:text-noir-400 rounded-lg font-serif font-bold transition-all duration-200"
            >
              {budget < character.cost ? 'Cannot Afford' : selectedTeam.length >= 4 ? 'Team Full' : 'Recruit'}
            </button>
          </div>
        ))}
      </div>

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

export default RecruitmentPage;