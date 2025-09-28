// Types for the Master Thief heist simulator

export interface TeamMember {
  id: number;
  name: string;
  specialty: string;
  background: string;
  skills: {
    stealth: number;
    athletics: number;
    combat: number;
    lockpicking: number;
    hacking: number;
    social: number;
  };
  special_ability: string;
  cost: number;
}

export interface Encounter {
  name: string;
  description: string;
  primary_skill: keyof TeamMember['skills'];
  difficulty: number;
  failure_consequence: string;
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
  roll: number;
  bonus: number;
  total: number;
  outcome: 'critical_failure' | 'failure' | 'neutral' | 'success' | 'critical_success';
}

export interface GameState {
  budget: number;
  selectedTeam: TeamMember[];
  selectedHeist: HeistTarget | null;
  currentEncounter: number;
  encounterResults: EncounterResult[];
  heistsCompleted: number;
  totalEarnings: number;
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