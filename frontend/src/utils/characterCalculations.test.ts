import { describe, it, expect } from 'vitest';
import {
  getAttributeModifier,
  calculateDerivedStats,
  calculateSkills,
  calculateExperienceToNext,
  calculateTotalExperience,
  levelUpCharacter,
  generateStartingAttributes,
  calculatePowerLevel,
  applyEquipmentBonuses,
} from './characterCalculations';
import type {
  Attributes,
  TeamMember,
  CharacterProgression,
} from '../types/game';

describe('Character Calculations', () => {
  describe('getAttributeModifier', () => {
    it('should calculate D&D-style attribute modifiers correctly', () => {
      expect(getAttributeModifier(10)).toBe(0); // 10-11 = 0
      expect(getAttributeModifier(11)).toBe(0); // 11-11 = 0
      expect(getAttributeModifier(12)).toBe(1); // 12-11 = 1
      expect(getAttributeModifier(14)).toBe(2); // 14-11 = 2
      expect(getAttributeModifier(16)).toBe(3); // 16-11 = 3
      expect(getAttributeModifier(18)).toBe(4); // 18-11 = 4
      expect(getAttributeModifier(20)).toBe(5); // 20-11 = 5
      expect(getAttributeModifier(8)).toBe(-1); // 8-11 = -1
      expect(getAttributeModifier(6)).toBe(-2); // 6-11 = -2
    });
  });

  describe('calculateDerivedStats', () => {
    it('should calculate derived stats from attributes', () => {
      const attributes: Attributes = {
        strength: 14,
        dexterity: 16,
        intelligence: 12,
        wisdom: 13,
        charisma: 10,
        constitution: 15,
      };

      const stats = calculateDerivedStats(attributes, 1);

      expect(stats.health).toBeGreaterThan(0);
      expect(stats.stamina).toBeGreaterThan(0);
      expect(stats.initiative).toBeDefined();
      expect(stats.carryingCapacity).toBe(14 * 15); // STR * 15
      expect(stats.criticalChance).toBeGreaterThanOrEqual(0.05);
      expect(stats.criticalMultiplier).toBeGreaterThan(1);
    });

    it('should scale health with level', () => {
      const attributes: Attributes = {
        strength: 10,
        dexterity: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
        constitution: 14,
      };

      const level1Stats = calculateDerivedStats(attributes, 1);
      const level5Stats = calculateDerivedStats(attributes, 5);

      expect(level5Stats.health).toBeGreaterThan(level1Stats.health);
    });

    it('should calculate critical chance based on dexterity and intelligence', () => {
      const highDexInt: Attributes = {
        strength: 10,
        dexterity: 18,
        intelligence: 16,
        wisdom: 10,
        charisma: 10,
        constitution: 10,
      };

      const lowDexInt: Attributes = {
        strength: 10,
        dexterity: 8,
        intelligence: 8,
        wisdom: 10,
        charisma: 10,
        constitution: 10,
      };

      const highStats = calculateDerivedStats(highDexInt, 1);
      const lowStats = calculateDerivedStats(lowDexInt, 1);

      expect(highStats.criticalChance).toBeGreaterThan(lowStats.criticalChance);
    });
  });

  describe('calculateSkills', () => {
    it('should calculate skills from attributes and progression', () => {
      const attributes: Attributes = {
        strength: 14,
        dexterity: 16,
        intelligence: 12,
        wisdom: 13,
        charisma: 10,
        constitution: 15,
      };

      const progression: CharacterProgression = {
        level: 5,
        experience: 0,
        experienceToNext: 100,
        attributePoints: 0,
        skillPoints: 0,
        masteryLevel: 2,
        heistsCompleted: 0,
        successRate: 0,
      };

      const baseSkills = {
        stealth: 5,
        athletics: 4,
        combat: 6,
        lockpicking: 7,
        hacking: 3,
        social: 2,
      };

      const skills = calculateSkills(attributes, progression, baseSkills);

      expect(skills.stealth).toBeGreaterThanOrEqual(baseSkills.stealth);
      expect(skills.athletics).toBeGreaterThanOrEqual(baseSkills.athletics);
      expect(skills.combat).toBeGreaterThanOrEqual(baseSkills.combat);
      expect(skills.lockpicking).toBeGreaterThanOrEqual(baseSkills.lockpicking);
      expect(skills.hacking).toBeGreaterThanOrEqual(baseSkills.hacking);
      expect(skills.social).toBeGreaterThanOrEqual(baseSkills.social);
    });

    it('should add level bonus to skills', () => {
      const attributes: Attributes = {
        strength: 10,
        dexterity: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
        constitution: 10,
      };

      const lowLevelProgression: CharacterProgression = {
        level: 1,
        experience: 0,
        experienceToNext: 100,
        attributePoints: 0,
        skillPoints: 0,
        masteryLevel: 0,
        heistsCompleted: 0,
        successRate: 0,
      };

      const highLevelProgression: CharacterProgression = {
        level: 10,
        experience: 0,
        experienceToNext: 1000,
        attributePoints: 0,
        skillPoints: 0,
        masteryLevel: 0,
        heistsCompleted: 0,
        successRate: 0,
      };

      const baseSkills = {
        stealth: 5,
        athletics: 5,
        combat: 5,
        lockpicking: 5,
        hacking: 5,
        social: 5,
      };

      const lowLevelSkills = calculateSkills(
        attributes,
        lowLevelProgression,
        baseSkills
      );
      const highLevelSkills = calculateSkills(
        attributes,
        highLevelProgression,
        baseSkills
      );

      expect(highLevelSkills.stealth).toBeGreaterThan(lowLevelSkills.stealth);
      expect(highLevelSkills.combat).toBeGreaterThan(lowLevelSkills.combat);
    });

    it('should never return negative skills', () => {
      const lowAttributes: Attributes = {
        strength: 3,
        dexterity: 3,
        intelligence: 3,
        wisdom: 3,
        charisma: 3,
        constitution: 3,
      };

      const progression: CharacterProgression = {
        level: 1,
        experience: 0,
        experienceToNext: 100,
        attributePoints: 0,
        skillPoints: 0,
        masteryLevel: 0,
        heistsCompleted: 0,
        successRate: 0,
      };

      const baseSkills = {
        stealth: 0,
        athletics: 0,
        combat: 0,
        lockpicking: 0,
        hacking: 0,
        social: 0,
      };

      const skills = calculateSkills(lowAttributes, progression, baseSkills);

      expect(skills.stealth).toBeGreaterThanOrEqual(0);
      expect(skills.athletics).toBeGreaterThanOrEqual(0);
      expect(skills.combat).toBeGreaterThanOrEqual(0);
      expect(skills.lockpicking).toBeGreaterThanOrEqual(0);
      expect(skills.hacking).toBeGreaterThanOrEqual(0);
      expect(skills.social).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Experience Calculations', () => {
    it('should calculate experience for next level correctly', () => {
      expect(calculateExperienceToNext(1)).toBe(100); // 1^2 * 100
      expect(calculateExperienceToNext(2)).toBe(400); // 2^2 * 100
      expect(calculateExperienceToNext(3)).toBe(900); // 3^2 * 100
      expect(calculateExperienceToNext(5)).toBe(2500); // 5^2 * 100
    });

    it('should calculate total experience for level', () => {
      expect(calculateTotalExperience(1)).toBe(0); // Starting level
      expect(calculateTotalExperience(2)).toBe(100); // 0 + 100
      expect(calculateTotalExperience(3)).toBe(500); // 100 + 400
      expect(calculateTotalExperience(4)).toBe(1400); // 500 + 900
    });

    it('should have exponential growth', () => {
      const xp5 = calculateExperienceToNext(5);
      const xp10 = calculateExperienceToNext(10);

      expect(xp10).toBeGreaterThan(xp5 * 2); // Should be more than double
    });
  });

  describe('levelUpCharacter', () => {
    it('should increase character level', () => {
      const mockCharacter: TeamMember = {
        id: 1,
        name: 'Test Character',
        specialty: 'Test',
        background: 'Test background',
        rarity: 'common',
        characterClass: 'infiltrator',
        attributes: {
          strength: 10,
          dexterity: 14,
          intelligence: 12,
          wisdom: 11,
          charisma: 10,
          constitution: 10,
        },
        skills: {
          stealth: 5,
          athletics: 3,
          combat: 2,
          lockpicking: 4,
          hacking: 2,
          social: 2,
        },
        progression: {
          level: 1,
          experience: 150,
          experienceToNext: 100,
          attributePoints: 0,
          skillPoints: 0,
          masteryLevel: 0,
          heistsCompleted: 0,
          successRate: 0,
        },
        equipment: {},
        derivedStats: {
          health: 12,
          stamina: 10,
          initiative: 2,
          carryingCapacity: 150,
          criticalChance: 0.05,
          criticalMultiplier: 1.5,
        },
        special_ability: 'Test ability',
        cost: 1000,
        fatigue: 0,
        loyalty: 100,
        injuries: [],
        personalityTraits: [],
        backstoryEvents: [],
      };

      const leveledUp = levelUpCharacter(mockCharacter);

      expect(leveledUp.progression.level).toBe(2);
      expect(leveledUp.progression.attributePoints).toBe(1);
      expect(leveledUp.progression.skillPoints).toBe(2);
      expect(leveledUp.progression.experience).toBe(50); // 150 - 100
    });

    it('should grant attribute and skill points on level up', () => {
      const mockCharacter: TeamMember = {
        id: 1,
        name: 'Test',
        specialty: 'Test',
        background: 'Test',
        rarity: 'common',
        characterClass: 'muscle',
        attributes: {
          strength: 10,
          dexterity: 10,
          intelligence: 10,
          wisdom: 10,
          charisma: 10,
          constitution: 10,
        },
        skills: {
          stealth: 1,
          athletics: 1,
          combat: 1,
          lockpicking: 1,
          hacking: 1,
          social: 1,
        },
        progression: {
          level: 5,
          experience: 2500,
          experienceToNext: 2500,
          attributePoints: 3,
          skillPoints: 8,
          masteryLevel: 0,
          heistsCompleted: 0,
          successRate: 0,
        },
        equipment: {},
        derivedStats: {
          health: 10,
          stamina: 10,
          initiative: 0,
          carryingCapacity: 150,
          criticalChance: 0.05,
          criticalMultiplier: 1.5,
        },
        special_ability: 'Test',
        cost: 1000,
        fatigue: 0,
        loyalty: 100,
        injuries: [],
        personalityTraits: [],
        backstoryEvents: [],
      };

      const leveledUp = levelUpCharacter(mockCharacter);

      expect(leveledUp.progression.attributePoints).toBe(4); // 3 + 1
      expect(leveledUp.progression.skillPoints).toBe(10); // 8 + 2
    });
  });

  describe('generateStartingAttributes', () => {
    it('should generate attributes for different classes', () => {
      const muscleAttrs = generateStartingAttributes('muscle', 'common');
      const techAttrs = generateStartingAttributes('tech', 'common');
      const faceAttrs = generateStartingAttributes('face', 'common');

      // Muscle should favor strength
      expect(muscleAttrs.strength).toBeGreaterThanOrEqual(14);

      // Tech should favor intelligence
      expect(techAttrs.intelligence).toBeGreaterThanOrEqual(14);

      // Face should favor charisma
      expect(faceAttrs.charisma).toBeGreaterThanOrEqual(14);
    });

    it('should have higher stats for higher rarity', () => {
      const commonAttrs = generateStartingAttributes('infiltrator', 'common');
      const legendaryAttrs = generateStartingAttributes(
        'infiltrator',
        'legendary'
      );

      const commonTotal = Object.values(commonAttrs).reduce(
        (sum, val) => sum + val,
        0
      );
      const legendaryTotal = Object.values(legendaryAttrs).reduce(
        (sum, val) => sum + val,
        0
      );

      expect(legendaryTotal).toBeGreaterThan(commonTotal);
    });

    it('should cap attributes at 20', () => {
      const attrs = generateStartingAttributes('wildcard', 'legendary');

      Object.values(attrs).forEach(value => {
        expect(value).toBeLessThanOrEqual(20);
      });
    });

    it('should have minimum viable attributes', () => {
      const attrs = generateStartingAttributes('muscle', 'common');

      Object.values(attrs).forEach(value => {
        expect(value).toBeGreaterThanOrEqual(8); // D&D minimum
      });
    });
  });

  describe('calculatePowerLevel', () => {
    it('should calculate total character power', () => {
      const weakCharacter: TeamMember = {
        id: 1,
        name: 'Weak',
        specialty: 'Test',
        background: 'Test',
        rarity: 'common',
        characterClass: 'face',
        attributes: {
          strength: 8,
          dexterity: 8,
          intelligence: 8,
          wisdom: 8,
          charisma: 8,
          constitution: 8,
        },
        skills: {
          stealth: 1,
          athletics: 1,
          combat: 1,
          lockpicking: 1,
          hacking: 1,
          social: 1,
        },
        progression: {
          level: 1,
          experience: 0,
          experienceToNext: 100,
          attributePoints: 0,
          skillPoints: 0,
          masteryLevel: 0,
          heistsCompleted: 0,
          successRate: 0,
        },
        equipment: {},
        derivedStats: {
          health: 10,
          stamina: 10,
          initiative: 0,
          carryingCapacity: 120,
          criticalChance: 0.05,
          criticalMultiplier: 1.5,
        },
        special_ability: 'Test',
        cost: 1000,
        fatigue: 0,
        loyalty: 100,
        injuries: [],
        personalityTraits: [],
        backstoryEvents: [],
      };

      const strongCharacter: TeamMember = {
        ...weakCharacter,
        attributes: {
          strength: 18,
          dexterity: 16,
          intelligence: 14,
          wisdom: 14,
          charisma: 16,
          constitution: 15,
        },
        skills: {
          stealth: 10,
          athletics: 8,
          combat: 9,
          lockpicking: 8,
          hacking: 7,
          social: 10,
        },
        progression: {
          level: 10,
          experience: 0,
          experienceToNext: 10000,
          attributePoints: 0,
          skillPoints: 0,
          masteryLevel: 5,
          heistsCompleted: 50,
          successRate: 85,
        },
      };

      const weakPower = calculatePowerLevel(weakCharacter);
      const strongPower = calculatePowerLevel(strongCharacter);

      expect(strongPower).toBeGreaterThan(weakPower);
      expect(weakPower).toBeGreaterThan(0);
    });

    it('should include equipment bonus in power calculation', () => {
      const mockCharacter: TeamMember = {
        id: 1,
        name: 'Test',
        specialty: 'Test',
        background: 'Test',
        rarity: 'common',
        characterClass: 'muscle',
        attributes: {
          strength: 14,
          dexterity: 12,
          intelligence: 10,
          wisdom: 10,
          charisma: 10,
          constitution: 14,
        },
        skills: {
          stealth: 5,
          athletics: 7,
          combat: 8,
          lockpicking: 3,
          hacking: 2,
          social: 3,
        },
        progression: {
          level: 5,
          experience: 0,
          experienceToNext: 2500,
          attributePoints: 0,
          skillPoints: 0,
          masteryLevel: 0,
          heistsCompleted: 0,
          successRate: 0,
        },
        equipment: {},
        derivedStats: {
          health: 15,
          stamina: 12,
          initiative: 1,
          carryingCapacity: 210,
          criticalChance: 0.06,
          criticalMultiplier: 1.5,
        },
        special_ability: 'Test',
        cost: 2000,
        fatigue: 0,
        loyalty: 100,
        injuries: [],
        personalityTraits: [],
        backstoryEvents: [],
      };

      const basePower = calculatePowerLevel(mockCharacter);

      const equippedCharacter = {
        ...mockCharacter,
        equipment: {
          weapon: {
            id: 'pistol',
            name: 'Pistol',
            type: 'weapon' as const,
            rarity: 'basic' as const,
            description: 'A basic pistol',
            attributeBonuses: {},
            skillBonuses: {},
            cost: 100,
          },
          armor: {
            id: 'vest',
            name: 'Vest',
            type: 'armor' as const,
            rarity: 'basic' as const,
            description: 'A tactical vest',
            attributeBonuses: {},
            skillBonuses: {},
            cost: 200,
          },
        },
      };

      const equippedPower = calculatePowerLevel(equippedCharacter);

      expect(equippedPower).toBeGreaterThan(basePower);
    });
  });

  describe('applyEquipmentBonuses', () => {
    it('should apply attribute bonuses from equipment', () => {
      const mockCharacter: TeamMember = {
        id: 1,
        name: 'Test',
        specialty: 'Test',
        background: 'Test',
        rarity: 'common',
        characterClass: 'muscle',
        attributes: {
          strength: 14,
          dexterity: 12,
          intelligence: 10,
          wisdom: 10,
          charisma: 10,
          constitution: 14,
        },
        skills: {
          stealth: 5,
          athletics: 7,
          combat: 8,
          lockpicking: 3,
          hacking: 2,
          social: 3,
        },
        progression: {
          level: 5,
          experience: 0,
          experienceToNext: 2500,
          attributePoints: 0,
          skillPoints: 0,
          masteryLevel: 0,
          heistsCompleted: 0,
          successRate: 0,
        },
        equipment: {
          weapon: {
            id: 'strength-weapon',
            name: 'Heavy Crowbar',
            type: 'weapon',
            rarity: 'basic',
            description: 'Adds strength',
            attributeBonuses: { strength: 2 },
            skillBonuses: { combat: 1 },
            cost: 100,
          },
        },
        derivedStats: {
          health: 15,
          stamina: 12,
          initiative: 1,
          carryingCapacity: 210,
          criticalChance: 0.06,
          criticalMultiplier: 1.5,
        },
        special_ability: 'Test',
        cost: 2000,
        fatigue: 0,
        loyalty: 100,
        injuries: [],
        personalityTraits: [],
        backstoryEvents: [],
      };

      const enhanced = applyEquipmentBonuses(mockCharacter);

      expect(enhanced.attributes.strength).toBe(16); // 14 + 2
      expect(enhanced.skills.combat).toBe(9); // 8 + 1
    });

    it('should stack bonuses from multiple equipment pieces', () => {
      const mockCharacter: TeamMember = {
        id: 1,
        name: 'Test',
        specialty: 'Test',
        background: 'Test',
        rarity: 'common',
        characterClass: 'infiltrator',
        attributes: {
          strength: 10,
          dexterity: 16,
          intelligence: 12,
          wisdom: 12,
          charisma: 10,
          constitution: 10,
        },
        skills: {
          stealth: 8,
          athletics: 5,
          combat: 4,
          lockpicking: 7,
          hacking: 4,
          social: 3,
        },
        progression: {
          level: 5,
          experience: 0,
          experienceToNext: 2500,
          attributePoints: 0,
          skillPoints: 0,
          masteryLevel: 0,
          heistsCompleted: 0,
          successRate: 0,
        },
        equipment: {
          armor: {
            id: 'stealth-armor',
            name: 'Stealth Suit',
            type: 'armor',
            rarity: 'advanced',
            description: 'Adds dexterity and stealth',
            attributeBonuses: { dexterity: 2 },
            skillBonuses: { stealth: 3 },
            cost: 500,
          },
          accessory: {
            id: 'stealth-accessory',
            name: 'Noise Dampeners',
            type: 'accessory',
            rarity: 'advanced',
            description: 'More stealth',
            attributeBonuses: {},
            skillBonuses: { stealth: 2 },
            cost: 300,
          },
        },
        derivedStats: {
          health: 12,
          stamina: 10,
          initiative: 4,
          carryingCapacity: 150,
          criticalChance: 0.08,
          criticalMultiplier: 1.5,
        },
        special_ability: 'Test',
        cost: 3000,
        fatigue: 0,
        loyalty: 100,
        injuries: [],
        personalityTraits: [],
        backstoryEvents: [],
      };

      const enhanced = applyEquipmentBonuses(mockCharacter);

      expect(enhanced.attributes.dexterity).toBe(18); // 16 + 2
      expect(enhanced.skills.stealth).toBe(13); // 8 + 3 + 2
    });

    it('should recalculate derived stats with enhanced attributes', () => {
      const mockCharacter: TeamMember = {
        id: 1,
        name: 'Test',
        specialty: 'Test',
        background: 'Test',
        rarity: 'common',
        characterClass: 'muscle',
        attributes: {
          strength: 14,
          dexterity: 10,
          intelligence: 10,
          wisdom: 10,
          charisma: 10,
          constitution: 12,
        },
        skills: {
          stealth: 3,
          athletics: 7,
          combat: 8,
          lockpicking: 2,
          hacking: 2,
          social: 3,
        },
        progression: {
          level: 5,
          experience: 0,
          experienceToNext: 2500,
          attributePoints: 0,
          skillPoints: 0,
          masteryLevel: 0,
          heistsCompleted: 0,
          successRate: 0,
        },
        equipment: {
          armor: {
            id: 'con-armor',
            name: 'Heavy Armor',
            type: 'armor',
            rarity: 'advanced',
            description: 'Adds constitution',
            attributeBonuses: { constitution: 3 },
            skillBonuses: {},
            cost: 500,
          },
        },
        derivedStats: {
          health: 15,
          stamina: 12,
          initiative: 0,
          carryingCapacity: 210,
          criticalChance: 0.05,
          criticalMultiplier: 1.5,
        },
        special_ability: 'Test',
        cost: 2000,
        fatigue: 0,
        loyalty: 100,
        injuries: [],
        personalityTraits: [],
        backstoryEvents: [],
      };

      const enhanced = applyEquipmentBonuses(mockCharacter);

      expect(enhanced.derivedStats.health).toBeGreaterThan(
        mockCharacter.derivedStats.health
      );
    });
  });
});
