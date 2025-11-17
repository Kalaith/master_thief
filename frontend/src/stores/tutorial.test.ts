import { describe, it, expect, beforeEach } from 'vitest';
import { useGameStore } from './gameStore';

describe('Tutorial System', () => {
  beforeEach(() => {
    const { newGame } = useGameStore.getState();
    newGame();
    localStorage.clear();
  });

  describe('Initial State', () => {
    it('should initialize with tutorial inactive', () => {
      const { tutorial } = useGameStore.getState();

      expect(tutorial.active).toBe(false);
      expect(tutorial.currentStep).toBe(null);
      expect(tutorial.completedSteps).toEqual([]);
      expect(tutorial.skipped).toBe(false);
    });
  });

  describe('startTutorial', () => {
    it('should activate tutorial and set to welcome step', () => {
      const { startTutorial, tutorial } = useGameStore.getState();

      startTutorial();

      const updatedTutorial = useGameStore.getState().tutorial;
      expect(updatedTutorial.active).toBe(true);
      expect(updatedTutorial.currentStep).toBe('welcome');
      expect(updatedTutorial.completedSteps).toEqual([]);
      expect(updatedTutorial.skipped).toBe(false);
    });
  });

  describe('skipTutorial', () => {
    it('should deactivate tutorial and mark as skipped', () => {
      const { startTutorial, skipTutorial } = useGameStore.getState();

      startTutorial();
      skipTutorial();

      const tutorial = useGameStore.getState().tutorial;
      expect(tutorial.active).toBe(false);
      expect(tutorial.currentStep).toBe(null);
      expect(tutorial.skipped).toBe(true);
    });
  });

  describe('nextTutorialStep', () => {
    it('should advance from welcome to recruitment-intro', () => {
      const { startTutorial, nextTutorialStep } = useGameStore.getState();

      startTutorial();
      nextTutorialStep();

      const tutorial = useGameStore.getState().tutorial;
      expect(tutorial.currentStep).toBe('recruitment-intro');
      expect(tutorial.completedSteps).toContain('welcome');
    });

    it('should advance through all tutorial steps in order', () => {
      const { startTutorial, nextTutorialStep } = useGameStore.getState();

      const expectedSteps = [
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
        'buy-equipment',
        'equip-character',
        'tutorial-complete',
      ];

      startTutorial();
      expect(useGameStore.getState().tutorial.currentStep).toBe('welcome');

      for (let i = 1; i < expectedSteps.length; i++) {
        nextTutorialStep();
        const tutorial = useGameStore.getState().tutorial;
        expect(tutorial.currentStep).toBe(expectedSteps[i]);
        expect(tutorial.completedSteps).toContain(expectedSteps[i - 1]);
      }
    });

    it('should complete tutorial and deactivate after final step', () => {
      const { startTutorial, nextTutorialStep } = useGameStore.getState();

      startTutorial();

      // Advance through all 14 steps
      for (let i = 0; i < 14; i++) {
        nextTutorialStep();
      }

      const tutorial = useGameStore.getState().tutorial;
      expect(tutorial.active).toBe(false);
      expect(tutorial.currentStep).toBe(null);
    });
  });

  describe('setTutorialStep', () => {
    it('should set tutorial to specific step', () => {
      const { startTutorial, setTutorialStep } = useGameStore.getState();

      startTutorial();
      setTutorialStep('equipment-intro');

      const tutorial = useGameStore.getState().tutorial;
      expect(tutorial.currentStep).toBe('equipment-intro');
    });
  });

  describe('completeTutorialStep', () => {
    it('should add step to completed steps', () => {
      const { startTutorial, completeTutorialStep } = useGameStore.getState();

      startTutorial();
      completeTutorialStep('welcome');

      const tutorial = useGameStore.getState().tutorial;
      expect(tutorial.completedSteps).toContain('welcome');
    });

    it('should not add duplicate completed steps', () => {
      const { startTutorial, completeTutorialStep } = useGameStore.getState();

      startTutorial();
      completeTutorialStep('welcome');
      completeTutorialStep('welcome');

      const tutorial = useGameStore.getState().tutorial;
      const welcomeCount = tutorial.completedSteps.filter(s => s === 'welcome').length;
      expect(welcomeCount).toBe(1);
    });
  });

  describe('Tutorial Integration', () => {
    it('should track recruitment progress', () => {
      const { startTutorial, setTutorialStep, addTeamMember, availableCharacters } = useGameStore.getState();

      startTutorial();
      setTutorialStep('recruit-first-character');

      const character = availableCharacters[0];
      addTeamMember(character);

      // Tutorial advancement is handled in RecruitmentPage component
      // This test verifies the state is ready for it
      const { selectedTeam } = useGameStore.getState();
      expect(selectedTeam).toHaveLength(1);
    });

    it('should allow tutorial to be skipped at any point', () => {
      const { startTutorial, nextTutorialStep, skipTutorial } = useGameStore.getState();

      startTutorial();
      nextTutorialStep(); // Go to step 2
      nextTutorialStep(); // Go to step 3

      skipTutorial();

      const tutorial = useGameStore.getState().tutorial;
      expect(tutorial.active).toBe(false);
      expect(tutorial.skipped).toBe(true);
    });
  });
});
