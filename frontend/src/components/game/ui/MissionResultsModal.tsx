import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AutomatedHeist, TeamMember, Equipment } from '../../../types/game';

interface MissionResult {
  heist: AutomatedHeist;
  team: TeamMember[];
  success: boolean;
  rewards: {
    payout: number;
    totalXP: number;
    experiencePerMember: number;
    reputation: number;
    equipmentDrops: Equipment[];
  };
  teamPower: number;
  requiredPower: number;
  successChance: number;
  levelUps: { characterId: number; oldLevel: number; newLevel: number; }[];
}

interface MissionResultsModalProps {
  result: MissionResult | null;
  onClose: () => void;
}

const MissionResultsModal: React.FC<MissionResultsModalProps> = ({ result, onClose }) => {
  if (!result) return null;

  const { heist, team, success, rewards, teamPower, requiredPower, successChance, levelUps } = result;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-noir-900 border-4 border-gold-500/50 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Success/Failure Banner */}
          <div className={`${
            success
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-500'
              : 'bg-gradient-to-r from-blood-600 to-blood-500'
          } p-6 text-center`}>
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              <div className="text-6xl mb-2">{success ? '🎉' : '💥'}</div>
              <h2 className="text-4xl font-serif font-bold text-white mb-2">
                {success ? 'MISSION SUCCESS!' : 'MISSION FAILED'}
              </h2>
              <p className="text-white/90 text-lg">{heist.name}</p>
            </motion.div>
          </div>

          <div className="p-6 space-y-6">
            {/* Mission Summary */}
            <div className="bg-noir-800 border-2 border-gold-500/30 rounded-xl p-4">
              <h3 className="text-xl font-serif font-bold text-gold-300 mb-3">Mission Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <div className="text-noir-400">Duration</div>
                  <div className="text-noir-200 font-semibold">{heist.duration}h</div>
                </div>
                <div>
                  <div className="text-noir-400">Risk Level</div>
                  <div className={`font-semibold ${
                    heist.riskLevel <= 3 ? 'text-emerald-400' :
                    heist.riskLevel <= 6 ? 'text-yellow-400' : 'text-blood-500'
                  }`}>
                    {heist.riskLevel}/10
                  </div>
                </div>
                <div>
                  <div className="text-noir-400">Team Power</div>
                  <div className="text-noir-200 font-semibold">{teamPower.toFixed(0)}</div>
                </div>
                <div>
                  <div className="text-noir-400">Success Chance</div>
                  <div className={`font-semibold ${
                    successChance >= 70 ? 'text-emerald-400' :
                    successChance >= 40 ? 'text-yellow-400' : 'text-blood-500'
                  }`}>
                    {successChance.toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Rewards */}
            <div className="bg-noir-800 border-2 border-gold-500/30 rounded-xl p-4">
              <h3 className="text-xl font-serif font-bold text-gold-300 mb-3">💰 Rewards</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-noir-700 rounded-lg">
                  <span className="text-noir-200">Cash Earned</span>
                  <span className="text-2xl font-bold text-blood-500">${rewards.payout}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-noir-700 rounded-lg">
                  <span className="text-noir-200">Total Experience</span>
                  <span className="text-2xl font-bold text-gold-400">⭐ {rewards.totalXP} XP</span>
                </div>
                {rewards.reputation > 0 && (
                  <div className="flex justify-between items-center p-3 bg-noir-700 rounded-lg">
                    <span className="text-noir-200">Reputation Gained</span>
                    <span className="text-2xl font-bold text-gold-400">+{rewards.reputation}</span>
                  </div>
                )}
                {rewards.equipmentDrops.length > 0 && (
                  <div className="p-3 bg-gradient-to-r from-gold-500/20 to-blood-500/20 border-2 border-gold-500/50 rounded-lg">
                    <div className="text-gold-300 font-semibold mb-2">🎁 Equipment Found!</div>
                    {rewards.equipmentDrops.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div>
                          <div className="text-gold-200 font-bold">{item.name}</div>
                          <div className="text-noir-300 text-sm">{item.description}</div>
                        </div>
                        <div className={`px-3 py-1 rounded text-xs font-bold ${
                          item.rarity === 'legendary' ? 'bg-gold-500 text-noir-900' :
                          item.rarity === 'masterwork' ? 'bg-purple-500 text-white' :
                          item.rarity === 'advanced' ? 'bg-blue-500 text-white' :
                          item.rarity === 'improved' ? 'bg-emerald-500 text-white' :
                          'bg-noir-600 text-noir-200'
                        }`}>
                          {item.rarity.toUpperCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Team Performance */}
            <div className="bg-noir-800 border-2 border-gold-500/30 rounded-xl p-4">
              <h3 className="text-xl font-serif font-bold text-gold-300 mb-3">👥 Team Performance</h3>
              <div className="space-y-2">
                {team.map((member) => {
                  const levelUp = levelUps.find(lu => lu.characterId === member.id);
                  return (
                    <div key={member.id} className={`p-3 rounded-lg ${
                      levelUp
                        ? 'bg-gradient-to-r from-gold-500/30 to-gold-600/20 border-2 border-gold-400'
                        : 'bg-noir-700'
                    }`}>
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-noir-200 font-bold">{member.name}</span>
                            {levelUp && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="px-2 py-1 bg-gold-500 text-noir-900 text-xs font-bold rounded-full"
                              >
                                LEVEL UP! {levelUp.oldLevel} → {levelUp.newLevel}
                              </motion.div>
                            )}
                          </div>
                          <div className="text-noir-400 text-sm">{member.specialty}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-gold-400 font-bold">+{rewards.experiencePerMember} XP</div>
                          <div className="text-noir-400 text-xs">Level {member.progression.level}</div>
                        </div>
                      </div>
                      {levelUp && (
                        <div className="mt-2 pt-2 border-t border-gold-500/30">
                          <div className="text-gold-300 text-sm font-semibold">New Rewards:</div>
                          <div className="text-gold-200 text-xs">
                            +{levelUp.newLevel - levelUp.oldLevel} Attribute Points • +{(levelUp.newLevel - levelUp.oldLevel) * 2} Skill Points
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Failure Message */}
            {!success && (
              <div className="bg-blood-500/20 border-2 border-blood-500/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="text-blood-400 text-2xl">⚠️</div>
                  <div>
                    <h4 className="text-blood-300 font-bold mb-1">Mission Failed</h4>
                    <p className="text-blood-200 text-sm">
                      Your team's power ({teamPower.toFixed(0)}) was insufficient for this mission
                      (required: {requiredPower.toFixed(0)}). You received partial rewards for the attempt.
                    </p>
                    <p className="text-blood-200 text-sm mt-2">
                      <strong>Tip:</strong> Level up your team, acquire better equipment, or choose lower-risk missions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Close Button */}
            <div className="text-center pt-4">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-blood-500 to-gold-500 hover:from-blood-600 hover:to-gold-400 text-noir-900 rounded-xl font-serif font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Continue
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MissionResultsModal;
