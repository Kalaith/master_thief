import type { TutorialStepData } from '../types/game';

export const tutorialSteps: Record<string, TutorialStepData> = {
  welcome: {
    id: 'welcome',
    title: 'Welcome to Master Thief!',
    description:
      'Build your criminal empire by recruiting specialists, executing heists, and upgrading your crew. This quick tutorial will show you the basics.',
    position: 'center',
    action: 'Click "Next" to begin',
  },

  'recruitment-intro': {
    id: 'recruitment-intro',
    title: 'Recruitment Phase',
    description:
      'First, you need to build your crew. You start with $3,500 - enough to hire 2 common thieves. Each character has unique skills and specialties.',
    position: 'center',
    action: 'Click "Next" to see available recruits',
  },

  'recruit-first-character': {
    id: 'recruit-first-character',
    title: 'Hire Your First Crew Member',
    description:
      "Look for affordable characters with different skills. Lucky Pete ($1,200) and Switchblade Sally ($1,400) are great starter choices. Check their skills - you'll need variety for different missions.",
    position: 'top',
    action: 'Click the "Recruit" button on a character to hire them',
    autoAdvance: true,
  },

  'recruit-second-character': {
    id: 'recruit-second-character',
    title: 'Build Your Team',
    description:
      'Great choice! Now hire one more crew member to have a basic team. Different character classes excel at different tasks: Infiltrators for stealth, Tech for hacking, Face for social engineering.',
    position: 'top',
    action: 'Recruit another character',
    autoAdvance: true,
  },

  'missions-intro': {
    id: 'missions-intro',
    title: 'Time for Your First Heist!',
    description:
      'Navigate to the "Targets" tab to see available missions. Quick jobs (5-10 minutes) are perfect for getting started and earning fast cash.',
    position: 'top',
    targetElement: '[data-tutorial="missions-tab"]',
    action: 'Click on the "Targets" tab',
    autoAdvance: true,
  },

  'select-mission': {
    id: 'select-mission',
    title: 'Choose a Mission',
    description:
      'Start with quick jobs like "Pickpocket Practice" (5 mins, $100) or "Car Break-In" (8 mins, $150). Check the risk level and required skills. Lower risk = safer for beginners.',
    position: 'top',
    action: 'Click "Deploy" on a quick job mission',
    autoAdvance: true,
  },

  'assign-team': {
    id: 'assign-team',
    title: 'Assign Your Team',
    description:
      "Select which crew members to send on this mission. Each mission has team size requirements and skill checks. Match your crew's skills to the mission requirements for better success chances.",
    position: 'center',
    action: 'Click on your recruited characters to assign them, then click "Start Mission"',
    autoAdvance: true,
  },

  'start-mission': {
    id: 'start-mission',
    title: 'Launch the Heist!',
    description:
      'Review your team assignment and verify they meet the mission requirements. When ready, click "Start Mission" to deploy your crew on the job.',
    position: 'center',
    action: 'Click "Start Mission" to begin',
    autoAdvance: true,
  },

  'wait-for-mission': {
    id: 'wait-for-mission',
    title: 'Mission in Progress!',
    description:
      'Your crew is now on the job! Quick missions complete in just a few minutes. You can navigate to other tabs while waiting. The "Operations" tab shows active missions and time remaining.',
    position: 'center',
    action: 'Wait for your mission to complete (or skip to continue tutorial)',
  },

  'collect-rewards': {
    id: 'collect-rewards',
    title: 'Mission Complete!',
    description:
      "Congratulations! You've completed your first heist. Your crew earned money and experience. Characters level up, unlock better missions, and increase success rates.",
    position: 'center',
    action: 'Click "Continue" to learn about equipment',
  },

  'equipment-intro': {
    id: 'equipment-intro',
    title: 'Upgrade Your Crew',
    description:
      'Use your earnings to buy equipment! Weapons, armor, tools, and gadgets boost your crew\'s skills and improve mission success rates. Navigate to the "Gear" tab.',
    position: 'top',
    targetElement: '[data-tutorial="equipment-tab"]',
    action: 'Click on the "Gear" tab',
    autoAdvance: true,
  },

  'equipment-shop-tab': {
    id: 'equipment-shop-tab',
    title: 'Access the Black Market',
    description:
      'The Equipment Armory has two sections: Inventory (your owned gear) and Black Market (where you purchase new equipment). Click on the "Black Market" tab to see what\'s available for purchase.',
    position: 'top',
    action: 'Click on the "Black Market" tab',
    autoAdvance: true,
  },

  'buy-equipment': {
    id: 'buy-equipment',
    title: 'Purchase Equipment',
    description:
      'Browse available gear and check the skill bonuses. Better equipment = higher success rates on tough missions. Equipment is stored in your inventory until you equip it to a character.',
    position: 'top',
    action: 'Purchase any piece of equipment',
    autoAdvance: true,
  },

  'equip-character': {
    id: 'equip-character',
    title: 'Equip Your Character',
    description:
      'Now assign the equipment to one of your crew members. Each character has 5 equipment slots: weapon, armor, accessory, tool, and gadget. Equipped gear applies its bonuses during missions.',
    position: 'center',
    action: 'Drag equipment to a character or use the equip button',
    autoAdvance: true,
  },

  'tutorial-complete': {
    id: 'tutorial-complete',
    title: "You're Ready!",
    description:
      "You've mastered the basics! Continue building your empire by:\n\n• Completing missions to earn money and XP\n• Leveling up characters and unlocking abilities\n• Buying better equipment\n• Unlocking harder missions with bigger payouts\n\nGood luck, mastermind!",
    position: 'center',
    action: 'Click "Finish" to start playing',
  },
};
