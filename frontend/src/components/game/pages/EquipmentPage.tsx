import React, { useState } from 'react';
import { useGameStore } from '../../../stores/gameStore';
import EquipmentShop from '../ui/EquipmentShop';
import PageHeader from '../ui/PageHeader';
import toast from 'react-hot-toast';
import type { Equipment } from '../../../types/game';
import { Shield, Package, ShoppingCart, TrendingUp, Star, Sparkles } from 'lucide-react';

interface EquipmentPageProps {
  onBackToGame: () => void;
}

const EquipmentPage: React.FC<EquipmentPageProps> = ({ onBackToGame }) => {
  const { equipmentInventory, selectedTeam, equipItem, tutorial, nextTutorialStep } = useGameStore();
  const [activeTab, setActiveTab] = useState<'inventory' | 'shop'>('inventory');

  const handleTabChange = (tab: 'inventory' | 'shop') => {
    setActiveTab(tab);

    // Advance tutorial if on equipment-shop-tab step and switching to shop
    if (tutorial.active && tutorial.currentStep === 'equipment-shop-tab' && tab === 'shop') {
      setTimeout(() => nextTutorialStep(), 500);
    }
  };

  const handleEquip = (memberId: number, item: Equipment) => {
    equipItem(memberId, item);
    toast.success(`Equipped ${item.name} to ${selectedTeam.find(m => m.id === memberId)?.name}`);

    // Advance tutorial if on equip-character step
    if (tutorial.active && tutorial.currentStep === 'equip-character') {
      setTimeout(() => nextTutorialStep(), 500);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Shield}
        title="Equipment Armory"
        description="Tactical gear inventory and black market procurement"
      />

      {/* Tabs */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleTabChange('inventory')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono font-bold uppercase transition-all duration-200 ${
            activeTab === 'inventory'
              ? 'bg-cyan-400/20 border-2 border-cyan-400 text-cyan-400 shadow-cyan-glow'
              : 'bg-heist-panel text-gray-400 hover:text-cyan-400 border-2 border-heist-border hover:border-cyan-400/50'
          }`}
        >
          <Package className="w-5 h-5" />
          Inventory ({equipmentInventory.length})
        </button>
        <button
          onClick={() => handleTabChange('shop')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono font-bold uppercase transition-all duration-200 ${
            activeTab === 'shop'
              ? 'bg-cyan-400/20 border-2 border-cyan-400 text-cyan-400 shadow-cyan-glow'
              : 'bg-heist-panel text-gray-400 hover:text-cyan-400 border-2 border-heist-border hover:border-cyan-400/50'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          Black Market
        </button>
      </div>

      {/* Content */}
      {activeTab === 'shop' ? (
        <EquipmentShop />
      ) : (
        <div className="space-y-6">
          {equipmentInventory.length === 0 ? (
            <div className="bg-heist-panel border border-heist-border rounded-xl p-12 text-center shadow-hud-panel">
              <Shield className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400 mb-2 uppercase tracking-wide">Armory Empty</h3>
              <p className="text-gray-500 font-mono text-sm mb-6">No equipment in inventory. Acquire gear through black market procurement or mission rewards.</p>
              <button
                onClick={() => handleTabChange('shop')}
                className="flex items-center justify-center gap-2 py-3 px-6 mx-auto bg-cyan-400/20 hover:bg-cyan-400/30 border border-cyan-400 text-cyan-400 rounded font-mono font-bold uppercase transition-all hover:shadow-cyan-glow"
              >
                <ShoppingCart className="w-4 h-4" />
                Access Black Market
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {equipmentInventory.map((item) => (
                <div key={item.id} className={`bg-heist-panel rounded-xl p-6 border-2 shadow-hud-panel hover:shadow-${
                  item.rarity === 'legendary' ? 'amber-glow border-amber-400/50' :
                  item.rarity === 'masterwork' ? 'purple-glow border-purple-400/50' :
                  item.rarity === 'advanced' ? 'cyan-glow border-cyan-400/50' :
                  item.rarity === 'improved' ? 'emerald-400/30 border-emerald-400/50' :
                  'border-heist-border'
                } transition-all`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-cyan-400 mb-1 uppercase tracking-wide">{item.name}</h3>
                      <p className="text-gray-400 text-sm capitalize font-mono">{item.type} • {item.rarity}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold font-mono ${
                      item.rarity === 'legendary' ? 'bg-amber-400/20 border border-amber-400/50 text-amber-300' :
                      item.rarity === 'masterwork' ? 'bg-purple-400/20 border border-purple-400/50 text-purple-300' :
                      item.rarity === 'advanced' ? 'bg-cyan-400/20 border border-cyan-400/50 text-cyan-300' :
                      item.rarity === 'improved' ? 'bg-emerald-400/20 border border-emerald-400/50 text-emerald-300' :
                      'bg-heist-dark border border-heist-border text-gray-400'
                    }`}>
                      <Star className="w-3 h-3" />
                      {item.rarity.toUpperCase()}
                    </div>
                  </div>

                  <div className="text-gray-300 text-sm mb-4 font-mono">{item.description}</div>

                  {/* Bonuses */}
                  <div className="space-y-2 mb-4">
                    {Object.keys(item.attributeBonuses).length > 0 && (
                      <div>
                        <div className="flex items-center gap-1 text-gray-400 text-xs mb-1 font-mono uppercase">
                          <TrendingUp className="w-3 h-3" />
                          Attributes:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(item.attributeBonuses).map(([attr, bonus]) => (
                            <span key={attr} className="px-2 py-0.5 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs rounded font-mono font-bold">
                              {attr.slice(0, 3).toUpperCase()} +{bonus}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {Object.keys(item.skillBonuses).length > 0 && (
                      <div>
                        <div className="flex items-center gap-1 text-gray-400 text-xs mb-1 font-mono uppercase">
                          <Sparkles className="w-3 h-3" />
                          Skills:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(item.skillBonuses).map(([skill, bonus]) => (
                            <span key={skill} className="px-2 py-0.5 bg-purple-400/10 border border-purple-400/30 text-purple-400 text-xs rounded capitalize font-mono font-bold">
                              {skill} +{bonus}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Special Effects */}
                  {item.specialEffects && item.specialEffects.length > 0 && (
                    <div className="mb-4 p-3 bg-heist-dark/60 border border-heist-border rounded">
                      <div className="flex items-center gap-1 text-amber-300 text-xs mb-2 font-mono uppercase">
                        <Sparkles className="w-3 h-3" />
                        Special Effects:
                      </div>
                      <ul className="text-xs text-gray-300 space-y-1 font-mono">
                        {item.specialEffects.slice(0, 2).map((effect, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-amber-400">•</span>
                            <span>{effect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="text-gray-400 text-xs font-mono uppercase">Assign to Operative:</div>
                    {selectedTeam.length === 0 ? (
                      <p className="text-gray-500 text-xs italic font-mono">No operatives recruited</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {selectedTeam.map((member) => (
                          <button
                            key={member.id}
                            onClick={() => handleEquip(member.id, item)}
                            className="py-1 px-2 bg-heist-dark/60 hover:bg-cyan-400/20 hover:border-cyan-400/50 border border-heist-border text-gray-300 hover:text-cyan-400 text-xs rounded transition-all font-mono"
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

    </div>
  );
};

export default EquipmentPage;