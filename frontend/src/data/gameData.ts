// Game data for the Master Thief heist simulator
import type { GameData } from '../types/game';

export const gameData: GameData = {
  team_members: [
    {
      id: 1,
      name: "Shadow",
      specialty: "Infiltration Expert",
      background: "Ex-military sniper turned master burglar",
      skills: {
        stealth: 9,
        athletics: 7,
        combat: 8,
        lockpicking: 6,
        hacking: 4,
        social: 5
      },
      special_ability: "Can move silently through any terrain",
      cost: 5000
    },
    {
      id: 2,
      name: "Cipher",
      specialty: "Tech Specialist",
      background: "Former NSA programmer gone rogue",
      skills: {
        stealth: 5,
        athletics: 4,
        combat: 3,
        lockpicking: 6,
        hacking: 10,
        social: 7
      },
      special_ability: "Can disable any electronic security system",
      cost: 6000
    },
    {
      id: 3,
      name: "Viper",
      specialty: "Social Engineer",
      background: "Master of disguise and manipulation",
      skills: {
        stealth: 6,
        athletics: 5,
        combat: 4,
        lockpicking: 5,
        hacking: 6,
        social: 10
      },
      special_ability: "Can talk their way past any human obstacle",
      cost: 4500
    },
    {
      id: 4,
      name: "Wrench",
      specialty: "Demolitions Expert",
      background: "Former mining engineer with explosive personality",
      skills: {
        stealth: 4,
        athletics: 8,
        combat: 9,
        lockpicking: 8,
        hacking: 3,
        social: 3
      },
      special_ability: "Can breach any physical barrier",
      cost: 5500
    },
    {
      id: 5,
      name: "Silk",
      specialty: "Cat Burglar",
      background: "Acrobatic thief specializing in impossible entries",
      skills: {
        stealth: 8,
        athletics: 10,
        combat: 6,
        lockpicking: 9,
        hacking: 4,
        social: 6
      },
      special_ability: "Can access any location through unconventional routes",
      cost: 5200
    },
    {
      id: 6,
      name: "Ghost",
      specialty: "Information Broker",
      background: "Connected to criminal underworld networks",
      skills: {
        stealth: 7,
        athletics: 5,
        combat: 6,
        lockpicking: 7,
        hacking: 8,
        social: 8
      },
      special_ability: "Provides valuable intel and escape routes",
      cost: 4000
    }
  ],
  heist_targets: [
    {
      id: 1,
      name: "First National Bank",
      difficulty: "Medium",
      potential_payout: 250000,
      description: "Classic bank heist with vault, guards, and time pressure",
      encounters: [
        {
          name: "Security Cameras",
          description: "Disable the surveillance system",
          primary_skill: "hacking",
          difficulty: 12,
          failure_consequence: "Guards alerted to your presence"
        },
        {
          name: "Vault Door",
          description: "Open the main vault",
          primary_skill: "lockpicking",
          difficulty: 15,
          failure_consequence: "Alarm triggered, time pressure increased"
        },
        {
          name: "Patrol Guards",
          description: "Avoid or neutralize security patrol",
          primary_skill: "stealth",
          difficulty: 11,
          failure_consequence: "Combat encounter, potential injuries"
        }
      ]
    },
    {
      id: 2,
      name: "Art Museum",
      difficulty: "Hard",
      potential_payout: 500000,
      description: "High-security museum with priceless artifacts",
      encounters: [
        {
          name: "Laser Grid",
          description: "Navigate through security lasers",
          primary_skill: "athletics",
          difficulty: 14,
          failure_consequence: "Silent alarm triggered"
        },
        {
          name: "Curator's Office",
          description: "Convince the night curator you belong",
          primary_skill: "social",
          difficulty: 13,
          failure_consequence: "Security called, need alternate route"
        },
        {
          name: "Display Case",
          description: "Extract artifact without triggering sensors",
          primary_skill: "lockpicking",
          difficulty: 16,
          failure_consequence: "Pressure alarm activated"
        }
      ]
    },
    {
      id: 3,
      name: "Corporate Headquarters",
      difficulty: "Easy",
      potential_payout: 150000,
      description: "Steal corporate secrets and petty cash",
      encounters: [
        {
          name: "Keycard Access",
          description: "Bypass electronic door locks",
          primary_skill: "hacking",
          difficulty: 10,
          failure_consequence: "Must find alternate entry point"
        },
        {
          name: "Office Safe",
          description: "Crack the executive's personal safe",
          primary_skill: "lockpicking",
          difficulty: 12,
          failure_consequence: "Only access to less valuable items"
        },
        {
          name: "Security Guard",
          description: "Deal with the lone night watchman",
          primary_skill: "social",
          difficulty: 9,
          failure_consequence: "Guard becomes suspicious"
        }
      ]
    }
  ],
  outcome_descriptions: {
    critical_failure: [
      "Disaster strikes! Your team member is caught red-handed.",
      "Complete catastrophe! Alarms blare and police are en route.",
      "Total failure! Your operative is captured and the heist is blown."
    ],
    failure: [
      "Things go wrong, but you can still salvage the situation.",
      "A setback occurs, making the job more difficult.",
      "Minor failure - you'll need to adapt your approach."
    ],
    neutral: [
      "Partial success with unexpected complications.",
      "You succeed, but not without raising some suspicion.",
      "Mixed results - you're through but something seems off."
    ],
    success: [
      "Clean execution! Your team member completes the task flawlessly.",
      "Smooth operation - everything goes according to plan.",
      "Perfect work! No one will ever know you were here."
    ],
    critical_success: [
      "Exceptional performance! You discover an unexpected bonus.",
      "Brilliant execution! Your operative finds additional opportunities.",
      "Outstanding work! This couldn't have gone better."
    ]
  }
};