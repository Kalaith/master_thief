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
      case 'rarity':
        const rarityOrder: { [key in EquipmentRarity]: number } = {
          basic: 1,
          improved: 2,
          advanced: 3,
          masterwork: 4,
          legendary: 5
        };
        items.sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);
        break;
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
      case 'legendary': return 'from-gold-500 to-gold-600';
      case 'masterwork': return 'from-purple-500 to-purple-600';
      case 'advanced': return 'from-blue-500 to-blue-600';
      case 'improved': return 'from-emerald-500 to-emerald-600';
      default: return 'from-noir-600 to-noir-700';
    }
  };

  const getRarityBadgeColor = (rarity: EquipmentRarity): string => {
    switch (rarity) {
      case 'legendary': return 'bg-gold-500 text-noir-900';
      case 'masterwork': return 'bg-purple-600 text-white';
      case 'advanced': return 'bg-blue-600 text-white';
      case 'improved': return 'bg-emerald-600 text-white';
      default: return 'bg-noir-600 text-white';
    }
  };

  const canAfford = (item: Equipment) => budget >= item.cost;
  const isOwned = (item: Equipment) => ownedEquipmentIds.has(item.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-noir-800 border-2 border-gold-500/30 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-serif font-bold text-gold-300">🏪 Black Market</h3>
            <p className="text-noir-400 text-sm">High-quality gear for discerning professionals</p>
          </div>
          <div className="text-right">
            <div className="text-noir-400 text-sm">Available Funds</div>
            <div className="text-2xl font-bold text-blood-500">${budget}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-noir-800 border-2 border-gold-500/30 rounded-xl p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Type Filter */}
          <div>
            <label className="text-noir-400 text-sm mb-2 block">Equipment Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as EquipmentSlot | 'all')}
              className="w-full px-3 py-2 bg-noir-700 border border-noir-600 rounded-lg text-noir-200 focus:outline-none focus:border-gold-500"
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
            <label className="text-noir-400 text-sm mb-2 block">Rarity</label>
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value as EquipmentRarity | 'all')}
              className="w-full px-3 py-2 bg-noir-700 border border-noir-600 rounded-lg text-noir-200 focus:outline-none focus:border-gold-500"
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
            <label className="text-noir-400 text-sm mb-2 block">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full px-3 py-2 bg-noir-700 border border-noir-600 rounded-lg text-noir-200 focus:outline-none focus:border-gold-500"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rarity">Rarity</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 text-sm">
          <div className="text-noir-400">
            Showing <span className="text-gold-300 font-bold">{filteredEquipment.length}</span> items
          </div>
          <div className="text-noir-400">|</div>
          <div className="text-noir-400">
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
              className={`bg-gradient-to-br ${getRarityColor(item.rarity)} p-[2px] rounded-xl ${
                owned ? 'opacity-60' : ''
              }`}
            >
              <div className="bg-noir-800 rounded-xl p-4 h-full flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg font-serif font-bold text-gold-300 mb-1">{item.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-noir-400 text-xs capitalize">{item.type}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${getRarityBadgeColor(item.rarity)}`}>
                        {item.rarity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  {owned && (
                    <div className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded text-emerald-300 text-xs font-bold">
                      OWNED
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-noir-300 text-sm mb-3 flex-1">{item.description}</p>

                {/* Bonuses */}
                <div className="space-y-2 mb-3">
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
                  <div className="mb-3">
                    <div className="text-noir-400 text-xs mb-1">Special:</div>
                    <ul className="text-xs text-gold-200 space-y-0.5">
                      {item.specialEffects.map((effect, idx) => (
                        <li key={idx}>• {effect}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {(item.requiredLevel || item.requiredClass) && (
                  <div className="mb-3 p-2 bg-noir-700 rounded">
                    <div className="text-noir-400 text-xs mb-1">Requirements:</div>
                    {item.requiredLevel && (
                      <div className="text-xs text-noir-300">Level {item.requiredLevel}+</div>
                    )}
                    {item.requiredClass && (
                      <div className="text-xs text-noir-300 capitalize">
                        {item.requiredClass.join(', ')}
                      </div>
                    )}
                  </div>
                )}

                {/* Price and Purchase */}
                <div className="mt-auto pt-3 border-t border-noir-700">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-noir-400 text-xs">Price</div>
                      <div className={`text-xl font-bold ${affordable ? 'text-blood-500' : 'text-noir-500'}`}>
                        ${item.cost}
                      </div>
                    </div>
                    <button
                      onClick={() => handlePurchase(item)}
                      disabled={owned || !affordable}
                      className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                        owned
                          ? 'bg-noir-700 text-noir-500 cursor-not-allowed'
                          : affordable
                          ? 'bg-gradient-to-r from-blood-500 to-gold-500 hover:from-blood-600 hover:to-gold-400 text-noir-900'
                          : 'bg-noir-700 text-noir-500 cursor-not-allowed'
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
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-serif text-noir-300 mb-2">No Items Found</h3>
          <p className="text-noir-400">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};

export default EquipmentShop;
