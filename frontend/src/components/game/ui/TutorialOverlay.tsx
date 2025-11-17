import React, { useEffect } from 'react';
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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
      >
        {/* Tutorial Modal */}
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative bg-heist-panel border-2 border-cyan-400 rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden"
          style={{ boxShadow: '0 0 40px rgba(34, 211, 238, 0.3)' }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600/30 to-purple-600/30 border-b border-cyan-400/30 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-cyan-400 uppercase tracking-wide mb-2">
                  {currentStepData.title}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-heist-dark rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(tutorial.completedSteps.length / 13) * 100}%`
                      }}
                      className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span className="text-cyan-400 text-sm font-mono">
                    {tutorial.completedSteps.length}/13
                  </span>
                </div>
              </div>
              <button
                onClick={handleSkip}
                className="ml-4 p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                title="Skip tutorial"
              >
                <X className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line font-mono">
                {currentStepData.description}
              </p>
            </div>

            {currentStepData.action && (
              <div className="mt-6 p-4 bg-cyan-400/10 border border-cyan-400/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <ChevronRight className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase font-mono mb-1">Next Action</p>
                    <p className="text-cyan-300 font-semibold">{currentStepData.action}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-heist-dark/60 border-t border-heist-border p-6">
            <div className="flex justify-between items-center">
              <button
                onClick={handleSkip}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 transition-colors font-mono"
              >
                <SkipForward className="w-4 h-4" />
                Skip Tutorial
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-400 text-white rounded-xl font-bold uppercase tracking-wide transition-all duration-200 shadow-lg shadow-purple-glow"
              >
                {tutorial.currentStep === 'tutorial-complete' ? 'Finish' : 'Next'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TutorialOverlay;
