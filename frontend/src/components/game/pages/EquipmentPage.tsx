import React from 'react';
import { useGameStore } from '../../../stores/gameStore';

interface EquipmentPageProps {
  onBackToGame: () => void;
}

const EquipmentPage: React.FC<EquipmentPageProps> = ({ onBackToGame }) => {
  const { equipmentInventory, selectedTeam, equipItem } = useGameStore();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif font-bold text-gold-300">⚔️ Equipment Vault</h2>
        <p className="text-noir-200 max-w-2xl mx-auto">
          Manage your collection of tools, weapons, and gear. Equip your team members to enhance their capabilities.
        </p>
      </div>

      {equipmentInventory.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛡️</div>
          <h3 className="text-xl font-serif text-noir-300 mb-2">Empty Vault</h3>
          <p className="text-noir-400">Complete heists to acquire new equipment and gear.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipmentInventory.map((item) => (
            <div key={item.id} className="bg-noir-800 border-2 border-gold-500/30 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-gold-300 mb-1">{item.name}</h3>
                  <p className="text-noir-400 text-sm capitalize">{item.type} • {item.rarity}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-bold ${
                  item.rarity === 'legendary' ? 'bg-purple-600 text-white' :
                  item.rarity === 'masterwork' ? 'bg-red-600 text-white' :
                  item.rarity === 'advanced' ? 'bg-blue-600 text-white' :
                  item.rarity === 'improved' ? 'bg-green-600 text-white' :
                  'bg-gray-600 text-white'
                }`}>
                  {item.rarity}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-noir-400 text-xs mb-2">Skill Bonuses:</div>
                {Object.entries(item.skillBonuses).map(([skill, bonus]) => (
                  <div key={skill} className="flex justify-between text-sm">
                    <span className="text-noir-300 capitalize">{skill.replace('_', ' ')}</span>
                    <span className="text-emerald-400 font-bold">+{bonus}</span>
                  </div>
                ))}
              </div>

              <div className="text-noir-200 text-sm mb-4">{item.description}</div>

              <div className="space-y-2">
                <div className="text-noir-400 text-xs">Equip to:</div>
                <div className="grid grid-cols-2 gap-2">
                  {selectedTeam.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => equipItem(member.id, item)}
                      className="py-1 px-2 bg-noir-700 hover:bg-noir-600 text-noir-200 text-xs rounded transition-colors"
                    >
                      {member.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center pt-6">
        <button
          onClick={onBackToGame}
          className="py-3 px-8 bg-gradient-to-r from-blood-500 to-gold-500 hover:from-blood-600 hover:to-gold-400 text-noir-900 rounded-xl font-serif font-bold transition-all duration-200"
        >
          Back to Game
        </button>
      </div>
    </div>
  );
};

export default EquipmentPage;