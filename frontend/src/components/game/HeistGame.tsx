import React, { useState } from 'react';
import { GamePage, MissionsPage, RecruitmentPage, TeamPage, EquipmentPage } from './pages';
import GameHeader from './GameHeader';

const HeistGame: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'game' | 'missions' | 'recruitment' | 'team' | 'equipment'>('game');

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
    </div>
  );
};

export default HeistGame;