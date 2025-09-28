import { create } from 'zustand';
import type { GameState, GamePhase, TeamMember, HeistTarget, EncounterResult } from '../types/game';

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
}

const initialState: GameState = {
  budget: 15000,
  selectedTeam: [],
  selectedHeist: null,
  currentEncounter: 0,
  encounterResults: [],
  heistsCompleted: 0,
  totalEarnings: 0,
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
}));