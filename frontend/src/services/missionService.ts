import type { AutomatedHeist, TeamMember } from '../types/game';

export class MissionService {
  static validateTeamForMission(
    team: TeamMember[],
    mission: AutomatedHeist
  ): {
    isValid: boolean;
    message?: string;
  } {
    if (team.length < mission.requirements.minTeamSize) {
      return {
        isValid: false,
        message: `You need at least ${mission.requirements.minTeamSize} team members to start this mission.`,
      };
    }

    if (team.length > mission.requirements.maxTeamSize) {
      return {
        isValid: false,
        message: `You can only have ${mission.requirements.maxTeamSize} team members for this mission.`,
      };
    }

    return { isValid: true };
  }

  static canStartNewMission(activeMissionCount: number): {
    canStart: boolean;
    message?: string;
  } {
    if (activeMissionCount > 0) {
      return {
        canStart: false,
        message: `You cannot start a new mission while you have ${activeMissionCount} active mission${activeMissionCount > 1 ? 's' : ''}. Please wait for the current mission${activeMissionCount > 1 ? 's' : ''} to complete.`,
      };
    }

    return { canStart: true };
  }

  static getMissionRequirementsText(mission: AutomatedHeist): string {
    const skills = mission.requirements.requiredSkills;
    if (!skills || Object.keys(skills).length === 0) {
      return 'No special skills required';
    }

    return Object.entries(skills)
      .map(([skill, level]) => `${skill} ${level}+`)
      .join(', ');
  }

  static calculateMissionDuration(mission: AutomatedHeist): number {
    return mission.duration * 60; // Convert hours to minutes
  }

  static getMissionRiskColor(riskLevel: number): string {
    if (riskLevel <= 3) return 'text-emerald-400';
    if (riskLevel <= 6) return 'text-yellow-400';
    return 'text-blood-500';
  }
}
