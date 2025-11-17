import React from 'react';
import type { TeamMember } from '../../../types/game';
import { getAttributeModifier } from '../../../utils/characterCalculations';
import { Heart, Zap, Star, TrendingUp, Shield, Wrench, AlertCircle } from 'lucide-react';

interface EnhancedCharacterCardProps {
  character: TeamMember;
  onRecruit?: (character: TeamMember) => void;
  onRemove?: (characterId: number) => void;
  isRecruited?: boolean;
  showDetailedStats?: boolean;
}

const EnhancedCharacterCard: React.FC<EnhancedCharacterCardProps> = ({
  character,
  onRecruit,
  onRemove,
  isRecruited = false,
  showDetailedStats = false
}) => {
  const rarityConfig = {
    common: {
      border: 'border-slate-400',
      glow: 'shadow-slate-400/20',
      text: 'text-slate-400',
      bg: 'bg-slate-400/10'
    },
    uncommon: {
      border: 'border-emerald-400',
      glow: 'shadow-emerald-400/30',
      text: 'text-emerald-400',
      bg: 'bg-emerald-400/10'
    },
    rare: {
      border: 'border-blue-400',
      glow: 'shadow-blue-400/30',
      text: 'text-blue-400',
      bg: 'bg-blue-400/10'
    },
    epic: {
      border: 'border-purple-400',
      glow: 'shadow-purple-glow',
      text: 'text-purple-400',
      bg: 'bg-purple-400/10'
    },
    legendary: {
      border: 'border-amber-400',
      glow: 'shadow-amber-glow',
      text: 'text-amber-400',
      bg: 'bg-amber-400/10'
    }
  };

  const classIcons = {
    muscle: '💪',
    infiltrator: '🥷',
    tech: '💻',
    face: '🎭',
    acrobat: '🤸',
    mastermind: '🧠',
    wildcard: '🃏'
  };

  const getHealthBar = () => {
    const currentHealth = character.derivedStats.health;
    const maxHealth = character.derivedStats.health;
    const healthPercent = (currentHealth / maxHealth) * 100;

    return (
      <div className="w-full bg-heist-dark rounded-full h-2 border border-heist-border overflow-hidden">
        <div
          className="bg-gradient-to-r from-green-500 to-emerald-400 h-full rounded-full transition-all duration-300"
          style={{ width: `${healthPercent}%` }}
        ></div>
      </div>
    );
  };

  const getFatigueBar = () => {
    const fatiguePercent = character.fatigue;
    const fatigueColor = fatiguePercent > 70 ? 'bg-gradient-to-r from-red-500 to-red-400' :
                        fatiguePercent > 40 ? 'bg-gradient-to-r from-yellow-500 to-amber-400' : 'bg-gradient-to-r from-green-500 to-emerald-400';

    return (
      <div className="w-full bg-heist-dark rounded-full h-2 border border-heist-border overflow-hidden">
        <div
          className={`${fatigueColor} h-full rounded-full transition-all duration-300`}
          style={{ width: `${fatiguePercent}%` }}
        ></div>
      </div>
    );
  };

  const rarity = rarityConfig[character.rarity];

  return (
    <div className={`relative bg-heist-panel rounded-xl border ${rarity.border} ${rarity.glow} p-4 shadow-hud-panel transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
      {/* Rarity indicator bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${rarity.bg} rounded-t-xl`} />

      {/* Character Header */}
      <div className="flex items-center justify-between mb-3 mt-1">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded ${rarity.bg} border ${rarity.border} flex items-center justify-center text-2xl`}>
            {classIcons[character.characterClass]}
          </div>
          <div>
            <h3 className="text-white font-bold text-base uppercase tracking-wide">{character.name}</h3>
            <p className="text-gray-400 text-xs font-mono">{character.specialty}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-cyan-400 font-bold font-mono">
            <Star className="w-3 h-3" />
            <span>LV.{character.progression.level}</span>
          </div>
          <div className={`${rarity.text} text-xs font-mono uppercase`}>{character.rarity}</div>
        </div>
      </div>

      {/* Experience Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-400 font-mono mb-1">
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            XP: {character.progression.experience}
          </span>
          <span>NEXT: {character.progression.experienceToNext}</span>
        </div>
        <div className="w-full bg-heist-dark rounded-full h-2 border border-heist-border">
          <div
            className="bg-gradient-to-r from-cyan-400 to-blue-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${(character.progression.experience / character.progression.experienceToNext) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* D&D Attributes */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {Object.entries(character.attributes).map(([attr, value]) => {
          const modifier = getAttributeModifier(value);
          const modifierStr = modifier >= 0 ? `+${modifier}` : `${modifier}`;

          return (
            <div key={attr} className="bg-heist-dark/60 border border-heist-border rounded p-2 text-center hover:border-cyan-400/30 transition-colors">
              <div className="text-xs text-gray-400 uppercase font-mono">{attr.slice(0, 3)}</div>
              <div className="text-cyan-400 font-bold font-mono text-lg">{value}</div>
              <div className="text-xs text-gray-500 font-mono">({modifierStr})</div>
            </div>
          );
        })}
      </div>

      {/* Skills */}
      <div className="grid grid-cols-2 gap-1 mb-3 text-xs">
        {Object.entries(character.skills).map(([skill, value]) => (
          <div key={skill} className="flex justify-between text-gray-300 font-mono">
            <span className="capitalize text-gray-400">{skill}:</span>
            <span className="font-bold text-cyan-400">{value}</span>
          </div>
        ))}
      </div>

      {/* Health and Fatigue Bars */}
      <div className="mb-3 space-y-2">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 font-mono mb-1">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              HEALTH
            </span>
            <span className="text-green-400">{character.derivedStats.health}</span>
          </div>
          {getHealthBar()}
        </div>
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 font-mono mb-1">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              FATIGUE
            </span>
            <span className={character.fatigue > 70 ? 'text-red-400' : character.fatigue > 40 ? 'text-yellow-400' : 'text-green-400'}>
              {character.fatigue}%
            </span>
          </div>
          {getFatigueBar()}
        </div>
      </div>

      {/* Loyalty and Status */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-heist-dark/60 border border-heist-border rounded px-2 py-1">
          <div className="text-xs text-gray-400 font-mono uppercase mb-1">Loyalty</div>
          <div className="text-purple-400 font-bold font-mono">{character.loyalty}%</div>
        </div>
        <div className="bg-heist-dark/60 border border-heist-border rounded px-2 py-1">
          <div className="text-xs text-gray-400 font-mono uppercase mb-1">Mastery</div>
          <div className="text-cyan-400 font-bold font-mono">{character.progression.masteryLevel}/10</div>
        </div>
      </div>

      {/* Equipment Slots */}
      <div className="mb-3">
        <div className="flex items-center gap-1 text-xs text-gray-400 font-mono uppercase mb-2">
          <Shield className="w-3 h-3" />
          Equipment
        </div>
        <div className="grid grid-cols-5 gap-1">
          {['weapon', 'armor', 'accessory', 'tool', 'gadget'].map(slot => {
            const item = character.equipment[slot as keyof typeof character.equipment];
            return (
              <div
                key={slot}
                className={`aspect-square rounded border ${item ? 'border-cyan-400 bg-cyan-400/20' : 'border-heist-border bg-heist-dark/60'} flex items-center justify-center text-xs transition-colors`}
                title={item ? item.name : `Empty ${slot} slot`}
              >
                {item ? <Shield className="w-3 h-3 text-cyan-400" /> : <div className="w-1 h-1 bg-gray-600 rounded-full" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Special Ability */}
      <div className="bg-heist-dark/60 border border-purple-400/30 rounded p-2 mb-3">
        <div className="flex items-center gap-1 text-xs text-purple-400 font-mono uppercase mb-1">
          <Wrench className="w-3 h-3" />
          Special Ability
        </div>
        <p className="text-gray-300 text-xs leading-relaxed">"{character.special_ability}"</p>
      </div>

      {/* Personality Traits */}
      {character.personalityTraits.length > 0 && (
        <div className="mb-3">
          <div className="text-xs text-gray-400 font-mono uppercase mb-2">Traits</div>
          <div className="flex flex-wrap gap-1">
            {character.personalityTraits.slice(0, 3).map(trait => (
              <span key={trait} className="bg-purple-400/20 border border-purple-400/50 text-purple-400 px-2 py-1 rounded text-xs font-mono">
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Injuries */}
      {character.injuries.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-1 text-xs text-red-400 font-mono uppercase mb-2">
            <AlertCircle className="w-3 h-3" />
            Injuries
          </div>
          {character.injuries.slice(0, 2).map((injury, index) => (
            <div key={index} className="text-xs text-red-300 bg-red-400/20 border border-red-400/50 rounded px-2 py-1 mb-1 font-mono">
              {injury}
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        {!isRecruited && onRecruit && (
          <button
            onClick={() => onRecruit(character)}
            className="flex-1 bg-cyan-400/20 hover:bg-cyan-400/30 border border-cyan-400 text-cyan-400 font-bold py-2 px-4 rounded transition-all duration-200 hover:shadow-cyan-glow font-mono uppercase text-sm"
          >
            Recruit ${character.cost.toLocaleString()}
          </button>
        )}

        {isRecruited && onRemove && (
          <button
            onClick={() => onRemove(character.id)}
            className="flex-1 bg-red-600/20 hover:bg-red-600/30 border border-red-400 text-red-400 font-bold py-2 px-4 rounded transition-all duration-200 font-mono uppercase text-sm"
          >
            Remove
          </button>
        )}
      </div>

      {/* Detailed Stats Toggle (for Phase 1 testing) */}
      {showDetailedStats && (
        <div className="mt-3 pt-3 border-t border-heist-border">
          <div className="text-xs text-gray-400 font-mono space-y-1">
            <div className="flex justify-between">
              <span>Initiative:</span>
              <span className="text-cyan-400">+{character.derivedStats.initiative}</span>
            </div>
            <div className="flex justify-between">
              <span>Carry Capacity:</span>
              <span className="text-cyan-400">{character.derivedStats.carryingCapacity} lbs</span>
            </div>
            <div className="flex justify-between">
              <span>Crit Chance:</span>
              <span className="text-cyan-400">{(character.derivedStats.criticalChance * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Crit Multiplier:</span>
              <span className="text-cyan-400">{character.derivedStats.criticalMultiplier.toFixed(1)}x</span>
            </div>
            <div className="flex justify-between">
              <span>Heists Completed:</span>
              <span className="text-cyan-400">{character.progression.heistsCompleted}</span>
            </div>
            <div className="flex justify-between">
              <span>Success Rate:</span>
              <span className="text-cyan-400">{character.progression.successRate.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedCharacterCard;