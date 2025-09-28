# Master Thief: Heist Planner
## Game Design Document v2.0

### 🎭 **Game Overview**

Master Thief: Heist Planner is a strategic, turn-based heist simulation game that combines crew management, tactical planning, and dice-based skill resolution. Players take on the role of a master criminal orchestrating elaborate heists by recruiting specialists, selecting targets, and executing multi-phase operations.

**Genre:** Strategy/Simulation  
**Platform:** Web (React/TypeScript)  
**Target Audience:** Strategy game enthusiasts, fans of heist fiction  
**Play Time:** 15-30 minutes per session  

---

### 🎯 **Core Game Loop**

1. **Recruitment Phase** - Assemble your crew within budget constraints
2. **Target Selection** - Choose heists based on crew capabilities and risk tolerance
3. **Planning Phase** - Review intel and finalize approach strategy
4. **Execution Phase** - Navigate encounters using dice-based skill checks
5. **Results Phase** - Assess outcomes, collect rewards, and prepare for next heist

---

### 👥 **Team System**

#### **Available Specialists**

| Specialist | Specialty | Cost | Key Skills | Special Ability |
|------------|-----------|------|------------|-----------------|
| **Shadow** | Infiltration Expert | $5,000 | Stealth (9), Combat (8) | Silent movement through any terrain |
| **Cipher** | Tech Specialist | $6,000 | Hacking (10), Social (7) | Disable electronic security systems |
| **Viper** | Social Engineer | $4,500 | Social (10), Stealth (6) | Talk past any human obstacle |
| **Wrench** | Demolitions Expert | $5,500 | Combat (9), Lockpicking (8) | Breach any physical barrier |
| **Silk** | Cat Burglar | $5,200 | Athletics (10), Lockpicking (9) | Access locations via unconventional routes |
| **Ghost** | Information Broker | $4,000 | Hacking (8), Social (8) | Provides intel and escape routes |

#### **Skill Categories**
- **Stealth** - Avoiding detection, silent movement
- **Athletics** - Physical challenges, climbing, acrobatics  
- **Combat** - Neutralizing threats, intimidation
- **Lockpicking** - Mechanical security, safes, physical locks
- **Hacking** - Electronic systems, cameras, digital locks
- **Social** - Persuasion, deception, information gathering

#### **Team Composition Strategy**
- Maximum 4 team members per heist
- Starting budget: $15,000
- Each specialist has unique cost-to-capability ratio
- Balanced teams handle diverse encounter types
- Specialized teams excel at specific heist types

---

### 🏛️ **Heist Targets**

#### **Corporate Headquarters** (Easy)
- **Payout:** $150,000
- **Encounters:** 3
- **Focus:** Electronic security, social engineering
- **Ideal Skills:** Hacking, Social, Stealth

#### **First National Bank** (Medium)
- **Payout:** $250,000
- **Encounters:** 3
- **Focus:** Mixed security, time pressure
- **Ideal Skills:** Hacking, Lockpicking, Stealth

#### **Art Museum** (Hard)
- **Payout:** $500,000
- **Encounters:** 3
- **Focus:** Physical security, precision work
- **Ideal Skills:** Athletics, Social, Lockpicking

#### **Future Expansions**
- Casino vault
- Private collector mansion
- Government facility
- Armored transport intercept

---

### 🎲 **Dice Resolution System**

#### **Core Mechanics**
- **Base Roll:** 1d20
- **Skill Modifier:** +0 to +10 based on specialist's relevant skill
- **Target Numbers:** Set per encounter (typically 9-16)
- **Success Thresholds:**
  - **Critical Failure (Roll = 1):** Automatic failure regardless of modifiers
  - **Failure (Total < Target):** Negative consequences, complications
  - **Partial Success (Total = Target to Target+4):** Success with complications
  - **Success (Total = Target+5 to Target+9):** Clean execution
  - **Critical Success (Roll = 20 or Total ≥ Target+10):** Exceptional results, bonuses

#### **Outcome Variations**
Each result type has multiple narrative descriptions to maintain freshness:
- **Critical Failure:** 3 unique descriptions per category
- **Failure:** 3 unique descriptions per category  
- **Neutral:** 3 unique descriptions per category
- **Success:** 3 unique descriptions per category
- **Critical Success:** 3 unique descriptions per category

---

### 🚨 **Encounter Design**

#### **Encounter Types**

**Electronic Security**
- Security cameras, digital locks, alarm systems
- Primary skill: Hacking
- Failure consequences: Alert levels, time pressure

**Physical Obstacles**  
- Vault doors, safes, locked containers
- Primary skill: Lockpicking
- Failure consequences: Limited access, noise generation

**Human Elements**
- Guards, civilians, authority figures
- Primary skill: Social or Stealth
- Failure consequences: Suspicion, confrontation

**Athletic Challenges**
- Laser grids, climbing, tight spaces
- Primary skill: Athletics  
- Failure consequences: Alarm triggers, injury risk

**Combat Situations**
- Direct confrontation, intimidation
- Primary skill: Combat
- Failure consequences: Injury, escalation

#### **Dynamic Difficulty**
- Encounter difficulty scales with heist complexity
- Multiple solution paths per encounter
- Failure creates complications rather than dead ends
- Success quality affects subsequent encounters

---

### 💰 **Economy & Progression**

#### **Budget Management**
- Starting funds: $15,000
- Specialist costs: $4,000 - $6,000
- No recurring costs (one-time recruitment per heist)
- Budget carries over between heists

#### **Payout Structure**
- Base payout determined by heist difficulty
- Success rate multiplier affects final reward
- Critical successes provide bonus discoveries
- Failed heists provide no monetary reward

#### **Progression Mechanics**
- Heist completion tracking
- Total earnings accumulation
- Access to higher-value targets
- Reputation system (future expansion)

---

### 🎨 **Visual Design**

#### **Art Direction**
- **Theme:** Dark, sophisticated criminal underworld
- **Color Palette:** Daemon Directorate system (deep blacks, blood reds, gold accents)
- **Typography:** Clean, professional fonts suggesting corporate espionage
- **Iconography:** Minimalist symbols representing different specialist types

#### **UI/UX Principles**
- Clear information hierarchy
- Immediate feedback for player actions  
- Smooth transitions between game phases
- Responsive design for multiple screen sizes
- Accessibility considerations (color contrast, readable fonts)

---

### 🔧 **Technical Architecture**

#### **Frontend Stack**
- **React 19** - Component-based UI framework
- **TypeScript** - Type safety and developer experience
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first styling system
- **Vite** - Fast development build tool

#### **Game State Management**
- Centralized store for all game data
- Immutable state updates
- Persistent progress tracking
- Undo/redo capability (future expansion)

#### **Data Structure**
- Type-safe interfaces for all game entities
- Modular encounter system for easy expansion
- Configurable difficulty parameters
- Extensible specialist and heist definitions

---

### 🚀 **Future Enhancements**

#### **Phase 2 Features**
- **Equipment System** - Purchasable tools and gadgets
- **Heat Level** - Consequences for failed heists affect future operations
- **Specialist Relationships** - Team synergy bonuses and conflicts
- **Multiple Endings** - Different win conditions and story paths

#### **Phase 3 Features**  
- **Campaign Mode** - Connected heist sequence with overarching narrative
- **Rival Crews** - Competitive elements and territory control
- **Customization** - Player-created specialists and heists
- **Multiplayer** - Cooperative or competitive heist planning

#### **Technical Improvements**
- Save/load system with cloud sync
- Achievement system
- Analytics and telemetry
- Mobile app version
- Accessibility enhancements

---

### 📊 **Success Metrics**

#### **Player Engagement**
- Session length and frequency
- Heist completion rates by difficulty
- Team composition preferences
- Replay value indicators

#### **Game Balance**
- Specialist usage distribution
- Success rate by encounter type
- Economic balance (earnings vs. costs)
- Difficulty curve validation

---

### 🎯 **Design Philosophy**

**Meaningful Choices:** Every decision should have clear tradeoffs and consequences  
**Strategic Depth:** Simple rules that create complex tactical situations  
**Narrative Integration:** Mechanics that support immersive heist storytelling  
**Respectful Challenge:** Difficulty that rewards skill without punishing experimentation  
**Elegant Complexity:** Sophisticated systems presented through intuitive interfaces