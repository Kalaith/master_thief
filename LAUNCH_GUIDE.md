# Master Thief: Heist Planner - Launch Guide

## Table of Contents
- [Game Overview](#game-overview)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [How to Play](#how-to-play)
- [Game Features](#game-features)
- [Technical Stack](#technical-stack)
- [Development](#development)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

---

## Game Overview

**Master Thief: Heist Planner** is a strategic heist management game where you build a criminal crew, send them on automated missions, and watch your empire grow. Built with React and TypeScript, the game features:

- **20 Unique Characters** across 5 rarity tiers (Common to Legendary)
- **Automated Mission System** with real-time progression
- **Character Progression** with experience, leveling, and skill development
- **Equipment System** with weapons, armor, tools, and gadgets
- **Strategic Team Building** to match crew capabilities with mission requirements

**Genre:** Idle/Management Strategy
**Platform:** Web (Browser-based)
**Session Type:**
- Quick: 2-5 minutes (dispatch teams, collect rewards)
- Extended: 10-20 minutes (team building, equipment management)
- Idle: 30 minutes - 8+ hours (automated mission completion)

---

## Quick Start

### For Players
1. Open `http://localhost:5173/master_thief/` in your browser
2. Start with $1,500 budget
3. Recruit characters from the **Recruitment** page
4. Select a mission from the **Missions** page
5. Assign your team and dispatch them
6. Return later to collect rewards and level up your crew

### For Developers
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173/master_thief/
```

---

## Installation

### Prerequisites
- **Node.js** v18.0 or higher
- **npm** v8.0 or higher
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Step-by-Step Installation

1. **Clone or download the repository**
   ```bash
   cd H:\WebHatchery\game_apps\master_thief
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the game**
   - Open browser to: `http://localhost:5173/master_thief/`
   - The game auto-saves to browser localStorage
   - No backend server required for current version

### First-Time Setup
- No additional configuration needed
- Game state is saved automatically in browser localStorage
- Use "New Game" from Game page to reset progress

---

## How to Play

### 1. **Game Page (Overview)**
Your command center showing:
- Current budget and statistics
- Active missions with countdown timers
- Quick access to all game sections

### 2. **Recruitment Page**
Build your criminal crew:
- **Budget:** Start with $1,500
- **Character Tiers:** Common ($1,500-$2,200) to Legendary ($15,000-$25,000)
- **Specialists:** Each character has unique skills and class
- **Strategy:** Balance cost vs. capability for mission requirements

**Character Classes:**
- **Infiltrator** - Stealth and lockpicking specialists
- **Tech** - Hacking and electronics experts
- **Face** - Social engineering and persuasion
- **Muscle** - Combat and physical challenges
- **Acrobat** - Athletics and agility experts
- **Mastermind** - Strategic planning and coordination
- **Wildcard** - Unique multi-role capabilities

### 3. **Team Page**
Manage your recruited characters:
- View full character stats and progression
- Check experience and level progress
- See equipped items
- Review character skills and attributes

**Character Stats:**
- **Attributes:** Strength, Dexterity, Intelligence, Wisdom, Charisma, Constitution
- **Skills:** Stealth, Athletics, Combat, Lockpicking, Hacking, Social
- **Progression:** Level, Experience, Success Rate, Heists Completed

### 4. **Equipment Page**
Gear up your crew:
- **Equipment Types:** Weapons, Armor, Accessories, Tools, Gadgets
- **Rarity Tiers:** Basic to Legendary
- **Effects:** Attribute bonuses and skill enhancements
- **Management:** Equip/unequip items for characters
- **Acquisition:** Purchase from shop or find as mission loot

**Equipment Slots:**
- **Weapon** - Silenced Pistols, Tasers, Crowbars
- **Armor** - Tactical Vests, Business Suits, Hoodies
- **Accessory** - Utility Belts, Disguises
- **Tool** - Lockpicks, Climbing Gear
- **Gadget** - Hacking Devices, Surveillance Equipment

### 5. **Missions Page**
Deploy your crew:
- **Mission Tiers:** Varies by risk level (1-10)
- **Duration:** 5 minutes to 12+ hours (accelerated in testing: 10 seconds per minute)
- **Requirements:** Team composition and skill checks
- **Rewards:** Cash, Experience, Equipment drops, Reputation

**Mission Mechanics:**
- Assign characters from your recruited team
- Success chance calculated from team power vs. mission difficulty
- Missions run in real-time (continues even when browser is closed via localStorage)
- Return to collect rewards when timer completes
- Failed missions still grant partial rewards

**Mission Results:**
- **Success:** Full payout + experience + reputation + potential equipment drop (30% chance)
- **Failure:** 20% payout + reduced experience
- **Level Ups:** Automatic when characters gain enough experience
- **Team Feedback:** Success chance percentage and power comparison

---

## Game Features

### Current Features (Fully Implemented)

#### Character System
- **20 Unique Specialists** with distinct personalities and backgrounds
- **5 Rarity Tiers** (Common, Uncommon, Rare, Epic, Legendary)
- **7 Character Classes** with specialized roles
- **D&D-Style Attributes** (Strength, Dexterity, Intelligence, Wisdom, Charisma, Constitution)
- **6 Core Skills** derived from attributes
- **Character Progression** with experience and leveling
- **Equipment Slots** for customization

#### Mission System
- **Automated Heist Execution** with real-time countdowns
- **Tiered Difficulty** from low-risk to legendary scores
- **Variable Duration** (5 min to 12+ hours)
- **Success Calculation** based on team composition and power
- **Reward System** (cash, XP, equipment, reputation)
- **Partial Failure Rewards** for unsuccessful missions

#### Equipment System
- **5 Equipment Slots** per character
- **5 Rarity Tiers** for equipment
- **Attribute Bonuses** enhancing character capabilities
- **Skill Bonuses** for specialized tasks
- **Equipment Shop** for purchasing gear
- **Loot Drops** from successful missions (30% drop rate)

#### Progression System
- **Experience & Leveling** for all characters
- **Attribute Points** gained on level up
- **Skill Points** for character development
- **Mastery Tracking** for specialization levels
- **Success Rate Calculation** based on performance history
- **Budget Management** with earnings and expenses

#### User Interface
- **5 Main Pages** (Game, Missions, Recruitment, Team, Equipment)
- **Responsive Design** for desktop and mobile
- **Dark Theme** with Mafia Noir aesthetic
- **Real-time Updates** with mission timers
- **Auto-Save System** using browser localStorage
- **Mission Results Modal** with detailed feedback

### Planned Features (Not Yet Implemented)
These features are documented in design docs but not yet built:
- Gacha/Summoning system
- Guild/Social features
- Territory control
- PvP competitions
- User-generated content
- Relationship system with synergy bonuses
- Advanced crafting system
- Daily challenges and achievements

---

## Technical Stack

### Frontend
```json
{
  "framework": "React 19.1.0",
  "language": "TypeScript 5.8.3",
  "build-tool": "Vite 6.3.5",
  "styling": "Tailwind CSS 4.1.10",
  "state-management": "Zustand 5.0.5",
  "animations": "Framer Motion 12.18.1",
  "routing": "React Router DOM 7.6.2",
  "charts": "Chart.js 4.4.9",
  "notifications": "React Hot Toast 2.6.0"
}
```

### Development Tools
```json
{
  "linting": "ESLint 9.25.0",
  "formatting": "Prettier 3.6.2",
  "testing": "Vitest 3.2.4 + React Testing Library 16.3.0",
  "type-checking": "TypeScript Compiler"
}
```

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Development

### Available Scripts

#### Development
```bash
npm run dev              # Start development server (port 5173)
npm run build            # Build for production
npm run preview          # Preview production build
```

#### Code Quality
```bash
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues automatically
npm run format           # Format code with Prettier
npm run format:check     # Check formatting without changes
npm run type-check       # TypeScript type checking
```

#### Testing
```bash
npm run test             # Run tests in watch mode
npm run test:run         # Run tests once
npm run test:coverage    # Generate coverage report
npm run test:ui          # Open Vitest UI
```

#### CI Pipeline
```bash
npm run ci               # Full CI: lint + type-check + format-check + test + build
npm run ci:quick         # Quick CI: lint + type-check + format-check
```

### Development Workflow

1. **Start Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   - Hot reload enabled
   - Access at http://localhost:5173/master_thief/
   - Changes appear immediately

2. **Make Changes**
   - Edit files in `src/`
   - Browser auto-refreshes
   - Type errors shown in terminal and browser

3. **Test Changes**
   ```bash
   npm run ci:quick   # Quick validation
   ```

4. **Commit Changes**
   - Ensure `npm run ci:quick` passes
   - Use conventional commit messages

### Code Style Standards

**TypeScript:**
- Strict type checking enabled
- No `any` types without explicit need
- Use interfaces for object shapes
- Use types for unions and primitives

**React:**
- Functional components with hooks
- Props typed with interfaces
- Use React.FC for component types
- Zustand for state management

**File Organization:**
```
src/
├── components/       # React components
│   ├── game/        # Game-specific components
│   │   ├── pages/   # Page-level components
│   │   └── ui/      # Reusable UI components
├── data/            # Static game data
├── hooks/           # Custom React hooks
├── services/        # Business logic services
├── stores/          # Zustand state stores
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

---

## Deployment

### PowerShell Deployment Script

The project includes a comprehensive `publish.ps1` script for automated deployment.

#### Prerequisites
1. Create `.env` file in project root:
```env
# Required for file system deployment
PREVIEW_ROOT=H:\xampp\htdocs
PRODUCTION_ROOT=F:\WebHatchery

# Optional: Deploy to subfolder (default) or root
DEPLOY_TO_ROOT=false
```

#### Deployment Commands

**Preview (Local Testing):**
```powershell
.\publish.ps1              # Deploy to H:\xampp\htdocs\master_thief\
.\publish.ps1 -Frontend    # Frontend only
.\publish.ps1 -Clean       # Clean deploy (remove old files)
.\publish.ps1 -Verbose     # Show detailed output
```

**Production:**
```powershell
.\publish.ps1 -Production              # Deploy to F:\WebHatchery\master_thief\
.\publish.ps1 -Production -Clean       # Clean production deploy
```

**Testing Deployment:**
```powershell
# After deployment, test at:
# Preview: http://localhost/master_thief/
# Production: Check configured web server path
```

### Manual Deployment

If you prefer manual deployment:

1. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Copy Build Output**
   ```bash
   # Built files are in frontend/dist/
   # Copy all contents to your web server directory
   ```

3. **Configure Base Path**
   - Update `vite.config.ts` if deploying to subdirectory
   - Set `base: '/your-path/'` in vite config

### Deployment Checklist

- [ ] All tests passing (`npm run ci`)
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] Game saves/loads correctly
- [ ] Missions complete successfully
- [ ] Equipment system working
- [ ] All pages accessible
- [ ] Mobile responsive layout works

---

## Project Structure

```
master_thief/
├── frontend/                          # React TypeScript frontend
│   ├── public/                        # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   └── game/
│   │   │       ├── pages/             # Main game pages
│   │   │       │   ├── GamePage.tsx           # Overview/dashboard
│   │   │       │   ├── MissionsPage.tsx       # Mission dispatch
│   │   │       │   ├── RecruitmentPage.tsx    # Character recruitment
│   │   │       │   ├── TeamPage.tsx           # Team management
│   │   │       │   └── EquipmentPage.tsx      # Equipment shop
│   │   │       ├── ui/                # Reusable components
│   │   │       │   ├── EnhancedCharacterCard.tsx
│   │   │       │   ├── TeamMemberCard.tsx
│   │   │       │   ├── HeistCard.tsx
│   │   │       │   ├── EquipmentShop.tsx
│   │   │       │   ├── DiceModal.tsx
│   │   │       │   └── MissionResultsModal.tsx
│   │   │       ├── HeistGame.tsx      # Main game container
│   │   │       ├── GameHeader.tsx     # Navigation header
│   │   │       └── TeamAssignment.tsx # Team builder
│   │   ├── data/                      # Game data files
│   │   │   ├── characters.ts          # 20 specialist definitions
│   │   │   ├── equipment.ts           # Equipment catalog
│   │   │   ├── automatedHeists.ts     # Mission definitions
│   │   │   └── gameData.ts            # Central data export
│   │   ├── hooks/                     # Custom hooks
│   │   │   └── useTeamAssignment.ts
│   │   ├── services/                  # Business logic
│   │   │   └── missionService.ts
│   │   ├── stores/                    # State management
│   │   │   ├── gameStore.ts           # Main game state (Zustand)
│   │   │   └── composedStore.ts       # Store composition
│   │   ├── types/                     # TypeScript definitions
│   │   │   └── game.ts                # Core game types
│   │   ├── utils/                     # Utility functions
│   │   │   ├── characterCalculations.ts
│   │   │   └── heistExecution.ts
│   │   ├── App.tsx                    # App root component
│   │   ├── main.tsx                   # Entry point
│   │   └── vite-env.d.ts              # Vite type declarations
│   ├── package.json                   # Dependencies
│   ├── vite.config.ts                 # Vite configuration
│   ├── tailwind.config.js             # Tailwind CSS config
│   ├── tsconfig.json                  # TypeScript config
│   └── eslint.config.js               # ESLint config
├── publish.ps1                        # Deployment script
├── .env                               # Environment config (create this)
├── LAUNCH_GUIDE.md                    # This file
└── README.md                          # Project overview

Archived Documentation (Historical):
├── gdd.md                             # Game design document
├── IMPLEMENTATION_ROADMAP.md          # Development roadmap
├── phase1.md, phase2.md, etc.         # Phase planning docs
├── CHARACTER_IMPLEMENTATION_SUMMARY.md # Character implementation notes
└── STYLE_UPDATE_SUMMARY.md            # Style guide notes
```

---

## Configuration

### Environment Variables

The game uses Vite's environment variable system.

#### Frontend Environment Files

Create these files in `frontend/` directory:

**.env.preview** (Local testing)
```env
# Preview environment - local development
VITE_BASE_PATH=/master_thief/
VITE_API_BASE_URL=http://localhost:3000
```

**.env.production** (Production deployment)
```env
# Production environment
VITE_BASE_PATH=/master_thief/
VITE_API_BASE_URL=https://your-domain.com
```

### Vite Configuration

**frontend/vite.config.ts:**
```typescript
export default defineConfig({
  base: '/master_thief/',  // Match deployment path
  build: {
    outDir: 'dist',
    sourcemap: false,      // Disable for production
  },
  // ... other config
});
```

### Tailwind Configuration

**frontend/tailwind.config.js:**
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mafia Noir theme
        'noir-900': '#0a0a0a',
        'noir-800': '#141414',
        'noir-700': '#1a1a1a',
        'noir-600': '#2a2a2a',
        'noir-200': '#cccccc',
        'noir-100': '#f5f5f5',
        'gold': '#d4af37',
        'red-blood': '#b11226',
      },
    },
  },
};
```

### Game Balance Configuration

Key balance values in **src/stores/gameStore.ts:**

```typescript
const initialState = {
  budget: 1500,                    // Starting cash
  // ... other state
};

// Mission timer (App.tsx)
const TIMER_INTERVAL = 10000;     // 10 seconds (testing)
// Change to 60000 for production (1 minute per game minute)

// Success calculation (gameStore.ts completeAutomatedHeist)
const expectedPower = heist.riskLevel * 10;
const successChance = Math.min(95, Math.max(5, (teamPower / expectedPower) * 100));

// Equipment drop rate
if (Math.random() < 0.3) {        // 30% drop chance on success
  // Drop equipment
}

// Experience calculation
experiencePerMember = Math.floor(payout * heist.rewards.experienceMultiplier / team.length);

// Level up formula (characterCalculations.ts or gameStore.ts)
experienceToNext = Math.floor(level * level * 100);
```

---

## Troubleshooting

### Common Issues

#### Game Not Loading
**Problem:** White screen or error on load
**Solutions:**
1. Check browser console for errors (F12)
2. Clear browser localStorage: `localStorage.clear()`
3. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
4. Verify dev server is running on port 5173

#### Save Game Not Working
**Problem:** Progress not saving between sessions
**Solutions:**
1. Check browser allows localStorage
2. Check console for storage quota errors
3. Clear old save data: `localStorage.removeItem('masterThief_gameState')`
4. Try different browser

#### Build Errors
**Problem:** `npm run build` fails
**Solutions:**
1. Check TypeScript errors: `npm run type-check`
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Clear build cache: `rm -rf frontend/dist`
4. Update dependencies: `npm update`

#### Missions Not Completing
**Problem:** Mission timer stuck or not completing
**Solutions:**
1. Check mission timer interval in `App.tsx` (line 24)
2. Verify activeAutomatedHeists in localStorage
3. Check browser console for timer errors
4. Refresh page to restart mission timer

#### Equipment Not Showing
**Problem:** Equipment shop empty or items not displaying
**Solutions:**
1. Check `src/data/equipment.ts` is properly imported
2. Verify equipment data structure matches TypeScript types
3. Check browser console for data loading errors
4. Refresh to reload equipment catalog

### Development Issues

#### Hot Reload Not Working
```bash
# Restart dev server
Ctrl+C
npm run dev
```

#### TypeScript Errors
```bash
# Check all type errors
npm run type-check

# Common fixes
# - Add missing type imports
# - Fix any types with proper interfaces
# - Check for null/undefined handling
```

#### Port 5173 Already in Use
```bash
# Kill process on port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID [process-id] /F

# Linux/Mac:
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Performance Issues

#### Slow Mission Completion
- Missions use 10-second timer (testing mode)
- Change `TIMER_INTERVAL` in `App.tsx` line 24 to 60000 for production
- Timer runs every interval to check mission completion

#### Memory Leaks
- Mission timer cleanup on unmount (App.tsx lines 44-47)
- Clear intervals when switching pages
- Use React DevTools Profiler to identify issues

### Browser Compatibility

#### Safari Issues
- localStorage may require user permission
- Check "Prevent Cross-Site Tracking" setting
- Test in private browsing mode

#### Mobile Issues
- Some UI elements may need responsive adjustments
- Check viewport meta tag in index.html
- Test touch interactions for modals and buttons

---

## Getting Help

### Resources
- **Source Code:** Check inline comments in source files
- **Type Definitions:** Review `src/types/game.ts` for data structures
- **Game Data:** Examine `src/data/` files for game content
- **State Management:** Study `src/stores/gameStore.ts` for game logic

### Debug Mode
Enable verbose logging by adding to localStorage:
```javascript
localStorage.setItem('debug', 'true');
```

### Reporting Issues
When reporting bugs, include:
1. Browser and version
2. Console errors (F12 → Console)
3. Steps to reproduce
4. Game state (if relevant)
5. Screenshots or screen recording

---

## Additional Information

### Game Balance Philosophy
- Characters scale in power with rarity
- Missions require strategic team composition
- Equipment provides meaningful upgrades
- Leveling rewards player investment
- Economy balanced for progression pacing

### Design Principles
- **Idle-Friendly:** Missions complete while offline
- **Strategic Depth:** Team building and equipment choices matter
- **Clear Feedback:** Players understand success/failure reasons
- **Progression:** Always working toward next goal
- **Accessibility:** Playable on desktop and mobile

### Future Development
This launch guide focuses on **currently implemented features**. The project has extensive design documentation for future features (gacha, guilds, PvP, etc.) in separate markdown files. Those are long-term goals and not included in this launch guide to avoid confusion about what's actually playable now.

---

## Quick Reference

### Essential Commands
```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run ci:quick         # Quick validation

# Deployment
.\publish.ps1            # Deploy to preview
.\publish.ps1 -Production # Deploy to production
```

### Essential Files
- `src/stores/gameStore.ts` - Game state and logic
- `src/data/characters.ts` - Character definitions
- `src/data/automatedHeists.ts` - Mission definitions
- `src/types/game.ts` - TypeScript types
- `src/App.tsx` - Mission timer configuration

### Essential URLs
- **Dev Server:** http://localhost:5173/master_thief/
- **Preview Deploy:** http://localhost/master_thief/ (after publish.ps1)

---

**Last Updated:** 2025-11-16
**Game Version:** 1.0.0 (Current State Build)
**Documentation Version:** 1.0.0

This launch guide reflects the **actual implemented game** as of the last update. For future feature planning, refer to the archived design documents in the project root.
