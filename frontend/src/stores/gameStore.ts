import { create } from 'zustand';
import type { 
  GameState, 
  GamePhase, 
  TeamMember, 
  HeistTarget, 
  EncounterResult, 
  AutomatedHeist,
  Equipment,
  PlayerProgress
} from '../types/game';
import { characters } from '../data/characters';

interface GameStore extends GameState {
  currentPhase: GamePhase;
  
  // Actions
  setCurrentPhase: (phase: GamePhase) => void;
  setBudget: (budget: number) => void;
  addTeamMember: (member: TeamMember) => void;
  removeTeamMember: (memberId: number) => void;
  selectHeist: (heist: HeistTarget) => void;
  setCurrentEncounter: (encounter: number) => void;
  addEncounterResult: (result: EncounterResult) => void;
  completeHeist: (success: boolean, payout: number) => void;
  resetForNextHeist: () => void;
  initializeGame: () => void;
  newGame: () => void;
  saveGame: () => void;
  loadGame: () => void;
  
  // Enhanced Phase 1 actions
  startAutomatedHeist: (heist: AutomatedHeist, team: TeamMember[]) => void;
  completeAutomatedHeist: (heistId: string) => void;
  equipItem: (characterId: number, item: Equipment) => void;
  levelUpCharacter: (characterId: number) => void;
  updatePlayerProgress: (progress: Partial<PlayerProgress>) => void;
  addExperience: (characterId: number, experience: number) => void;
}

const initialState: GameState = {
  // Core resources
  budget: 1500, // Enough for one common thief
  reputation: 0,
  notoriety: 0,
  
  // Team management
  selectedTeam: [],
  availableCharacters: characters,
  
  // Heist system
  selectedHeist: null,
  automatedHeists: [],
  activeAutomatedHeists: [],
  
  // Encounter system
  currentEncounter: 0,
  encounterResults: [],
  
  // Progression
  playerProgress: {
    level: 1,
    totalExperience: 0,
    reputation: 0,
    notoriety: 0,
    territoryControlled: [],
    completedHeistLines: [],
    unlockedEquipment: [],
    characterRelationships: {}
  },
  heistsCompleted: 0,
  totalEarnings: 0,
  
  // New Phase 1 features
  equipmentInventory: [],
  craftingMaterials: {},
  dailyChallenges: [],
  achievements: []
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  currentPhase: 'recruitment-phase',

  setCurrentPhase: (phase: GamePhase) => set({ currentPhase: phase }),

  setBudget: (budget: number) => set({ budget }),

  addTeamMember: (member: TeamMember) => {
    const state = get();
    if (state.budget >= member.cost && state.selectedTeam.length < 4) {
      const existingIndex = state.selectedTeam.findIndex(m => m.id === member.id);
      if (existingIndex === -1) {
        set({
          selectedTeam: [...state.selectedTeam, member],
          budget: state.budget - member.cost,
        });
        // Auto-save after team changes
        setTimeout(() => get().saveGame(), 0);
      }
    }
  },

  removeTeamMember: (memberId: number) => {
    const state = get();
    const memberIndex = state.selectedTeam.findIndex(m => m.id === memberId);
    if (memberIndex >= 0) {
      const member = state.selectedTeam[memberIndex];
      set({
        selectedTeam: state.selectedTeam.filter(m => m.id !== memberId),
        budget: state.budget + member.cost,
      });
      // Auto-save after team changes
      setTimeout(() => get().saveGame(), 0);
    }
  },

  selectHeist: (heist: HeistTarget) => set({ selectedHeist: heist }),

  setCurrentEncounter: (encounter: number) => set({ currentEncounter: encounter }),

  addEncounterResult: (result: EncounterResult) => {
    const state = get();
    set({
      encounterResults: [...state.encounterResults, result],
    });
  },

  completeHeist: (success: boolean, payout: number) => {
    const state = get();
    if (success) {
      set({
        budget: state.budget + payout,
        heistsCompleted: state.heistsCompleted + 1,
        totalEarnings: state.totalEarnings + payout,
      });
    }
  },

  resetForNextHeist: () => {
    set({
      selectedTeam: [],
      selectedHeist: null,
      currentEncounter: 0,
      encounterResults: [],
      currentPhase: 'recruitment-phase',
    });
  },

  initializeGame: () => {
    set({
      ...initialState,
      currentPhase: 'recruitment-phase',
    });
  },

  newGame: () => {
    // Clear all local storage
    localStorage.removeItem('masterThief_gameState');
    localStorage.removeItem('masterThief_currentPhase');
    
    // Reset to initial state
    set({
      ...initialState,
      currentPhase: 'recruitment-phase',
    });
  },

  saveGame: () => {
    const state = get();
    try {
      const gameStateToSave = {
        budget: state.budget,
        reputation: state.reputation,
        notoriety: state.notoriety,
        selectedTeam: state.selectedTeam,
        playerProgress: state.playerProgress,
        heistsCompleted: state.heistsCompleted,
        totalEarnings: state.totalEarnings,
        equipmentInventory: state.equipmentInventory,
        craftingMaterials: state.craftingMaterials,
        achievements: state.achievements
      };
      
      localStorage.setItem('masterThief_gameState', JSON.stringify(gameStateToSave));
      localStorage.setItem('masterThief_currentPhase', state.currentPhase);
    } catch (error) {
      console.error('Failed to save game:', error);
    }
  },

  loadGame: () => {
    try {
      const savedGameState = localStorage.getItem('masterThief_gameState');
      const savedCurrentPhase = localStorage.getItem('masterThief_currentPhase');
      
      if (savedGameState) {
        const parsedState = JSON.parse(savedGameState);
        set({
          ...parsedState,
          currentPhase: savedCurrentPhase || 'recruitment-phase',
          availableCharacters: characters, // Always load fresh characters
          automatedHeists: [], // Don't persist active heists
          activeAutomatedHeists: [],
          selectedHeist: null,
          currentEncounter: 0,
          encounterResults: []
        });
      }
    } catch (error) {
      console.error('Failed to load game:', error);
      // If loading fails, initialize fresh game
      set({
        ...initialState,
        currentPhase: 'recruitment-phase',
      });
    }
  },

  // Enhanced Phase 1 actions
  startAutomatedHeist: (heist: AutomatedHeist, team: TeamMember[]) => {
    const state = get();
    const newActiveHeist = {
      heist,
      team: [...team],
      timeRemaining: heist.duration * 60 // Convert hours to minutes
    };
    
    set({
      activeAutomatedHeists: [...state.activeAutomatedHeists, newActiveHeist]
    });
  },

  completeAutomatedHeist: (heistId: string) => {
    const state = get();
    const activeHeistIndex = state.activeAutomatedHeists.findIndex(
      ah => ah.heist.id === heistId
    );
    
    if (activeHeistIndex >= 0) {
      const completedHeist = state.activeAutomatedHeists[activeHeistIndex];
      
      // Calculate rewards (simplified for now)
      const basePayout = completedHeist.heist.rewards.basePayout;
      const experience = Math.floor(basePayout * completedHeist.heist.rewards.experienceMultiplier);
      
      set({
        activeAutomatedHeists: state.activeAutomatedHeists.filter((_, index) => index !== activeHeistIndex),
        budget: state.budget + basePayout,
        heistsCompleted: state.heistsCompleted + 1,
        totalEarnings: state.totalEarnings + basePayout,
        playerProgress: {
          ...state.playerProgress,
          totalExperience: state.playerProgress.totalExperience + experience
        }
      });
      
      // Auto-save after heist completion
      setTimeout(() => get().saveGame(), 0);
    }
  },

  equipItem: (characterId: number, item: Equipment) => {
    const state = get();
    const characterIndex = state.availableCharacters.findIndex(c => c.id === characterId);
    
    if (characterIndex >= 0) {
      const updatedCharacters = [...state.availableCharacters];
      const character = { ...updatedCharacters[characterIndex] };
      
      // Equip item to appropriate slot
      character.equipment = {
        ...character.equipment,
        [item.type]: item
      };
      
      updatedCharacters[characterIndex] = character;
      
      set({
        availableCharacters: updatedCharacters,
        // Remove item from inventory
        equipmentInventory: state.equipmentInventory.filter(i => i.id !== item.id)
      });
    }
  },

  levelUpCharacter: (characterId: number) => {
    const state = get();
    const characterIndex = state.availableCharacters.findIndex(c => c.id === characterId);
    
    if (characterIndex >= 0) {
      const updatedCharacters = [...state.availableCharacters];
      const character = { ...updatedCharacters[characterIndex] };
      
      if (character.progression.experience >= character.progression.experienceToNext) {
        character.progression = {
          ...character.progression,
          level: character.progression.level + 1,
          experience: character.progression.experience - character.progression.experienceToNext,
          experienceToNext: (character.progression.level + 1) * (character.progression.level + 1) * 100,
          attributePoints: character.progression.attributePoints + 1,
          skillPoints: character.progression.skillPoints + 2
        };
      }
      
      updatedCharacters[characterIndex] = character;
      
      set({
        availableCharacters: updatedCharacters
      });
    }
  },

  updatePlayerProgress: (progress: Partial<PlayerProgress>) => {
    const state = get();
    set({
      playerProgress: {
        ...state.playerProgress,
        ...progress
      }
    });
  },

  addExperience: (characterId: number, experience: number) => {
    const state = get();
    const characterIndex = state.availableCharacters.findIndex(c => c.id === characterId);
    
    if (characterIndex >= 0) {
      const updatedCharacters = [...state.availableCharacters];
      const character = { ...updatedCharacters[characterIndex] };
      
      character.progression = {
        ...character.progression,
        experience: character.progression.experience + experience
      };
      
      updatedCharacters[characterIndex] = character;
      
      set({
        availableCharacters: updatedCharacters
      });
    }
  },
}));