import React, { useState } from 'react';
import { useGameStore } from '../../../stores/gameStore';
import EnhancedCharacterCard from '../ui/EnhancedCharacterCard';
import { automatedHeists } from '../../../data/automatedHeists';
import { basicEquipment } from '../../../data/equipment';
import type { AutomatedHeist } from '../../../types/game';

const Phase1Demo: React.FC = () => {
  const {
    availableCharacters,
    selectedTeam,
    budget,
    addTeamMember,
    removeTeamMember,
    activeAutomatedHeists,
    startAutomatedHeist,
    completeAutomatedHeist
  } = useGameStore();
  
  const [selectedHeist, setSelectedHeist] = useState<AutomatedHeist | null>(null);
  const [showDetailedStats, setShowDetailedStats] = useState(false);
  const [activeTab, setActiveTab] = useState<'characters' | 'heists' | 'equipment'>('characters');

  const handleStartHeist = () => {
    if (selectedHeist && selectedTeam.length >= selectedHeist.requirements.minTeamSize) {
      startAutomatedHeist(selectedHeist, selectedTeam);
      setSelectedHeist(null);
    }
  };

  const beginner_heists = automatedHeists.filter(h => h.riskLevel <= 3);
  const availableEquipment = basicEquipment.filter(item => item.cost <= budget).slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-600 p-6 mb-6">
          <h1 className="text-4xl font-bold text-amber-400 mb-2">Master Thief: Phase 1 Demo</h1>
          <h2 className="text-xl text-slate-300 mb-4">Enhanced Character System & D&D-Style Mechanics</h2>
          
          {/* Game Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400">${budget.toLocaleString()}</div>
              <div className="text-slate-300">Budget</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{selectedTeam.length}/4</div>
              <div className="text-slate-300">Team Size</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{activeAutomatedHeists.length}</div>
              <div className="text-slate-300">Active Heists</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-amber-400">{availableCharacters.length}</div>
              <div className="text-slate-300">Characters</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            {(['characters', 'heists', 'equipment'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-bold capitalize transition-colors duration-200 ${
                  activeTab === tab
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Characters Tab */}
        {activeTab === 'characters' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Available Characters</h3>
              <div className="flex items-center space-x-4">
                <label className="flex items-center text-slate-300">
                  <input
                    type="checkbox"
                    checked={showDetailedStats}
                    onChange={(e) => setShowDetailedStats(e.target.checked)}
                    className="mr-2"
                  />
                  Show Detailed Stats
                </label>
              </div>
            </div>

            {/* Selected Team */}
            {selectedTeam.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xl font-bold text-emerald-400 mb-4">Current Team</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {selectedTeam.map((character) => (
                    <EnhancedCharacterCard
                      key={`team-${character.id}`}
                      character={character}
                      onRemove={removeTeamMember}
                      isRecruited={true}
                      showDetailedStats={showDetailedStats}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Available Characters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {availableCharacters
                .filter((char) => !selectedTeam.find((t) => t.id === char.id))
                .slice(0, 12)
                .map((character) => (
                  <EnhancedCharacterCard
                    key={character.id}
                    character={character}
                    onRecruit={addTeamMember}
                    showDetailedStats={showDetailedStats}
                  />
                ))
              }
            </div>
          </div>
        )}

        {/* Heists Tab */}
        {activeTab === 'heists' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Available Heists</h3>
            
            {/* Active Automated Heists */}
            {activeAutomatedHeists.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xl font-bold text-blue-400 mb-4">Active Heists</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeAutomatedHeists.map((activeHeist, index) => (
                    <div key={index} className="bg-slate-700 rounded-lg p-4 border border-blue-500">
                      <h5 className="text-white font-bold">{activeHeist.heist.name}</h5>
                      <p className="text-slate-300 text-sm mb-2">{activeHeist.heist.description}</p>
                      <div className="text-blue-400 mb-2">Time Remaining: {activeHeist.timeRemaining} minutes</div>
                      <div className="text-emerald-400 mb-2">Team: {activeHeist.team.length} members</div>
                      <button
                        onClick={() => completeAutomatedHeist(activeHeist.heist.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Complete (Test)
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Heists */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {beginner_heists.map((heist) => {                
                return (
                  <div 
                    key={heist.id} 
                    className={`bg-slate-700 rounded-lg p-4 border-2 transition-colors duration-200 ${
                      selectedHeist?.id === heist.id 
                        ? 'border-amber-500 bg-slate-600' 
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                  >
                    <h5 className="text-white font-bold mb-2">{heist.name}</h5>
                    <p className="text-slate-300 text-sm mb-3">{heist.description}</p>
                    
                    <div className="space-y-2 text-sm mb-4">
                      <div className="text-emerald-400">Payout: ${heist.rewards.basePayout.toLocaleString()}</div>
                      <div className="text-blue-400">Duration: {heist.duration} hours</div>
                      <div className="text-purple-400">Risk Level: {heist.riskLevel}/10</div>
                      <div className="text-yellow-400">Team: {heist.requirements.minTeamSize}-{heist.requirements.maxTeamSize} members</div>
                    </div>

                    {heist.requirements.requiredSkills && (
                      <div className="mb-4">
                        <div className="text-xs text-slate-400 mb-1">Required Skills:</div>
                        {Object.entries(heist.requirements.requiredSkills).map(([skill, level]) => (
                          <div key={skill} className="text-xs text-slate-300">
                            {skill}: {level}+
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedHeist(selectedHeist?.id === heist.id ? null : heist)}
                        className={`flex-1 font-bold py-2 px-4 rounded transition-colors duration-200 ${
                          selectedHeist?.id === heist.id
                            ? 'bg-amber-600 hover:bg-amber-700 text-white'
                            : 'bg-slate-600 hover:bg-slate-500 text-slate-300'
                        }`}
                      >
                        {selectedHeist?.id === heist.id ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Start Heist Button */}
            {selectedHeist && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleStartHeist}
                  disabled={selectedTeam.length < selectedHeist.requirements.minTeamSize}
                  className={`px-8 py-4 rounded-lg font-bold text-xl transition-colors duration-200 ${
                    selectedTeam.length >= selectedHeist.requirements.minTeamSize
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Start {selectedHeist.name}
                  {selectedTeam.length < selectedHeist.requirements.minTeamSize && 
                    ` (Need ${selectedHeist.requirements.minTeamSize - selectedTeam.length} more members)`}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Equipment Tab */}
        {activeTab === 'equipment' && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Available Equipment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {availableEquipment.map((item) => (
                <div key={item.id} className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="text-white font-bold">{item.name}</h5>
                    <span className="text-xs px-2 py-1 rounded bg-slate-600 text-slate-300 capitalize">
                      {item.type}
                    </span>
                  </div>
                  
                  <p className="text-slate-300 text-sm mb-3">{item.description}</p>
                  
                  <div className="space-y-1 text-xs mb-3">
                    {Object.entries(item.attributeBonuses).map(([attr, bonus]) => (
                      <div key={attr} className="text-green-400">
                        +{bonus} {attr}
                      </div>
                    ))}
                    {Object.entries(item.skillBonuses).map(([skill, bonus]) => (
                      <div key={skill} className="text-blue-400">
                        +{bonus} {skill}
                      </div>
                    ))}
                  </div>

                  {item.specialEffects && item.specialEffects.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs text-slate-400 mb-1">Special Effects:</div>
                      {item.specialEffects.slice(0, 2).map((effect, index) => (
                        <div key={index} className="text-xs text-purple-400">
                          • {effect}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="text-amber-400 font-bold">${item.cost.toLocaleString()}</div>
                    <div className={`text-xs px-2 py-1 rounded capitalize ${
                      item.rarity === 'basic' ? 'bg-gray-600 text-gray-300' :
                      item.rarity === 'improved' ? 'bg-green-600 text-green-100' :
                      item.rarity === 'advanced' ? 'bg-blue-600 text-blue-100' :
                      item.rarity === 'masterwork' ? 'bg-purple-600 text-purple-100' :
                      'bg-amber-600 text-amber-100'
                    }`}>
                      {item.rarity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Phase1Demo;