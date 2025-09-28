// Game data and state management
const gameData = {
  "team_members": [
    {
      "id": 1,
      "name": "Shadow",
      "specialty": "Infiltration Expert",
      "background": "Ex-military sniper turned master burglar",
      "skills": {
        "stealth": 9,
        "athletics": 7,
        "combat": 8,
        "lockpicking": 6,
        "hacking": 4,
        "social": 5
      },
      "special_ability": "Can move silently through any terrain",
      "cost": 5000
    },
    {
      "id": 2,
      "name": "Cipher",
      "specialty": "Tech Specialist",
      "background": "Former NSA programmer gone rogue",
      "skills": {
        "stealth": 5,
        "athletics": 4,
        "combat": 3,
        "lockpicking": 6,
        "hacking": 10,
        "social": 7
      },
      "special_ability": "Can disable any electronic security system",
      "cost": 6000
    },
    {
      "id": 3,
      "name": "Viper",
      "specialty": "Social Engineer",
      "background": "Master of disguise and manipulation",
      "skills": {
        "stealth": 6,
        "athletics": 5,
        "combat": 4,
        "lockpicking": 5,
        "hacking": 6,
        "social": 10
      },
      "special_ability": "Can talk their way past any human obstacle",
      "cost": 4500
    },
    {
      "id": 4,
      "name": "Wrench",
      "specialty": "Demolitions Expert",
      "background": "Former mining engineer with explosive personality",
      "skills": {
        "stealth": 4,
        "athletics": 8,
        "combat": 9,
        "lockpicking": 8,
        "hacking": 3,
        "social": 3
      },
      "special_ability": "Can breach any physical barrier",
      "cost": 5500
    },
    {
      "id": 5,
      "name": "Silk",
      "specialty": "Cat Burglar",
      "background": "Acrobatic thief specializing in impossible entries",
      "skills": {
        "stealth": 8,
        "athletics": 10,
        "combat": 6,
        "lockpicking": 9,
        "hacking": 4,
        "social": 6
      },
      "special_ability": "Can access any location through unconventional routes",
      "cost": 5200
    },
    {
      "id": 6,
      "name": "Ghost",
      "specialty": "Information Broker",
      "background": "Connected to criminal underworld networks",
      "skills": {
        "stealth": 7,
        "athletics": 5,
        "combat": 6,
        "lockpicking": 7,
        "hacking": 8,
        "social": 8
      },
      "special_ability": "Provides valuable intel and escape routes",
      "cost": 4000
    }
  ],
  "heist_targets": [
    {
      "id": 1,
      "name": "First National Bank",
      "difficulty": "Medium",
      "potential_payout": 250000,
      "description": "Classic bank heist with vault, guards, and time pressure",
      "encounters": [
        {
          "name": "Security Cameras",
          "description": "Disable the surveillance system",
          "primary_skill": "hacking",
          "difficulty": 12,
          "failure_consequence": "Guards alerted to your presence"
        },
        {
          "name": "Vault Door",
          "description": "Open the main vault",
          "primary_skill": "lockpicking",
          "difficulty": 15,
          "failure_consequence": "Alarm triggered, time pressure increased"
        },
        {
          "name": "Patrol Guards",
          "description": "Avoid or neutralize security patrol",
          "primary_skill": "stealth",
          "difficulty": 11,
          "failure_consequence": "Combat encounter, potential injuries"
        }
      ]
    },
    {
      "id": 2,
      "name": "Art Museum",
      "difficulty": "Hard",
      "potential_payout": 500000,
      "description": "High-security museum with priceless artifacts",
      "encounters": [
        {
          "name": "Laser Grid",
          "description": "Navigate through security lasers",
          "primary_skill": "athletics",
          "difficulty": 14,
          "failure_consequence": "Silent alarm triggered"
        },
        {
          "name": "Curator's Office",
          "description": "Convince the night curator you belong",
          "primary_skill": "social",
          "difficulty": 13,
          "failure_consequence": "Security called, need alternate route"
        },
        {
          "name": "Display Case",
          "description": "Extract artifact without triggering sensors",
          "primary_skill": "lockpicking",
          "difficulty": 16,
          "failure_consequence": "Pressure alarm activated"
        }
      ]
    },
    {
      "id": 3,
      "name": "Corporate Headquarters",
      "difficulty": "Easy",
      "potential_payout": 150000,
      "description": "Steal corporate secrets and petty cash",
      "encounters": [
        {
          "name": "Keycard Access",
          "description": "Bypass electronic door locks",
          "primary_skill": "hacking",
          "difficulty": 10,
          "failure_consequence": "Must find alternate entry point"
        },
        {
          "name": "Office Safe",
          "description": "Crack the executive's personal safe",
          "primary_skill": "lockpicking",
          "difficulty": 12,
          "failure_consequence": "Only access to less valuable items"
        },
        {
          "name": "Security Guard",
          "description": "Deal with the lone night watchman",
          "primary_skill": "social",
          "difficulty": 9,
          "failure_consequence": "Guard becomes suspicious"
        }
      ]
    }
  ],
  "outcome_descriptions": {
    "critical_failure": [
      "Disaster strikes! Your team member is caught red-handed.",
      "Complete catastrophe! Alarms blare and police are en route.",
      "Total failure! Your operative is captured and the heist is blown."
    ],
    "failure": [
      "Things go wrong, but you can still salvage the situation.",
      "A setback occurs, making the job more difficult.",
      "Minor failure - you'll need to adapt your approach."
    ],
    "neutral": [
      "Partial success with unexpected complications.",
      "You succeed, but not without raising some suspicion.",
      "Mixed results - you're through but something seems off."
    ],
    "success": [
      "Clean execution! Your team member completes the task flawlessly.",
      "Smooth operation - everything goes according to plan.",
      "Perfect work! No one will ever know you were here."
    ],
    "critical_success": [
      "Exceptional performance! You discover an unexpected bonus.",
      "Brilliant execution! Your operative finds additional opportunities.",
      "Outstanding work! This couldn't have gone better."
    ]
  }
};

// Game state
let gameState = {
    budget: 15000,
    selectedTeam: [],
    selectedHeist: null,
    currentEncounter: 0,
    encounterResults: [],
    heistsCompleted: 0,
    totalEarnings: 0
};

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    setupEventListeners();
});

function initializeGame() {
    updateUI();
    populateAvailableMembers();
    populateHeistOptions();
    showPhase('recruitment-phase');
}

function setupEventListeners() {
    // Navigation buttons
    document.getElementById('proceed-to-heist').addEventListener('click', () => showPhase('heist-selection-phase'));
    document.getElementById('back-to-recruitment').addEventListener('click', () => showPhase('recruitment-phase'));
    document.getElementById('proceed-to-planning').addEventListener('click', () => showPhase('planning-phase'));
    document.getElementById('back-to-heist-selection').addEventListener('click', () => showPhase('heist-selection-phase'));
    document.getElementById('start-heist').addEventListener('click', startHeistExecution);
    document.getElementById('continue-heist').addEventListener('click', continueHeist);
    document.getElementById('plan-next-heist').addEventListener('click', planNextHeist);
    
    // Modal close functionality
    document.getElementById('dice-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.add('hidden');
        }
    });
}

function updateUI() {
    document.getElementById('player-budget').textContent = '$' + gameState.budget.toLocaleString();
    document.getElementById('heists-completed').textContent = gameState.heistsCompleted;
}

function showPhase(phaseId) {
    // Hide all phases
    document.querySelectorAll('.game-phase').forEach(phase => {
        phase.classList.add('hidden');
    });
    
    // Show target phase
    document.getElementById(phaseId).classList.remove('hidden');
    
    // Update phase-specific content
    if (phaseId === 'planning-phase') {
        updatePlanningPhase();
    }
}

function populateAvailableMembers() {
    const container = document.getElementById('available-members-grid');
    container.innerHTML = '';
    
    gameData.team_members.forEach(member => {
        const memberCard = createMemberCard(member);
        container.appendChild(memberCard);
    });
}

function createMemberCard(member) {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.dataset.memberId = member.id;
    
    const isSelected = gameState.selectedTeam.find(m => m.id === member.id);
    const canAfford = gameState.budget >= member.cost;
    
    if (isSelected) {
        card.classList.add('selected');
    }
    
    if (!canAfford && !isSelected) {
        card.classList.add('disabled');
    }
    
    card.innerHTML = `
        <div class="member-header">
            <div class="member-name">${member.name}</div>
            <div class="member-cost">$${member.cost.toLocaleString()}</div>
        </div>
        <div class="member-specialty">${member.specialty}</div>
        <div class="member-background">${member.background}</div>
        <div class="member-skills">
            ${Object.entries(member.skills).map(([skill, value]) => `
                <div class="skill-item">
                    <span class="skill-name">${skill}</span>
                    <div class="skill-bar">
                        <div class="skill-fill" style="width: ${value * 10}%"></div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="special-ability">${member.special_ability}</div>
    `;
    
    if (canAfford || isSelected) {
        card.addEventListener('click', () => toggleMemberSelection(member));
    }
    
    return card;
}

function toggleMemberSelection(member) {
    const existingIndex = gameState.selectedTeam.findIndex(m => m.id === member.id);
    
    if (existingIndex >= 0) {
        // Remove member
        gameState.selectedTeam.splice(existingIndex, 1);
        gameState.budget += member.cost;
    } else {
        // Add member (if budget allows and team isn't full)
        if (gameState.budget >= member.cost && gameState.selectedTeam.length < 4) {
            gameState.selectedTeam.push(member);
            gameState.budget -= member.cost;
        }
    }
    
    updateUI();
    updateSelectedTeamDisplay();
    populateAvailableMembers();
    
    document.getElementById('proceed-to-heist').disabled = gameState.selectedTeam.length === 0;
}

function updateSelectedTeamDisplay() {
    const container = document.getElementById('selected-members');
    
    if (gameState.selectedTeam.length === 0) {
        container.innerHTML = '<div class="empty-slot">Select team members...</div>';
        return;
    }
    
    container.innerHTML = gameState.selectedTeam.map(member => `
        <div class="selected-member">
            <div class="selected-member-info">
                <div class="selected-member-name">${member.name}</div>
                <div class="selected-member-specialty">${member.specialty}</div>
            </div>
            <button class="remove-member" onclick="removeMember(${member.id})">Remove</button>
        </div>
    `).join('');
}

function removeMember(memberId) {
    const member = gameData.team_members.find(m => m.id === memberId);
    if (member) {
        toggleMemberSelection(member);
    }
}

function populateHeistOptions() {
    const container = document.getElementById('heist-options');
    container.innerHTML = '';
    
    gameData.heist_targets.forEach(heist => {
        const heistCard = createHeistCard(heist);
        container.appendChild(heistCard);
    });
}

function createHeistCard(heist) {
    const card = document.createElement('div');
    card.className = 'heist-card';
    card.dataset.heistId = heist.id;
    
    if (gameState.selectedHeist && gameState.selectedHeist.id === heist.id) {
        card.classList.add('selected');
    }
    
    card.innerHTML = `
        <div class="heist-header">
            <div class="heist-name">${heist.name}</div>
            <div class="heist-difficulty ${heist.difficulty.toLowerCase()}">${heist.difficulty}</div>
        </div>
        <div class="heist-payout">Potential: $${heist.potential_payout.toLocaleString()}</div>
        <div class="heist-description">${heist.description}</div>
        <div class="encounter-preview">
            <h4>Challenges:</h4>
            <ul class="encounter-list">
                ${heist.encounters.map(enc => `<li>${enc.name}</li>`).join('')}
            </ul>
        </div>
    `;
    
    card.addEventListener('click', () => selectHeist(heist));
    
    return card;
}

function selectHeist(heist) {
    gameState.selectedHeist = heist;
    
    // Update UI
    document.querySelectorAll('.heist-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-heist-id="${heist.id}"]`).classList.add('selected');
    
    document.getElementById('proceed-to-planning').disabled = false;
}

function updatePlanningPhase() {
    if (!gameState.selectedHeist) return;
    
    // Update target intel
    const intelContainer = document.getElementById('target-intel');
    intelContainer.innerHTML = `
        <h3>${gameState.selectedHeist.name}</h3>
        <p class="heist-description">${gameState.selectedHeist.description}</p>
        <div class="heist-details">
            <p><strong>Difficulty:</strong> <span class="heist-difficulty ${gameState.selectedHeist.difficulty.toLowerCase()}">${gameState.selectedHeist.difficulty}</span></p>
            <p><strong>Potential Payout:</strong> $${gameState.selectedHeist.potential_payout.toLocaleString()}</p>
        </div>
        <h4>Encounters:</h4>
        <div class="encounter-details">
            ${gameState.selectedHeist.encounters.map((enc, index) => `
                <div class="encounter-item">
                    <strong>${index + 1}. ${enc.name}</strong><br>
                    <span>${enc.description}</span><br>
                    <small>Primary skill: ${enc.primary_skill} (Difficulty: ${enc.difficulty})</small>
                </div>
            `).join('')}
        </div>
    `;
    
    // Update crew summary
    const crewContainer = document.getElementById('crew-summary');
    crewContainer.innerHTML = gameState.selectedTeam.map(member => `
        <div class="crew-card-mini">
            <div class="crew-card-mini-info">
                <div class="crew-card-mini-name">${member.name}</div>
                <div class="crew-card-mini-specialty">${member.specialty}</div>
            </div>
        </div>
    `).join('');
}

function startHeistExecution() {
    gameState.currentEncounter = 0;
    gameState.encounterResults = [];
    showPhase('execution-phase');
    displayCurrentEncounter();
}

function displayCurrentEncounter() {
    const encounter = gameState.selectedHeist.encounters[gameState.currentEncounter];
    const totalEncounters = gameState.selectedHeist.encounters.length;
    
    // Update progress
    const progressFill = document.getElementById('heist-progress-fill');
    const progressText = document.getElementById('progress-text');
    
    const progress = (gameState.currentEncounter / totalEncounters) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Encounter ${gameState.currentEncounter + 1} of ${totalEncounters}`;
    
    // Update encounter content
    document.getElementById('encounter-name').textContent = encounter.name;
    document.getElementById('encounter-description').textContent = encounter.description;
    
    // Show team options
    const optionsContainer = document.getElementById('encounter-team-options');
    optionsContainer.innerHTML = gameState.selectedTeam.map(member => {
        const skillValue = member.skills[encounter.primary_skill] || 0;
        
        return `
            <div class="encounter-member-option" onclick="selectMemberForEncounter(${member.id})">
                <div class="encounter-member-name">${member.name}</div>
                <div class="encounter-member-skill">${encounter.primary_skill}: ${skillValue}</div>
                <div class="encounter-member-bonus">+${skillValue} bonus</div>
            </div>
        `;
    }).join('');
}

function selectMemberForEncounter(memberId) {
    const member = gameState.selectedTeam.find(m => m.id === memberId);
    const encounter = gameState.selectedHeist.encounters[gameState.currentEncounter];
    
    if (member && encounter) {
        executeEncounter(member, encounter);
    }
}

function executeEncounter(member, encounter) {
    // Show dice modal
    const modal = document.getElementById('dice-modal');
    const dice = document.getElementById('dice');
    const rollInfo = document.getElementById('roll-info');
    const outcomeResult = document.getElementById('outcome-result');
    const continueBtn = document.getElementById('continue-heist');
    
    // Reset modal state
    dice.classList.remove('rolling');
    rollInfo.textContent = 'Rolling...';
    outcomeResult.innerHTML = '';
    continueBtn.style.display = 'none';
    
    // Show modal
    modal.classList.remove('hidden');
    
    // Start dice animation
    dice.classList.add('rolling');
    
    setTimeout(() => {
        dice.classList.remove('rolling');
        
        // Calculate result
        const diceRoll = Math.floor(Math.random() * 20) + 1;
        const skillBonus = member.skills[encounter.primary_skill] || 0;
        const totalRoll = diceRoll + skillBonus;
        const difficulty = encounter.difficulty;
        
        // Determine outcome
        let outcome, outcomeType;
        if (diceRoll === 1) {
            outcome = 'critical_failure';
            outcomeType = 'Critical Failure';
        } else if (totalRoll < difficulty - 5) {
            outcome = 'failure';
            outcomeType = 'Failure';
        } else if (totalRoll < difficulty) {
            outcome = 'neutral';
            outcomeType = 'Partial Success';
        } else if (totalRoll >= difficulty + 5 || diceRoll === 20) {
            outcome = 'critical_success';
            outcomeType = 'Critical Success';
        } else {
            outcome = 'success';
            outcomeType = 'Success';
        }
        
        // Store result
        gameState.encounterResults.push({
            member: member,
            encounter: encounter,
            roll: diceRoll,
            bonus: skillBonus,
            total: totalRoll,
            outcome: outcome
        });
        
        // Display result
        dice.querySelector('.dice-face').textContent = diceRoll;
        rollInfo.innerHTML = `
            <strong>${member.name}</strong> rolled ${diceRoll} + ${skillBonus} = ${totalRoll}<br>
            <small>Target: ${difficulty}</small>
        `;
        
        const outcomeDesc = gameData.outcome_descriptions[outcome];
        const randomDesc = outcomeDesc[Math.floor(Math.random() * outcomeDesc.length)];
        
        outcomeResult.innerHTML = `
            <div class="outcome-title ${outcome.replace('_', '-')}">${outcomeType}</div>
            <div class="outcome-description">${randomDesc}</div>
        `;
        
        continueBtn.style.display = 'block';
    }, 1500);
}

function continueHeist() {
    document.getElementById('dice-modal').classList.add('hidden');
    
    gameState.currentEncounter++;
    
    if (gameState.currentEncounter >= gameState.selectedHeist.encounters.length) {
        showResults();
    } else {
        displayCurrentEncounter();
    }
}

function showResults() {
    showPhase('results-phase');
    
    // Calculate success
    const totalEncounters = gameState.encounterResults.length;
    const successfulEncounters = gameState.encounterResults.filter(r => 
        r.outcome === 'success' || r.outcome === 'critical_success'
    ).length;
    
    const criticalFailures = gameState.encounterResults.filter(r => 
        r.outcome === 'critical_failure'
    ).length;
    
    let heistSuccess = false;
    let payout = 0;
    
    if (criticalFailures > 0) {
        heistSuccess = false;
    } else if (successfulEncounters >= totalEncounters * 0.5) {
        heistSuccess = true;
        const successRate = successfulEncounters / totalEncounters;
        payout = Math.floor(gameState.selectedHeist.potential_payout * successRate);
    }
    
    // Update results display
    const resultsTitle = document.getElementById('results-title');
    const heistOutcome = document.getElementById('heist-outcome');
    const rewardsSection = document.getElementById('rewards-section');
    const crewStatus = document.getElementById('crew-status');
    
    if (heistSuccess) {
        resultsTitle.innerHTML = '🎉 Heist Successful!';
        heistOutcome.innerHTML = `
            <div class="outcome-icon">💰</div>
            <div class="outcome-message">Your crew pulled off the heist!</div>
        `;
        
        gameState.budget += payout;
        gameState.heistsCompleted++;
        gameState.totalEarnings += payout;
        
        rewardsSection.innerHTML = `
            <h3>Rewards</h3>
            <div class="reward-item">
                <span>Heist Payout</span>
                <span class="reward-amount">+$${payout.toLocaleString()}</span>
            </div>
        `;
    } else {
        resultsTitle.innerHTML = '💀 Heist Failed';
        heistOutcome.innerHTML = `
            <div class="outcome-icon">🚨</div>
            <div class="outcome-message">The heist went wrong...</div>
        `;
        
        rewardsSection.innerHTML = `
            <h3>Consequences</h3>
            <div class="reward-item">
                <span>No payout received</span>
                <span class="reward-amount" style="color: var(--color-error);">$0</span>
            </div>
        `;
    }
    
    // Show crew status
    crewStatus.innerHTML = `
        <h3>Crew Status</h3>
        ${gameState.selectedTeam.map(member => {
            const memberResult = gameState.encounterResults.find(r => r.member.id === member.id);
            let status = 'active';
            if (memberResult && memberResult.outcome === 'critical_failure') {
                status = 'captured';
            }
            
            return `
                <div class="crew-status-item">
                    <span>${member.name}</span>
                    <span class="member-status ${status}">${status.toUpperCase()}</span>
                </div>
            `;
        }).join('')}
    `;
    
    updateUI();
}

function planNextHeist() {
    // Reset for next heist
    gameState.selectedTeam = [];
    gameState.selectedHeist = null;
    gameState.currentEncounter = 0;
    gameState.encounterResults = [];
    
    updateUI();
    updateSelectedTeamDisplay();
    populateAvailableMembers();
    
    // Enable proceed button
    document.getElementById('proceed-to-heist').disabled = false;
    document.getElementById('proceed-to-planning').disabled = true;
    
    showPhase('recruitment-phase');
}

// Make functions globally accessible for onclick handlers
window.selectMemberForEncounter = selectMemberForEncounter;
window.removeMember = removeMember;