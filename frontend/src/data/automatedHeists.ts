import type { AutomatedHeist, TeamMember, GameState } from '../types/game';

// Automated Heist Database for Phase 1
export const automatedHeists: AutomatedHeist[] = [
  // ===== BEGINNER TIER =====
  {
    id: 'corner-store-snatch',
    name: 'Corner Store Snatch',
    duration: 1, // 1 hour
    requirements: {
      minTeamSize: 1,
      maxTeamSize: 2,
      requiredSkills: { social: 3, stealth: 2 }
    },
    rewards: {
      basePayout: 200,
      experienceMultiplier: 0.5,
      possibleLoot: [],
      masteryGain: 1
    },
    riskLevel: 2,
    description: 'Quick in-and-out job at a local convenience store. Perfect for beginners to learn the ropes.',
    unlockConditions: ['Starting heist - always available']
  },

  {
    id: 'parking-meter-raid',
    name: 'Parking Meter Collection',
    duration: 2,
    requirements: {
      minTeamSize: 1,
      maxTeamSize: 3,
      requiredSkills: { athletics: 3, lockpicking: 2 },
      requiredEquipment: ['tool']
    },
    rewards: {
      basePayout: 350,
      experienceMultiplier: 0.6,
      possibleLoot: [],
      masteryGain: 1
    },
    riskLevel: 1,
    description: 'Low-risk collection from city parking meters. Boring but reliable income.',
    unlockConditions: ['Complete 3 corner store jobs']
  },

  // ===== AMATEUR TIER =====
  {
    id: 'apartment-burglary',
    name: 'Upscale Apartment Burglary',
    duration: 3,
    requirements: {
      minTeamSize: 2,
      maxTeamSize: 3,
      requiredSkills: { stealth: 5, lockpicking: 4, athletics: 3 }
    },
    rewards: {
      basePayout: 800,
      experienceMultiplier: 0.8,
      possibleLoot: [],
      masteryGain: 2
    },
    riskLevel: 3,
    description: 'Target wealthy apartments when residents are away. Requires careful timing and stealth.',
    unlockConditions: ['Reach team level 3', 'Complete 5 beginner heists']
  },

  {
    id: 'electronics-store-heist',
    name: 'Electronics Store Raid',
    duration: 4,
    requirements: {
      minTeamSize: 2,
      maxTeamSize: 4,
      requiredSkills: { hacking: 4, stealth: 4, athletics: 5 },
      requiredEquipment: ['gadget']
    },
    rewards: {
      basePayout: 1200,
      experienceMultiplier: 1.0,
      possibleLoot: [],
      masteryGain: 3
    },
    riskLevel: 4,
    description: 'Hit an electronics store for valuable gadgets. Alarm systems make this challenging.',
    unlockConditions: ['Have team member with hacking 6+']
  },

  // ===== PROFESSIONAL TIER =====
  {
    id: 'jewelry-store-heist',
    name: 'Downtown Jewelry Store',
    duration: 6,
    requirements: {
      minTeamSize: 3,
      maxTeamSize: 4,
      requiredSkills: { lockpicking: 6, stealth: 6, combat: 4, social: 5 }
    },
    rewards: {
      basePayout: 2500,
      experienceMultiplier: 1.2,
      possibleLoot: [],
      masteryGain: 4
    },
    riskLevel: 6,
    description: 'Classic jewelry store job. High security but excellent payoff for skilled teams.',
    unlockConditions: ['Reputation 500+', 'Complete 10 amateur heists']
  },

  {
    id: 'art-gallery-theft',
    name: 'Modern Art Gallery',
    duration: 5,
    requirements: {
      minTeamSize: 2,
      maxTeamSize: 3,
      requiredSkills: { stealth: 8, social: 6, lockpicking: 5 },
      requiredEquipment: ['accessory']
    },
    rewards: {
      basePayout: 3500,
      experienceMultiplier: 1.5,
      possibleLoot: [],
      masteryGain: 5
    },
    riskLevel: 5,
    description: 'Sophisticated art theft requiring cultural knowledge and finesse. High-class target.',
    unlockConditions: ['Have character with Face class', 'Social skill 8+ in team']
  },

  {
    id: 'corporate-espionage',
    name: 'Corporate Data Theft',
    duration: 8,
    requirements: {
      minTeamSize: 3,
      maxTeamSize: 5,
      requiredSkills: { hacking: 8, stealth: 6, social: 7 },
      requiredEquipment: ['gadget', 'accessory']
    },
    rewards: {
      basePayout: 4500,
      experienceMultiplier: 1.3,
      possibleLoot: [],
      masteryGain: 6
    },
    riskLevel: 7,
    description: 'Infiltrate corporate headquarters to steal valuable data. High-tech security systems.',
    unlockConditions: ['Have team member with Tech class level 5+', 'Reputation 1000+']
  },

  // ===== EXPERT TIER =====
  {
    id: 'bank-vault-job',
    name: 'First National Bank Vault',
    duration: 12,
    requirements: {
      minTeamSize: 4,
      maxTeamSize: 6,
      requiredSkills: { lockpicking: 8, hacking: 7, combat: 6, stealth: 7, social: 6 },
      requiredEquipment: ['weapon', 'tool', 'gadget']
    },
    rewards: {
      basePayout: 8000,
      experienceMultiplier: 2.0,
      possibleLoot: [],
      masteryGain: 8
    },
    riskLevel: 8,
    description: 'The classic bank job. Requires a full professional crew with specialized equipment.',
    unlockConditions: ['Complete 20 professional heists', 'Reputation 2000+', 'Team average level 6+']
  },

  {
    id: 'casino-heist',
    name: 'Diamond Casino Vault',
    duration: 10,
    requirements: {
      minTeamSize: 5,
      maxTeamSize: 6,
      requiredSkills: { stealth: 8, hacking: 9, social: 8, combat: 7, athletics: 6 },
      requiredEquipment: ['weapon', 'armor', 'gadget', 'accessory']
    },
    rewards: {
      basePayout: 12000,
      experienceMultiplier: 1.8,
      possibleLoot: [],
      masteryGain: 10
    },
    riskLevel: 9,
    description: 'Ocean\'s Eleven style casino heist. The big leagues with massive security.',
    unlockConditions: ['Complete bank vault job', 'Have Legendary character', 'Reputation 3000+']
  },

  // ===== LEGENDARY TIER =====
  {
    id: 'federal-reserve-heist',
    name: 'Federal Reserve Gold Vault',
    duration: 24,
    requirements: {
      minTeamSize: 6,
      maxTeamSize: 8,
      requiredSkills: { stealth: 9, hacking: 10, combat: 8, lockpicking: 9, social: 9, athletics: 8 },
      requiredEquipment: ['weapon', 'armor', 'tool', 'gadget', 'accessory']
    },
    rewards: {
      basePayout: 50000,
      experienceMultiplier: 3.0,
      possibleLoot: [],
      masteryGain: 20
    },
    riskLevel: 10,
    description: 'The ultimate heist. Fort Knox level security with national implications.',
    unlockConditions: ['Complete 5 expert heists', 'Reputation 5000+', 'Have The Architect character']
  },

  // ===== SPECIAL EVENT HEISTS =====
  {
    id: 'museum-night-gala',
    name: 'Museum Gala Infiltration',
    duration: 6,
    requirements: {
      minTeamSize: 3,
      maxTeamSize: 4,
      requiredSkills: { social: 8, stealth: 6, lockpicking: 5 },
      requiredEquipment: ['accessory'] // Formal wear
    },
    rewards: {
      basePayout: 4000,
      experienceMultiplier: 1.4,
      possibleLoot: [],
      masteryGain: 7
    },
    riskLevel: 5,
    description: 'Infiltrate a high-society museum gala to steal priceless artifacts. Requires social finesse.',
    unlockConditions: ['Weekend only', 'Have Face character level 6+']
  },

  {
    id: 'armored-car-intercept',
    name: 'Highway Armored Car Intercept',
    duration: 4,
    requirements: {
      minTeamSize: 4,
      maxTeamSize: 5,
      requiredSkills: { combat: 7, athletics: 7, hacking: 5 },
      requiredEquipment: ['weapon', 'armor']
    },
    rewards: {
      basePayout: 6000,
      experienceMultiplier: 1.6,
      possibleLoot: [],
      masteryGain: 8
    },
    riskLevel: 8,
    description: 'High-speed intercept of armored car convoy. Dangerous but lucrative.',
    unlockConditions: ['Complete 15 professional heists', 'Have Muscle character level 7+']
  },

  // ===== TUTORIAL/TRAINING HEISTS =====
  {
    id: 'training-lockpicking',
    name: 'Lockpicking Practice',
    duration: 1,
    requirements: {
      minTeamSize: 1,
      maxTeamSize: 1,
      requiredSkills: { lockpicking: 1 }
    },
    rewards: {
      basePayout: 50,
      experienceMultiplier: 0.3,
      possibleLoot: [],
      masteryGain: 2 // Higher mastery gain for training
    },
    riskLevel: 0,
    description: 'Safe training environment to improve lockpicking skills. No real risk.',
    unlockConditions: ['Tutorial - always available']
  },

  {
    id: 'training-stealth',
    name: 'Stealth Training Course',
    duration: 1,
    requirements: {
      minTeamSize: 1,
      maxTeamSize: 1,
      requiredSkills: { stealth: 1 }
    },
    rewards: {
      basePayout: 50,
      experienceMultiplier: 0.3,
      possibleLoot: [],
      masteryGain: 2
    },
    riskLevel: 0,
    description: 'Practice stealth techniques in a controlled environment.',
    unlockConditions: ['Tutorial - always available']
  },

  {
    id: 'training-hacking',
    name: 'Cybersecurity Practice',
    duration: 1,
    requirements: {
      minTeamSize: 1,
      maxTeamSize: 1,
      requiredSkills: { hacking: 1 }
    },
    rewards: {
      basePayout: 50,
      experienceMultiplier: 0.3,
      possibleLoot: [],
      masteryGain: 2
    },
    riskLevel: 0,
    description: 'Practice hacking skills on simulated systems.',
    unlockConditions: ['Tutorial - always available']
  }
];

// Heist difficulty scaling based on team power level
export function getScaledHeistPayout(heist: AutomatedHeist, teamPowerLevel: number): number {
  const baseMultiplier = 1 + (teamPowerLevel / 100); // Higher level teams get bonus rewards
  const riskMultiplier = 1 + (heist.riskLevel / 10);
  return Math.floor(heist.rewards.basePayout * baseMultiplier * riskMultiplier);
}

// Function to check if heist is available
export function isHeistAvailable(heist: AutomatedHeist, playerState: GameState): boolean {
  // Check unlock conditions
  for (const condition of heist.unlockConditions || []) {
    if (condition.includes('always available') || condition.includes('Tutorial')) {
      continue;
    }
    
    // Parse different types of unlock conditions
    if (condition.includes('Complete') && condition.includes('heists')) {
      const required = parseInt(condition.match(/\d+/)?.[0] || '0');
      if (playerState.heistsCompleted < required) return false;
    }
    
    if (condition.includes('Reputation')) {
      const required = parseInt(condition.match(/\d+/)?.[0] || '0');
      if (playerState.reputation < required) return false;
    }
    
    if (condition.includes('level')) {
      const required = parseInt(condition.match(/\d+/)?.[0] || '0');
      const hasHighLevelCharacter = playerState.availableCharacters.some(
        (char) => char.progression.level >= required
      );
      if (!hasHighLevelCharacter) return false;
    }
    
    if (condition.includes('Have') && condition.includes('character')) {
      const requiredClass = condition.match(/(Face|Tech|Muscle|Infiltrator|Acrobat|Mastermind|Wildcard)/)?.[0];
      if (requiredClass) {
        const hasClass = playerState.availableCharacters.some(
          (char) => char.characterClass.toLowerCase() === requiredClass.toLowerCase()
        );
        if (!hasClass) return false;
      }
      
      const requiredCharacter = condition.match(/(The Architect|Legendary)/)?.[0];
      if (requiredCharacter === 'The Architect') {
        const hasArchitect = playerState.availableCharacters.some(
          (char) => char.name === 'The Architect'
        );
        if (!hasArchitect) return false;
      }
      
      if (requiredCharacter === 'Legendary') {
        const hasLegendary = playerState.availableCharacters.some(
          (char) => char.rarity === 'legendary'
        );
        if (!hasLegendary) return false;
      }
    }
    
    // Weekend only heists
    if (condition.includes('Weekend only')) {
      const today = new Date().getDay();
      if (today !== 0 && today !== 6) return false; // Sunday = 0, Saturday = 6
    }
  }
  
  return true;
}

// Function to get recommended team for heist
export function getRecommendedTeam(heist: AutomatedHeist, availableCharacters: TeamMember[]): TeamMember[] {
  const recommended = [];
  const skills = heist.requirements.requiredSkills || {};
  
  // Sort characters by how well they match required skills
  const scored = availableCharacters.map(char => {
    let score = 0;
    Object.entries(skills).forEach(([skill, required]) => {
      const charSkill = char.skills[skill as keyof TeamMember['skills']] || 0;
      if (charSkill >= required) {
        score += charSkill - required + 10; // Bonus for exceeding requirements
      } else {
        score -= (required - charSkill) * 2; // Penalty for not meeting requirements
      }
    });
    return { character: char, score };
  });
  
  // Select best characters up to max team size
  scored.sort((a, b) => b.score - a.score);
  const maxSize = Math.min(heist.requirements.maxTeamSize, scored.length);
  
  for (let i = 0; i < maxSize && recommended.length < heist.requirements.maxTeamSize; i++) {
    if (scored[i].score > 0) {
      recommended.push(scored[i].character);
    }
  }
  
  return recommended;
}

// Heist outcome calculation
export function calculateHeistOutcome(heist: AutomatedHeist, team: TeamMember[]): {
  success: boolean;
  payout: number;
  experience: number;
  injuries: string[];
  masteryGained: number;
} {
  // Calculate team power vs heist difficulty
  let teamPower = 0;
  team.forEach(member => {
    const skills = heist.requirements.requiredSkills || {};
    Object.entries(skills).forEach(([skill]) => {
      const memberSkill = member.skills[skill as keyof TeamMember['skills']] || 0;
      teamPower += memberSkill;
    });
  });
  
  const difficultyThreshold = Object.values(heist.requirements.requiredSkills || {})
    .reduce((sum, req) => sum + req, 0) * heist.requirements.minTeamSize;
  
  const successChance = Math.min(95, Math.max(5, (teamPower / difficultyThreshold) * 50 + 25));
  const success = Math.random() * 100 < successChance;
  
  let payout = 0;
  let experience = 0;
  let injuries: string[] = [];
  let masteryGained = 0;
  
  if (success) {
    payout = heist.rewards.basePayout;
    experience = Math.floor(heist.rewards.basePayout * heist.rewards.experienceMultiplier);
    masteryGained = heist.rewards.masteryGain;
    
    // Bonus for excellent performance
    if (successChance > 80) {
      payout = Math.floor(payout * 1.2);
      experience = Math.floor(experience * 1.1);
    }
  } else {
    // Failure consequences
    payout = Math.floor(heist.rewards.basePayout * 0.1); // Small consolation
    experience = Math.floor(heist.rewards.basePayout * heist.rewards.experienceMultiplier * 0.3);
    masteryGained = Math.floor(heist.rewards.masteryGain * 0.5);
    
    // Risk of injuries based on heist risk level
    const injuryChance = heist.riskLevel * 10;
    team.forEach(member => {
      if (Math.random() * 100 < injuryChance) {
        const injuryTypes = ['Minor bruises', 'Sprained ankle', 'Exhaustion', 'Stress fracture'];
        injuries.push(`${member.name}: ${injuryTypes[Math.floor(Math.random() * injuryTypes.length)]}`);
      }
    });
  }
  
  return {
    success,
    payout,
    experience,
    injuries,
    masteryGained
  };
}