import React from 'react';
import { useGameStore } from '../../../stores/gameStore';

const ResultsPhase: React.FC = () => {
  const {
    selectedHeist,
    selectedTeam,
    encounterResults,
    completeHeist,
    resetForNextHeist,
  } = useGameStore();

  if (!selectedHeist || selectedTeam.length === 0) {
    return (
      <div className="text-center">
        <p className="text-daemon-text-muted">No heist or team selected</p>
      </div>
    );
  }

  // Calculate success
  const totalEncounters = encounterResults.length;
  const successfulEncounters = encounterResults.filter(r => 
    r.outcome === 'success' || r.outcome === 'critical_success'
  ).length;
  
  const criticalFailures = encounterResults.filter(r => 
    r.outcome === 'critical_failure'
  ).length;

  let heistSuccess = false;
  let payout = 0;

  if (criticalFailures > 0) {
    heistSuccess = false;
  } else if (successfulEncounters >= totalEncounters * 0.5) {
    heistSuccess = true;
    const successRate = successfulEncounters / totalEncounters;
    payout = Math.floor(selectedHeist.potential_payout * successRate);
  }

  React.useEffect(() => {
    if (heistSuccess) {
      completeHeist(true, payout);
    } else {
      completeHeist(false, 0);
    }
  }, [heistSuccess, payout, completeHeist]);

  const handlePlanNextHeist = () => {
    resetForNextHeist();
  };

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-daemon-text-bright">
          {heistSuccess ? '🎉 Heist Successful!' : '💀 Heist Failed'}
        </h2>
      </div>

      {/* Heist Outcome */}
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-8">
          <div className="text-6xl mb-4">
            {heistSuccess ? '💰' : '🚨'}
          </div>
          <div className="text-xl text-daemon-text mb-4">
            {heistSuccess 
              ? "Your crew pulled off the heist!" 
              : "The heist went wrong..."
            }
          </div>
          
          {heistSuccess && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-daemon-text-bright">Rewards</h3>
              <div className="flex justify-between items-center bg-daemon-surface border border-daemon-secondary rounded p-4">
                <span className="text-daemon-text">Heist Payout</span>
                <span className="text-daemon-gold font-bold text-xl">+${payout.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Crew Status */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-daemon-text-bright mb-4 text-center">Crew Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedTeam.map((member) => {
            const memberResults = encounterResults.filter(r => r.member.id === member.id);
            const memberSuccess = memberResults.some(r => 
              r.outcome === 'success' || r.outcome === 'critical_success'
            );
            const memberFailure = memberResults.some(r => 
              r.outcome === 'critical_failure'
            );

            let statusColor = 'text-daemon-success';
            let statusText = 'Active';
            
            if (memberFailure) {
              statusColor = 'text-daemon-danger';
              statusText = 'Complications';
            } else if (!memberSuccess && memberResults.length > 0) {
              statusColor = 'text-daemon-warning';
              statusText = 'Shaken';
            }

            return (
              <div
                key={member.id}
                className="bg-daemon-panel border border-daemon-secondary rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <div className="font-semibold text-daemon-text-bright">{member.name}</div>
                    <div className="text-sm text-daemon-text-muted">{member.specialty}</div>
                  </div>
                  <div className={`font-semibold ${statusColor}`}>
                    {statusText}
                  </div>
                </div>

                {/* Member's encounter results */}
                {memberResults.map((result, index) => (
                  <div key={index} className="text-xs text-daemon-text-muted mb-1">
                    <span className="capitalize">{result.encounter.name}:</span>{' '}
                    <span className={
                      result.outcome === 'critical_success' || result.outcome === 'success'
                        ? 'text-daemon-success'
                        : result.outcome === 'critical_failure' || result.outcome === 'failure'
                        ? 'text-daemon-danger'
                        : 'text-daemon-warning'
                    }>
                      {result.outcome.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Encounter Summary */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-daemon-text-bright mb-4 text-center">Mission Summary</h3>
        
        <div className="bg-daemon-panel border border-daemon-secondary rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-daemon-success">{successfulEncounters}</div>
              <div className="text-daemon-text-muted">Successful Encounters</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-daemon-warning">
                {totalEncounters - successfulEncounters - criticalFailures}
              </div>
              <div className="text-daemon-text-muted">Partial Successes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-daemon-danger">{criticalFailures}</div>
              <div className="text-daemon-text-muted">Critical Failures</div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Action */}
      <div className="text-center pt-6">
        <button
          onClick={handlePlanNextHeist}
          className="py-3 px-8 bg-daemon-primary hover:bg-daemon-primaryHover text-white rounded-lg font-semibold transition-colors"
        >
          Plan Next Heist
        </button>
      </div>
    </div>
  );
};

export default ResultsPhase;