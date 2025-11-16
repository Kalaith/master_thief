# Master Thief: Heist Planner

A strategic heist management game built with React and TypeScript. Build your criminal crew, dispatch them on automated missions, and grow your empire.

![Status](https://img.shields.io/badge/Status-Playable-success)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.10-38bdf8)

## Quick Start

```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173/master_thief/
```

## Game Features

- **20 Unique Characters** across 5 rarity tiers (Common to Legendary)
- **Automated Mission System** with real-time progression
- **Character Progression** with experience and leveling
- **Equipment System** with weapons, armor, tools, and gadgets
- **Strategic Team Building** matching crew skills to mission requirements
- **Auto-Save System** using browser localStorage

## How to Play

1. **Recruit** specialists from the Recruitment page (start with $1,500)
2. **Equip** your crew with weapons, armor, and gadgets
3. **Dispatch** teams on missions from the Missions page
4. **Collect** rewards when missions complete
5. **Level Up** your characters and expand your criminal empire

## Documentation

**For complete installation, gameplay, and development instructions, see:**
**[LAUNCH_GUIDE.md](LAUNCH_GUIDE.md)** - Comprehensive launch documentation

### Additional Documentation
- **docs/archive/gdd.md** - Original game design document (future features)
- **docs/archive/IMPLEMENTATION_ROADMAP.md** - Long-term development roadmap
- **docs/archive/phase*.md** - Phase-by-phase implementation plans

## Tech Stack

- **React 19.1.0** - Component framework
- **TypeScript 5.8.3** - Type safety
- **Zustand 5.0.5** - State management
- **Tailwind CSS 4.1.10** - Styling
- **Vite 6.3.5** - Build tool
- **Vitest 3.2.4** - Testing

## Project Structure

```
master_thief/
├── frontend/               # React TypeScript game
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── data/          # Game data (characters, equipment, missions)
│   │   ├── stores/        # Zustand state management
│   │   ├── types/         # TypeScript definitions
│   │   └── utils/         # Helper functions
│   └── package.json
├── docs/                  # Documentation
│   └── archive/           # Historical design documents
├── publish.ps1            # Deployment script
├── LAUNCH_GUIDE.md        # Complete launch documentation
└── README.md              # This file
```

## Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript checking
npm run format           # Format with Prettier

# Testing
npm run test             # Run tests
npm run ci               # Full CI pipeline
```

## Deployment

```powershell
# Deploy to local preview environment
.\publish.ps1

# Deploy to production
.\publish.ps1 -Production

# Clean deploy with verbose output
.\publish.ps1 -Production -Clean -Verbose
```

See [LAUNCH_GUIDE.md](LAUNCH_GUIDE.md) for detailed deployment instructions.

## Game Pages

- **Game** - Overview dashboard with stats and active missions
- **Missions** - Dispatch teams on automated heists
- **Recruitment** - Hire specialist characters
- **Team** - Manage your recruited crew
- **Equipment** - Purchase and equip gear

## Character Classes

- **Infiltrator** - Stealth and lockpicking
- **Tech** - Hacking and electronics
- **Face** - Social engineering
- **Muscle** - Combat and strength
- **Acrobat** - Athletics and agility
- **Mastermind** - Strategic planning
- **Wildcard** - Multi-role specialist

## Current Version

**Version:** 1.0.0
**Release Date:** 2025-11-16
**Status:** Fully playable core game

### Implemented Features
- Complete character system (20 specialists)
- Automated mission system
- Character progression and leveling
- Equipment system with 5 slots
- Auto-save with localStorage
- Responsive UI for desktop and mobile

### Planned Features (Not Yet Implemented)
See `docs/archive/gdd.md` for future feature plans including:
- Gacha/summoning system
- Guild and social features
- Territory control
- PvP competitions
- User-generated content

## License

MIT License - See LICENSE file for details

## Credits

- **Framework:** React by Meta
- **Language:** TypeScript by Microsoft
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Build Tool:** Vite

---

**For detailed information, troubleshooting, and advanced configuration:**
**See [LAUNCH_GUIDE.md](LAUNCH_GUIDE.md)**

*"The perfect heist is 90% preparation, 10% execution, and 100% style."*
