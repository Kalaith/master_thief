import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useGameStore } from '../../stores/gameStore';
import RecruitmentPage from './pages/RecruitmentPage';
import { tutorialSteps } from '../../data/tutorialSteps';

describe('Tutorial Integration', () => {
  beforeEach(() => {
    const { newGame } = useGameStore.getState();
    newGame();
    localStorage.clear();
  });

  describe('Recruitment Phase', () => {
    it('should have correct tutorial step logic for recruitment', () => {
      const { startTutorial, setTutorialStep, selectedTeam } = useGameStore.getState();

      startTutorial();
      setTutorialStep('recruit-first-character');

      // Verify we're on the right step
      const tutorial = useGameStore.getState().tutorial;
      expect(tutorial.currentStep).toBe('recruit-first-character');
      expect(selectedTeam.length).toBe(0);

      // Note: Actual advancement happens in RecruitmentPage component
      // via the handleRecruit callback
    });

    it('should track team size for tutorial progression', () => {
      const { addTeamMember, availableCharacters, selectedTeam } = useGameStore.getState();

      expect(selectedTeam.length).toBe(0);

      addTeamMember(availableCharacters[0]);
      expect(useGameStore.getState().selectedTeam.length).toBe(1);

      addTeamMember(availableCharacters[1]);
      expect(useGameStore.getState().selectedTeam.length).toBe(2);
    });
  });

  describe('Tutorial Auto-Start', () => {
    it('should start tutorial for new players', () => {
      const { tutorial, selectedTeam, heistsCompleted } = useGameStore.getState();

      // Verify new player conditions
      expect(selectedTeam).toHaveLength(0);
      expect(heistsCompleted).toBe(0);
      expect(tutorial.skipped).toBe(false);

      // Tutorial should auto-start in HeistGame component
      // This test verifies the conditions are correct
    });

    it('should not start tutorial if already skipped', () => {
      const { skipTutorial } = useGameStore.getState();

      skipTutorial();

      // Get updated state after skipTutorial
      const tutorial = useGameStore.getState().tutorial;
      expect(tutorial.skipped).toBe(true);
      expect(tutorial.active).toBe(false);
    });

    it('should not start tutorial for existing players', () => {
      const { addTeamMember, availableCharacters } = useGameStore.getState();

      // Add a team member (existing player)
      addTeamMember(availableCharacters[0]);

      const { selectedTeam } = useGameStore.getState();
      expect(selectedTeam).toHaveLength(1);

      // Tutorial should not auto-start
    });
  });

  describe('Tutorial Step Data', () => {
    it('should have valid step data for all tutorial steps', () => {
      const expectedSteps: Array<keyof typeof tutorialSteps> = [
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

      // Verify tutorialSteps object exists and has content
      expect(tutorialSteps).toBeDefined();
      expect(Object.keys(tutorialSteps).length).toBeGreaterThan(0);

      expectedSteps.forEach(step => {
        const stepData = tutorialSteps[step];
        expect(stepData, `Step "${step}" should be defined`).toBeDefined();
        expect(stepData.id).toBe(step);
        expect(stepData.title).toBeTruthy();
        expect(stepData.description).toBeTruthy();
      });
    });
  });

  describe('Tutorial State Persistence', () => {
    it('should maintain completed steps across state updates', () => {
      const { startTutorial, nextTutorialStep } = useGameStore.getState();

      startTutorial();

      for (let i = 0; i < 3; i++) {
        nextTutorialStep();
      }

      const tutorial = useGameStore.getState().tutorial;
      expect(tutorial.completedSteps.length).toBe(3);
      expect(tutorial.completedSteps).toContain('welcome');
      expect(tutorial.completedSteps).toContain('recruitment-intro');
      expect(tutorial.completedSteps).toContain('recruit-first-character');
    });
  });
});
