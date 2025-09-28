// Types for the Master Thief heist simulator

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export type CharacterClass = 
  | 'infiltrator' 
  | 'tech' 
  | 'face' 
  | 'muscle' 
  | 'acrobat' 
  | 'mastermind' 
  | 'wildcard';

// D&D-style attributes (3-20 range)
export interface Attributes {
  strength: number;     // Physical power and carrying capacity
  dexterity: number;    // Agility, reflexes, and finesse
  intelligence: number; // Reasoning, memory, and technical skill
  wisdom: number;       // Perception, insight, and street smarts
  charisma: number;     // Force of personality and social skills
  constitution: number; // Health, stamina, and resilience
}

// Equipment system
export type EquipmentSlot = 'weapon' | 'armor' | 'accessory' | 'tool' | 'gadget';
export type EquipmentRarity = 'basic' | 'improved' | 'advanced' | 'masterwork' | 'legendary';

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentSlot;
  rarity: EquipmentRarity;
  description: string;
  attributeBonuses: Partial<Attributes>;
  skillBonuses: Partial<TeamMember['skills']>;
  specialEffects?: string[];
  cost: number;
  requiredLevel?: number;
  requiredClass?: CharacterClass[];
}

// Character progression
export interface CharacterProgression {
  level: number;
  experience: number;
  experienceToNext: number;
  attributePoints: number;
  skillPoints: number;
  masteryLevel: number; // 0-10 mastery in their specialization
  heistsCompleted: number;
  successRate: number;
}

// Enhanced stats derived from attributes
export interface DerivedStats {
  health: number;
  stamina: number;
  initiative: number;
  carryingCapacity: number;
  criticalChance: number;
  criticalMultiplier: number;
}

export interface TeamMember {
  id: number;
  name: string;
  specialty: string;
  background: string;
  rarity: Rarity;
  characterClass: CharacterClass;
  
  // Core D&D-style attributes
  attributes: Attributes;
  
  // Derived skills (now calculated from attributes + training)
  skills: {
    stealth: number;      // DEX + WIS based
    athletics: number;    // STR + CON based  
    combat: number;       // STR + DEX based
    lockpicking: number;  // DEX + INT based
    hacking: number;      // INT + WIS based
    social: number;       // CHA + WIS based
  };
  
  // Character progression
  progression: CharacterProgression;
  
  // Equipment slots
  equipment: {
    weapon?: Equipment;
    armor?: Equipment;
    accessory?: Equipment;
    tool?: Equipment;
    gadget?: Equipment;
  };
  
  // Enhanced character data
  derivedStats: DerivedStats;
  special_ability: string;
  cost: number;
  
  // New Phase 1 features
  loyalty: number;        // 0-100, affects performance
  fatigue: number;        // 0-100, reduces effectiveness
  injuries: string[];     // Active status effects
  personalityTraits: string[];
  backstoryEvents: string[];
}

export interface Encounter {
  name: string;
  description: string;
  
  // Enhanced skill requirements
  primary_skill: keyof TeamMember['skills'];
  primary_attribute?: keyof Attributes;
  secondary_skill?: keyof TeamMember['skills'];
  
  // D&D-style difficulty
  difficulty: number;        // DC (Difficulty Class) 5-25
  complexity: 'simple' | 'moderate' | 'complex' | 'legendary';
  
  // Consequences and rewards
  failure_consequence: string;
  success_bonus?: string;
  critical_failure_effect?: string;
  critical_success_reward?: string;
  
  // Equipment interactions
  equipment_bonuses?: { [key in EquipmentSlot]?: number };
  required_equipment?: EquipmentSlot[];
  environmental_factors?: string[];
}

export interface HeistTarget {
  id: number;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  potential_payout: number;
  description: string;
  encounters: Encounter[];
}

export interface EncounterResult {
  member: TeamMember;
  encounter: Encounter;
  
  // D&D-style roll system (d20 + modifiers)
  roll: number;              // Base d20 roll
  attributeModifier: number; // Attribute bonus
  skillBonus: number;        // Skill training bonus
  equipmentBonus: number;    // Equipment bonuses
  situationalModifiers: number; // Other modifiers
  total: number;             // Final result
  
  outcome: 'critical_failure' | 'failure' | 'neutral' | 'success' | 'critical_success';
  
  // Enhanced results
  experienceGained: number;
  stressInflicted: number;
  itemsFound?: Equipment[];
  relationshipChanges?: { [characterId: number]: number };
  narrativeDescription: string;
}

// Automated heist system
export interface AutomatedHeist {
  id: string;
  name: string;
  duration: number;          // Hours to complete
  requirements: {
    minTeamSize: number;
    maxTeamSize: number;
    requiredSkills?: Partial<TeamMember['skills']>;
    requiredEquipment?: EquipmentSlot[];
  };
  rewards: {
    basePayout: number;
    experienceMultiplier: number;
    possibleLoot: Equipment[];
    masteryGain: number;
  };
  riskLevel: number;         // 1-10 risk assessment
  description: string;
  unlockConditions?: string[];
}

// Enhanced game progression
export interface PlayerProgress {
  level: number;
  totalExperience: number;
  reputation: number;        // Unlocks better heists/equipment
  notoriety: number;         // Increases law enforcement attention
  territoryControlled: string[];
  completedHeistLines: string[];
  unlockedEquipment: string[];
  characterRelationships: { [characterId: number]: number };
}

export interface GameState {
  // Core resources
  budget: number;
  reputation: number;
  notoriety: number;
  
  // Team management
  selectedTeam: TeamMember[];
  availableCharacters: TeamMember[];
  
  // Heist system
  selectedHeist: HeistTarget | null;
  automatedHeists: AutomatedHeist[];
  activeAutomatedHeists: { heist: AutomatedHeist; team: TeamMember[]; timeRemaining: number; }[];
  
  // Encounter system
  currentEncounter: number;
  encounterResults: EncounterResult[];
  
  // Progression
  playerProgress: PlayerProgress;
  heistsCompleted: number;
  totalEarnings: number;
  
  // New Phase 1 features
  equipmentInventory: Equipment[];
  craftingMaterials: { [materialType: string]: number };
  dailyChallenges: DailyChallenge[];
  achievements: Achievement[];
}

// Daily challenges for engagement
export interface DailyChallenge {
  id: string;
  name: string;
  description: string;
  requirements: string;
  progress: number;
  target: number;
  rewards: {
    experience: number;
    money: number;
    equipment?: Equipment;
  };
  expiresAt: Date;
}

// Achievement system
export interface Achievement {
  id: string;
  name: string;
  description: string;
  category: 'heists' | 'characters' | 'equipment' | 'progression' | 'social';
  progress: number;
  target: number;
  completed: boolean;
  rewards: {
    experience: number;
    money: number;
    reputation: number;
    equipment?: Equipment;
    title?: string;
  };
  unlockedAt?: Date;
}

export interface OutcomeDescriptions {
  critical_failure: string[];
  failure: string[];
  neutral: string[];
  success: string[];
  critical_success: string[];
}

export interface GameData {
  team_members: TeamMember[];
  heist_targets: HeistTarget[];
  outcome_descriptions: OutcomeDescriptions;
}

export type GamePhase = 
  | 'recruitment-phase'
  | 'heist-selection-phase' 
  | 'planning-phase'
  | 'execution-phase'
  | 'results-phase';

export type OutcomeType = keyof OutcomeDescriptions;