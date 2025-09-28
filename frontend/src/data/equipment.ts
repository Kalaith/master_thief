import type { Equipment, CharacterClass } from '../types/game';

// Basic Equipment Database for Phase 1
export const basicEquipment: Equipment[] = [
  // ===== WEAPONS =====
  {
    id: 'crowbar-basic',
    name: 'Standard Crowbar',
    type: 'weapon',
    rarity: 'basic',
    description: 'A reliable prying tool. Simple, effective, and gets the job done.',
    attributeBonuses: { strength: 1 },
    skillBonuses: { lockpicking: 2, combat: 1 },
    cost: 150,
    specialEffects: ['Can force locked doors', 'Intimidation bonus in conversations']
  },
  
  {
    id: 'lockpicks-professional',
    name: 'Professional Lockpicks',
    type: 'weapon',
    rarity: 'improved',
    description: 'High-quality picks for the discerning burglar. Precision engineered.',
    attributeBonuses: { dexterity: 2 },
    skillBonuses: { lockpicking: 4, stealth: 1 },
    cost: 750,
    requiredClass: ['infiltrator', 'acrobat']
  },
  
  {
    id: 'plasma-cutter',
    name: 'Plasma Cutter',
    type: 'weapon', 
    rarity: 'advanced',
    description: 'Cuts through almost anything. Requires technical expertise.',
    attributeBonuses: { intelligence: 1 },
    skillBonuses: { lockpicking: 6, hacking: 2 },
    cost: 3500,
    requiredLevel: 5,
    requiredClass: ['tech'],
    specialEffects: ['Bypasses mechanical locks', 'Cuts through steel']
  },
  
  {
    id: 'whisper-gun',
    name: 'Whisper Gun',
    type: 'weapon',
    rarity: 'masterwork',
    description: 'Silent, non-lethal takedown weapon. Favored by professionals.',
    attributeBonuses: { dexterity: 2, wisdom: 1 },
    skillBonuses: { stealth: 5, combat: 3 },
    cost: 8500,
    requiredLevel: 8,
    specialEffects: ['Silent takedowns', 'No alarms triggered', '+50% stealth during combat']
  },

  // ===== ARMOR =====
  {
    id: 'street-clothes',
    name: 'Inconspicuous Clothing',
    type: 'armor',
    rarity: 'basic',
    description: 'Blend in with the crowd. Nothing says innocent like looking ordinary.',
    attributeBonuses: { charisma: 1 },
    skillBonuses: { social: 2, stealth: 1 },
    cost: 200
  },
  
  {
    id: 'reinforced-jacket',
    name: 'Reinforced Leather Jacket',
    type: 'armor',
    rarity: 'improved',
    description: 'Stylish protection with hidden armor plating. Looks cool, saves lives.',
    attributeBonuses: { constitution: 2, charisma: 1 },
    skillBonuses: { combat: 2 },
    cost: 1200,
    specialEffects: ['Reduced injury chance', 'Intimidation bonus']
  },
  
  {
    id: 'stealth-suit',
    name: 'Adaptive Stealth Suit',
    type: 'armor',
    rarity: 'advanced',
    description: 'High-tech fabric that adapts to surroundings. Military surplus.',
    attributeBonuses: { dexterity: 3, constitution: 1 },
    skillBonuses: { stealth: 6, athletics: 2 },
    cost: 6500,
    requiredLevel: 6,
    specialEffects: ['Chameleon effect', 'Reduced detection radius', 'Climate controlled']
  },

  // ===== ACCESSORIES =====
  {
    id: 'lucky-coin',
    name: 'Lucky Coin',
    type: 'accessory',
    rarity: 'basic',
    description: 'Everyone needs a little luck. This old coin has seen many heists.',
    attributeBonuses: { charisma: 1 },
    skillBonuses: { social: 1 },
    cost: 50,
    specialEffects: ['Reroll one failed check per heist']
  },
  
  {
    id: 'fake-id-set',
    name: 'Fake ID Collection',
    type: 'accessory',
    rarity: 'improved',
    description: 'Multiple identities for various social situations.',
    attributeBonuses: { charisma: 2, intelligence: 1 },
    skillBonuses: { social: 4, stealth: 2 },
    cost: 2000,
    specialEffects: ['Access to restricted areas', 'Reduced suspicion when caught']
  },
  
  {
    id: 'neural-implant',
    name: 'Neural Enhancement Implant',
    type: 'accessory',
    rarity: 'legendary',
    description: 'Experimental cybernetic upgrade. Enhances cognitive function.',
    attributeBonuses: { intelligence: 4, wisdom: 2 },
    skillBonuses: { hacking: 8, lockpicking: 4 },
    cost: 25000,
    requiredLevel: 12,
    specialEffects: ['Interface directly with electronics', 'Perfect memory recall', 'Accelerated learning']
  },

  // ===== TOOLS =====
  {
    id: 'basic-toolkit',
    name: 'Basic Tool Kit',
    type: 'tool',
    rarity: 'basic',
    description: 'Essential tools for any job. Screwdrivers, pliers, wire cutters.',
    attributeBonuses: { intelligence: 1 },
    skillBonuses: { lockpicking: 1, hacking: 1 },
    cost: 300
  },
  
  {
    id: 'electronics-kit',
    name: 'Electronics Repair Kit',
    type: 'tool',
    rarity: 'improved',
    description: 'Sophisticated electronics tools. Bypass, repair, or reprogram.',
    attributeBonuses: { intelligence: 2, dexterity: 1 },
    skillBonuses: { hacking: 5, lockpicking: 2 },
    cost: 1800,
    requiredClass: ['tech'],
    specialEffects: ['Repair damaged electronics', 'Extend equipment lifespan']
  },
  
  {
    id: 'master-toolkit',
    name: 'Master Craftsman Toolkit',
    type: 'tool',
    rarity: 'masterwork',
    description: 'Professional-grade tools for any situation. A craftsman is only as good as their tools.',
    attributeBonuses: { intelligence: 3, dexterity: 2, strength: 1 },
    skillBonuses: { lockpicking: 6, hacking: 4, athletics: 2 },
    cost: 12000,
    requiredLevel: 10,
    specialEffects: ['Universal compatibility', 'Enhanced success rates', 'Can craft basic equipment']
  },

  // ===== GADGETS =====
  {
    id: 'comm-earpiece',
    name: 'Communication Earpiece',
    type: 'gadget',
    rarity: 'basic',
    description: 'Stay in contact with your team. Essential for coordinated operations.',
    attributeBonuses: { wisdom: 1 },
    skillBonuses: { social: 2 },
    cost: 400,
    specialEffects: ['Team coordination bonus', 'Warning of incoming threats']
  },
  
  {
    id: 'hacking-deck',
    name: 'Portable Hacking Deck',
    type: 'gadget',
    rarity: 'improved',
    description: 'Compact computer system optimized for infiltration work.',
    attributeBonuses: { intelligence: 2 },
    skillBonuses: { hacking: 6, lockpicking: 1 },
    cost: 3200,
    requiredClass: ['tech', 'mastermind'],
    specialEffects: ['Remote system access', 'Security camera control']
  },
  
  {
    id: 'holographic-projector',
    name: 'Holographic Projector',
    type: 'gadget',
    rarity: 'advanced',
    description: 'Create realistic illusions and distractions. Theater meets technology.',
    attributeBonuses: { charisma: 3, intelligence: 2 },
    skillBonuses: { social: 5, stealth: 4 },
    cost: 7800,
    requiredLevel: 7,
    specialEffects: ['Create visual distractions', 'Disguise appearance', 'Confuse security systems']
  },
  
  {
    id: 'reality-hacker',
    name: 'Reality Hacker Device',
    type: 'gadget',
    rarity: 'legendary',
    description: 'Prototype technology that bends the rules of reality itself.',
    attributeBonuses: { intelligence: 5, wisdom: 3, charisma: 2 },
    skillBonuses: { hacking: 10, stealth: 6, social: 4 },
    cost: 50000,
    requiredLevel: 15,
    specialEffects: [
      'Manipulate probability', 
      'Phase through solid objects briefly', 
      'Rewrite local reality parameters',
      'One-time use per heist'
    ]
  }
];

// Equipment sets for synergy bonuses
export const equipmentSets = [
  {
    name: 'Professional Infiltrator',
    pieces: ['lockpicks-professional', 'stealth-suit', 'fake-id-set', 'electronics-kit', 'comm-earpiece'],
    setBonuses: {
      2: { skillBonuses: { stealth: 2 }, description: '2-piece: +2 Stealth' },
      3: { skillBonuses: { stealth: 2, lockpicking: 2 }, description: '3-piece: +2 Stealth, +2 Lockpicking' },
      4: { attributeBonuses: { dexterity: 1 }, skillBonuses: { stealth: 2, lockpicking: 2 }, description: '4-piece: Previous bonuses + 1 Dexterity' },
      5: { 
        attributeBonuses: { dexterity: 2 }, 
        skillBonuses: { stealth: 4, lockpicking: 4 }, 
        specialEffects: ['Ghost Mode: Become undetectable for one encounter per heist'],
        description: '5-piece: Ghost Mode ability unlocked'
      }
    }
  },
  
  {
    name: 'Tech Specialist', 
    pieces: ['plasma-cutter', 'reinforced-jacket', 'neural-implant', 'master-toolkit', 'hacking-deck'],
    setBonuses: {
      2: { skillBonuses: { hacking: 3 }, description: '2-piece: +3 Hacking' },
      3: { skillBonuses: { hacking: 3, lockpicking: 2 }, description: '3-piece: +3 Hacking, +2 Lockpicking' },
      4: { attributeBonuses: { intelligence: 1 }, skillBonuses: { hacking: 3, lockpicking: 2 }, description: '4-piece: Previous bonuses + 1 Intelligence' },
      5: {
        attributeBonuses: { intelligence: 2 },
        skillBonuses: { hacking: 6, lockpicking: 4 },
        specialEffects: ['Technomancy: Control any electronic device remotely'],
        description: '5-piece: Technomancy ability unlocked'
      }
    }
  }
];

// Equipment crafting recipes (for future expansion)
export const craftingRecipes = [
  {
    id: 'improved-crowbar',
    result: {
      id: 'crowbar-improved',
      name: 'Reinforced Crowbar',
      type: 'weapon' as const,
      rarity: 'improved' as const,
      description: 'A crowbar reinforced with high-strength alloys.',
      attributeBonuses: { strength: 2 },
      skillBonuses: { lockpicking: 3, combat: 2 },
      cost: 0
    },
    materials: {
      'steel-ingot': 3,
      'rubber-grip': 1,
      'reinforcement-alloy': 2
    },
    craftingLevel: 3,
    craftingTime: 2 // hours
  }
];

// Equipment rarity drop rates
export const equipmentDropRates = {
  basic: { weight: 50, color: '#9CA3AF' },      // Gray
  improved: { weight: 30, color: '#10B981' },   // Green  
  advanced: { weight: 15, color: '#3B82F6' },   // Blue
  masterwork: { weight: 4, color: '#8B5CF6' },  // Purple
  legendary: { weight: 1, color: '#F59E0B' }    // Gold
};

// Function to get equipment by rarity
export function getEquipmentByRarity(rarity: Equipment['rarity']): Equipment[] {
  return basicEquipment.filter(item => item.rarity === rarity);
}

// Function to get equipment by slot
export function getEquipmentBySlot(slot: Equipment['type']): Equipment[] {
  return basicEquipment.filter(item => item.type === slot);
}

// Function to get affordable equipment
export function getAffordableEquipment(budget: number): Equipment[] {
  return basicEquipment.filter(item => item.cost <= budget);
}

// Function to get equipment suitable for character
export function getSuitableEquipment(characterClass: CharacterClass, level: number): Equipment[] {
  return basicEquipment.filter(item => {
    // Check level requirement
    if (item.requiredLevel && item.requiredLevel > level) return false;
    
    // Check class requirement  
    if (item.requiredClass && !item.requiredClass.includes(characterClass)) return false;
    
    return true;
  });
}