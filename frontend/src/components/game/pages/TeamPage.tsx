import React from 'react';
import { useGameStore } from '../../../stores/gameStore';
import { Users, Heart, Zap, Star, TrendingUp, X, Shield } from 'lucide-react';

interface TeamPageProps {
  onBackToGame: () => void;
}

const TeamPage: React.FC<TeamPageProps> = ({ onBackToGame }) => {
  const { selectedTeam, removeTeamMember, isCharacterOnMission } = useGameStore();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4 bg-heist-panel border border-heist-border p-8 rounded-xl shadow-hud-panel">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Users className="w-10 h-10 text-cyan-400" />
          <h2 className="text-4xl font-bold text-cyan-400 uppercase tracking-wide">Active Crew</h2>
        </div>
        <p className="text-gray-300 max-w-2xl mx-auto font-mono">
          Manage your operatives and monitor their status. Maximum crew size: 4 members.
        </p>
      </div>

      {selectedTeam.length === 0 ? (
        <div className="bg-heist-panel border border-heist-border rounded-xl p-12 text-center">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-400 mb-2 uppercase tracking-wide">No Crew Members</h3>
          <p className="text-gray-500 font-mono text-sm">Visit Recruitment to hire operatives for your crew.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selectedTeam.map((member) => (
            <div key={member.id} className="bg-heist-panel border border-purple-400/30 rounded-xl p-6 shadow-hud-panel hover:shadow-purple-glow transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-cyan-400 mb-1 uppercase tracking-wide">{member.name}</h3>
                  <p className="text-gray-400 text-sm capitalize font-mono">{member.specialty}</p>
                </div>
                <div className="flex items-center gap-1 bg-cyan-400/10 border border-cyan-400/30 rounded px-2 py-1">
                  <Star className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-400 font-bold font-mono">Lv. {member.progression.level}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-heist-dark/60 border border-heist-border rounded p-2">
                  <div className="flex items-center gap-1 text-gray-400 text-xs font-mono uppercase mb-1">
                    <Heart className="w-3 h-3" />
                    HP
                  </div>
                  <div className="text-emerald-400 font-bold font-mono">{member.derivedStats.health}</div>
                </div>
                <div className="bg-heist-dark/60 border border-heist-border rounded p-2">
                  <div className="flex items-center gap-1 text-gray-400 text-xs font-mono uppercase mb-1">
                    <Zap className="w-3 h-3" />
                    Fatigue
                  </div>
                  <div className="text-amber-400 font-bold font-mono">{member.fatigue}%</div>
                </div>
                <div className="bg-heist-dark/60 border border-heist-border rounded p-2">
                  <div className="flex items-center gap-1 text-gray-400 text-xs font-mono uppercase mb-1">
                    <TrendingUp className="w-3 h-3" />
                    XP
                  </div>
                  <div className="text-purple-400 font-bold font-mono">{member.progression.experience}</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-1 text-gray-400 text-xs font-mono uppercase mb-2">
                  <Shield className="w-3 h-3" />
                  Equipment
                </div>
                {Object.entries(member.equipment).map(([slot, item]) => (
                  <div key={slot} className="flex justify-between items-center bg-heist-dark/60 border border-heist-border rounded p-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300 text-sm capitalize font-mono">{slot}</span>
                      <span className="text-gray-500 text-xs font-mono">({item ? item.name : 'Empty'})</span>
                    </div>
                    {item && (
                      <div className="text-right text-xs">
                        <div className="text-cyan-400 font-mono">+{Object.values(item.skillBonuses).reduce((a, b) => a + b, 0)}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-1 mb-4">
                <div className="text-gray-400 text-xs font-mono uppercase mb-2">Top Skills</div>
                {Object.entries(member.skills)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 4)
                  .map(([skill, value]) => (
                  <div key={skill} className="flex justify-between text-sm font-mono">
                    <span className="text-gray-300 capitalize">{skill.replace('_', ' ')}</span>
                    <span className="text-cyan-400 font-bold">{value}</span>
                  </div>
                ))}
              </div>

              {isCharacterOnMission(member.id) ? (
                <div className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-amber-600/20 border border-amber-400 text-amber-400 rounded font-mono font-bold uppercase">
                  <Zap className="w-4 h-4" />
                  On Mission - Busy
                </div>
              ) : (
                <button
                  onClick={() => removeTeamMember(member.id)}
                  title={`Refund: $${Math.floor(member.cost / 2).toLocaleString()} (50% of signup bonus)`}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-600/20 hover:bg-red-600/30 border border-red-400 text-red-400 rounded font-mono font-bold uppercase transition-all"
                >
                  <X className="w-4 h-4" />
                  Remove from Crew
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamPage;