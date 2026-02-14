import { create } from 'zustand';
import type {
  GameState,
  GamePhase,
  TeamMember,
  HeistTarget,
  EncounterResult,
  AutomatedHeist,
  Equipment,
  PlayerProgress,
  MissionResult,
  TutorialState,
  TutorialStep,
} from '../types/game';
import { characters } from '../data/characters';
import { automatedHeists } from '../data/automatedHeists';

interface GameStore extends GameState {
  currentPhase: GamePhase;
  currentMissionResult: MissionResult | null;

  // Actions
  setCurrentPhase: (phase: GamePhase) => void;
  setBudget: (budget: number) => void;
  addTeamMember: (member: TeamMember) => void;
  removeTeamMember: (memberId: number) => void;
  isCharacterOnMission: (memberId: number) => boolean;
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
  updateActiveHeistTime: (heistId: string, timeRemaining: number) => void;
  completeAutomatedHeist: (heistId: string) => void;
  equipItem: (characterId: number, item: Equipment) => void;
  unequipItem: (characterId: number, slot: Equipment['type']) => void;
  purchaseEquipment: (item: Equipment) => boolean;
  levelUpCharacter: (characterId: number) => void;
  updatePlayerProgress: (progress: Partial<PlayerProgress>) => void;
  addExperience: (characterId: number, experience: number) => void;

  // Mission results modal
  setMissionResult: (result: MissionResult | null) => void;
  clearMissionResult: () => void;

  // Tutorial system
  tutorial: TutorialState;
  startTutorial: () => void;
  skipTutorial: () => void;
  nextTutorialStep: () => void;
  setTutorialStep: (step: TutorialStep) => void;
  completeTutorialStep: (step: TutorialStep) => void;
}

const initialState: GameState = {
  // Core resources
  budget: 3500, // Enough for two common thieves
  reputation: 0,
  notoriety: 0,

  // Team management
  selectedTeam: [],
  availableCharacters: characters,

  // Heist system
  selectedHeist: null,
  automatedHeists: automatedHeists,
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
    characterRelationships: {},
  },
  heistsCompleted: 0,
  totalEarnings: 0,

  // New Phase 1 features
  equipmentInventory: [],
  craftingMaterials: {},
  dailyChallenges: [],
  achievements: [],
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,
  currentPhase: 'recruitment-phase',
  currentMissionResult: null,

  // Tutorial state
  tutorial: {
    active: false,
    currentStep: null,
    completedSteps: [],
    skipped: false,
  },

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

    // Check if character is on a mission
    if (get().isCharacterOnMission(memberId)) {
      console.warn('Cannot remove character - currently on a mission');
      return;
    }

    const memberIndex = state.selectedTeam.findIndex(m => m.id === memberId);
    if (memberIndex >= 0) {
      const member = state.selectedTeam[memberIndex];
      const refund = Math.floor(member.cost / 2); // Only refund half the signup bonus
      set({
        selectedTeam: state.selectedTeam.filter(m => m.id !== memberId),
        budget: state.budget + refund,
      });
      // Auto-save after team changes
      setTimeout(() => get().saveGame(), 0);
    }
  },

  isCharacterOnMission: (memberId: number) => {
    const state = get();
    return state.activeAutomatedHeists.some(activeHeist =>
      activeHeist.team.some(member => member.id === memberId)
    );
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
      tutorial: {
        active: false,
        currentStep: null,
        completedSteps: [],
        skipped: false,
      },
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
        achievements: state.achievements,
        activeAutomatedHeists: state.activeAutomatedHeists, // Save active missions
        tutorial: state.tutorial, // Save tutorial progress
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
          automatedHeists: automatedHeists, // Always load fresh heists
          selectedHeist: null,
          currentEncounter: 0,
          encounterResults: [],
          // Ensure tutorial state exists (for old saves without it)
          tutorial: parsedState.tutorial || {
            active: false,
            currentStep: null,
            completedSteps: [],
            skipped: false,
          },
        });
      }
    } catch (error) {
      console.error('Failed to load game:', error);
      // If loading fails, initialize fresh game
      set({
        ...initialState,
        currentPhase: 'recruitment-phase',
        tutorial: {
          active: false,
          currentStep: null,
          completedSteps: [],
          skipped: false,
        },
      });
    }

    // Start global mission timer after loading
    // Removed - using MissionsPage timer instead
  },

  // Enhanced Phase 1 actions
  startAutomatedHeist: (heist: AutomatedHeist, team: TeamMember[]) => {
    const state = get();
    const newActiveHeist = {
      heist,
      team: [...team],
      timeRemaining: heist.duration * 60, // Convert hours to minutes
    };

    set({
      activeAutomatedHeists: [...state.activeAutomatedHeists, newActiveHeist],
    });

    // Auto-save after starting mission
    setTimeout(() => get().saveGame(), 0);
  },

  updateActiveHeistTime: (heistId: string, timeRemaining: number) => {
    const state = get();
    const updatedHeists = state.activeAutomatedHeists.map(heist =>
      heist.heist.id === heistId ? { ...heist, timeRemaining: Math.max(0, timeRemaining) } : heist
    );

    set({ activeAutomatedHeists: updatedHeists });

    // Auto-save after time update
    setTimeout(() => get().saveGame(), 0);
  },

  completeAutomatedHeist: (heistId: string) => {
    const state = get();
    const activeHeistIndex = state.activeAutomatedHeists.findIndex(ah => ah.heist.id === heistId);

    if (activeHeistIndex >= 0) {
      const completedHeist = state.activeAutomatedHeists[activeHeistIndex];
      const { heist, team } = completedHeist;

      // Calculate team power and success chance
      const teamPower = team.reduce((total, member) => {
        const avgSkill =
          Object.values(member.skills).reduce((a, b) => a + b, 0) /
          Object.keys(member.skills).length;
        return total + avgSkill + member.progression.level * 2;
      }, 0);

      const expectedPower = heist.riskLevel * 10; // Risk 1-10 * 10 = 10-100 expected power
      const successChance = Math.min(95, Math.max(5, (teamPower / expectedPower) * 100));
      const roll = Math.random() * 100;
      const missionSuccess = roll <= successChance;

      // Calculate rewards
      let payout = 0;
      let experiencePerMember = 0;
      let newEquipment: Equipment[] = [];
      let reputation = 0;

      if (missionSuccess) {
        // Success rewards
        payout = heist.rewards.basePayout;
        experiencePerMember = Math.floor(
          (payout * heist.rewards.experienceMultiplier) / team.length
        );
        reputation = Math.floor(heist.riskLevel * 10);

        // Equipment loot drop (30% chance for successful missions)
        if (Math.random() < 0.3 && heist.rewards.possibleLoot.length > 0) {
          const lootItem =
            heist.rewards.possibleLoot[
              Math.floor(Math.random() * heist.rewards.possibleLoot.length)
            ];
          newEquipment = [lootItem];
        }
      } else {
        // Failure - partial rewards
        payout = Math.floor(heist.rewards.basePayout * 0.2); // 20% of payout
        experiencePerMember = Math.floor(
          (payout * heist.rewards.experienceMultiplier) / team.length / 2
        ); // Half XP
        reputation = 0;
      }

      // Track level ups
      const levelUps: {
        characterId: number;
        oldLevel: number;
        newLevel: number;
      }[] = [];

      // Update character experience
      const updatedCharacters = [...state.availableCharacters];
      team.forEach(member => {
        const charIndex = updatedCharacters.findIndex(c => c.id === member.id);
        if (charIndex >= 0) {
          const char = { ...updatedCharacters[charIndex] };
          const oldLevel = char.progression.level;

          char.progression = {
            ...char.progression,
            experience: char.progression.experience + experiencePerMember,
            heistsCompleted: char.progression.heistsCompleted + 1,
          };

          // Auto-level up if enough XP
          while (char.progression.experience >= char.progression.experienceToNext) {
            char.progression = {
              ...char.progression,
              level: char.progression.level + 1,
              experience: char.progression.experience - char.progression.experienceToNext,
              experienceToNext: Math.floor(char.progression.experienceToNext * 1.5),
              attributePoints: char.progression.attributePoints + 1,
              skillPoints: char.progression.skillPoints + 2,
            };
          }

          // Track if character leveled up
          if (char.progression.level > oldLevel) {
            levelUps.push({
              characterId: char.id,
              oldLevel,
              newLevel: char.progression.level,
            });
          }

          updatedCharacters[charIndex] = char;
        }
      });

      // Create mission result for modal
      const missionResult: MissionResult = {
        heist,
        team: updatedCharacters.filter(c => team.some(t => t.id === c.id)), // Updated team with new levels
        success: missionSuccess,
        rewards: {
          payout,
          totalXP: experiencePerMember * team.length,
          experiencePerMember,
          reputation,
          equipmentDrops: newEquipment,
        },
        teamPower,
        requiredPower: expectedPower,
        successChance,
        levelUps,
      };

      // Update game state
      set({
        activeAutomatedHeists: state.activeAutomatedHeists.filter(
          (_, index) => index !== activeHeistIndex
        ),
        availableCharacters: updatedCharacters,
        budget: state.budget + payout,
        heistsCompleted: state.heistsCompleted + 1,
        totalEarnings: state.totalEarnings + payout,
        equipmentInventory: [...state.equipmentInventory, ...newEquipment],
        playerProgress: {
          ...state.playerProgress,
          totalExperience: state.playerProgress.totalExperience + experiencePerMember * team.length,
          reputation: state.playerProgress.reputation + reputation,
        },
        currentMissionResult: missionResult,
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

      // Get currently equipped item in this slot
      const currentlyEquipped = character.equipment[item.type];

      // Equip new item
      character.equipment = {
        ...character.equipment,
        [item.type]: item,
      };

      updatedCharacters[characterIndex] = character;

      // Update inventory: remove new item, add old item if exists
      let updatedInventory = state.equipmentInventory.filter(i => i.id !== item.id);
      if (currentlyEquipped) {
        updatedInventory = [...updatedInventory, currentlyEquipped];
      }

      set({
        availableCharacters: updatedCharacters,
        equipmentInventory: updatedInventory,
      });

      // Auto-save after equipment change
      setTimeout(() => get().saveGame(), 0);
    }
  },

  unequipItem: (characterId: number, slot: Equipment['type']) => {
    const state = get();
    const characterIndex = state.availableCharacters.findIndex(c => c.id === characterId);

    if (characterIndex >= 0) {
      const updatedCharacters = [...state.availableCharacters];
      const character = { ...updatedCharacters[characterIndex] };

      // Get currently equipped item
      const equippedItem = character.equipment[slot];

      if (equippedItem) {
        // Remove from equipment slot
        const newEquipment = { ...character.equipment };
        delete newEquipment[slot];
        character.equipment = newEquipment;

        updatedCharacters[characterIndex] = character;

        set({
          availableCharacters: updatedCharacters,
          // Add item back to inventory
          equipmentInventory: [...state.equipmentInventory, equippedItem],
        });

        // Auto-save after equipment change
        setTimeout(() => get().saveGame(), 0);
      }
    }
  },

  purchaseEquipment: (item: Equipment): boolean => {
    const state = get();

    // Check if already owned
    if (state.equipmentInventory.some(e => e.id === item.id)) {
      return false;
    }

    // Check budget
    if (state.budget < item.cost) {
      return false;
    }

    // Purchase successful
    set({
      budget: state.budget - item.cost,
      equipmentInventory: [...state.equipmentInventory, item],
    });

    // Auto-save after purchase
    setTimeout(() => get().saveGame(), 0);

    return true;
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
          experienceToNext:
            (character.progression.level + 1) * (character.progression.level + 1) * 100,
          attributePoints: character.progression.attributePoints + 1,
          skillPoints: character.progression.skillPoints + 2,
        };
      }

      updatedCharacters[characterIndex] = character;

      set({
        availableCharacters: updatedCharacters,
      });
    }
  },

  updatePlayerProgress: (progress: Partial<PlayerProgress>) => {
    const state = get();
    set({
      playerProgress: {
        ...state.playerProgress,
        ...progress,
      },
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
        experience: character.progression.experience + experience,
      };

      updatedCharacters[characterIndex] = character;

      set({
        availableCharacters: updatedCharacters,
      });
    }
  },

  // Mission results modal actions
  setMissionResult: (result: MissionResult | null) => set({ currentMissionResult: result }),

  clearMissionResult: () => set({ currentMissionResult: null }),

  // Tutorial system actions
  startTutorial: () => {
    set({
      tutorial: {
        active: true,
        currentStep: 'welcome',
        completedSteps: [],
        skipped: false,
      },
    });
    setTimeout(() => get().saveGame(), 0);
  },

  skipTutorial: () => {
    set({
      tutorial: {
        active: false,
        currentStep: null,
        completedSteps: [],
        skipped: true,
      },
    });
    setTimeout(() => get().saveGame(), 0);
  },

  nextTutorialStep: () => {
    const state = get();
    const tutorialStepOrder: TutorialStep[] = [
      'welcome',
      'recruitment-intro',
      'recruit-first-character',
      'recruit-second-character',
      'missions-intro',
      'select-mission',
      'assign-team',
      'start-mission',
      'wait-for-mission',
      'collect-rewards',
      'equipment-intro',
      'equipment-shop-tab',
      'buy-equipment',
      'equip-character',
      'tutorial-complete',
    ];

    const currentIndex = state.tutorial.currentStep
      ? tutorialStepOrder.indexOf(state.tutorial.currentStep)
      : -1;

    const nextStep =
      currentIndex < tutorialStepOrder.length - 1 ? tutorialStepOrder[currentIndex + 1] : null;

    if (nextStep) {
      set({
        tutorial: {
          ...state.tutorial,
          currentStep: nextStep,
          completedSteps: state.tutorial.currentStep
            ? [...state.tutorial.completedSteps, state.tutorial.currentStep]
            : state.tutorial.completedSteps,
        },
      });
    } else {
      // Tutorial complete
      set({
        tutorial: {
          ...state.tutorial,
          active: false,
          currentStep: null,
        },
      });
    }
    setTimeout(() => get().saveGame(), 0);
  },

  setTutorialStep: (step: TutorialStep) => {
    const state = get();
    set({
      tutorial: {
        ...state.tutorial,
        currentStep: step,
      },
    });
    setTimeout(() => get().saveGame(), 0);
  },

  completeTutorialStep: (step: TutorialStep) => {
    const state = get();
    if (!state.tutorial.completedSteps.includes(step)) {
      set({
        tutorial: {
          ...state.tutorial,
          completedSteps: [...state.tutorial.completedSteps, step],
        },
      });
      setTimeout(() => get().saveGame(), 0);
    }
  },
}));
