import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameHeader from './GameHeader';

describe('GameHeader', () => {
  it('should render all navigation tabs', () => {
    const mockOnTabChange = vi.fn();

    render(<GameHeader activeTab="game" onTabChange={mockOnTabChange} />);

    expect(screen.getByText('Game')).toBeInTheDocument();
    expect(screen.getByText('Missions')).toBeInTheDocument();
    expect(screen.getByText('Recruitment')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
    expect(screen.getByText('Equipment')).toBeInTheDocument();
  });

  it('should highlight active tab', () => {
    const mockOnTabChange = vi.fn();

    render(<GameHeader activeTab="missions" onTabChange={mockOnTabChange} />);

    const missionsTab = screen.getByText('Missions');
    expect(missionsTab.closest('button')).toHaveClass(/active|selected/i);
  });

  it('should call onTabChange when tab is clicked', async () => {
    const mockOnTabChange = vi.fn();
    const user = userEvent.setup();

    render(<GameHeader activeTab="game" onTabChange={mockOnTabChange} />);

    const teamTab = screen.getByText('Team');
    await user.click(teamTab);

    expect(mockOnTabChange).toHaveBeenCalledWith('team');
  });

  it('should display game title', () => {
    const mockOnTabChange = vi.fn();

    render(<GameHeader activeTab="game" onTabChange={mockOnTabChange} />);

    expect(screen.getByText(/Master Thief/i)).toBeInTheDocument();
  });

  it('should render all tabs as clickable buttons', () => {
    const mockOnTabChange = vi.fn();

    render(<GameHeader activeTab="game" onTabChange={mockOnTabChange} />);

    const buttons = screen.getAllByRole('button');

    // Should have 5 tab buttons
    expect(buttons.length).toBeGreaterThanOrEqual(5);
  });
});
