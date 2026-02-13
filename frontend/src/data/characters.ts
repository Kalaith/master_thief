import type { TeamMember } from '../types/game';
import { generateStartingAttributes, calculateDerivedStats, calculateSkills, calculateExperienceToNext } from '../utils/characterCalculations';

// Helper function to create enhanced character
function createCharacter(
  id: number,
  name: string,
  specialty: string,
  background: string,
  rarity: TeamMember['rarity'],
  characterClass: TeamMember['characterClass'],
  baseSkills: TeamMember['skills'],
  specialAbility: string,
  cost: number,
  personalityTraits: string[] = [],
  backstoryEvents: string[] = []
): TeamMember {
  const attributes = generateStartingAttributes(characterClass, rarity);
  const progression = {
    level: 1,
    experience: 0,
    experienceToNext: calculateExperienceToNext(1),
    attributePoints: 0,
    skillPoints: 0,
    masteryLevel: 0,
    heistsCompleted: 0,
    successRate: 0
  };

  const derivedStats = calculateDerivedStats(attributes, 1);
  const enhancedSkills = calculateSkills(attributes, progression, baseSkills);

  return {
    id,
    name,
    specialty,
    background,
    rarity,
    characterClass,
    attributes,
    skills: enhancedSkills,
    progression,
    equipment: {},
    derivedStats,
    special_ability: specialAbility,
    cost,
    loyalty: 75 + Math.floor(Math.random() * 25), // 75-100 starting loyalty
    fatigue: 0,
    injuries: [],
    personalityTraits,
    backstoryEvents
  };
}

export const characters: TeamMember[] = [
  // ⭐ Common Tier (Starting Characters)
  createCharacter(
    1,
    "Brick",
    "The Gentle Giant",
    "Former construction foreman turned reluctant criminal. Bonsai-loving gentle giant who names his tools.",
    "common",
    "muscle",
    { stealth: 3, athletics: 6, combat: 7, lockpicking: 4, hacking: 2, social: 4 },
    "Tends miniature gardens and speaks softly, but his protective instincts kick in when teammates are threatened",
    1600,
    ["Protective", "Gentle", "Methodical", "Nature-loving"],
    ["Left construction after workplace accident", "Started bonsai collection as therapy", "First heist was to help sick coworker"]
  ),

  createCharacter(
    2,
    "Switchblade Sally",
    "The Carnival Queen",
    "Former carnival performer with nimble fingers. Pickpocket and card trick artist from traveling circus.",
    "common",
    "infiltrator",
    { stealth: 5, athletics: 4, combat: 3, lockpicking: 6, hacking: 1, social: 5 },
    "Always practicing sleight of hand and speaks in carnival slang, can distract guards with performances",
    1400,
    ["Playful", "Nimble", "Theatrical", "Nostalgic"],
    ["Ran away to join the circus", "Learned pickpocketing from carnival con artists", "Lost circus family in financial scandal"]
  ),

  createCharacter(
    3,
    "Lucky Pete",
    "The Optimistic Conman",
    "Washed-up conman who still believes luck will turn around. Former casino regular who burned too many bridges.",
    "common",
    "face",
    { stealth: 2, athletics: 3, combat: 2, lockpicking: 3, hacking: 1, social: 7 },
    "Carries lucky charms and remains optimistic despite constant failures, sometimes luck actually works",
    1200,
    ["Optimistic", "Charming", "Superstitious", "Resilient"],
    ["Lost family fortune in bad investments", "Banned from most casinos", "Still believes in lucky streaks"]
  ),

  createCharacter(
    4,
    "Tinker Tom",
    "The Device Whisperer",
    "Arcade hacker who talks to electronic devices. Grew up in arcade halls, learned electronics from old machines.",
    "common",
    "tech",
    { stealth: 3, athletics: 2, combat: 2, lockpicking: 4, hacking: 6, social: 3 },
    "Names all his devices and believes they have personalities, can coax malfunctioning electronics to work",
    1800,
    ["Quirky", "Technical", "Empathetic to machines", "Nostalgic"],
    ["Grew up in arcade halls", "First hack was fixing broken games", "Treats technology as living beings"]
  ),

  // ⭐⭐ Uncommon Tier (Improved Specialists)
  createCharacter(
    5,
    "Razor",
    "The Stunt Double",
    "Former movie stunt performer with duct tape solutions. Hollywood stunt work until blacklisted for exposing unsafe practices.",
    "uncommon",
    "acrobat",
    { stealth: 4, athletics: 8, combat: 6, lockpicking: 3, hacking: 2, social: 5 },
    "Fixes everything with duct tape and quotes action movies, can perform impossible physical maneuvers",
    3500,
    ["Resourceful", "Dramatic", "Safety-conscious", "Movie-obsessed"],
    ["Blacklisted from Hollywood", "Exposed dangerous stunt practices", "Believes duct tape fixes everything"]
  ),

  createCharacter(
    6,
    "Echo",
    "The Voice Mimic",
    "Master of disguise who slips between accents unconsciously. Theater background in voice acting and impersonation.",
    "uncommon",
    "face",
    { stealth: 6, athletics: 4, combat: 3, lockpicking: 4, hacking: 3, social: 8 },
    "Accent changes with mood and has perfect audio memory, can impersonate any voice heard once",
    3200,
    ["Adaptable", "Theatrical", "Observant", "Identity-fluid"],
    ["Trained as voice actor", "Struggles with personal identity", "Perfect pitch and audio memory"]
  ),

  createCharacter(
    7,
    "Nails",
    "The Tool Collector",
    "Construction worker who names all her crowbars. Union organizer turned heist specialist.",
    "uncommon",
    "muscle",
    { stealth: 3, athletics: 7, combat: 6, lockpicking: 7, hacking: 2, social: 5 },
    "Extensive tool collection with each having personal history, knows the right tool for any job",
    3000,
    ["Organized", "Tool-obsessed", "Union-minded", "Practical"],
    ["Led construction union strikes", "Started underground tool-lending network", "Names all her tools"]
  ),

  createCharacter(
    8,
    "Doc Carter",
    "The Tactical Medic",
    "Ex-military medic turned strategic planner. Dishonorably discharged for questioning unethical orders.",
    "uncommon",
    "mastermind",
    { stealth: 4, athletics: 5, combat: 6, lockpicking: 3, hacking: 4, social: 6 },
    "Medical supplies always pristine and tactical thinking in daily life, can patch up injuries mid-heist",
    3800,
    ["Ethical", "Strategic", "Protective", "Principled"],
    ["Dishonorably discharged for ethics", "Saved civilian lives against orders", "Applies military tactics to heists"]
  ),

  // ⭐⭐⭐ Rare Tier (Specialized Experts)  
  createCharacter(
    9,
    "Shade",
    "The Cynical Phantom",
    "Cynical master thief who collects rare teas. Former corporate spy burned by employers.",
    "rare",
    "infiltrator",
    { stealth: 9, athletics: 6, combat: 5, lockpicking: 8, hacking: 6, social: 4 },
    "Tea ceremony rituals and speaks in understated observations, can become completely invisible in shadows",
    5500,
    ["Cynical", "Sophisticated", "Perfectionist", "Tea connoisseur"],
    ["Betrayed by corporate employers", "Mastered ancient stealth techniques", "Finds peace in tea ceremonies"]
  ),

  createCharacter(
    10,
    "Jinx",
    "The Reckless Artist", 
    "Graffiti artist with reckless abandon and artistic vision. Street artist whose tags become calling cards.",
    "rare",
    "acrobat",
    { stealth: 6, athletics: 9, combat: 4, lockpicking: 5, hacking: 3, social: 5 },
    "Leaves artistic tags at heist sites and takes impulsive risks, can escape through impossible routes",
    4800,
    ["Artistic", "Reckless", "Creative", "Attention-seeking"],
    ["Street art is their signature", "Cannot resist leaving artistic marks", "Escapes via urban parkour"]
  ),

  createCharacter(
    11,
    "Ghostwire",
    "The Anonymous Hacker",
    "Paranoid hacker who never shows their real face. Former government contractor gone rogue.",
    "rare",
    "tech",
    { stealth: 7, athletics: 3, combat: 4, lockpicking: 5, hacking: 10, social: 2 },
    "Voice distortion device and conspiracy theories, can hack any system while remaining completely untraceable",
    5800,
    ["Paranoid", "Anonymous", "Conspiracy-minded", "Reclusive"],
    ["Former government black ops hacker", "Discovered government surveillance program", "Lives completely off-grid"]
  ),

  createCharacter(
    12,
    "Madame Mirage",
    "The Mysterious Illusionist",
    "Stage magician who speaks in riddles and misdirection. High-society entertainer with secrets in every city.",
    "rare",
    "face",
    { stealth: 7, athletics: 5, combat: 3, lockpicking: 6, hacking: 4, social: 9 },
    "Performs magic during downtime and speaks cryptically, can make people see what she wants them to see",
    5200,
    ["Mysterious", "Theatrical", "Cryptic", "Well-connected"],
    ["International stage performer", "Has secrets in every major city", "Master of psychological manipulation"]
  ),

  // ⭐⭐⭐⭐ Epic Tier (Elite Specialists)
  createCharacter(
    13,
    "Glitch",
    "The Neon Rebel",
    "Manic energy hacker with neon-bright aesthetic. Corporate system breaker turned digital revolutionary.",
    "epic",
    "tech",
    { stealth: 5, athletics: 6, combat: 4, lockpicking: 7, hacking: 10, social: 7 },
    "Changes hair color with mood and has manic coding sessions, can rewrite reality through digital systems",
    8000,
    ["Manic", "Colorful", "Revolutionary", "Mood-expressive"],
    ["Led digital revolution against corporations", "Hair color changes with emotions", "Sees code as art form"]
  ),

  createCharacter(
    14,
    "Professor Cipher",
    "The Chess Master",
    "Strategic genius who sees heists as chess matches. Former university professor of game theory.",
    "epic",
    "mastermind",
    { stealth: 6, athletics: 4, combat: 5, lockpicking: 6, hacking: 8, social: 9 },
    "Always drinking mocha coffee and sees patterns in everything, can predict enemy moves three steps ahead",
    7500,
    ["Analytical", "Strategic", "Academic", "Pattern-focused"],
    ["Professor of Game Theory", "Applies chess strategy to real life", "Addicted to mocha coffee"]
  ),

  createCharacter(
    15,
    "Atlas Kane",
    "The Ritualistic Fighter",
    "MMA fighter who ritualistically wraps hands before any job. Underground fighting champion seeking bigger challenges.",
    "epic",
    "muscle",
    { stealth: 4, athletics: 9, combat: 10, lockpicking: 3, hacking: 2, social: 6 },
    "Pre-fight rituals and meditation practices with honor code, can defeat any opponent in single combat",
    8200,
    ["Honorable", "Ritualistic", "Disciplined", "Challenge-seeking"],
    ["Underground fighting champion", "Follows strict personal honor code", "Meditation and martial arts master"]
  ),

  createCharacter(
    16,
    "Sable",
    "The Romantic Thief",
    "Cat burglar who writes love letters about the thrill of heists. Art theft specialist with refined tastes.",
    "epic",
    "infiltrator",
    { stealth: 9, athletics: 8, combat: 5, lockpicking: 9, hacking: 4, social: 6 },
    "Writes poetry about heists and steals only beautiful objects, can steal anything that catches her fancy",
    7800,
    ["Romantic", "Artistic", "Refined", "Beauty-obsessed"],
    ["Specializes in art theft", "Writes love letters to stolen objects", "Only steals things of beauty"]
  ),

  // ⭐⭐⭐⭐⭐ Legendary Tier (Game-Changing Characters)
  createCharacter(
    17,
    "Velvet Vox",
    "The Glamorous Songbird",
    "Jazz singer whose performances are elaborate cons. International entertainer with connections worldwide.",
    "legendary",
    "face",
    { stealth: 7, athletics: 6, combat: 6, lockpicking: 5, hacking: 7, social: 10 },
    "Sings during heists with wardrobe changes as disguises, can charm anyone into doing anything",
    15000,
    ["Glamorous", "Musical", "Charming", "Internationally connected"],
    ["World-famous jazz performer", "Every show is an elaborate con", "Has contacts in every major city"]
  ),

  createCharacter(
    18,
    "The Architect",
    "The Bank Designer", 
    "Mysterious figure who designed many target buildings. Former security consultant who knows every weakness.",
    "legendary",
    "mastermind",
    { stealth: 8, athletics: 5, combat: 7, lockpicking: 9, hacking: 9, social: 8 },
    "Always wears distinctive mask and leaves architectural sketches, knows the secret weakness of every building",
    18000,
    ["Mysterious", "Architectural genius", "Methodical", "Anonymous"],
    ["Designed many heist target buildings", "Left security consulting after ethical concerns", "Identity completely unknown"]
  ),

  createCharacter(
    19,
    "Nyx",
    "The Night's Omen",
    "Believes in omens and only works during specific moon phases. Former gymnast who became mythical urban legend.",
    "legendary",
    "acrobat",
    { stealth: 10, athletics: 10, combat: 7, lockpicking: 8, hacking: 5, social: 6 },
    "Consults star charts and moves like shadow with omen interpretations, can predict the future through signs",
    20000,
    ["Mystical", "Athletic perfection", "Omen-reader", "Legendary"],
    ["Olympic-level gymnast", "Studies astrology and omens", "Works only during specific moon phases"]
  ),

  createCharacter(
    20,
    "Kingpin Zero",
    "The Mysterious Benefactor",
    "Masked figure who connects the entire criminal network. Unknown identity, appears only during major events.",
    "legendary",
    "wildcard",
    { stealth: 9, athletics: 7, combat: 8, lockpicking: 8, hacking: 9, social: 10 },
    "Communicates through intermediaries and provides crucial intel, has connections to every criminal organization",
    25000,
    ["Mysterious", "Connected", "Powerful", "Manipulative"],
    ["True identity unknown", "Controls vast criminal network", "Appears only when stakes are highest"]
  )
];

// Character relationship data for future expansion
export const characterRelationships = {
  mentorships: [
    { mentor: "Brick", apprentice: "Jinx", description: "Gentle giant guides reckless artist" },
    { mentor: "Glitch", apprentice: "Tinker Tom", description: "Neon rebel teaches device whisperer" },
    { mentor: "Razor", apprentice: "Jinx", description: "Stunt double teaches advanced moves" },
    { mentor: "Madame Mirage", apprentice: "Echo", description: "Illusionist mentors voice mimic" },
    { mentor: "Nyx", apprentice: "Jinx", description: "Night's omen teaches patience" }
  ],
  
  romanticTensions: [
    { character1: "Shade", character2: "Sable", description: "Cynical phantom meets romantic thief" }
  ],
  
  professionalRivalries: [
    { character1: "Switchblade Sally", character2: "Shade", description: "Carnival queen vs cynical phantom" },
    { character1: "Glitch", character2: "Ghostwire", description: "Neon rebel vs anonymous ghost" },
    { character1: "Velvet Vox", character2: "Madame Mirage", description: "Glamorous songbird vs mysterious illusionist" },
    { character1: "Professor Cipher", character2: "Doc Carter", description: "Academic strategist vs military tactician" }
  ],
  
  bonds: [
    { character1: "Brick", character2: "Nails", description: "Construction workers bond over tools and trade" },
    { character1: "Velvet Vox", character2: "Lucky Pete", description: "Protective entertainer looks after optimistic conman" },
    { character1: "Atlas Kane", character2: "Razor", description: "Professional fighters respect each other's skills" }
  ],
  
  networkConnections: [
    { hub: "Kingpin Zero", description: "Connected to entire roster through shadowy criminal network" },
    { hub: "The Architect", description: "Connected to all heist locations through building design knowledge" }
  ]
};

// Character class distribution for balancing
export const characterClasses = {
  infiltrator: ["Switchblade Sally", "Echo", "Shade", "Sable"],
  tech: ["Tinker Tom", "Ghostwire", "Glitch"],
  face: ["Lucky Pete", "Echo", "Madame Mirage", "Velvet Vox"],
  muscle: ["Brick", "Nails", "Atlas Kane"],
  acrobat: ["Razor", "Jinx", "Nyx"],
  mastermind: ["Doc Carter", "Professor Cipher", "The Architect"],
  wildcard: ["Kingpin Zero"]
};
