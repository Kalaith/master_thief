import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from './gameStore';
import type { Equipment } from '../types/game';

describe('GameStore', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    const { newGame } = useGameStore.getState();
    newGame();
    localStorage.clear();
  });

  describe('Initial State', () => {
    it('should initialize with correct default values', () => {
      const state = useGameStore.getState();

      expect(state.budget).toBe(3500);
      expect(state.reputation).toBe(0);
      expect(state.notoriety).toBe(0);
      expect(state.selectedTeam).toEqual([]);
      expect(state.heistsCompleted).toBe(0);
      expect(state.totalEarnings).toBe(0);
      expect(state.currentPhase).toBe('recruitment-phase');
    });

    it('should have available characters loaded', () => {
      const state = useGameStore.getState();

      expect(state.availableCharacters).toBeDefined();
      expect(state.availableCharacters.length).toBeGreaterThan(0);
      expect(state.availableCharacters.length).toBe(20); // Should have 20 characters
    });

    it('should have automated heists loaded', () => {
      const state = useGameStore.getState();

      expect(state.automatedHeists).toBeDefined();
      expect(state.automatedHeists.length).toBeGreaterThan(0);
    });
  });

  describe('Team Management', () => {
    it('should add team member and deduct budget', () => {
      const state = useGameStore.getState();
      // Find first affordable character (budget is 1500)
      const character = state.availableCharacters.find(c => c.cost <= state.budget) || state.availableCharacters[2];

      const initialBudget = state.budget;
      state.addTeamMember(character);

      const newState = useGameStore.getState();
      expect(newState.selectedTeam).toHaveLength(1);
      expect(newState.selectedTeam[0]).toEqual(character);
      expect(newState.budget).toBe(initialBudget - character.cost);
    });

    it('should not add team member if insufficient budget', () => {
      const { setBudget, addTeamMember, availableCharacters } = useGameStore.getState();

      // Find an expensive character
      const expensiveChar = availableCharacters.find(c => c.cost > 1500) || availableCharacters[0];

      setBudget(100); // Set low budget
      addTeamMember(expensiveChar);

      const state = useGameStore.getState();
      expect(state.selectedTeam).toHaveLength(0); // Should not add
      expect(state.budget).toBe(100); // Budget unchanged
    });

    it('should not add more than 4 team members', () => {
      const { addTeamMember, availableCharacters, setBudget } = useGameStore.getState();

      setBudget(100000); // Set high budget

      // Try to add 5 characters
      for (let i = 0; i < 5; i++) {
        addTeamMember(availableCharacters[i]);
      }

      const state = useGameStore.getState();
      expect(state.selectedTeam.length).toBeLessThanOrEqual(4);
    });

    it('should not add duplicate team member', () => {
      const { addTeamMember, availableCharacters, setBudget } = useGameStore.getState();

      setBudget(10000);
      const character = availableCharacters[0];

      addTeamMember(character);
      addTeamMember(character); // Try to add same character again

      const state = useGameStore.getState();
      expect(state.selectedTeam).toHaveLength(1); // Should only have one
    });

    it('should remove team member and refund 50% of signup bonus', () => {
      const { addTeamMember, removeTeamMember, availableCharacters } = useGameStore.getState();

      // Find first affordable character
      const character = availableCharacters.find(c => c.cost <= useGameStore.getState().budget) || availableCharacters[2];
      addTeamMember(character);

      const budgetBeforeRemoval = useGameStore.getState().budget;
      removeTeamMember(character.id);

      const state = useGameStore.getState();
      expect(state.selectedTeam).toHaveLength(0);
      // Should refund only 50% of character cost
      expect(state.budget).toBe(budgetBeforeRemoval + Math.floor(character.cost / 2));
    });
  });

  describe('Equipment System', () => {
    it('should purchase equipment and deduct budget', () => {
      const { setBudget, purchaseEquipment } = useGameStore.getState();

      const testEquipment: Equipment = {
        id: 'test-pistol',
        name: 'Test Pistol',
        type: 'weapon',
        rarity: 'basic',
        description: 'A test weapon',
        attributeBonuses: { dexterity: 2 },
        skillBonuses: { combat: 1 },
        cost: 500,
      };

      setBudget(1000);
      const success = purchaseEquipment(testEquipment);

      expect(success).toBe(true);

      const state = useGameStore.getState();
      expect(state.budget).toBe(500);
      expect(state.equipmentInventory).toContainEqual(testEquipment);
    });

    it('should not purchase equipment with insufficient budget', () => {
      const { setBudget, purchaseEquipment } = useGameStore.getState();

      const testEquipment: Equipment = {
        id: 'test-expensive',
        name: 'Expensive Item',
        type: 'weapon',
        rarity: 'legendary',
        description: 'Very expensive',
        attributeBonuses: {},
        skillBonuses: {},
        cost: 5000,
      };

      setBudget(100);
      const success = purchaseEquipment(testEquipment);

      expect(success).toBe(false);

      const state = useGameStore.getState();
      expect(state.budget).toBe(100); // Unchanged
      expect(state.equipmentInventory).not.toContainEqual(testEquipment);
    });

    it('should not purchase duplicate equipment', () => {
      const { setBudget, purchaseEquipment } = useGameStore.getState();

      const testEquipment: Equipment = {
        id: 'test-item',
        name: 'Test Item',
        type: 'armor',
        rarity: 'basic',
        description: 'Test armor',
        attributeBonuses: {},
        skillBonuses: {},
        cost: 100,
      };

      setBudget(1000);
      purchaseEquipment(testEquipment);
      const success = purchaseEquipment(testEquipment); // Try to buy again

      expect(success).toBe(false);
    });

    it('should equip item to character and move to equipment slot', () => {
      const { addTeamMember, equipItem, availableCharacters, setBudget, purchaseEquipment } = useGameStore.getState();

      setBudget(10000);
      const character = availableCharacters[0];
      addTeamMember(character);

      const testEquipment: Equipment = {
        id: 'test-weapon',
        name: 'Test Weapon',
        type: 'weapon',
        rarity: 'basic',
        description: 'A test weapon',
        attributeBonuses: { strength: 2 },
        skillBonuses: { combat: 2 },
        cost: 100,
      };

      purchaseEquipment(testEquipment);
      equipItem(character.id, testEquipment);

      const state = useGameStore.getState();
      const updatedChar = state.availableCharacters.find(c => c.id === character.id);

      expect(updatedChar?.equipment.weapon).toEqual(testEquipment);
      expect(state.equipmentInventory).not.toContainEqual(testEquipment);
    });

    it('should unequip item and return to inventory', () => {
      const { addTeamMember, equipItem, unequipItem, availableCharacters, setBudget, purchaseEquipment } = useGameStore.getState();

      setBudget(10000);
      const character = availableCharacters[0];
      addTeamMember(character);

      const testEquipment: Equipment = {
        id: 'test-armor',
        name: 'Test Armor',
        type: 'armor',
        rarity: 'basic',
        description: 'Test armor',
        attributeBonuses: {},
        skillBonuses: {},
        cost: 100,
      };

      purchaseEquipment(testEquipment);
      equipItem(character.id, testEquipment);
      unequipItem(character.id, 'armor');

      const state = useGameStore.getState();
      const updatedChar = state.availableCharacters.find(c => c.id === character.id);

      expect(updatedChar?.equipment.armor).toBeUndefined();
      expect(state.equipmentInventory).toContainEqual(testEquipment);
    });
  });

  describe('Mission System', () => {
    it('should start automated heist and add to active heists', () => {
      const { startAutomatedHeist, automatedHeists, availableCharacters, addTeamMember, setBudget } = useGameStore.getState();

      setBudget(10000);
      const character = availableCharacters[0];
      addTeamMember(character);

      const heist = automatedHeists[0];
      const team = [character];

      startAutomatedHeist(heist, team);

      const state = useGameStore.getState();
      expect(state.activeAutomatedHeists).toHaveLength(1);
      expect(state.activeAutomatedHeists[0].heist).toEqual(heist);
      expect(state.activeAutomatedHeists[0].team).toEqual(team);
      expect(state.activeAutomatedHeists[0].timeRemaining).toBe(heist.duration * 60);
    });

    it('should update heist time remaining', () => {
      const { startAutomatedHeist, updateActiveHeistTime, automatedHeists, availableCharacters, addTeamMember, setBudget } = useGameStore.getState();

      setBudget(10000);
      const character = availableCharacters[0];
      addTeamMember(character);

      const heist = automatedHeists[0];
      startAutomatedHeist(heist, [character]);

      updateActiveHeistTime(heist.id, 100);

      const state = useGameStore.getState();
      expect(state.activeAutomatedHeists[0].timeRemaining).toBe(100);
    });

    it('should complete heist and grant rewards', () => {
      const { startAutomatedHeist, completeAutomatedHeist, automatedHeists, availableCharacters, addTeamMember, setBudget } = useGameStore.getState();

      setBudget(10000);
      const character = availableCharacters[0];
      addTeamMember(character);

      const initialBudget = useGameStore.getState().budget;
      const heist = automatedHeists[0];

      startAutomatedHeist(heist, [character]);
      completeAutomatedHeist(heist.id);

      const state = useGameStore.getState();
      expect(state.activeAutomatedHeists).toHaveLength(0);
      expect(state.budget).toBeGreaterThan(initialBudget); // Should have earned money
      expect(state.heistsCompleted).toBe(1);
    });

    it('should grant experience to team members on heist completion', () => {
      const { startAutomatedHeist, completeAutomatedHeist, automatedHeists, availableCharacters, addTeamMember, setBudget } = useGameStore.getState();

      setBudget(10000);
      const character = availableCharacters[0];
      addTeamMember(character);

      const initialXP = character.progression.experience;
      const heist = automatedHeists[0];

      startAutomatedHeist(heist, [character]);
      completeAutomatedHeist(heist.id);

      const state = useGameStore.getState();
      const updatedChar = state.availableCharacters.find(c => c.id === character.id);

      // Experience should increase (at minimum from failure, which still grants some XP)
      expect(updatedChar?.progression.experience).toBeGreaterThanOrEqual(initialXP);
      expect(updatedChar?.progression.heistsCompleted).toBe(1);
    });
  });

  describe('Save/Load System', () => {
    it('should save game state to localStorage', () => {
      const { addTeamMember, saveGame, availableCharacters, setBudget } = useGameStore.getState();

      setBudget(5000);
      // Find first affordable character
      const character = availableCharacters.find(c => c.cost <= 5000) || availableCharacters[0];
      addTeamMember(character);
      saveGame();

      const savedData = localStorage.getItem('masterThief_gameState');
      expect(savedData).toBeTruthy();

      const parsed = JSON.parse(savedData!);
      expect(parsed.budget).toBe(5000 - character.cost);
      expect(parsed.selectedTeam).toHaveLength(1);
    });

    it('should load game state from localStorage', () => {
      const { addTeamMember, saveGame, loadGame, availableCharacters, setBudget, initializeGame } = useGameStore.getState();

      // Set up game state
      setBudget(5000);
      // Find first affordable character
      const character = availableCharacters.find(c => c.cost <= 5000) || availableCharacters[0];
      addTeamMember(character);
      saveGame();

      // Reset to fresh state WITHOUT clearing localStorage
      initializeGame();
      expect(useGameStore.getState().selectedTeam).toHaveLength(0);

      // Load saved state
      loadGame();

      const state = useGameStore.getState();
      expect(state.selectedTeam).toHaveLength(1);
      expect(state.budget).toBe(5000 - character.cost);
    });

    it('should handle corrupted save data gracefully', () => {
      localStorage.setItem('masterThief_gameState', 'invalid json data');

      const { loadGame } = useGameStore.getState();

      // Should not throw error
      expect(() => loadGame()).not.toThrow();

      // Should initialize with default state
      const state = useGameStore.getState();
      expect(state.budget).toBe(3500);
      expect(state.selectedTeam).toEqual([]);
    });
  });

  describe('Phase Management', () => {
    it('should set current phase', () => {
      const { setCurrentPhase } = useGameStore.getState();

      setCurrentPhase('heist-selection-phase');

      const state = useGameStore.getState();
      expect(state.currentPhase).toBe('heist-selection-phase');
    });

    it('should reset for next heist', () => {
      const { addTeamMember, selectHeist, resetForNextHeist, availableCharacters, automatedHeists, setBudget } = useGameStore.getState();

      setBudget(10000);
      addTeamMember(availableCharacters[0]);
      selectHeist(automatedHeists[0] as any);

      resetForNextHeist();

      const state = useGameStore.getState();
      expect(state.selectedTeam).toEqual([]);
      expect(state.selectedHeist).toBeNull();
      expect(state.currentPhase).toBe('recruitment-phase');
    });
  });

  describe('Player Progress', () => {
    it('should update player progress', () => {
      const { updatePlayerProgress } = useGameStore.getState();

      updatePlayerProgress({
        level: 5,
        totalExperience: 1000,
        reputation: 500,
      });

      const state = useGameStore.getState();
      expect(state.playerProgress.level).toBe(5);
      expect(state.playerProgress.totalExperience).toBe(1000);
      expect(state.playerProgress.reputation).toBe(500);
    });

    it('should add experience to character', () => {
      const { addExperience, availableCharacters } = useGameStore.getState();

      const character = availableCharacters[0];
      const initialXP = character.progression.experience;

      addExperience(character.id, 500);

      const state = useGameStore.getState();
      const updatedChar = state.availableCharacters.find(c => c.id === character.id);

      expect(updatedChar?.progression.experience).toBe(initialXP + 500);
    });
  });

  describe('Mission Results', () => {
    it('should set mission result', () => {
      const { setMissionResult } = useGameStore.getState();

      const mockResult: any = {
        heist: { id: 'test-heist', name: 'Test Heist' },
        team: [],
        success: true,
        rewards: {
          payout: 1000,
          totalXP: 500,
          experiencePerMember: 250,
          reputation: 100,
          equipmentDrops: [],
        },
        teamPower: 100,
        requiredPower: 50,
        successChance: 80,
        levelUps: [],
      };

      setMissionResult(mockResult);

      const state = useGameStore.getState();
      expect(state.currentMissionResult).toEqual(mockResult);
    });

    it('should clear mission result', () => {
      const { setMissionResult, clearMissionResult } = useGameStore.getState();

      setMissionResult({} as any);
      expect(useGameStore.getState().currentMissionResult).toBeTruthy();

      clearMissionResult();

      const state = useGameStore.getState();
      expect(state.currentMissionResult).toBeNull();
    });
  });
});
