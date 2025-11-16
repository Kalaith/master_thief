# 🎭 Master Thief: Heist Planner

A strategic heist simulation game built with React and TypeScript. Plan elaborate heists, recruit specialist crew members, and execute high-stakes operations using a dice-based skill system.

![Game Screenshot](https://img.shields.io/badge/Status-Complete-success)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.10-38bdf8)

## 🎯 Game Overview

Master Thief puts you in the role of a master criminal orchestrating elaborate heists. Recruit specialists with unique skills, select targets that match your crew's capabilities, and navigate challenging encounters using strategic decision-making and dice-based skill resolution.

### ✨ Key Features

- **Strategic Crew Building** - Recruit from 6 unique specialists, each with distinct skills and abilities
- **Multi-Phase Heists** - Plan, execute, and resolve heists across 5 distinct game phases
- **Dynamic Dice System** - D20 + skill modifier resolution with 5 outcome levels
- **Budget Management** - Balance crew costs against potential payouts
- **Responsive Design** - Optimized for desktop and mobile play
- **Dark Theme** - Immersive criminal underworld aesthetic

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/master-thief.git
   cd master-thief
   ```

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🎮 How to Play

### 1. Recruitment Phase
- **Budget:** Start with $15,000
- **Team Limit:** Maximum 4 specialists per heist
- **Specialists Available:**
  - **Shadow** ($5,000) - Infiltration expert with high stealth
  - **Cipher** ($6,000) - Tech specialist, master hacker
  - **Viper** ($4,500) - Social engineer, manipulation expert
  - **Wrench** ($5,500) - Demolitions expert, physical security
  - **Silk** ($5,200) - Cat burglar, athletics specialist
  - **Ghost** ($4,000) - Information broker, balanced skills

### 2. Target Selection
Choose from three heist types:
- **Corporate HQ** (Easy) - $150K potential, electronic security focus
- **First National Bank** (Medium) - $250K potential, mixed challenges
- **Art Museum** (Hard) - $500K potential, physical security heavy

### 3. Planning Phase
- Review target intel and encounter details
- Analyze your crew's strengths against required skills
- Confirm your approach strategy

### 4. Execution Phase
- Navigate 3 encounters per heist
- Choose which specialist handles each challenge
- Roll dice (D20 + skill modifier) against difficulty targets
- **Outcomes:**
  - **Critical Failure** (Roll=1) - Major complications
  - **Failure** (Below target) - Setbacks and complications
  - **Partial Success** (At target) - Success with minor issues
  - **Success** (Target+5) - Clean execution
  - **Critical Success** (Roll=20) - Exceptional results with bonuses

### 5. Results Phase
- Calculate success based on encounter outcomes
- Receive payouts for successful heists
- Track progress and plan next operation

## 🏗️ Technical Architecture

### Frontend Stack
```
React 19.1.0          # Component framework
TypeScript 5.8.3      # Type safety
Zustand 5.0.5         # State management
Tailwind CSS 4.1.10   # Utility-first styling
Vite 6.3.5            # Build tool
Vitest 3.2.4          # Testing framework
```

### Project Structure
```
master-thief/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── game/
│   │   │   │   ├── HeistGame.tsx       # Main game component
│   │   │   │   ├── phases/             # Game phase components
│   │   │   │   │   ├── RecruitmentPhase.tsx
│   │   │   │   │   ├── HeistSelectionPhase.tsx
│   │   │   │   │   ├── PlanningPhase.tsx
│   │   │   │   │   ├── ExecutionPhase.tsx
│   │   │   │   │   └── ResultsPhase.tsx
│   │   │   │   └── ui/                 # Reusable components
│   │   │   │       ├── TeamMemberCard.tsx
│   │   │   │       ├── HeistCard.tsx
│   │   │   │       └── DiceModal.tsx
│   │   ├── stores/
│   │   │   └── gameStore.ts           # Zustand store
│   │   ├── types/
│   │   │   └── game.ts                # TypeScript interfaces
│   │   ├── data/
│   │   │   └── gameData.ts            # Game content data
│   │   └── styles/
│   │       └── game-components.css     # Game-specific styles
│   ├── package.json
│   └── tailwind.config.js
├── app.js                             # Original vanilla JS version
├── index.html                         # Original HTML version
├── style.css                          # Original CSS
├── gdd.md                            # Game Design Document
└── README.md
```

### State Management
The game uses **Zustand** for centralized state management:

```typescript
interface GameStore {
  // Game state
  budget: number;
  selectedTeam: TeamMember[];
  selectedHeist: HeistTarget | null;
  currentPhase: GamePhase;
  
  // Actions
  addTeamMember: (member: TeamMember) => void;
  removeTeamMember: (memberId: number) => void;
  selectHeist: (heist: HeistTarget) => void;
  setCurrentPhase: (phase: GamePhase) => void;
  // ... more actions
}
```

## 🎨 Design System

The game uses the **noir Directorate** design system with a dark theme:

### Color Palette
```css
--noir-dark: #0a0a0a          /* Primary background */
--noir-panel: #141414         /* UI panels */
--noir-surface: #1a1a1a       /* Interactive surfaces */
--noir-primary: #b11226       /* Primary actions (infernal red) */
--noir-gold: #d4af37          /* Success/rewards */
--noir-text: #cccccc          /* Standard text */
--noir-text-bright: #f5f5f5   /* Headers/emphasis */
```

### Typography
- **Headers:** Cinzel Decorative (serif) for dramatic effect
- **Body Text:** Inter (sans-serif) for readability
- **Data/Code:** JetBrains Mono (monospace)

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build

# Code Quality
npm run lint         # ESLint checking
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Prettier formatting
npm run type-check   # TypeScript checking

# Testing
npm run test         # Run tests
npm run test:run     # Single test run
npm run test:coverage # Coverage report
npm run test:ui      # Test UI

# CI Pipeline
npm run ci           # Full CI check
npm run ci:quick     # Quick CI check
```

### Code Quality Standards

The project enforces code quality through:
- **ESLint** - Code linting and style enforcement
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Vitest** - Unit testing
- **Husky** - Git hooks (future)

### Contributing Guidelines

1. **Fork & Clone** the repository
2. **Create feature branch** from `main`
3. **Follow naming conventions:**
   - Branches: `feature/description` or `fix/description`
   - Commits: Conventional commits format
4. **Run quality checks:** `npm run ci:quick`
5. **Submit Pull Request** with clear description

## 📈 Game Balance

### Specialist Balance
| Specialist | Cost | Total Skills | Cost/Skill Ratio | Specialization |
|------------|------|--------------|------------------|----------------|
| Ghost | $4,000 | 41 | $97.56 | Balanced, Budget-friendly |
| Viper | $4,500 | 42 | $107.14 | Social specialist |
| Silk | $5,200 | 47 | $110.64 | Athletic specialist |
| Shadow | $5,000 | 45 | $111.11 | Stealth specialist |
| Wrench | $5,500 | 41 | $134.15 | Combat/Demo specialist |
| Cipher | $6,000 | 41 | $146.34 | Tech specialist |

### Heist Difficulty Curve
- **Corporate HQ:** 3 encounters, difficulties 9-12
- **Bank:** 3 encounters, difficulties 11-15  
- **Museum:** 3 encounters, difficulties 13-16

## 🐛 Known Issues

- [ ] Dice animation occasionally stutters on slower devices
- [ ] Modal backdrop click detection needs refinement
- [ ] Mobile layout improvements needed for tablet sizes

## 🔮 Roadmap

### Version 2.0 (Planned)
- [ ] **Equipment System** - Purchasable tools and gadgets
- [ ] **Heat Mechanic** - Consequences system for failed heists
- [ ] **Save System** - Persistent progress storage
- [ ] **New Heists** - Casino, mansion, government facility

### Version 3.0 (Future)
- [ ] **Campaign Mode** - Connected story-driven heists  
- [ ] **Multiplayer** - Cooperative heist planning
- [ ] **Custom Content** - User-created specialists and heists
- [ ] **Mobile App** - Native iOS/Android versions

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🤝 Credits

### Development
- **Game Design & Development:** [Your Name]
- **Original Concept:** Inspired by classic heist fiction and strategy games

### Assets & Libraries
- **React** - Facebook/Meta
- **TypeScript** - Microsoft
- **Tailwind CSS** - Tailwind Labs
- **Zustand** - Poimandres
- **Vite** - Evan You

### Special Thanks
- Strategy game community for feedback and inspiration
- Open source contributors for excellent tooling
- Heist movie enthusiasts for thematic guidance

---

**Made with ❤️ for strategy game enthusiasts**

*"The perfect heist is 90% preparation, 10% execution, and 100% style."*