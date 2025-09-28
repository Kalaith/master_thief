import React, { useState } from 'react';
import { useGameStore } from '../../../stores/gameStore';
import { basicEquipment } from '../../../data/equipment';
import type { Equipment } from '../../../types/game';

const PlanningPhase: React.FC = () => {
  const { 
    activeAutomatedHeists, 
    budget,
    setCurrentPhase,
    equipItem
  } = useGameStore();
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  const activeHeist = activeAutomatedHeists[0]; // Get the first active heist

  const handleBackToHeistSelection = () => {
    setCurrentPhase('heist-selection-phase');
  };

  const handleStartExecution = () => {
    if (activeHeist) {
      setCurrentPhase('execution-phase');
    }
  };

  const handleEquipItem = (characterId: number, item: Equipment) => {
    if (budget >= item.cost) {
      equipItem(characterId, item);
    }
  };

  const availableEquipment = basicEquipment.filter(item => item.cost <= budget);

  if (!activeHeist) {
    return (
      <div className="text-center">
        <p className="text-daemon-text-muted">No active heist found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-daemon-text-bright">📋 Final Preparations</h2>
        <p className="text-daemon-text-muted max-w-2xl mx-auto">
          Equip your team and review the mission details before execution.
        </p>
      </div>

      {/* Active Heist Summary */}
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

      {/* Planning Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Team Equipment */}
        <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-6">
          <h3 className="text-xl font-semibold text-daemon-text-bright mb-4">Your Crew</h3>
          
          <div className="space-y-4">
            {activeHeist.team.map((member) => (
              <div
                key={member.id}
                className="bg-daemon-surface border border-daemon-secondary rounded p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <div className="font-semibold text-daemon-text-bright">{member.name}</div>
                    <div className="text-sm text-daemon-text-muted">{member.specialty}</div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="text-daemon-text-muted">Health: {member.derivedStats.health}</div>
                    <div className="text-daemon-text-muted">Fatigue: {member.fatigue}%</div>
                  </div>
                </div>
                
                {/* Current Equipment */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(member.equipment).map(([slot, item]) => (
                    <div key={slot} className="bg-daemon-panel p-2 rounded">
                      <div className="text-daemon-text-muted capitalize">{slot}:</div>
                      <div className="text-daemon-text">
                        {item ? item.name : 'None'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Shop */}
        <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-6">
          <h3 className="text-xl font-semibold text-daemon-text-bright mb-4">Available Equipment</h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {availableEquipment.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className={`border rounded p-3 cursor-pointer transition-colors ${
                  selectedEquipment?.id === item.id 
                    ? 'border-daemon-primary bg-daemon-surface' 
                    : 'border-daemon-secondary hover:border-daemon-primary'
                }`}
                onClick={() => setSelectedEquipment(selectedEquipment?.id === item.id ? null : item)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-daemon-text-bright text-sm">{item.name}</div>
                    <div className="text-xs text-daemon-text-muted capitalize">{item.type}</div>
                  </div>
                  <div className="text-daemon-gold font-bold text-sm">${item.cost}</div>
                </div>
                
                {selectedEquipment?.id === item.id && (
                  <div className="mt-2 space-y-2">
                    <div className="text-xs text-daemon-text">{item.description}</div>
                    
                    {Object.keys(item.attributeBonuses).length > 0 && (
                      <div className="text-xs">
                        <div className="text-daemon-text-muted">Attributes:</div>
                        {Object.entries(item.attributeBonuses).map(([attr, bonus]) => (
                          <div key={attr} className="text-green-400">+{bonus} {attr}</div>
                        ))}
                      </div>
                    )}
                    
                    {Object.keys(item.skillBonuses).length > 0 && (
                      <div className="text-xs">
                        <div className="text-daemon-text-muted">Skills:</div>
                        {Object.entries(item.skillBonuses).map(([skill, bonus]) => (
                          <div key={skill} className="text-blue-400">+{bonus} {skill}</div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex gap-2 mt-3">
                      {activeHeist.team.map((member) => (
                        <button
                          key={member.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEquipItem(member.id, item);
                          }}
                          className="px-2 py-1 bg-daemon-primary hover:bg-daemon-primaryHover text-white text-xs rounded"
                        >
                          Equip {member.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          onClick={handleBackToHeistSelection}
          className="py-3 px-6 border border-daemon-secondary text-daemon-text hover:bg-daemon-surface rounded-lg transition-colors"
        >
          Change Target
        </button>
        
        <button
          onClick={handleStartExecution}
          className="py-3 px-6 bg-daemon-primary hover:bg-daemon-primaryHover text-white rounded-lg font-semibold transition-colors"
        >
          ⚡ Execute Heist
        </button>
      </div>
    </div>
  );
};

export default PlanningPhase;