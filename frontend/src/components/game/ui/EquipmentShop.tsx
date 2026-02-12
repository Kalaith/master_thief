import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useGameStore } from '../../../stores/gameStore';
import { basicEquipment } from '../../../data/equipment';
import type { Equipment, EquipmentSlot, EquipmentRarity } from '../../../types/game';

const EquipmentShop: React.FC = () => {
  const { budget, equipmentInventory, selectedTeam, purchaseEquipment, tutorial, nextTutorialStep } = useGameStore();
  const [selectedType, setSelectedType] = useState<EquipmentSlot | 'all'>('all');
  const [selectedRarity, setSelectedRarity] = useState<EquipmentRarity | 'all'>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rarity' | 'name'>('price-asc');

  // Get owned equipment IDs for comparison
  const ownedEquipmentIds = useMemo(() =>
    new Set(equipmentInventory.map(e => e.id)),
    [equipmentInventory]
  );

  // Filter and sort equipment
  const filteredEquipment = useMemo(() => {
    let items = [...basicEquipment];

    // Filter by type
    if (selectedType !== 'all') {
      items = items.filter(item => item.type === selectedType);
    }

    // Filter by rarity
    if (selectedRarity !== 'all') {
      items = items.filter(item => item.rarity === selectedRarity);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        items.sort((a, b) => a.cost - b.cost);
        break;
      case 'price-desc':
        items.sort((a, b) => b.cost - a.cost);
        break;
      case 'rarity': {
        const rarityOrder: { [key in EquipmentRarity]: number } = {
          basic: 1,
          improved: 2,
          advanced: 3,
          masterwork: 4,
          legendary: 5
        };
        items.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
        break;
      }
      case 'name':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return items;
  }, [selectedType, selectedRarity, sortBy]);

  const handlePurchase = (item: Equipment) => {
    // Check if already owned
    if (ownedEquipmentIds.has(item.id)) {
      toast.error('You already own this item!');
      return;
    }

    // Check budget
    if (budget < item.cost) {
      toast.error(`Not enough funds! You need $${item.cost - budget} more.`);
      return;
    }

    // Check level requirement
    if (item.requiredLevel) {
      const hasQualifiedMember = selectedTeam.some(m => m.progression.level >= item.requiredLevel!);
      if (!hasQualifiedMember) {
        toast.error(`No team member is level ${item.requiredLevel} or higher!`);
        return;
      }
    }

    // Check class requirement
    if (item.requiredClass && item.requiredClass.length > 0) {
      const hasQualifiedMember = selectedTeam.some(m =>
        item.requiredClass!.includes(m.characterClass)
      );
      if (!hasQualifiedMember) {
        toast.error(`No team member has required class: ${item.requiredClass.join(', ')}`);
        return;
      }
    }

    // Purchase
    const success = purchaseEquipment(item);
    if (success) {
      toast.success(`Purchased ${item.name} for $${item.cost}!`);

      // Advance tutorial if on buy-equipment step
      if (tutorial.active && tutorial.currentStep === 'buy-equipment') {
        setTimeout(() => nextTutorialStep(), 500);
      }
    }
  };

  const getRarityColor = (rarity: EquipmentRarity): string => {
    switch (rarity) {
      case 'legendary': return 'border-amber-400';
      case 'masterwork': return 'border-purple-400';
      case 'advanced': return 'border-cyan-400';
      case 'improved': return 'border-emerald-400';
      default: return 'border-heist-border';
    }
  };

  const getRarityBadgeColor = (rarity: EquipmentRarity): string => {
    switch (rarity) {
      case 'legendary': return 'bg-amber-400/20 border border-amber-400/50 text-amber-400';
      case 'masterwork': return 'bg-purple-400/20 border border-purple-400/50 text-purple-400';
      case 'advanced': return 'bg-cyan-400/20 border border-cyan-400/50 text-cyan-400';
      case 'improved': return 'bg-emerald-400/20 border border-emerald-400/50 text-emerald-400';
      default: return 'bg-heist-dark border border-heist-border text-gray-400';
    }
  };

  const canAfford = (item: Equipment) => budget >= item.cost;
  const isOwned = (item: Equipment) => ownedEquipmentIds.has(item.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-heist-panel border-2 border-heist-border rounded-xl p-4 shadow-hud-panel">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-cyan-400 uppercase tracking-wide">🏪 Black Market</h3>
            <p className="text-gray-400 text-sm font-mono">High-quality gear for discerning professionals</p>
          </div>
          <div className="text-right">
            <div className="text-gray-400 text-sm font-mono uppercase">Available Funds</div>
            <div className="text-2xl font-bold text-amber-400 font-mono">${budget}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-heist-panel border-2 border-heist-border rounded-xl p-4 space-y-4 shadow-hud-panel">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Type Filter */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block font-mono uppercase">Equipment Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as EquipmentSlot | 'all')}
              className="w-full px-3 py-2 bg-heist-dark border border-heist-border rounded text-gray-300 focus:outline-none focus:border-cyan-400 font-mono"
            >
              <option value="all">All Types</option>
              <option value="weapon">Weapons</option>
              <option value="armor">Armor</option>
              <option value="accessory">Accessories</option>
              <option value="tool">Tools</option>
              <option value="gadget">Gadgets</option>
            </select>
          </div>

          {/* Rarity Filter */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block font-mono uppercase">Rarity</label>
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value as EquipmentRarity | 'all')}
              className="w-full px-3 py-2 bg-heist-dark border border-heist-border rounded text-gray-300 focus:outline-none focus:border-cyan-400 font-mono"
            >
              <option value="all">All Rarities</option>
              <option value="basic">Basic</option>
              <option value="improved">Improved</option>
              <option value="advanced">Advanced</option>
              <option value="masterwork">Masterwork</option>
              <option value="legendary">Legendary</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block font-mono uppercase">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full px-3 py-2 bg-heist-dark border border-heist-border rounded text-gray-300 focus:outline-none focus:border-cyan-400 font-mono"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rarity">Rarity</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 text-sm font-mono">
          <div className="text-gray-400">
            Showing <span className="text-cyan-400 font-bold">{filteredEquipment.length}</span> items
          </div>
          <div className="text-gray-400">|</div>
          <div className="text-gray-400">
            Owned: <span className="text-emerald-400 font-bold">{equipmentInventory.length}</span>
          </div>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEquipment.map((item) => {
          const owned = isOwned(item);
          const affordable = canAfford(item);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-heist-panel border-2 ${getRarityColor(item.rarity)} rounded-xl p-4 shadow-hud-panel hover:shadow-lg transition-all ${
                owned ? 'opacity-60' : ''
              }`}
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-cyan-400 mb-1 uppercase tracking-wide">{item.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-xs capitalize font-mono">{item.type}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${getRarityBadgeColor(item.rarity)}`}>
                        {item.rarity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  {owned && (
                    <div className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded text-emerald-300 text-xs font-bold font-mono">
                      OWNED
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-3 flex-1 font-mono">{item.description}</p>

                {/* Bonuses */}
                <div className="space-y-2 mb-3">
                  {Object.keys(item.attributeBonuses).length > 0 && (
                    <div>
                      <div className="text-gray-400 text-xs mb-1 font-mono uppercase">Attributes:</div>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(item.attributeBonuses).map(([attr, bonus]) => (
                          <span key={attr} className="px-2 py-0.5 bg-purple-400/20 border border-purple-400/30 text-purple-400 text-xs rounded font-mono">
                            {attr.slice(0, 3).toUpperCase()} +{bonus}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {Object.keys(item.skillBonuses).length > 0 && (
                    <div>
                      <div className="text-gray-400 text-xs mb-1 font-mono uppercase">Skills:</div>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(item.skillBonuses).map(([skill, bonus]) => (
                          <span key={skill} className="px-2 py-0.5 bg-cyan-400/20 border border-cyan-400/30 text-cyan-400 text-xs rounded capitalize font-mono">
                            {skill} +{bonus}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Special Effects */}
                {item.specialEffects && item.specialEffects.length > 0 && (
                  <div className="mb-3">
                    <div className="text-gray-400 text-xs mb-1 font-mono uppercase">Special:</div>
                    <ul className="text-xs text-amber-300 space-y-0.5 font-mono">
                      {item.specialEffects.map((effect, idx) => (
                        <li key={idx}>• {effect}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {(item.requiredLevel || item.requiredClass) && (
                  <div className="mb-3 p-2 bg-heist-dark/60 border border-heist-border rounded">
                    <div className="text-gray-400 text-xs mb-1 font-mono uppercase">Requirements:</div>
                    {item.requiredLevel && (
                      <div className="text-xs text-gray-300 font-mono">Level {item.requiredLevel}+</div>
                    )}
                    {item.requiredClass && (
                      <div className="text-xs text-gray-300 capitalize font-mono">
                        {item.requiredClass.join(', ')}
                      </div>
                    )}
                  </div>
                )}

                {/* Price and Purchase */}
                <div className="mt-auto pt-3 border-t border-heist-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-gray-400 text-xs font-mono uppercase">Price</div>
                      <div className={`text-xl font-bold font-mono ${affordable ? 'text-amber-400' : 'text-gray-600'}`}>
                        ${item.cost}
                      </div>
                    </div>
                    <button
                      onClick={() => handlePurchase(item)}
                      disabled={owned || !affordable}
                      className={`px-4 py-2 rounded font-bold text-sm transition-all duration-200 font-mono uppercase ${
                        owned
                          ? 'bg-heist-dark border border-heist-border text-gray-600 cursor-not-allowed'
                          : affordable
                          ? 'bg-cyan-400/20 hover:bg-cyan-400/30 border border-cyan-400 text-cyan-400 hover:shadow-cyan-glow'
                          : 'bg-heist-dark border border-heist-border text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      {owned ? 'Owned' : affordable ? 'Purchase' : 'Too Expensive'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredEquipment.length === 0 && (
        <div className="text-center py-12 bg-heist-panel border border-heist-border rounded-xl">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-400 mb-2 uppercase tracking-wide">No Items Found</h3>
          <p className="text-gray-500 font-mono">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default EquipmentShop;
