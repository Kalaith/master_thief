import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useGameStore } from '../../../stores/gameStore';
import TeamAssignment from '../TeamAssignment';
import PageHeader from '../ui/PageHeader';
import type { AutomatedHeist } from '../../../types/game';
import { Map, DollarSign, Clock, AlertTriangle, Users, ChevronDown, ChevronUp, Play, Timer, Heart, Zap, Target } from 'lucide-react';
import { formatDuration } from '../../../utils/timeFormatting';

interface MissionsPageProps {
  onBackToGame: () => void;
}

const MissionsPage: React.FC<MissionsPageProps> = ({ onBackToGame }) => {
  const { activeAutomatedHeists, automatedHeists, selectedTeam, tutorial, nextTutorialStep } = useGameStore();
  const [selectedHeist, setSelectedHeist] = useState<string | null>(null);
  const [missionForTeamAssignment, setMissionForTeamAssignment] = useState<AutomatedHeist | null>(null);

  // No longer need component-level timer - it's now global in the store

  const availableHeists = automatedHeists.filter((heist) => {
    // Show heists that are always available (no unlock conditions) or tutorial heists
    return !heist.unlockConditions || heist.unlockConditions.length === 0 ||
           heist.unlockConditions.some(condition =>
             condition.includes('always available') || condition.includes('Tutorial')
           );
  });

  // If no heists are available, show the first few as a fallback for development
  const displayHeists = availableHeists.length > 0 ? availableHeists : automatedHeists.slice(0, 4);

  const canStartHeist = (heist: AutomatedHeist) => {
    return selectedTeam.length >= heist.requirements.minTeamSize &&
           selectedTeam.length <= heist.requirements.maxTeamSize;
  };

  const handleStartHeist = (heist: AutomatedHeist) => {
    if (canStartHeist(heist)) {
      setMissionForTeamAssignment(heist);

      // Advance tutorial if on select-mission step
      if (tutorial.active && tutorial.currentStep === 'select-mission') {
        setTimeout(() => nextTutorialStep(), 500);
      }
    } else {
      // Provide feedback about why the mission can't be started
      if (selectedTeam.length < heist.requirements.minTeamSize) {
        toast.error(`You need at least ${heist.requirements.minTeamSize} team members to start this mission.`);
      } else if (selectedTeam.length > heist.requirements.maxTeamSize) {
        toast.error(`You can only have ${heist.requirements.maxTeamSize} team members for this mission.`);
      } else {
        toast.error('Unable to start mission. Please check team requirements.');
      }
    }
  };

  const handleTeamAssignmentConfirm = () => {
    if (missionForTeamAssignment) {
      // Mission already started in useTeamAssignment hook
      setMissionForTeamAssignment(null);
      toast.success(`Mission "${missionForTeamAssignment.name}" started! Check the Active Missions section to monitor progress.`);

      // Advance tutorial if on start-mission step
      if (tutorial.active && tutorial.currentStep === 'start-mission') {
        setTimeout(() => nextTutorialStep(), 500);
      }
    }
  };

  const handleTeamAssignmentCancel = () => {
    setMissionForTeamAssignment(null);
  };

  return (
    <div className="space-y-6">
      {/* Show team assignment screen if a mission is selected */}
      {missionForTeamAssignment && (
        <TeamAssignment
          mission={missionForTeamAssignment}
          onConfirm={handleTeamAssignmentConfirm}
          onCancel={handleTeamAssignmentCancel}
        />
      )}

      {/* Show main missions page only when not assigning team */}
      {!missionForTeamAssignment && (
        <>
          <PageHeader
            icon={Map}
            title="Target Selection"
            description="Available targets and ongoing operations"
          />

      {/* Available Heists Section */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-cyan-400 uppercase tracking-wide">
          <Map className="w-6 h-6" />
          Available Targets
        </h3>

        {displayHeists.length === 0 ? (
          <div className="bg-heist-panel border border-heist-border rounded-xl p-12 text-center">
            <AlertTriangle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 font-mono">No targets available yet. Complete more heists to unlock new operations.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {displayHeists.map((heist) => (
              <div key={heist.id} className="bg-heist-panel border border-heist-border rounded-xl p-4 hover:border-cyan-400/50 hover:shadow-cyan-glow transition-all">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-cyan-400 mb-1 uppercase tracking-wide">{heist.name}</h4>
                    <p className="text-gray-400 text-sm mb-2 leading-relaxed">{heist.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center gap-1 text-amber-300 font-bold font-mono mb-1">
                      <DollarSign className="w-4 h-4" />
                      {heist.rewards.basePayout}
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-xs font-mono">
                      <Clock className="w-3 h-3" />
                      {formatDuration(heist.duration)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-heist-dark/60 border border-heist-border rounded p-2">
                    <div className="text-gray-400 text-xs font-mono uppercase">Risk Level</div>
                    <div className={`font-bold font-mono ${
                      heist.riskLevel <= 3 ? 'text-emerald-400' :
                      heist.riskLevel <= 6 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {heist.riskLevel}/10
                    </div>
                  </div>
                  <div className="bg-heist-dark/60 border border-heist-border rounded p-2">
                    <div className="text-gray-400 text-xs font-mono uppercase">Team Size</div>
                    <div className="text-purple-400 font-bold font-mono">
                      {heist.requirements.minTeamSize}-{heist.requirements.maxTeamSize}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedHeist(selectedHeist === heist.id ? null : heist.id)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-heist-dark/60 hover:bg-heist-dark border border-heist-border hover:border-cyan-400/50 text-gray-300 rounded text-sm transition-all font-mono"
                  >
                    {selectedHeist === heist.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    {selectedHeist === heist.id ? 'HIDE' : 'DETAILS'}
                  </button>
                  <button
                    onClick={() => handleStartHeist(heist)}
                    disabled={!canStartHeist(heist)}
                    className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded text-sm font-bold font-mono uppercase transition-all ${
                      canStartHeist(heist)
                        ? 'bg-cyan-400/20 hover:bg-cyan-400/30 border border-cyan-400 text-cyan-400 hover:shadow-cyan-glow'
                        : 'bg-heist-dark border border-heist-border text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <Play className="w-4 h-4" />
                    Deploy
                  </button>
                </div>

                {selectedHeist === heist.id && (
                  <div className="mt-3 pt-3 border-t border-heist-border">
                    <div className="text-sm text-gray-300 space-y-2 font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duration:</span>
                        <span className="text-cyan-400">{formatDuration(heist.duration)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Risk:</span>
                        <span className="text-cyan-400">{heist.riskLevel}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reward:</span>
                        <span className="text-amber-300">${heist.rewards.basePayout}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Experience:</span>
                        <span className="text-purple-400">{Math.floor(heist.rewards.basePayout * heist.rewards.experienceMultiplier)} XP</span>
                      </div>
                      {heist.requirements.requiredSkills && (
                        <div className="pt-2 border-t border-heist-border">
                          <div className="text-gray-500 mb-1">Required Skills:</div>
                          <div className="text-cyan-400 text-xs">{Object.entries(heist.requirements.requiredSkills).map(([skill, level]) => `${skill} ${level}+`).join(', ')}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Missions Section */}
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-2xl font-bold text-cyan-400 uppercase tracking-wide">
          <Timer className="w-6 h-6" />
          Active Operations
        </h3>

        {activeAutomatedHeists.length === 0 ? (
          <div className="bg-heist-panel border border-heist-border rounded-xl p-12 text-center">
            <Target className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-400 mb-2 uppercase tracking-wide">No Active Operations</h3>
            <p className="text-gray-500 font-mono text-sm">Select a target above to deploy your crew.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activeAutomatedHeists.map((activeHeist, index) => (
              <div key={index} className="bg-heist-panel border border-cyan-400/30 rounded-xl p-6 shadow-hud-panel">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-cyan-400 mb-2 uppercase tracking-wide">
                      {activeHeist.heist.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{activeHeist.heist.description}</p>
                  </div>
                  <div className="ml-4 bg-amber-400/10 border border-amber-400/30 rounded px-3 py-2">
                    <div className="flex items-center gap-1 text-amber-300 font-bold font-mono text-lg whitespace-nowrap">
                      <Clock className="w-4 h-4" />
                      {Math.max(0, Math.floor(activeHeist.timeRemaining / 60))}h {activeHeist.timeRemaining % 60}m
                    </div>
                    <div className="text-gray-500 text-xs font-mono uppercase text-center">Remaining</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-heist-dark/60 border border-heist-border rounded p-3">
                    <div className="flex items-center gap-1 text-gray-400 text-xs font-mono uppercase mb-1">
                      <AlertTriangle className="w-3 h-3" />
                      Risk
                    </div>
                    <div className={`font-bold font-mono ${
                      activeHeist.heist.riskLevel <= 3 ? 'text-emerald-400' :
                      activeHeist.heist.riskLevel <= 6 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {activeHeist.heist.riskLevel}/10
                    </div>
                  </div>
                  <div className="bg-heist-dark/60 border border-heist-border rounded p-3">
                    <div className="flex items-center gap-1 text-gray-400 text-xs font-mono uppercase mb-1">
                      <Users className="w-3 h-3" />
                      Operators
                    </div>
                    <div className="text-purple-400 font-bold font-mono">{activeHeist.team.length}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-gray-400 text-xs font-mono uppercase mb-2">Deployed Team:</div>
                  {activeHeist.team.map((member) => (
                    <div key={member.id} className="flex justify-between items-center bg-heist-dark/60 border border-heist-border rounded p-2">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-bold">{member.name}</span>
                        <span className="text-gray-500 text-xs font-mono">({member.specialty})</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-mono">
                        <div className="flex items-center gap-1 text-green-400">
                          <Heart className="w-3 h-3" />
                          {member.derivedStats.health}
                        </div>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Zap className="w-3 h-3" />
                          {member.fatigue}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
        </>
      )}
    </div>
  );
};

export default MissionsPage;