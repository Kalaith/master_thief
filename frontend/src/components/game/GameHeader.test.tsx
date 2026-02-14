import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameHeader from './GameHeader';

describe('GameHeader', () => {
  it('should render all navigation tabs', () => {
    const mockOnTabChange = vi.fn();

    render(<GameHeader activeTab="game" onTabChange={mockOnTabChange} />);

    // Get all buttons and check their labels
    expect(screen.getByRole('button', { name: /operations/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /targets/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /recruit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crew/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /gear/i })).toBeInTheDocument();
  });

  it('should highlight active tab', () => {
    const mockOnTabChange = vi.fn();

    render(<GameHeader activeTab="missions" onTabChange={mockOnTabChange} />);

    const missionsTab = screen.getByText(/Targets/);
    expect(missionsTab.closest('button')).toHaveClass(/bg-cyan-400/);
  });

  it('should call onTabChange when tab is clicked', async () => {
    const mockOnTabChange = vi.fn();
    const user = userEvent.setup();

    render(<GameHeader activeTab="game" onTabChange={mockOnTabChange} />);

    const teamTab = screen.getByText(/Crew/);
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
