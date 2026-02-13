import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type {
  AutomatedHeist,
  TeamMember,
  Equipment,
} from '../../../types/game';
import {
  CheckCircle,
  XCircle,
  Clock,
  Target,
  DollarSign,
  Star,
  TrendingUp,
  Users,
  AlertTriangle,
  Gift,
} from 'lucide-react';
import { formatDuration } from '../../../utils/timeFormatting';

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
  levelUps: { characterId: number; oldLevel: number; newLevel: number }[];
}

interface MissionResultsModalProps {
  result: MissionResult | null;
  onClose: () => void;
}

const MissionResultsModal: React.FC<MissionResultsModalProps> = ({
  result,
  onClose,
}) => {
  if (!result) return null;

  const {
    heist,
    team,
    success,
    rewards,
    teamPower,
    requiredPower,
    successChance,
    levelUps,
  } = result;

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
          className="relative bg-heist-panel border-2 border-heist-border rounded-xl shadow-hud-panel max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Success/Failure Banner */}
          <div
            className={`${
              success
                ? 'bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 border-b-2 border-emerald-400'
                : 'bg-gradient-to-r from-red-600/20 to-red-800/20 border-b-2 border-red-400'
            } p-6 text-center`}
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                {success ? (
                  <CheckCircle className="w-16 h-16 text-emerald-400" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-400" />
                )}
              </div>
              <h2 className="text-4xl font-bold text-white mb-2 uppercase tracking-wider">
                {success ? 'MISSION SUCCESS' : 'MISSION FAILED'}
              </h2>
              <p className="text-gray-300 text-lg font-mono">{heist.name}</p>
            </motion.div>
          </div>

          <div className="p-6 space-y-6">
            {/* Mission Summary */}
            <div className="bg-heist-dark/60 border border-heist-border rounded-xl p-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-cyan-400 mb-4 uppercase tracking-wide">
                <Target className="w-5 h-5" />
                Mission Summary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-heist-panel border border-heist-border rounded p-3">
                  <div className="flex items-center gap-1 text-gray-400 font-mono uppercase text-xs mb-1">
                    <Clock className="w-3 h-3" />
                    Duration
                  </div>
                  <div className="text-cyan-400 font-mono font-bold">
                    {formatDuration(heist.duration)}
                  </div>
                </div>
                <div className="bg-heist-panel border border-heist-border rounded p-3">
                  <div className="text-gray-400 font-mono uppercase text-xs mb-1">
                    Risk Level
                  </div>
                  <div
                    className={`font-mono font-bold ${
                      heist.riskLevel <= 3
                        ? 'text-emerald-400'
                        : heist.riskLevel <= 6
                          ? 'text-amber-400'
                          : 'text-red-400'
                    }`}
                  >
                    {heist.riskLevel}/10
                  </div>
                </div>
                <div className="bg-heist-panel border border-heist-border rounded p-3">
                  <div className="text-gray-400 font-mono uppercase text-xs mb-1">
                    Team Power
                  </div>
                  <div className="text-purple-400 font-mono font-bold">
                    {teamPower.toFixed(0)}
                  </div>
                </div>
                <div className="bg-heist-panel border border-heist-border rounded p-3">
                  <div className="text-gray-400 font-mono uppercase text-xs mb-1">
                    Success Rate
                  </div>
                  <div
                    className={`font-mono font-bold ${
                      successChance >= 70
                        ? 'text-emerald-400'
                        : successChance >= 40
                          ? 'text-amber-400'
                          : 'text-red-400'
                    }`}
                  >
                    {successChance.toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Rewards */}
            <div className="bg-heist-dark/60 border border-heist-border rounded-xl p-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-amber-400 mb-4 uppercase tracking-wide">
                <DollarSign className="w-5 h-5" />
                Rewards
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-heist-panel border border-amber-400/30 rounded">
                  <span className="text-gray-300 font-mono uppercase text-sm">
                    Cash Earned
                  </span>
                  <span className="text-2xl font-bold font-mono text-amber-300">
                    ${rewards.payout}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-heist-panel border border-cyan-400/30 rounded">
                  <span className="text-gray-300 font-mono uppercase text-sm flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Total Experience
                  </span>
                  <span className="text-2xl font-bold font-mono text-cyan-400">
                    {rewards.totalXP} XP
                  </span>
                </div>
                {rewards.reputation > 0 && (
                  <div className="flex justify-between items-center p-3 bg-heist-panel border border-purple-400/30 rounded">
                    <span className="text-gray-300 font-mono uppercase text-sm">
                      Reputation Gained
                    </span>
                    <span className="text-2xl font-bold font-mono text-purple-400">
                      +{rewards.reputation}
                    </span>
                  </div>
                )}
                {rewards.equipmentDrops.length > 0 && (
                  <div className="p-3 bg-gradient-to-r from-amber-500/20 to-purple-500/20 border-2 border-amber-400/50 rounded">
                    <div className="flex items-center gap-2 text-amber-300 font-bold font-mono uppercase mb-2">
                      <Gift className="w-4 h-4" />
                      Equipment Found!
                    </div>
                    {rewards.equipmentDrops.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between mb-2 last:mb-0"
                      >
                        <div>
                          <div className="text-white font-bold">
                            {item.name}
                          </div>
                          <div className="text-gray-400 text-sm">
                            {item.description}
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded text-xs font-bold font-mono border ${
                            item.rarity === 'legendary'
                              ? 'bg-amber-400/20 border-amber-400 text-amber-400'
                              : item.rarity === 'masterwork'
                                ? 'bg-purple-400/20 border-purple-400 text-purple-400'
                                : item.rarity === 'advanced'
                                  ? 'bg-blue-400/20 border-blue-400 text-blue-400'
                                  : item.rarity === 'improved'
                                    ? 'bg-emerald-400/20 border-emerald-400 text-emerald-400'
                                    : 'bg-gray-400/20 border-gray-400 text-gray-400'
                          }`}
                        >
                          {item.rarity.toUpperCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Team Performance */}
            <div className="bg-heist-dark/60 border border-heist-border rounded-xl p-4">
              <h3 className="flex items-center gap-2 text-lg font-bold text-cyan-400 mb-4 uppercase tracking-wide">
                <Users className="w-5 h-5" />
                Team Performance
              </h3>
              <div className="space-y-2">
                {team.map(member => {
                  const levelUp = levelUps.find(
                    lu => lu.characterId === member.id
                  );
                  return (
                    <div
                      key={member.id}
                      className={`p-3 rounded border ${
                        levelUp
                          ? 'bg-gradient-to-r from-amber-500/20 to-cyan-500/20 border-amber-400'
                          : 'bg-heist-panel border-heist-border'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold">
                              {member.name}
                            </span>
                            {levelUp && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-1 px-2 py-1 bg-amber-400/20 border border-amber-400 text-amber-400 text-xs font-bold font-mono rounded"
                              >
                                <TrendingUp className="w-3 h-3" />
                                LEVEL UP! {levelUp.oldLevel} →{' '}
                                {levelUp.newLevel}
                              </motion.div>
                            )}
                          </div>
                          <div className="text-gray-400 text-sm font-mono">
                            {member.specialty}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-cyan-400 font-bold font-mono">
                            +{rewards.experiencePerMember} XP
                          </div>
                          <div className="text-gray-500 text-xs font-mono">
                            Level {member.progression.level}
                          </div>
                        </div>
                      </div>
                      {levelUp && (
                        <div className="mt-2 pt-2 border-t border-amber-400/30">
                          <div className="text-amber-400 text-sm font-mono uppercase">
                            New Rewards:
                          </div>
                          <div className="text-gray-300 text-xs font-mono">
                            +{levelUp.newLevel - levelUp.oldLevel} Attribute
                            Points • +
                            {(levelUp.newLevel - levelUp.oldLevel) * 2} Skill
                            Points
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
              <div className="bg-red-500/20 border-2 border-red-400/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-red-400 font-bold font-mono uppercase mb-2">
                      Mission Failed
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Your team's power ({teamPower.toFixed(0)}) was
                      insufficient for this mission (required:{' '}
                      {requiredPower.toFixed(0)}). You received partial rewards
                      for the attempt.
                    </p>
                    <p className="text-gray-300 text-sm mt-2">
                      <strong className="text-red-400">Tip:</strong> Level up
                      your team, acquire better equipment, or choose lower-risk
                      missions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Close Button */}
            <div className="text-center pt-4">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-cyan-400/20 hover:bg-cyan-400/30 border-2 border-cyan-400 text-cyan-400 rounded font-bold font-mono uppercase text-lg transition-all duration-200 hover:shadow-cyan-glow"
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
