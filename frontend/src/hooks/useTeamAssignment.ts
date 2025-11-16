import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import type { TeamMember, AutomatedHeist } from '../types/game';
import { MissionService } from '../services/missionService';
import toast from 'react-hot-toast';

export const useTeamAssignment = () => {
  const { selectedTeam, startAutomatedHeist, activeAutomatedHeists } = useGameStore();
  const [assignedTeam, setAssignedTeam] = useState<TeamMember[]>([]);

  const toggleTeamMember = (member: TeamMember) => {
    setAssignedTeam(prev =>
      prev.some(m => m.id === member.id)
        ? prev.filter(m => m.id !== member.id)
        : [...prev, member]
    );
  };

  const resetTeam = () => setAssignedTeam([]);

  const isTeamValid = (mission: AutomatedHeist) =>
    assignedTeam.length >= mission.requirements.minTeamSize &&
    assignedTeam.length <= mission.requirements.maxTeamSize;

  const assignTeamForMission = (mission: AutomatedHeist, onSuccess?: () => void) => {
    // Check if there are active missions
    const activeMissionCheck = MissionService.canStartNewMission(activeAutomatedHeists.length);
    if (!activeMissionCheck.canStart) {
      toast.error(activeMissionCheck.message!);
      return false;
    }

    if (isTeamValid(mission)) {
      startAutomatedHeist(mission, assignedTeam);
      resetTeam();
      onSuccess?.();
      return true;
    }
    return false;
  };

  return {
    assignedTeam,
    availableCharacters: selectedTeam,
    toggleTeamMember,
    resetTeam,
    isTeamValid,
    assignTeamForMission
  };
};