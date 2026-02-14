import type { Attributes, TeamMember, DerivedStats, CharacterProgression } from '../types/game';

// D&D-style attribute modifier calculation
export function getAttributeModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

// Calculate derived stats from attributes
export function calculateDerivedStats(attributes: Attributes, level: number): DerivedStats {
  const conMod = getAttributeModifier(attributes.constitution);
  const dexMod = getAttributeModifier(attributes.dexterity);
  const intMod = getAttributeModifier(attributes.intelligence);
  const chaMod = getAttributeModifier(attributes.charisma);

  return {
    health: 10 + conMod + level * (2 + conMod),
    stamina: 10 + conMod + getAttributeModifier(attributes.strength),
    initiative: dexMod + getAttributeModifier(attributes.wisdom),
    carryingCapacity: attributes.strength * 15, // pounds
    criticalChance: Math.max(5, dexMod + intMod) / 100,
    criticalMultiplier: 1.5 + chaMod * 0.1,
  };
}

// Calculate skills from attributes and training
export function calculateSkills(
  attributes: Attributes,
  progression: CharacterProgression,
  baseSkills: TeamMember['skills']
) {
  const strMod = getAttributeModifier(attributes.strength);
  const dexMod = getAttributeModifier(attributes.dexterity);
  const intMod = getAttributeModifier(attributes.intelligence);
  const wisMod = getAttributeModifier(attributes.wisdom);
  const chaMod = getAttributeModifier(attributes.charisma);
  const conMod = getAttributeModifier(attributes.constitution);

  // Skill calculations: base skill + attribute modifier + level bonus
  const levelBonus = Math.floor(progression.level / 2);
  const masteryBonus = progression.masteryLevel;

  return {
    stealth: Math.max(0, baseSkills.stealth + dexMod + wisMod + levelBonus),
    athletics: Math.max(0, baseSkills.athletics + strMod + conMod + levelBonus),
    combat: Math.max(0, baseSkills.combat + strMod + dexMod + levelBonus),
    lockpicking: Math.max(0, baseSkills.lockpicking + dexMod + intMod + levelBonus),
    hacking: Math.max(0, baseSkills.hacking + intMod + wisMod + levelBonus),
    social: Math.max(0, baseSkills.social + chaMod + wisMod + levelBonus + masteryBonus),
  };
}

// Experience calculation for next level
export function calculateExperienceToNext(level: number): number {
  // Exponential growth: level^2 * 100
  return level * level * 100;
}

// Calculate total experience for a given level
export function calculateTotalExperience(level: number): number {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += calculateExperienceToNext(i);
  }
  return total;
}

// Level up character
export function levelUpCharacter(character: TeamMember): TeamMember {
  const newLevel = character.progression.level + 1;
  const newExperienceToNext = calculateExperienceToNext(newLevel);

  return {
    ...character,
    progression: {
      ...character.progression,
      level: newLevel,
      experience: character.progression.experience - character.progression.experienceToNext,
      experienceToNext: newExperienceToNext,
      attributePoints: character.progression.attributePoints + 1,
      skillPoints: character.progression.skillPoints + 2,
    },
  };
}

// Generate starting attributes based on character class and rarity
export function generateStartingAttributes(
  characterClass: TeamMember['characterClass'],
  rarity: TeamMember['rarity']
): Attributes {
  // Base attributes (commoner average: 10-11)
  let baseStr = 10,
    baseDex = 10,
    baseInt = 10,
    baseWis = 10,
    baseCha = 10,
    baseCon = 10;

  // Class-based attribute priorities
  switch (characterClass) {
    case 'muscle':
      baseStr += 4;
      baseCon += 3;
      baseDex += 1;
      break;
    case 'acrobat':
      baseDex += 4;
      baseStr += 2;
      baseCon += 2;
      break;
    case 'tech':
      baseInt += 4;
      baseWis += 2;
      baseDex += 2;
      break;
    case 'face':
      baseCha += 4;
      baseWis += 3;
      baseInt += 1;
      break;
    case 'infiltrator':
      baseDex += 3;
      baseWis += 3;
      baseInt += 2;
      break;
    case 'mastermind':
      baseInt += 3;
      baseWis += 3;
      baseCha += 2;
      break;
    case 'wildcard':
      baseStr += 2;
      baseDex += 2;
      baseInt += 2;
      baseWis += 1;
      baseCha += 1;
      baseCon += 2;
      break;
  }

  // Rarity-based bonuses (higher rarity = better stats)
  const rarityBonus = {
    common: 0,
    uncommon: 2,
    rare: 4,
    epic: 6,
    legendary: 8,
  }[rarity];

  // Distribute rarity bonus across attributes (favor class strengths)
  const distributionPoints = rarityBonus;
  let remainingPoints = distributionPoints;

  // Apply random distribution with class bias
  while (remainingPoints > 0) {
    const attributes = [
      'strength',
      'dexterity',
      'intelligence',
      'wisdom',
      'charisma',
      'constitution',
    ];
    const randomAttr = attributes[Math.floor(Math.random() * attributes.length)];

    switch (randomAttr) {
      case 'strength':
        if (characterClass === 'muscle' || characterClass === 'acrobat') {
          baseStr += Math.min(remainingPoints, 2);
          remainingPoints -= Math.min(remainingPoints, 2);
        } else {
          baseStr += Math.min(remainingPoints, 1);
          remainingPoints -= Math.min(remainingPoints, 1);
        }
        break;
      case 'dexterity':
        if (characterClass === 'acrobat' || characterClass === 'infiltrator') {
          baseDex += Math.min(remainingPoints, 2);
          remainingPoints -= Math.min(remainingPoints, 2);
        } else {
          baseDex += Math.min(remainingPoints, 1);
          remainingPoints -= Math.min(remainingPoints, 1);
        }
        break;
      case 'intelligence':
        if (characterClass === 'tech' || characterClass === 'mastermind') {
          baseInt += Math.min(remainingPoints, 2);
          remainingPoints -= Math.min(remainingPoints, 2);
        } else {
          baseInt += Math.min(remainingPoints, 1);
          remainingPoints -= Math.min(remainingPoints, 1);
        }
        break;
      case 'wisdom':
        baseWis += Math.min(remainingPoints, 1);
        remainingPoints -= Math.min(remainingPoints, 1);
        break;
      case 'charisma':
        if (characterClass === 'face') {
          baseCha += Math.min(remainingPoints, 2);
          remainingPoints -= Math.min(remainingPoints, 2);
        } else {
          baseCha += Math.min(remainingPoints, 1);
          remainingPoints -= Math.min(remainingPoints, 1);
        }
        break;
      case 'constitution':
        baseCon += Math.min(remainingPoints, 1);
        remainingPoints -= Math.min(remainingPoints, 1);
        break;
    }

    if (remainingPoints <= 0) break;
  }

  return {
    strength: Math.min(20, baseStr),
    dexterity: Math.min(20, baseDex),
    intelligence: Math.min(20, baseInt),
    wisdom: Math.min(20, baseWis),
    charisma: Math.min(20, baseCha),
    constitution: Math.min(20, baseCon),
  };
}

// Calculate character power level (for balancing)
export function calculatePowerLevel(character: TeamMember): number {
  const attributeTotal = Object.values(character.attributes).reduce((sum, attr) => sum + attr, 0);
  const skillTotal = Object.values(character.skills).reduce((sum, skill) => sum + skill, 0);
  const equipmentBonus = Object.values(character.equipment).filter(Boolean).length * 5;
  const levelBonus = character.progression.level * 2;

  return attributeTotal + skillTotal + equipmentBonus + levelBonus;
}

// Rest and recovery system
export function restCharacter(character: TeamMember): TeamMember {
  const conMod = getAttributeModifier(character.attributes.constitution);
  const restRecovery = Math.max(1, conMod);

  return {
    ...character,
    progression: {
      ...character.progression,
      // Reduce fatigue
    },
    fatigue: Math.max(0, character.fatigue - restRecovery * 10),
    // Heal minor injuries with good constitution
    injuries: character.injuries.filter(injury =>
      injury.includes('minor') && Math.random() > 0.5 + conMod * 0.1 ? false : true
    ),
  };
}

// Stress and morale system
export function applyStress(character: TeamMember, stressAmount: number): TeamMember {
  const wisMod = getAttributeModifier(character.attributes.wisdom);
  const stressResistance = Math.max(1, wisMod + 1);
  const actualStress = Math.max(0, stressAmount - stressResistance);

  return {
    ...character,
    fatigue: Math.min(100, character.fatigue + actualStress),
    loyalty: character.loyalty - Math.floor(actualStress / 5),
  };
}

// Equipment integration
export function applyEquipmentBonuses(character: TeamMember): TeamMember {
  const attributeBonuses: Partial<Attributes> = {};
  const skillBonuses: Partial<TeamMember['skills']> = {};

  // Aggregate bonuses from all equipped items
  Object.values(character.equipment).forEach(item => {
    if (!item) return;

    Object.entries(item.attributeBonuses).forEach(([attr, bonus]) => {
      if (bonus) {
        attributeBonuses[attr as keyof Attributes] =
          (attributeBonuses[attr as keyof Attributes] || 0) + bonus;
      }
    });

    Object.entries(item.skillBonuses).forEach(([skill, bonus]) => {
      if (bonus) {
        skillBonuses[skill as keyof TeamMember['skills']] =
          (skillBonuses[skill as keyof TeamMember['skills']] || 0) + bonus;
      }
    });
  });

  // Apply bonuses to character
  const enhancedAttributes = {
    ...character.attributes,
    strength: character.attributes.strength + (attributeBonuses.strength || 0),
    dexterity: character.attributes.dexterity + (attributeBonuses.dexterity || 0),
    intelligence: character.attributes.intelligence + (attributeBonuses.intelligence || 0),
    wisdom: character.attributes.wisdom + (attributeBonuses.wisdom || 0),
    charisma: character.attributes.charisma + (attributeBonuses.charisma || 0),
    constitution: character.attributes.constitution + (attributeBonuses.constitution || 0),
  };

  const enhancedSkills = {
    ...character.skills,
    stealth: character.skills.stealth + (skillBonuses.stealth || 0),
    athletics: character.skills.athletics + (skillBonuses.athletics || 0),
    combat: character.skills.combat + (skillBonuses.combat || 0),
    lockpicking: character.skills.lockpicking + (skillBonuses.lockpicking || 0),
    hacking: character.skills.hacking + (skillBonuses.hacking || 0),
    social: character.skills.social + (skillBonuses.social || 0),
  };

  return {
    ...character,
    attributes: enhancedAttributes,
    skills: enhancedSkills,
    derivedStats: calculateDerivedStats(enhancedAttributes, character.progression.level),
  };
}
