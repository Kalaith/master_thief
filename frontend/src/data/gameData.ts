// Game data for the Master Thief heist simulator
import type { GameData } from '../types/game';
import { characters } from './characters';

export const gameData: GameData = {
  team_members: characters,
  heist_targets: [
    {
      id: 1,
      name: "Velvet Room Casino",
      difficulty: "Easy",
      potential_payout: 180000,
      description: "Smoky speakeasy casino with loose security and looser morals",
      encounters: [
        {
          name: "Bouncer Distraction",
          description: "Sweet-talk or slip past the casino muscle",
          primary_skill: "social",
          difficulty: 9,
          complexity: "simple",
          failure_consequence: "Bouncer becomes suspicious of your intentions"
        },
        {
          name: "Poker Room Safe",
          description: "Crack the house's nightly take safe",
          primary_skill: "lockpicking",
          difficulty: 11,
          complexity: "moderate",
          failure_consequence: "Alarm triggers, need to work faster"
        },
        {
          name: "Back Alley Escape",
          description: "Navigate through the maze of speakeasy tunnels",
          primary_skill: "stealth",
          difficulty: 10,
          complexity: "simple",
          failure_consequence: "Security spots you during escape"
        }
      ]
    },
    {
      id: 2,
      name: "Metropolitan Art Museum",
      difficulty: "Hard",
      potential_payout: 750000,
      description: "High-society museum filled with priceless artifacts and marble floors",
      encounters: [
        {
          name: "Laser Security Grid",
          description: "Dance through the web of red laser beams",
          primary_skill: "athletics",
          difficulty: 15,
          complexity: "complex",
          failure_consequence: "Silent alarm activated, time pressure increases"
        },
        {
          name: "Night Curator",
          description: "Convince the cultured curator you're meant to be here",
          primary_skill: "social",
          difficulty: 14,
          complexity: "moderate",
          failure_consequence: "Curator calls for additional security"
        },
        {
          name: "Pressure-Sensitive Display",
          description: "Extract the golden artifact without triggering sensors",
          primary_skill: "lockpicking",
          difficulty: 16,
          complexity: "complex",
          failure_consequence: "Display case alarm sounds throughout the museum"
        }
      ]
    },
    {
      id: 3,
      name: "First National Bank Vault",
      difficulty: "Medium",
      potential_payout: 450000,
      description: "Classic bank job - vault, guards, and that beautiful marble interior",
      encounters: [
        {
          name: "Security Camera System",
          description: "Disable the watchful electronic eyes",
          primary_skill: "hacking",
          difficulty: 12,
          complexity: "moderate",
          failure_consequence: "Guards are alerted to suspicious activity"
        },
        {
          name: "Main Vault Door",
          description: "Open the massive steel vault with finesse",
          primary_skill: "lockpicking",
          difficulty: 15,
          complexity: "complex",
          failure_consequence: "Time-lock alarm triggers, police response accelerated"
        },
        {
          name: "Night Patrol",
          description: "Avoid or neutralize the roving security guards",
          primary_skill: "stealth",
          difficulty: 13,
          complexity: "moderate",
          failure_consequence: "Combat encounter - risk of injuries and noise"
        }
      ]
    },
    {
      id: 4,
      name: "Luxury Corporate Tower",
      difficulty: "Hard",
      potential_payout: 650000,
      description: "Gleaming corporate headquarters with executive secrets and gold-trimmed offices",
      encounters: [
        {
          name: "Executive Elevator Access",
          description: "Hack your way to the penthouse floors",
          primary_skill: "hacking",
          difficulty: 14,
          complexity: "moderate",
          failure_consequence: "Elevator lockdown - must find alternate route"
        },
        {
          name: "CEO's Personal Vault",
          description: "Crack the executive's private treasure trove",
          primary_skill: "lockpicking",
          difficulty: 17,
          complexity: "complex",
          failure_consequence: "Secondary alarm system activates"
        },
        {
          name: "Board Room Infiltration",
          description: "Navigate through the executive meeting space undetected",
          primary_skill: "stealth",
          difficulty: 15,
          complexity: "complex",
          failure_consequence: "Late-night executives spot suspicious movement"
        }
      ]
    }
  ],
  outcome_descriptions: {
    critical_failure: [
      "Disaster strikes! Your associate is caught red-handed by the boys in blue.",
      "Complete catastrophe! The whole operation goes south faster than a rat fleeing a sinking ship.",
      "Total failure! Your operative gets pinched and the heat is now on the entire family."
    ],
    failure: [
      "Things don't go according to plan, but you're still in the game, capisce?",
      "A minor setback occurs - nothing the family can't handle with finesse.",
      "Small hiccup in the operation - time to show what real professionals can do."
    ],
    neutral: [
      "Partial success with some complications - could've been cleaner, could've been messier.",
      "You get the job done, but something doesn't sit right. Keep your eyes peeled.",
      "Mixed results - you're through, but there's a feeling someone's watching."
    ],
    success: [
      "Clean execution! Your associate handles business like a true professional.",
      "Smooth as silk - the operation goes off without a hitch, just like the old days.",
      "Perfect work! Nobody will ever know the family paid a visit tonight."
    ],
    critical_success: [
      "Exceptional performance! Your operative discovers an unexpected golden opportunity.",
      "Brilliant execution! The job yields more than expected - the Don would be proud.",
      "Outstanding work! This couldn't have gone better if it were orchestrated by the gods themselves."
    ]
  }
};