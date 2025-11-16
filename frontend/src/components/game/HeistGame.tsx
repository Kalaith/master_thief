import React, { useState } from 'react';
import { GamePage, MissionsPage, RecruitmentPage, TeamPage, EquipmentPage } from './pages';
import GameHeader from './GameHeader';
import MissionResultsModal from './ui/MissionResultsModal';
import { useGameStore } from '../../stores/gameStore';

const HeistGame: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'game' | 'missions' | 'recruitment' | 'team' | 'equipment'>('game');
  const { currentMissionResult, clearMissionResult } = useGameStore();

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'game':
        return <GamePage />;
      case 'missions':
        return <MissionsPage onBackToGame={() => setActiveTab('game')} />;
      case 'recruitment':
        return <RecruitmentPage onBackToGame={() => setActiveTab('game')} />;
      case 'team':
        return <TeamPage onBackToGame={() => setActiveTab('game')} />;
      case 'equipment':
        return <EquipmentPage onBackToGame={() => setActiveTab('game')} />;
      default:
        return <GamePage />;
    }
  };

  return (
    <div className="min-h-screen bg-noir-900 text-noir-200">
      <GameHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto p-6">
        {renderCurrentPage()}
      </main>

      {/* Mission Results Modal */}
      <MissionResultsModal
        result={currentMissionResult}
        onClose={clearMissionResult}
      />
    </div>
  );
};

export default HeistGame;