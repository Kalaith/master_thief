import React, { useState } from 'react';
import { useGameStore } from '../../../stores/gameStore';
import EquipmentShop from '../ui/EquipmentShop';
import toast from 'react-hot-toast';

interface EquipmentPageProps {
  onBackToGame: () => void;
}

const EquipmentPage: React.FC<EquipmentPageProps> = ({ onBackToGame }) => {
  const { equipmentInventory, selectedTeam, equipItem } = useGameStore();
  const [activeTab, setActiveTab] = useState<'inventory' | 'shop'>('inventory');

  const handleEquip = (memberId: number, item: any) => {
    equipItem(memberId, item);
    toast.success(`Equipped ${item.name} to ${selectedTeam.find(m => m.id === memberId)?.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif font-bold text-gold-300">⚔️ Equipment Management</h2>
        <p className="text-noir-200 max-w-2xl mx-auto">
          Purchase gear from the Black Market or manage your existing inventory
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-6 py-3 rounded-xl font-serif font-bold transition-all duration-200 ${
            activeTab === 'inventory'
              ? 'bg-gradient-to-r from-blood-500 to-gold-500 text-noir-900'
              : 'bg-noir-800 text-noir-300 hover:text-gold-300 border-2 border-gold-500/30'
          }`}
        >
          🎒 Inventory ({equipmentInventory.length})
        </button>
        <button
          onClick={() => setActiveTab('shop')}
          className={`px-6 py-3 rounded-xl font-serif font-bold transition-all duration-200 ${
            activeTab === 'shop'
              ? 'bg-gradient-to-r from-blood-500 to-gold-500 text-noir-900'
              : 'bg-noir-800 text-noir-300 hover:text-gold-300 border-2 border-gold-500/30'
          }`}
        >
          🏪 Black Market
        </button>
      </div>

      {/* Content */}
      {activeTab === 'shop' ? (
        <EquipmentShop />
      ) : (
        <div className="space-y-6">
          {equipmentInventory.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛡️</div>
              <h3 className="text-xl font-serif text-noir-300 mb-2">Empty Vault</h3>
              <p className="text-noir-400 mb-4">Your inventory is empty. Purchase equipment from the Black Market or earn it through heists.</p>
              <button
                onClick={() => setActiveTab('shop')}
                className="px-6 py-3 bg-gradient-to-r from-blood-500 to-gold-500 hover:from-blood-600 hover:to-gold-400 text-noir-900 rounded-xl font-serif font-bold transition-all duration-200"
              >
                Visit Black Market
              </button>
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
                      item.rarity === 'legendary' ? 'bg-gold-500 text-noir-900' :
                      item.rarity === 'masterwork' ? 'bg-purple-600 text-white' :
                      item.rarity === 'advanced' ? 'bg-blue-600 text-white' :
                      item.rarity === 'improved' ? 'bg-emerald-600 text-white' :
                      'bg-noir-600 text-white'
                    }`}>
                      {item.rarity.toUpperCase()}
                    </div>
                  </div>

                  <div className="text-noir-200 text-sm mb-4">{item.description}</div>

                  {/* Bonuses */}
                  <div className="space-y-2 mb-4">
                    {Object.keys(item.attributeBonuses).length > 0 && (
                      <div>
                        <div className="text-noir-400 text-xs mb-1">Attributes:</div>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(item.attributeBonuses).map(([attr, bonus]) => (
                            <span key={attr} className="px-2 py-0.5 bg-blood-500/20 text-blood-300 text-xs rounded">
                              {attr.slice(0, 3).toUpperCase()} +{bonus}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {Object.keys(item.skillBonuses).length > 0 && (
                      <div>
                        <div className="text-noir-400 text-xs mb-1">Skills:</div>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(item.skillBonuses).map(([skill, bonus]) => (
                            <span key={skill} className="px-2 py-0.5 bg-gold-500/20 text-gold-300 text-xs rounded capitalize">
                              {skill} +{bonus}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Special Effects */}
                  {item.specialEffects && item.specialEffects.length > 0 && (
                    <div className="mb-4 p-2 bg-noir-700 rounded">
                      <div className="text-noir-400 text-xs mb-1">Special:</div>
                      <ul className="text-xs text-gold-200 space-y-0.5">
                        {item.specialEffects.slice(0, 2).map((effect, idx) => (
                          <li key={idx}>• {effect}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="text-noir-400 text-xs">Equip to Team Member:</div>
                    {selectedTeam.length === 0 ? (
                      <p className="text-noir-500 text-xs italic">No team members recruited</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {selectedTeam.map((member) => (
                          <button
                            key={member.id}
                            onClick={() => handleEquip(member.id, item)}
                            className="py-1 px-2 bg-noir-700 hover:bg-gold-500/20 hover:border-gold-500/50 border border-noir-600 text-noir-200 text-xs rounded transition-colors"
                          >
                            {member.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Back Button */}
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