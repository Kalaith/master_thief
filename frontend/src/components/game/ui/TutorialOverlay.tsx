import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../../stores/gameStore';
import { tutorialSteps } from '../../../data/tutorialSteps';
import { X, ChevronRight, SkipForward } from 'lucide-react';

const TutorialOverlay: React.FC = () => {
  const { tutorial, nextTutorialStep, skipTutorial } = useGameStore();

  if (!tutorial.active || !tutorial.currentStep) return null;

  const currentStepData = tutorialSteps[tutorial.currentStep];

  if (!currentStepData) return null;

  const handleNext = () => {
    if (tutorial.currentStep === 'tutorial-complete') {
      skipTutorial();
    } else {
      nextTutorialStep();
    }
  };

  const handleSkip = () => {
    if (window.confirm('Are you sure you want to skip the tutorial? You can always replay it later from the settings.')) {
      skipTutorial();
    }
  };

  const getPositionClasses = () => {
    switch (currentStepData.position) {
      case 'top':
        return 'top-4 left-1/2 -translate-x-1/2';
      case 'bottom':
        return 'bottom-4 left-1/2 -translate-x-1/2';
      case 'left':
        return 'top-1/2 left-4 -translate-y-1/2';
      case 'right':
        return 'top-1/2 right-4 -translate-y-1/2';
      case 'center':
      default:
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    }
  };

  return (
    <AnimatePresence>
      {/* Tutorial Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`fixed z-50 max-w-md w-full pointer-events-auto ${getPositionClasses()}`}
        style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.3)' }}
      >
        <div className="relative bg-heist-panel border-2 border-cyan-400 rounded-xl shadow-2xl overflow-hidden"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.98)' }}
        >
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600/30 to-purple-600/30 border-b border-cyan-400/30 p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-cyan-400 uppercase tracking-wide mb-2">
                {currentStepData.title}
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-heist-dark rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(tutorial.completedSteps.length / 14) * 100}%`
                    }}
                    className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full"
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-cyan-400 text-xs font-mono">
                  {tutorial.completedSteps.length}/14
                </span>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="ml-4 p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              title="Skip tutorial"
            >
              <X className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
              {currentStepData.description}
            </p>
          </div>

          {currentStepData.action && (
            <div className="mt-4 p-3 bg-cyan-400/10 border border-cyan-400/30 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5">
                  <ChevronRight className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-mono mb-1">Next Action</p>
                  <p className="text-cyan-300 text-sm font-semibold">{currentStepData.action}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-heist-dark/60 border-t border-heist-border p-3">
          <div className="flex justify-between items-center gap-2">
            <button
              onClick={handleSkip}
              className="flex items-center gap-1 px-3 py-2 bg-red-400/20 hover:bg-red-400/30 border border-red-400 text-red-400 rounded font-mono font-bold uppercase transition-all duration-200 text-xs"
            >
              <SkipForward className="w-3 h-3" />
              Skip
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-400/20 hover:bg-cyan-400/30 border border-cyan-400 text-cyan-400 rounded font-mono font-bold uppercase transition-all duration-200 hover:shadow-cyan-glow text-sm"
            >
              {tutorial.currentStep === 'tutorial-complete' ? 'Finish' : 'Next'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TutorialOverlay;
