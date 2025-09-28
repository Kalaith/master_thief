import React from 'react';
import { useGameStore } from '../../../stores/gameStore';

interface TeamPageProps {
  onBackToGame: () => void;
}

const TeamPage: React.FC<TeamPageProps> = ({ onBackToGame }) => {
  const { selectedTeam, removeTeamMember } = useGameStore();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif font-bold text-gold-300">👥 Active Team</h2>
        <p className="text-noir-200 max-w-2xl mx-auto">
          Your current operatives and their status. Manage your criminal crew and track their performance.
        </p>
      </div>

      {selectedTeam.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👤</div>
          <h3 className="text-xl font-serif text-noir-300 mb-2">No Team Members</h3>
          <p className="text-noir-400">Visit the Recruitment tab to hire operatives for your team.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selectedTeam.map((member) => (
            <div key={member.id} className="bg-noir-800 border-2 border-gold-500/30 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-gold-300 mb-1">{member.name}</h3>
                  <p className="text-noir-400 text-sm capitalize">{member.specialty}</p>
                </div>
                <div className="text-right">
                  <div className="text-blood-500 font-bold text-lg">Lv. {member.progression.level}</div>
                  <div className="text-noir-400 text-xs">Level</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-noir-700 rounded p-3">
                  <div className="text-noir-400 text-xs">Health</div>
                  <div className="text-emerald-400 font-bold">{member.derivedStats.health}</div>
                </div>
                <div className="bg-noir-700 rounded p-3">
                  <div className="text-noir-400 text-xs">Fatigue</div>
                  <div className="text-yellow-400 font-bold">{member.fatigue}%</div>
                </div>
                <div className="bg-noir-700 rounded p-3">
                  <div className="text-noir-400 text-xs">Experience</div>
                  <div className="text-gold-400 font-bold">{member.progression.experience}</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-noir-400 text-xs mb-2">Equipment:</div>
                {Object.entries(member.equipment).map(([slot, item]) => (
                  <div key={slot} className="flex justify-between items-center bg-noir-700 rounded p-2">
                    <div className="flex items-center gap-2">
                      <span className="text-noir-300 text-sm capitalize">{slot}</span>
                      <span className="text-noir-400 text-xs">({item ? item.name : 'Empty'})</span>
                    </div>
                    {item && (
                      <div className="text-right text-xs">
                        <div className="text-gold-400">+{Object.values(item.skillBonuses).reduce((a, b) => a + b, 0)} bonus</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <div className="text-noir-400 text-xs mb-2">Top Skills:</div>
                {Object.entries(member.skills)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 4)
                  .map(([skill, value]) => (
                  <div key={skill} className="flex justify-between text-sm">
                    <span className="text-noir-300 capitalize">{skill.replace('_', ' ')}</span>
                    <span className="text-gold-400 font-bold">{value}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => removeTeamMember(member.id)}
                className="w-full mt-4 py-2 px-4 bg-blood-600 hover:bg-blood-700 text-white rounded-lg font-medium transition-colors"
              >
                Remove from Team
              </button>
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

export default TeamPage;