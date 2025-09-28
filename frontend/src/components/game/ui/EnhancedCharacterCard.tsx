import React from 'react';
import type { TeamMember } from '../../../types/game';
import { getAttributeModifier } from '../../../utils/characterCalculations';

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
  const rarityColors = {
    common: 'from-slate-600 to-slate-700',
    uncommon: 'from-emerald-600 to-emerald-700',
    rare: 'from-blue-600 to-blue-700',
    epic: 'from-purple-600 to-purple-700',
    legendary: 'from-amber-600 to-amber-700'
  };

  const rarityBorderColors = {
    common: 'border-slate-400',
    uncommon: 'border-emerald-400', 
    rare: 'border-blue-400',
    epic: 'border-purple-400',
    legendary: 'border-amber-400'
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
      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
        <div 
          className="bg-red-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${healthPercent}%` }}
        ></div>
      </div>
    );
  };

  const getFatigueBar = () => {
    const fatiguePercent = character.fatigue;
    const fatigueColor = fatiguePercent > 70 ? 'bg-red-500' : 
                        fatiguePercent > 40 ? 'bg-yellow-500' : 'bg-green-500';
    
    return (
      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
        <div 
          className={`${fatigueColor} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${fatiguePercent}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className={`relative bg-gradient-to-br ${rarityColors[character.rarity]} rounded-xl border-2 ${rarityBorderColors[character.rarity]} p-4 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
      {/* Character Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{classIcons[character.characterClass]}</span>
          <div>
            <h3 className="text-white font-bold text-lg">{character.name}</h3>
            <p className="text-gray-300 text-sm">{character.specialty}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-white font-bold text-lg">Lv.{character.progression.level}</div>
          <div className="text-gray-300 text-sm capitalize">{character.rarity}</div>
        </div>
      </div>

      {/* Experience Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-300 mb-1">
          <span>XP: {character.progression.experience}</span>
          <span>Next: {character.progression.experienceToNext}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-400 h-2 rounded-full transition-all duration-300"
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
            <div key={attr} className="bg-black bg-opacity-30 rounded-lg p-2 text-center">
              <div className="text-xs text-gray-300 uppercase">{attr.slice(0, 3)}</div>
              <div className="text-white font-bold">{value}</div>
              <div className="text-xs text-gray-400">({modifierStr})</div>
            </div>
          );
        })}
      </div>

      {/* Skills */}
      <div className="grid grid-cols-2 gap-1 mb-3 text-xs">
        {Object.entries(character.skills).map(([skill, value]) => (
          <div key={skill} className="flex justify-between text-white">
            <span className="capitalize">{skill}:</span>
            <span className="font-bold">{value}</span>
          </div>
        ))}
      </div>

      {/* Health and Fatigue Bars */}
      <div className="mb-3">
        <div className="text-xs text-gray-300 mb-1">Health: {character.derivedStats.health}</div>
        {getHealthBar()}
        <div className="text-xs text-gray-300 mb-1">Fatigue: {character.fatigue}%</div>
        {getFatigueBar()}
      </div>

      {/* Loyalty and Status */}
      <div className="flex justify-between items-center mb-3 text-xs">
        <div className="text-gray-300">
          Loyalty: <span className="text-white font-bold">{character.loyalty}%</span>
        </div>
        <div className="text-gray-300">
          Mastery: <span className="text-white font-bold">{character.progression.masteryLevel}/10</span>
        </div>
      </div>

      {/* Equipment Slots */}
      <div className="grid grid-cols-5 gap-1 mb-3">
        {['weapon', 'armor', 'accessory', 'tool', 'gadget'].map(slot => {
          const item = character.equipment[slot as keyof typeof character.equipment];
          return (
            <div 
              key={slot} 
              className={`aspect-square rounded border-2 ${item ? 'border-green-400 bg-green-900 bg-opacity-50' : 'border-gray-600 bg-gray-800 bg-opacity-50'} flex items-center justify-center text-xs`}
              title={item ? item.name : `Empty ${slot} slot`}
            >
              {item ? '✓' : '•'}
            </div>
          );
        })}
      </div>

      {/* Special Ability */}
      <div className="bg-black bg-opacity-40 rounded-lg p-2 mb-3">
        <p className="text-gray-300 text-xs italic">"{character.special_ability}"</p>
      </div>

      {/* Personality Traits */}
      {character.personalityTraits.length > 0 && (
        <div className="mb-3">
          <div className="text-xs text-gray-400 mb-1">Personality:</div>
          <div className="flex flex-wrap gap-1">
            {character.personalityTraits.slice(0, 3).map(trait => (
              <span key={trait} className="bg-purple-800 bg-opacity-60 text-purple-200 px-2 py-1 rounded text-xs">
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Injuries */}
      {character.injuries.length > 0 && (
        <div className="mb-3">
          <div className="text-xs text-red-400 mb-1">Injuries:</div>
          {character.injuries.slice(0, 2).map((injury, index) => (
            <div key={index} className="text-xs text-red-300 bg-red-900 bg-opacity-30 rounded px-2 py-1 mb-1">
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
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Recruit (${character.cost.toLocaleString()})
          </button>
        )}
        
        {isRecruited && onRemove && (
          <button
            onClick={() => onRemove(character.id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Remove
          </button>
        )}
      </div>

      {/* Detailed Stats Toggle (for Phase 1 testing) */}
      {showDetailedStats && (
        <div className="mt-3 pt-3 border-t border-gray-600">
          <div className="text-xs text-gray-400 space-y-1">
            <div>Initiative: +{character.derivedStats.initiative}</div>
            <div>Carry Capacity: {character.derivedStats.carryingCapacity} lbs</div>
            <div>Crit Chance: {(character.derivedStats.criticalChance * 100).toFixed(1)}%</div>
            <div>Crit Multiplier: {character.derivedStats.criticalMultiplier.toFixed(1)}x</div>
            <div>Heists Completed: {character.progression.heistsCompleted}</div>
            <div>Success Rate: {character.progression.successRate.toFixed(1)}%</div>
          </div>
        </div>
      )}

      {/* Rarity Glow Effect */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${rarityColors[character.rarity]} opacity-20 pointer-events-none`}></div>
    </div>
  );
};

export default EnhancedCharacterCard;