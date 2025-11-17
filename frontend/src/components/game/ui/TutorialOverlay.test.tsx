import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TutorialOverlay from './TutorialOverlay';
import { useGameStore } from '../../../stores/gameStore';

describe('TutorialOverlay', () => {
  beforeEach(() => {
    const { newGame } = useGameStore.getState();
    newGame();
  });

  it('should not render when tutorial is inactive', () => {
    const { container } = render(<TutorialOverlay />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render when tutorial is active', () => {
    const { startTutorial } = useGameStore.getState();
    startTutorial();

    render(<TutorialOverlay />);

    expect(screen.getByText(/Welcome to Master Thief!/i)).toBeInTheDocument();
  });

  it('should display current step title and description', () => {
    const { startTutorial } = useGameStore.getState();
    startTutorial();

    render(<TutorialOverlay />);

    expect(screen.getByText(/Welcome to Master Thief!/i)).toBeInTheDocument();
    expect(screen.getByText(/Build your criminal empire/i)).toBeInTheDocument();
  });

  it('should show progress indicator', () => {
    const { startTutorial } = useGameStore.getState();
    startTutorial();

    render(<TutorialOverlay />);

    expect(screen.getByText('0/13')).toBeInTheDocument();
  });

  it('should advance to next step when Next button clicked', async () => {
    const user = userEvent.setup();
    const { startTutorial } = useGameStore.getState();
    startTutorial();

    render(<TutorialOverlay />);

    const nextButton = screen.getByRole('button', { name: /Next/i });
    await user.click(nextButton);

    const tutorial = useGameStore.getState().tutorial;
    expect(tutorial.currentStep).toBe('recruitment-intro');
  });

  it('should show skip tutorial button', () => {
    const { startTutorial } = useGameStore.getState();
    startTutorial();

    render(<TutorialOverlay />);

    expect(screen.getByText(/Skip Tutorial/i)).toBeInTheDocument();
  });

  it('should show action callout when step has action', () => {
    const { startTutorial } = useGameStore.getState();
    startTutorial();

    render(<TutorialOverlay />);

    expect(screen.getByText(/Next Action/i)).toBeInTheDocument();
  });

  it('should update progress as tutorial advances', async () => {
    const user = userEvent.setup();
    const { startTutorial } = useGameStore.getState();
    startTutorial();

    const { rerender } = render(<TutorialOverlay />);

    expect(screen.getByText('0/13')).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /Next/i });
    await user.click(nextButton);

    rerender(<TutorialOverlay />);

    expect(screen.getByText('1/13')).toBeInTheDocument();
  });

  it('should show Finish button on final step', async () => {
    const user = userEvent.setup();
    const { startTutorial, setTutorialStep } = useGameStore.getState();
    startTutorial();
    setTutorialStep('tutorial-complete');

    render(<TutorialOverlay />);

    expect(screen.getByRole('button', { name: /Finish/i })).toBeInTheDocument();
  });

  it('should close tutorial when Finish clicked on last step', async () => {
    const user = userEvent.setup();
    const { startTutorial, setTutorialStep } = useGameStore.getState();
    startTutorial();
    setTutorialStep('tutorial-complete');

    render(<TutorialOverlay />);

    const finishButton = screen.getByRole('button', { name: /Finish/i });
    await user.click(finishButton);

    const tutorial = useGameStore.getState().tutorial;
    expect(tutorial.active).toBe(false);
  });

  it('should skip tutorial when skip button confirmed', async () => {
    const user = userEvent.setup();
    const { startTutorial } = useGameStore.getState();
    startTutorial();

    // Mock window.confirm to return true
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    render(<TutorialOverlay />);

    const skipButtons = screen.getAllByText(/Skip Tutorial/i);
    await user.click(skipButtons[0]);

    const tutorial = useGameStore.getState().tutorial;
    expect(tutorial.active).toBe(false);
    expect(tutorial.skipped).toBe(true);

    vi.restoreAllMocks();
  });

  it('should not skip tutorial when skip button cancelled', async () => {
    const user = userEvent.setup();
    const { startTutorial } = useGameStore.getState();
    startTutorial();

    // Mock window.confirm to return false
    vi.spyOn(window, 'confirm').mockReturnValue(false);

    render(<TutorialOverlay />);

    const skipButtons = screen.getAllByText(/Skip Tutorial/i);
    await user.click(skipButtons[0]);

    const tutorial = useGameStore.getState().tutorial;
    expect(tutorial.active).toBe(true);
    expect(tutorial.skipped).toBe(false);

    vi.restoreAllMocks();
  });
});
