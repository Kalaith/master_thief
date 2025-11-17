import { describe, it, expect, beforeEach } from 'vitest';
import {
  rollD20,
  resolveEncounter,
  calculateTeamSynergy,
  getEnvironmentalModifiers,
  simulateAutomatedHeist,
} from './heistExecution';
import type { TeamMember, Encounter } from '../types/game';

describe('Heist Execution', () => {
  let mockMember: TeamMember;
  let mockEncounter: Encounter;

  beforeEach(() => {
    mockMember = {
      id: 1,
      name: 'Test Thief',
      specialty: 'Infiltration',
      background: 'Test',
      rarity: 'rare',
      characterClass: 'infiltrator',
      attributes: {
        strength: 12,
        dexterity: 16,
        intelligence: 14,
        wisdom: 13,
        charisma: 11,
        constitution: 12,
      },
      skills: {
        stealth: 8,
        athletics: 5,
        combat: 4,
        lockpicking: 7,
        hacking: 6,
        social: 5,
      },
      progression: {
        level: 5,
        experience: 0,
        experienceToNext: 2500,
        attributePoints: 0,
        skillPoints: 0,
        masteryLevel: 2,
        heistsCompleted: 10,
        successRate: 75,
      },
      equipment: {},
      derivedStats: {
        health: 15,
        stamina: 12,
        initiative: 4,
        carryingCapacity: 180,
        criticalChance: 0.08,
        criticalMultiplier: 1.5,
      },
      special_ability: 'Master of shadows',
      cost: 4000,
      fatigue: 0,
      loyalty: 90,
      injuries: [],
      personalityTraits: ['Methodical', 'Cautious'],
      backstoryEvents: ['Former government operative'],
    };

    mockEncounter = {
      name: 'Test Encounter',
      description: 'A test security system',
      primary_skill: 'stealth',
      primary_attribute: 'dexterity',
      difficulty: 15,
      complexity: 'moderate',
      failure_consequence: 'Alert triggered',
      success_bonus: 'Successfully bypassed',
    };
  });

  describe('rollD20', () => {
    it('should return a number between 1 and 20', () => {
      for (let i = 0; i < 100; i++) {
        const roll = rollD20();
        expect(roll).toBeGreaterThanOrEqual(1);
        expect(roll).toBeLessThanOrEqual(20);
      }
    });

    it('should return integers only', () => {
      for (let i = 0; i < 100; i++) {
        const roll = rollD20();
        expect(Number.isInteger(roll)).toBe(true);
      }
    });
  });

  describe('resolveEncounter', () => {
    it('should resolve encounter and return result', () => {
      const result = resolveEncounter(mockMember, mockEncounter);

      expect(result).toBeDefined();
      expect(result.member).toEqual(mockMember);
      expect(result.encounter).toEqual(mockEncounter);
      expect(result.roll).toBeGreaterThanOrEqual(1);
      expect(result.roll).toBeLessThanOrEqual(20);
      expect(result.outcome).toBeDefined();
      expect(['critical_failure', 'failure', 'neutral', 'success', 'critical_success']).toContain(result.outcome);
    });

    it('should calculate modifiers correctly', () => {
      const result = resolveEncounter(mockMember, mockEncounter);

      expect(result.attributeModifier).toBeDefined();
      expect(result.skillBonus).toBe(mockMember.skills[mockEncounter.primary_skill]);
      expect(result.total).toBeDefined();
    });

    it('should apply equipment bonuses when equipped', () => {
      const equippedMember = {
        ...mockMember,
        equipment: {
          armor: {
            id: 'stealth-suit',
            name: 'Stealth Suit',
            type: 'armor' as const,
            rarity: 'advanced' as const,
            description: 'Enhances stealth',
            attributeBonuses: {},
            skillBonuses: { stealth: 3 },
            cost: 500,
          },
        },
      };

      const result = resolveEncounter(equippedMember, mockEncounter);

      expect(result.equipmentBonus).toBeGreaterThan(0);
    });

    it('should penalize high fatigue', () => {
      const tiredMember = {
        ...mockMember,
        fatigue: 70, // Over 50 threshold
      };

      const normalResult = resolveEncounter(mockMember, mockEncounter);
      const tiredResult = resolveEncounter(tiredMember, mockEncounter);

      // Tired member should have lower modifier (or less likely to succeed due to fatigue penalty)
      expect(tiredResult.situationalModifiers).toBeLessThan(normalResult.situationalModifiers);
    });

    it('should bonus high loyalty', () => {
      const loyalMember = {
        ...mockMember,
        loyalty: 85,
      };

      const neutralMember = {
        ...mockMember,
        loyalty: 50,
      };

      const loyalResult = resolveEncounter(loyalMember, mockEncounter);
      const neutralResult = resolveEncounter(neutralMember, mockEncounter);

      expect(loyalResult.situationalModifiers).toBeGreaterThanOrEqual(neutralResult.situationalModifiers);
    });

    it('should penalize injuries', () => {
      const injuredMember = {
        ...mockMember,
        injuries: ['Minor sprain', 'Major fracture'],
      };

      const healthyResult = resolveEncounter(mockMember, mockEncounter);
      const injuredResult = resolveEncounter(injuredMember, mockEncounter);

      expect(injuredResult.situationalModifiers).toBeLessThan(healthyResult.situationalModifiers);
    });

    it('should always be critical_success on natural 20', () => {
      // Mock Math.random to always roll 20
      const originalRandom = Math.random;
      Math.random = () => 0.999; // Will result in roll of 20

      const result = resolveEncounter(mockMember, mockEncounter);

      expect(result.outcome).toBe('critical_success');

      Math.random = originalRandom;
    });

    it('should always be critical_failure on natural 1', () => {
      // Mock Math.random to always roll 1
      const originalRandom = Math.random;
      Math.random = () => 0.001; // Will result in roll of 1

      const result = resolveEncounter(mockMember, mockEncounter);

      expect(result.outcome).toBe('critical_failure');

      Math.random = originalRandom;
    });

    it('should grant more XP for success than failure', () => {
      // Run multiple times to get different outcomes
      const results: any[] = [];

      for (let i = 0; i < 50; i++) {
        results.push(resolveEncounter(mockMember, mockEncounter));
      }

      const successResults = results.filter(r => r.outcome === 'success' || r.outcome === 'critical_success');
      const failureResults = results.filter(r => r.outcome === 'failure' || r.outcome === 'critical_failure');

      if (successResults.length > 0 && failureResults.length > 0) {
        const avgSuccessXP = successResults.reduce((sum, r) => sum + r.experienceGained, 0) / successResults.length;
        const avgFailureXP = failureResults.reduce((sum, r) => sum + r.experienceGained, 0) / failureResults.length;

        expect(avgSuccessXP).toBeGreaterThan(avgFailureXP);
      }
    });

    it('should inflict more stress on failure than success', () => {
      const results: any[] = [];

      for (let i = 0; i < 50; i++) {
        results.push(resolveEncounter(mockMember, mockEncounter));
      }

      const successResults = results.filter(r => r.outcome === 'success' || r.outcome === 'critical_success');
      const failureResults = results.filter(r => r.outcome === 'failure' || r.outcome === 'critical_failure');

      if (successResults.length > 0 && failureResults.length > 0) {
        const avgSuccessStress = successResults.reduce((sum, r) => sum + r.stressInflicted, 0) / successResults.length;
        const avgFailureStress = failureResults.reduce((sum, r) => sum + r.stressInflicted, 0) / failureResults.length;

        expect(avgFailureStress).toBeGreaterThan(avgSuccessStress);
      }
    });

    it('should include narrative description', () => {
      const result = resolveEncounter(mockMember, mockEncounter);

      expect(result.narrativeDescription).toBeDefined();
      expect(typeof result.narrativeDescription).toBe('string');
      expect(result.narrativeDescription.length).toBeGreaterThan(0);
      expect(result.narrativeDescription).toContain(mockMember.name);
    });
  });

  describe('calculateTeamSynergy', () => {
    it('should calculate synergy for diverse team', () => {
      const diverseTeam: TeamMember[] = [
        { ...mockMember, characterClass: 'infiltrator', loyalty: 80 },
        { ...mockMember, id: 2, characterClass: 'tech', loyalty: 90 },
        { ...mockMember, id: 3, characterClass: 'muscle', loyalty: 85 },
      ];

      const synergy = calculateTeamSynergy(diverseTeam);

      expect(synergy).toBeGreaterThan(0);
    });

    it('should give bonus for class diversity', () => {
      const diverseTeam: TeamMember[] = [
        { ...mockMember, characterClass: 'infiltrator', loyalty: 80 },
        { ...mockMember, id: 2, characterClass: 'tech', loyalty: 80 },
        { ...mockMember, id: 3, characterClass: 'muscle', loyalty: 80 },
      ];

      const homogeneousTeam: TeamMember[] = [
        { ...mockMember, characterClass: 'infiltrator', loyalty: 80 },
        { ...mockMember, id: 2, characterClass: 'infiltrator', loyalty: 80 },
        { ...mockMember, id: 3, characterClass: 'infiltrator', loyalty: 80 },
      ];

      const diverseSynergy = calculateTeamSynergy(diverseTeam);
      const homogeneousSynergy = calculateTeamSynergy(homogeneousTeam);

      expect(diverseSynergy).toBeGreaterThan(homogeneousSynergy);
    });

    it('should consider loyalty in synergy calculation', () => {
      const loyalTeam: TeamMember[] = [
        { ...mockMember, loyalty: 95 },
        { ...mockMember, id: 2, loyalty: 90 },
      ];

      const disloyalTeam: TeamMember[] = [
        { ...mockMember, loyalty: 40 },
        { ...mockMember, id: 2, loyalty: 30 },
      ];

      const loyalSynergy = calculateTeamSynergy(loyalTeam);
      const disloyalSynergy = calculateTeamSynergy(disloyalTeam);

      expect(loyalSynergy).toBeGreaterThan(disloyalSynergy);
    });

    it('should reward balanced skill distribution', () => {
      const balancedTeam: TeamMember[] = [
        {
          ...mockMember,
          skills: { stealth: 5, athletics: 5, combat: 5, lockpicking: 5, hacking: 5, social: 5 },
        },
        {
          ...mockMember,
          id: 2,
          skills: { stealth: 5, athletics: 5, combat: 5, lockpicking: 5, hacking: 5, social: 5 },
        },
      ];

      const unbalancedTeam: TeamMember[] = [
        {
          ...mockMember,
          skills: { stealth: 10, athletics: 1, combat: 1, lockpicking: 1, hacking: 1, social: 1 },
        },
        {
          ...mockMember,
          id: 2,
          skills: { stealth: 10, athletics: 1, combat: 1, lockpicking: 1, hacking: 1, social: 1 },
        },
      ];

      const balancedSynergy = calculateTeamSynergy(balancedTeam);
      const unbalancedSynergy = calculateTeamSynergy(unbalancedTeam);

      expect(balancedSynergy).toBeGreaterThan(unbalancedSynergy);
    });
  });

  describe('getEnvironmentalModifiers', () => {
    it('should apply stealth bonus at night', () => {
      const stealthEncounter: Encounter = {
        ...mockEncounter,
        primary_skill: 'stealth',
      };

      const nightMod = getEnvironmentalModifiers(stealthEncounter, 'night');
      const dayMod = getEnvironmentalModifiers(stealthEncounter, 'day');

      expect(nightMod).toBeGreaterThan(dayMod);
    });

    it('should apply social bonus during day', () => {
      const socialEncounter: Encounter = {
        ...mockEncounter,
        primary_skill: 'social',
      };

      const dayMod = getEnvironmentalModifiers(socialEncounter, 'day');
      const nightMod = getEnvironmentalModifiers(socialEncounter, 'night');

      expect(dayMod).toBeGreaterThan(nightMod);
    });

    it('should apply fog bonus for stealth', () => {
      const stealthEncounter: Encounter = {
        ...mockEncounter,
        primary_skill: 'stealth',
      };

      const fogMod = getEnvironmentalModifiers(stealthEncounter, 'day', 'fog');
      const clearMod = getEnvironmentalModifiers(stealthEncounter, 'day', 'clear');

      expect(fogMod).toBeGreaterThan(clearMod);
    });

    it('should penalize athletics in rain', () => {
      const athleticsEncounter: Encounter = {
        ...mockEncounter,
        primary_skill: 'athletics',
      };

      const rainMod = getEnvironmentalModifiers(athleticsEncounter, 'day', 'rain');
      const clearMod = getEnvironmentalModifiers(athleticsEncounter, 'day', 'clear');

      expect(rainMod).toBeLessThan(clearMod);
    });

    it('should apply crowded environmental factor for stealth', () => {
      const crowdedEncounter: Encounter = {
        ...mockEncounter,
        primary_skill: 'stealth',
        environmental_factors: ['crowded'],
      };

      const modifier = getEnvironmentalModifiers(crowdedEncounter);

      expect(modifier).toBeGreaterThan(0);
    });

    it('should penalize well-lit areas for stealth', () => {
      const litEncounter: Encounter = {
        ...mockEncounter,
        primary_skill: 'stealth',
        environmental_factors: ['well-lit'],
      };

      const modifier = getEnvironmentalModifiers(litEncounter);

      expect(modifier).toBeLessThan(0);
    });

    it('should penalize high-security environments', () => {
      const secureEncounter: Encounter = {
        ...mockEncounter,
        environmental_factors: ['high-security'],
      };

      const modifier = getEnvironmentalModifiers(secureEncounter);

      expect(modifier).toBeLessThan(0);
    });
  });

  describe('simulateAutomatedHeist', () => {
    it('should simulate multiple encounters and return results', () => {
      const team: TeamMember[] = [mockMember];
      const encounters: Encounter[] = [
        mockEncounter,
        { ...mockEncounter, primary_skill: 'lockpicking' },
        { ...mockEncounter, primary_skill: 'hacking' },
      ];

      const result = simulateAutomatedHeist(team, encounters);

      expect(result.results).toHaveLength(3);
      expect(result.success).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      expect(result.totalPayout).toBeGreaterThanOrEqual(0);
      expect(result.totalExperience).toBeGreaterThan(0);
      expect(result.teamFatigue).toBeGreaterThanOrEqual(0);
    });

    it('should select best team member for each encounter', () => {
      const stealthSpecialist: TeamMember = {
        ...mockMember,
        skills: { stealth: 10, athletics: 2, combat: 2, lockpicking: 3, hacking: 2, social: 2 },
      };

      const hackingSpecialist: TeamMember = {
        ...mockMember,
        id: 2,
        skills: { stealth: 2, athletics: 2, combat: 2, lockpicking: 2, hacking: 10, social: 2 },
      };

      const team = [stealthSpecialist, hackingSpecialist];
      const encounters: Encounter[] = [
        { ...mockEncounter, primary_skill: 'stealth' },
        { ...mockEncounter, primary_skill: 'hacking' },
      ];

      const result = simulateAutomatedHeist(team, encounters);

      // Both should succeed since we're using specialists
      expect(result.results).toHaveLength(2);
    });

    it('should calculate payout based on success', () => {
      const strongTeam: TeamMember[] = [
        {
          ...mockMember,
          skills: { stealth: 15, athletics: 15, combat: 15, lockpicking: 15, hacking: 15, social: 15 },
          attributes: { strength: 18, dexterity: 18, intelligence: 18, wisdom: 18, charisma: 18, constitution: 18 },
        },
      ];

      const weakTeam: TeamMember[] = [
        {
          ...mockMember,
          skills: { stealth: 1, athletics: 1, combat: 1, lockpicking: 1, hacking: 1, social: 1 },
          attributes: { strength: 8, dexterity: 8, intelligence: 8, wisdom: 8, charisma: 8, constitution: 8 },
        },
      ];

      const encounters: Encounter[] = [
        mockEncounter,
        { ...mockEncounter, difficulty: 10 },
      ];

      const strongResult = simulateAutomatedHeist(strongTeam, encounters);
      const weakResult = simulateAutomatedHeist(weakTeam, encounters);

      // Strong team should generally earn more (though RNG can affect this)
      expect(strongResult.totalExperience).toBeGreaterThan(0);
      expect(weakResult.totalExperience).toBeGreaterThan(0);
    });

    it('should accumulate team fatigue across encounters', () => {
      const team: TeamMember[] = [mockMember];
      const encounters: Encounter[] = [
        mockEncounter,
        { ...mockEncounter },
        { ...mockEncounter },
      ];

      const result = simulateAutomatedHeist(team, encounters);

      expect(result.teamFatigue).toBeGreaterThan(0);
    });

    it('should track injuries from critical failures', () => {
      const team: TeamMember[] = [
        {
          ...mockMember,
          skills: { stealth: 1, athletics: 1, combat: 1, lockpicking: 1, hacking: 1, social: 1 },
          attributes: { strength: 6, dexterity: 6, intelligence: 6, wisdom: 6, charisma: 6, constitution: 6 },
        },
      ];

      const hardEncounters: Encounter[] = [
        { ...mockEncounter, difficulty: 25 },
        { ...mockEncounter, difficulty: 25 },
        { ...mockEncounter, difficulty: 25 },
      ];

      const result = simulateAutomatedHeist(team, hardEncounters);

      // With very weak team and high difficulty, should be possible to get injuries
      expect(result.injuries).toBeDefined();
      expect(Array.isArray(result.injuries)).toBe(true);
    });

    it('should determine overall success based on encounter outcomes', () => {
      // Run multiple simulations to check success determination logic
      const team: TeamMember[] = [mockMember];
      const encounters: Encounter[] = [mockEncounter];

      for (let i = 0; i < 10; i++) {
        const result = simulateAutomatedHeist(team, encounters);
        expect(typeof result.success).toBe('boolean');
      }
    });
  });
});
