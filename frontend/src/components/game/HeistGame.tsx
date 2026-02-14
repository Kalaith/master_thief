import React, { useState, useEffect } from 'react';
import GamePage from './pages/GamePage';
import MissionsPage from './pages/MissionsPage';
import RecruitmentPage from './pages/RecruitmentPage';
import TeamPage from './pages/TeamPage';
import EquipmentPage from './pages/EquipmentPage';
import GameHeader from './GameHeader';
import MissionResultsModal from './ui/MissionResultsModal';
import TutorialOverlay from './ui/TutorialOverlay';
import { useGameStore } from '../../stores/gameStore';

const HeistGame: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'game' | 'missions' | 'recruitment' | 'team' | 'equipment'
  >('recruitment');
  const {
    currentMissionResult,
    clearMissionResult,
    tutorial,
    startTutorial,
    selectedTeam,
    heistsCompleted,
  } = useGameStore();

  // Auto-start tutorial for new players
  useEffect(() => {
    // Start tutorial if:
    // 1. Tutorial hasn't been skipped
    // 2. No team members recruited yet
    // 3. No heists completed
    if (
      !tutorial.skipped &&
      !tutorial.active &&
      selectedTeam.length === 0 &&
      heistsCompleted === 0
    ) {
      startTutorial();
    }
  }, [tutorial.skipped, tutorial.active, selectedTeam.length, heistsCompleted, startTutorial]);

  // Auto-navigate based on tutorial step
  useEffect(() => {
    if (!tutorial.active || !tutorial.currentStep) return;

    switch (tutorial.currentStep) {
      case 'recruitment-intro':
      case 'recruit-first-character':
      case 'recruit-second-character':
        setActiveTab('recruitment');
        break;
      case 'missions-intro':
      case 'select-mission':
        setActiveTab('missions');
        break;
      case 'wait-for-mission':
      case 'collect-rewards':
        setActiveTab('game');
        break;
      case 'equipment-intro':
      case 'buy-equipment':
      case 'equip-character':
        setActiveTab('equipment');
        break;
    }
  }, [tutorial.active, tutorial.currentStep]);

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
    <div className="min-h-screen bg-gradient-to-b from-heist-darkest to-heist-darker text-gray-200 relative">
      {/* Cinematic noir vignette overlay */}
      <div
        className="fixed inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/60"
        style={{
          background:
            'radial-gradient(circle at center, transparent 0%, transparent 60%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      <div className="relative z-10">
        <GameHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="container mx-auto p-6">{renderCurrentPage()}</main>

        {/* Mission Results Modal */}
        <MissionResultsModal result={currentMissionResult} onClose={clearMissionResult} />

        {/* Tutorial Overlay */}
        <TutorialOverlay />
      </div>
    </div>
  );
};

export default HeistGame;
