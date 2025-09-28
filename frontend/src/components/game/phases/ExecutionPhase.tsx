import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../../stores/gameStore';

const ExecutionPhase: React.FC = () => {
  const {
    activeAutomatedHeists,
    setCurrentPhase,
    completeAutomatedHeist
  } = useGameStore();

  const [executionProgress, setExecutionProgress] = useState(0);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [phase, setPhase] = useState<'departure' | 'execution'>('departure');

  const activeHeist = activeAutomatedHeists[0];

  useEffect(() => {
    if (activeHeist && phase === 'departure') {
      // Show departure screen for 3 seconds, then start execution
      const departureTimer = setTimeout(() => {
        setPhase('execution');
      }, 3000);
      
      return () => clearTimeout(departureTimer);
    }
  }, [activeHeist, phase]);

  useEffect(() => {
    if (activeHeist && phase === 'execution' && !isExecuting) {
      setIsExecuting(true);
      
      const executeHeist = async () => {
        if (!activeHeist) return;

        setExecutionLog(['Initiating automated heist execution...']);
        setExecutionProgress(0);

        try {
          // Simulate progress updates
          const progressInterval = setInterval(() => {
            setExecutionProgress(prev => {
              const newProgress = prev + Math.random() * 15;
              if (newProgress >= 100) {
                clearInterval(progressInterval);
                return 100;
              }
              return newProgress;
            });
          }, 500);

          // Simple automated heist simulation
          const team = activeHeist.team;
          const heist = activeHeist.heist;
          
          // Calculate team effectiveness
          let totalEffectiveness = 0;
          team.forEach(member => {
            // Check required skills
            let memberEffectiveness = 0;
            if (heist.requirements.requiredSkills) {
              Object.entries(heist.requirements.requiredSkills).forEach(([skill, required]) => {
                const memberSkill = member.skills[skill as keyof typeof member.skills] || 0;
                memberEffectiveness += Math.max(0, memberSkill - required + 5); // +5 for base competency
              });
            }
            
            // Equipment bonuses
            Object.values(member.equipment).forEach(item => {
              if (item && heist.requirements.requiredEquipment?.includes(item.type)) {
                memberEffectiveness += 2; // Equipment bonus
              }
            });
            
            totalEffectiveness += memberEffectiveness;
          });
          
          // Risk factor (higher risk = more variable results)
          const riskModifier = (heist.riskLevel - 5) * 2; // -8 to +8 range
          
          // Base success chance
          const baseSuccessChance = 0.6 + (totalEffectiveness / 100) - (riskModifier / 20);
          const successChance = Math.max(0.1, Math.min(0.95, baseSuccessChance));
          
          // Determine outcome
          const roll = Math.random();
          const success = roll < successChance;
          
          // Calculate rewards
          let payout = success ? heist.rewards.basePayout : Math.floor(heist.rewards.basePayout * 0.1);
          const experience = success ? Math.floor(heist.rewards.experienceMultiplier * heist.rewards.basePayout) : Math.floor(heist.rewards.experienceMultiplier * heist.rewards.basePayout * 0.2);
          
          // Risk-based modifiers
          if (success) {
            if (roll < successChance * 0.3) {
              // Critical success
              payout = Math.floor(payout * 1.5);
              setExecutionLog(prev => [...prev, 'Exceptional performance! Bonus payout achieved.']);
            } else if (roll > successChance * 0.8) {
              // Barely successful
              payout = Math.floor(payout * 0.8);
              setExecutionLog(prev => [...prev, 'Close call, but mission accomplished.']);
            }
          }
          
          // Update log with results
          const logMessages = [
            `Heist ${success ? 'successful' : 'failed'}!`,
            `Total payout: $${payout.toLocaleString()}`,
            `Experience gained: ${experience}`,
            `Success rate: ${(successChance * 100).toFixed(1)}%`,
          ];

          setExecutionLog(prev => [...prev, ...logMessages]);
          setExecutionProgress(100);

          // Complete the heist (we'll need to modify the store to handle the custom payout)
          completeAutomatedHeist(activeHeist.heist.id);
          
          // Move to results phase after a brief delay
          setTimeout(() => {
            setCurrentPhase('results-phase');
          }, 3000);

        } catch (error) {
          console.error('Heist execution failed:', error);
          setExecutionLog(prev => [...prev, 'Heist execution failed!']);
        }
      };

      executeHeist();
    }
  }, [activeHeist, phase, isExecuting, completeAutomatedHeist, setCurrentPhase]);

  if (!activeHeist) {
    return (
      <div className="text-center">
        <p className="text-daemon-text-muted">No active heist found</p>
      </div>
    );
  }

  if (phase === 'departure') {
    return (
      <div className="space-y-6">
        {/* Phase Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-daemon-text-bright">🚗 Team Departing</h2>
          <p className="text-daemon-text-muted max-w-2xl mx-auto">
            Your crew is heading out on the mission. Final preparations complete.
          </p>
        </div>

        {/* Mission Brief */}
        <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-8">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-semibold text-daemon-text-bright mb-2">{activeHeist.heist.name}</h3>
            <p className="text-daemon-text">{activeHeist.heist.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-daemon-surface border border-daemon-secondary rounded p-4">
              <div className="text-2xl mb-2">⏱️</div>
              <div className="text-sm text-daemon-text-muted">Duration</div>
              <div className="text-daemon-text font-semibold">{activeHeist.heist.duration} hours</div>
            </div>
            <div className="bg-daemon-surface border border-daemon-secondary rounded p-4">
              <div className="text-2xl mb-2">⚠️</div>
              <div className="text-sm text-daemon-text-muted">Risk Level</div>
              <div className="text-daemon-text font-semibold">{activeHeist.heist.riskLevel}/10</div>
            </div>
            <div className="bg-daemon-surface border border-daemon-secondary rounded p-4">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-sm text-daemon-text-muted">Team Size</div>
              <div className="text-daemon-text font-semibold">{activeHeist.team.length} members</div>
            </div>
            <div className="bg-daemon-surface border border-daemon-secondary rounded p-4">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-sm text-daemon-text-muted">Potential Payout</div>
              <div className="text-daemon-gold font-semibold">${activeHeist.heist.rewards.basePayout.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Team Departure */}
        <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-6">
          <h3 className="text-xl font-semibold text-daemon-text-bright mb-4 text-center">Your Crew is En Route</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeHeist.team.map((member, index) => (
              <div
                key={member.id}
                className="bg-daemon-surface border border-daemon-secondary rounded p-4 text-center"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-2xl mb-2">🕵️</div>
                <div className="font-semibold text-daemon-text-bright">{member.name}</div>
                <div className="text-sm text-daemon-text-muted">{member.specialty}</div>
                <div className="text-xs text-daemon-text mt-2">Ready for action</div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading Animation */}
        <div className="text-center">
          <div className="inline-block">
            <div className="animate-pulse text-daemon-text-muted">
              Preparing for mission execution...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-daemon-text-bright">⚡ Heist in Progress</h2>
        <p className="text-daemon-text-muted max-w-2xl mx-auto">
          Automated systems are executing the heist. Monitor the progress below.
        </p>
      </div>

      {/* Heist Info */}
      <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-daemon-text-bright mb-4">{activeHeist.heist.name}</h3>
        <p className="text-daemon-text mb-4">{activeHeist.heist.description}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-daemon-text-muted">Duration:</span>
            <div className="text-daemon-text font-semibold">{activeHeist.heist.duration} hours</div>
          </div>
          <div>
            <span className="text-daemon-text-muted">Risk Level:</span>
            <div className="text-daemon-text font-semibold">{activeHeist.heist.riskLevel}/10</div>
          </div>
          <div>
            <span className="text-daemon-text-muted">Team Size:</span>
            <div className="text-daemon-text font-semibold">{activeHeist.team.length} members</div>
          </div>
          <div>
            <span className="text-daemon-text-muted">Time Remaining:</span>
            <div className="text-daemon-text font-semibold">{activeHeist.timeRemaining} minutes</div>
          </div>
        </div>
      </div>

      {/* Execution Progress */}
      <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-6">
        <h3 className="text-xl font-semibold text-daemon-text-bright mb-4">Execution Progress</h3>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="bg-daemon-surface rounded-full h-4 border border-daemon-secondary">
            <div
              className="h-full bg-daemon-primary rounded-full transition-all duration-500"
              style={{ width: `${executionProgress}%` }}
            />
          </div>
          <p className="text-daemon-text-muted text-sm mt-2 text-center">
            {executionProgress.toFixed(0)}% Complete
          </p>
        </div>

        {/* Execution Log */}
        <div className="bg-daemon-surface border border-daemon-secondary rounded p-4 max-h-64 overflow-y-auto">
          <div className="space-y-2 text-sm">
            {executionLog.map((message, index) => (
              <div key={index} className="text-daemon-text">
                {message}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Status */}
      <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-6">
        <h3 className="text-xl font-semibold text-daemon-text-bright mb-4">Team Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeHeist.team.map((member) => (
            <div
              key={member.id}
              className="bg-daemon-surface border border-daemon-secondary rounded p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="font-semibold text-daemon-text-bright">{member.name}</div>
                  <div className="text-sm text-daemon-text-muted">{member.specialty}</div>
                </div>
                <div className="text-right text-xs">
                  <div className="text-daemon-text-muted">Health: {member.derivedStats.health}</div>
                  <div className="text-daemon-text-muted">Fatigue: {member.fatigue}%</div>
                </div>
              </div>
              
              {/* Equipment Summary */}
              <div className="text-xs text-daemon-text-muted">
                Equipment: {Object.values(member.equipment).filter(item => item !== null).length}/5 slots
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExecutionPhase;