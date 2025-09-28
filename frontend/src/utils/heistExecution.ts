import type { TeamMember, Encounter, EncounterResult, Equipment } from '../types/game';
import { getAttributeModifier } from './characterCalculations';

// D20 dice system (1-20)
export function rollD20(): number {
  return Math.floor(Math.random() * 20) + 1;
}

// Enhanced encounter resolution with D&D mechanics
export function resolveEncounter(
  member: TeamMember, 
  encounter: Encounter,
  environmentalModifiers: number = 0
): EncounterResult {
  // Roll d20
  const roll = rollD20();
  
  // Get primary skill value
  const primarySkill = member.skills[encounter.primary_skill];
  
  // Calculate attribute modifier
  let attributeModifier = 0;
  if (encounter.primary_attribute) {
    attributeModifier = getAttributeModifier(member.attributes[encounter.primary_attribute]);
  } else {
    // Default attribute mapping for skills
    switch (encounter.primary_skill) {
      case 'stealth':
        attributeModifier = getAttributeModifier(member.attributes.dexterity) + 
                           getAttributeModifier(member.attributes.wisdom);
        break;
      case 'athletics':
        attributeModifier = getAttributeModifier(member.attributes.strength) +
                           getAttributeModifier(member.attributes.constitution);
        break;
      case 'combat':
        attributeModifier = getAttributeModifier(member.attributes.strength) +
                           getAttributeModifier(member.attributes.dexterity);
        break;
      case 'lockpicking':
        attributeModifier = getAttributeModifier(member.attributes.dexterity) +
                           getAttributeModifier(member.attributes.intelligence);
        break;
      case 'hacking':
        attributeModifier = getAttributeModifier(member.attributes.intelligence) +
                           getAttributeModifier(member.attributes.wisdom);
        break;
      case 'social':
        attributeModifier = getAttributeModifier(member.attributes.charisma) +
                           getAttributeModifier(member.attributes.wisdom);
        break;
      default:
        attributeModifier = 0;
    }
  }
  
  // Equipment bonuses
  let equipmentBonus = 0;
  Object.values(member.equipment).forEach(item => {
    if (item && item.skillBonuses[encounter.primary_skill]) {
      equipmentBonus += item.skillBonuses[encounter.primary_skill] || 0;
    }
    
    // Special equipment type bonuses for encounters
    if (item && encounter.equipment_bonuses && encounter.equipment_bonuses[item.type]) {
      equipmentBonus += encounter.equipment_bonuses[item.type];
    }
  });
  
  // Character condition modifiers
  let conditionModifiers = 0;
  
  // Fatigue penalty
  if (member.fatigue > 50) {
    conditionModifiers -= Math.floor((member.fatigue - 50) / 10);
  }
  
  // Loyalty bonus/penalty
  if (member.loyalty > 80) {
    conditionModifiers += 1;
  } else if (member.loyalty < 40) {
    conditionModifiers -= 2;
  }
  
  // Injury penalties
  member.injuries.forEach(injury => {
    if (injury.includes('Major')) conditionModifiers -= 3;
    else if (injury.includes('Minor')) conditionModifiers -= 1;
  });
  
  // Level-based proficiency bonus (like D&D 5e)
  const proficiencyBonus = Math.floor((member.progression.level - 1) / 4) + 2;
  
  // Calculate total
  const total = roll + primarySkill + attributeModifier + equipmentBonus + 
                proficiencyBonus + conditionModifiers + environmentalModifiers;
  
  // Determine outcome based on DC (Difficulty Class)
  let outcome: EncounterResult['outcome'];
  const dc = encounter.difficulty;
  
  if (roll === 1) {
    outcome = 'critical_failure'; // Natural 1 is always critical failure
  } else if (roll === 20) {
    outcome = 'critical_success'; // Natural 20 is always critical success
  } else if (total >= dc + 10) {
    outcome = 'critical_success'; // Beat DC by 10+
  } else if (total >= dc + 5) {
    outcome = 'success'; // Beat DC by 5+
  } else if (total >= dc) {
    outcome = 'neutral'; // Just beat DC
  } else if (total >= dc - 5) {
    outcome = 'failure'; // Close failure
  } else {
    outcome = 'critical_failure'; // Failed by 5+
  }
  
  // Calculate experience and stress
  let experienceGained = 0;
  let stressInflicted = 0;
  const itemsFound: Equipment[] = [];
  let relationshipChanges: { [characterId: number]: number } = {};
  
  switch (outcome) {
    case 'critical_success':
      experienceGained = encounter.difficulty * 3;
      stressInflicted = 0;
      // Chance for bonus loot or relationship improvement
      if (Math.random() < 0.3) {
        // TODO: Add equipment finding logic
      }
      break;
      
    case 'success':
      experienceGained = encounter.difficulty * 2;
      stressInflicted = Math.floor(encounter.difficulty / 2);
      break;
      
    case 'neutral':
      experienceGained = encounter.difficulty;
      stressInflicted = encounter.difficulty;
      break;
      
    case 'failure':
      experienceGained = Math.floor(encounter.difficulty / 2);
      stressInflicted = encounter.difficulty * 2;
      // Risk of minor injury
      if (Math.random() < 0.2) {
        member.injuries.push('Minor strain from failed attempt');
      }
      break;
      
    case 'critical_failure':
      experienceGained = Math.floor(encounter.difficulty / 4);
      stressInflicted = encounter.difficulty * 3;
      // Higher risk of injury and relationship damage
      if (Math.random() < 0.4) {
        member.injuries.push('Significant injury from critical failure');
      }
      // Potential relationship damage with team (simplified for Phase 1)
      // TODO: Implement full relationship system in Phase 3
      relationshipChanges = {}; // Will be implemented with full team context later
      break;
  }
  
  // Generate narrative description
  const narrativeDescription = generateNarrativeDescription(
    member, encounter, outcome, roll, total, dc
  );
  
  return {
    member,
    encounter,
    roll,
    attributeModifier,
    skillBonus: primarySkill,
    equipmentBonus,
    situationalModifiers: conditionModifiers + environmentalModifiers,
    total,
    outcome,
    experienceGained,
    stressInflicted,
    itemsFound,
    relationshipChanges,
    narrativeDescription
  };
}

// Generate dynamic narrative descriptions
function generateNarrativeDescription(
  member: TeamMember,
  encounter: Encounter,
  outcome: EncounterResult['outcome'],
  roll: number,
  total: number,
  dc: number
): string {
  const skill = encounter.primary_skill;
  const memberName = member.name;
  
  // Personality-based flavor
  const traits = member.personalityTraits || [];
  const hasOptimistic = traits.includes('Optimistic');
  const hasCynical = traits.includes('Cynical');
  const hasMethodical = traits.includes('Methodical');
  
  let baseDescription = '';
  
  // Skill-specific action descriptions
  switch (skill) {
    case 'stealth':
      baseDescription = `${memberName} attempts to move silently past security`;
      break;
    case 'athletics':
      baseDescription = `${memberName} uses physical prowess to overcome the obstacle`;
      break;
    case 'combat':
      baseDescription = `${memberName} engages in combat with security`;
      break;
    case 'lockpicking':
      baseDescription = `${memberName} works carefully on the lock mechanism`;
      break;
    case 'hacking':
      baseDescription = `${memberName} interfaces with the electronic system`;
      break;
    case 'social':
      baseDescription = `${memberName} attempts to charm and deceive their way through`;
      break;
    default:
      baseDescription = `${memberName} tackles the challenge`;
  }
  
  // Outcome-specific results
  let outcomeDescription = '';
  
  switch (outcome) {
    case 'critical_success':
      if (roll === 20) {
        outcomeDescription = hasOptimistic 
          ? ' with incredible luck and skill, exceeding all expectations!' 
          : ' with masterful execution that would impress even the most seasoned professionals!';
      } else {
        outcomeDescription = ` brilliantly, achieving far more than expected (rolled ${roll}, total ${total} vs DC ${dc})`;
      }
      break;
      
    case 'success':
      outcomeDescription = hasMethodical
        ? ` methodically and successfully, following their careful planning`
        : ` successfully, demonstrating their professional competence`;
      break;
      
    case 'neutral':
      outcomeDescription = ` adequately, getting the job done despite some minor complications`;
      break;
      
    case 'failure':
      if (hasCynical) {
        outcomeDescription = ` but fails, muttering "I knew this would happen" under their breath`;
      } else if (hasOptimistic) {
        outcomeDescription = ` but fails, though they remain convinced it'll work next time`;
      } else {
        outcomeDescription = ` but falls short of success, forcing the team to adapt`;
      }
      break;
      
    case 'critical_failure':
      if (roll === 1) {
        outcomeDescription = hasCynical
          ? ` but everything goes horribly wrong - exactly as they predicted`
          : ` but suffers a catastrophic failure that no one could have foreseen`;
      } else {
        outcomeDescription = ` but fails spectacularly, creating new complications for the team`;
      }
      break;
  }
  
  // Add special ability flavor
  if (Math.random() < 0.3) { // 30% chance for special ability reference
    const abilityFlavor = ` ${member.special_ability.split(',')[0].toLowerCase()}`;
    outcomeDescription += abilityFlavor;
  }
  
  return baseDescription + outcomeDescription;
}

// Team synergy bonus calculation
export function calculateTeamSynergy(team: TeamMember[]): number {
  let synergyBonus = 0;
  
  // Class diversity bonus
  const uniqueClasses = new Set(team.map(m => m.characterClass)).size;
  synergyBonus += uniqueClasses * 2;
  
  // Relationship bonuses (simplified for Phase 1)
  // TODO: Implement full relationship system in Phase 3
  team.forEach(member => {
    const averageLoyalty = member.loyalty / 100;
    synergyBonus += averageLoyalty * 3;
  });
  
  // Complementary skills bonus
  const totalSkills = {
    stealth: 0,
    athletics: 0,
    combat: 0,
    lockpicking: 0,
    hacking: 0,
    social: 0
  };
  
  team.forEach(member => {
    Object.keys(totalSkills).forEach(skill => {
      totalSkills[skill as keyof typeof totalSkills] += member.skills[skill as keyof typeof member.skills];
    });
  });
  
  // Bonus for well-rounded teams
  const skillValues = Object.values(totalSkills);
  const minSkill = Math.min(...skillValues);
  const maxSkill = Math.max(...skillValues);
  const balanceRatio = minSkill / (maxSkill || 1);
  
  synergyBonus += balanceRatio * 10; // Up to 10 point bonus for balanced teams
  
  return Math.floor(synergyBonus);
}

// Environmental factor system
export function getEnvironmentalModifiers(
  encounter: Encounter, 
  timeOfDay: 'day' | 'night' | 'dawn' | 'dusk' = 'day',
  weather: 'clear' | 'rain' | 'fog' | 'storm' = 'clear'
): number {
  let modifier = 0;
  
  // Time of day effects
  switch (timeOfDay) {
    case 'night':
      if (encounter.primary_skill === 'stealth') modifier += 2;
      if (encounter.primary_skill === 'social') modifier -= 1;
      break;
    case 'day':
      if (encounter.primary_skill === 'social') modifier += 1;
      if (encounter.primary_skill === 'stealth') modifier -= 1;
      break;
    case 'dawn':
    case 'dusk':
      // Transition times are neutral but add slight stealth bonus
      if (encounter.primary_skill === 'stealth') modifier += 1;
      break;
  }
  
  // Weather effects
  switch (weather) {
    case 'rain':
      if (encounter.primary_skill === 'stealth') modifier += 1; // Rain masks sound
      if (encounter.primary_skill === 'athletics') modifier -= 2; // Slippery surfaces
      break;
    case 'fog':
      if (encounter.primary_skill === 'stealth') modifier += 3; // Excellent cover
      if (encounter.primary_skill === 'hacking') modifier -= 1; // Visibility issues
      break;
    case 'storm':
      if (encounter.primary_skill === 'stealth') modifier += 2; // Storm masks noise
      if (encounter.primary_skill === 'athletics') modifier -= 3; // Dangerous conditions
      if (encounter.primary_skill === 'social') modifier -= 2; // People are on edge
      break;
  }
  
  // Environmental factors from encounter
  encounter.environmental_factors?.forEach(factor => {
    switch (factor.toLowerCase()) {
      case 'crowded':
        if (encounter.primary_skill === 'stealth') modifier += 2;
        if (encounter.primary_skill === 'social') modifier += 1;
        break;
      case 'well-lit':
        if (encounter.primary_skill === 'stealth') modifier -= 2;
        if (encounter.primary_skill === 'lockpicking') modifier += 1;
        break;
      case 'noisy':
        if (encounter.primary_skill === 'stealth') modifier += 1;
        if (encounter.primary_skill === 'social') modifier -= 1;
        break;
      case 'high-security':
        modifier -= 3; // General difficulty increase
        break;
      case 'electronic':
        if (encounter.primary_skill === 'hacking') modifier += 2;
        if (encounter.primary_skill === 'lockpicking') modifier -= 1;
        break;
    }
  });
  
  return modifier;
}

// Advanced heist simulation for automated heists
export function simulateAutomatedHeist(
  team: TeamMember[],
  encounters: Encounter[]
): {
  results: EncounterResult[];
  success: boolean;
  totalPayout: number;
  totalExperience: number;
  teamFatigue: number;
  injuries: string[];
} {
  const results: EncounterResult[] = [];
  let totalExperience = 0;
  let totalStress = 0;
  let injuries: string[] = [];
  let success = true;
  
  // Simulate each encounter
  encounters.forEach((encounter) => {
    // Select best team member for this encounter
    let bestMember = team[0];
    let bestScore = 0;
    
    team.forEach(member => {
      // Skip if member is too injured/fatigued
      if (member.fatigue > 80 || member.injuries.length > 2) return;
      
      const skillScore = member.skills[encounter.primary_skill] || 0;
      const attributeModifier = encounter.primary_attribute 
        ? getAttributeModifier(member.attributes[encounter.primary_attribute])
        : 0;
      
      const totalScore = skillScore + attributeModifier;
      
      if (totalScore > bestScore) {
        bestScore = totalScore;
        bestMember = member;
      }
    });
    
    // Apply environmental modifiers based on time and conditions
    const timeModifiers = Math.random() > 0.5 ? 
      getEnvironmentalModifiers(encounter, 'night') : 
      getEnvironmentalModifiers(encounter, 'day');
    
    // Resolve encounter
    const result = resolveEncounter(bestMember, encounter, timeModifiers);
    results.push(result);
    
    totalExperience += result.experienceGained;
    totalStress += result.stressInflicted;
    
    // Collect any injuries from the encounter result
    if (result.outcome === 'critical_failure' && Math.random() < 0.4) {
      const injuryDescription = `${bestMember.name}: Injury from critical failure`;
      injuries.push(injuryDescription);
      bestMember.injuries.push('Critical failure injury');
    } else if (result.outcome === 'failure' && Math.random() < 0.2) {
      const injuryDescription = `${bestMember.name}: Minor strain`;
      injuries.push(injuryDescription);
      bestMember.injuries.push('Minor strain');
    }
    
    // Apply stress to member
    bestMember.fatigue = Math.min(100, bestMember.fatigue + result.stressInflicted);
    
    // Check for mission failure
    if (result.outcome === 'critical_failure' && Math.random() < 0.3) {
      success = false;
      // Early termination on critical failures would need different approach
      // For now, continue with remaining encounters but mark as failed
    }
  });
  
  // Calculate success rate
  const successfulEncounters = results.filter(r => 
    r.outcome === 'success' || r.outcome === 'critical_success'
  ).length;
  
  const successRate = successfulEncounters / results.length;
  
  // Overall success based on encounter success rate
  if (successRate < 0.5) {
    success = false;
  }
  
  // Calculate payout based on success
  let totalPayout = 0;
  if (success) {
    totalPayout = 1000 + (totalExperience * 2); // Base calculation
    // Bonus for excellent performance
    if (successRate > 0.8) {
      totalPayout = Math.floor(totalPayout * 1.3);
    }
  } else {
    totalPayout = Math.floor((1000 + totalExperience) * 0.2); // Minimal payout for failure
  }
  
  return {
    results,
    success,
    totalPayout,
    totalExperience,
    teamFatigue: totalStress / team.length,
    injuries
  };
}