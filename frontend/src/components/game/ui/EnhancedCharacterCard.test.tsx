import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EnhancedCharacterCard from './EnhancedCharacterCard';
import type { TeamMember } from '../../../types/game';

describe('EnhancedCharacterCard', () => {
  const mockCharacter: TeamMember = {
    id: 1,
    name: 'Shadow',
    specialty: 'Infiltration Specialist',
    background: 'Former intelligence operative',
    rarity: 'rare',
    characterClass: 'infiltrator',
    attributes: {
      strength: 12,
      dexterity: 16,
      intelligence: 14,
      wisdom: 13,
      charisma: 11,
      constitution: 12,
    },
    skills: {
      stealth: 8,
      athletics: 5,
      combat: 4,
      lockpicking: 7,
      hacking: 6,
      social: 5,
    },
    progression: {
      level: 5,
      experience: 1200,
      experienceToNext: 2500,
      attributePoints: 2,
      skillPoints: 4,
      masteryLevel: 2,
      heistsCompleted: 15,
      successRate: 78,
    },
    equipment: {},
    derivedStats: {
      health: 15,
      stamina: 12,
      initiative: 4,
      carryingCapacity: 180,
      criticalChance: 0.08,
      criticalMultiplier: 1.5,
    },
    special_ability: 'Master of Shadows: +3 stealth in darkness',
    cost: 4500,
    fatigue: 20,
    loyalty: 85,
    injuries: [],
  };

  it('should render character name', () => {
    render(<EnhancedCharacterCard character={mockCharacter} />);

    expect(screen.getByText('Shadow')).toBeInTheDocument();
  });

  it('should display character level', () => {
    render(<EnhancedCharacterCard character={mockCharacter} />);

    expect(screen.getByText(/level 5/i)).toBeInTheDocument();
  });

  it('should display rarity badge', () => {
    render(<EnhancedCharacterCard character={mockCharacter} />);

    expect(screen.getByText(/rare/i)).toBeInTheDocument();
  });

  it('should display character cost', () => {
    render(<EnhancedCharacterCard character={mockCharacter} />);

    expect(screen.getByText(/\$4,500/)).toBeInTheDocument();
  });

  it('should show specialty', () => {
    render(<EnhancedCharacterCard character={mockCharacter} />);

    expect(screen.getByText('Infiltration Specialist')).toBeInTheDocument();
  });

  it('should call onClick when recruit button is clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<EnhancedCharacterCard character={mockCharacter} onClick={handleClick} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should disable button when character is recruited', () => {
    render(<EnhancedCharacterCard character={mockCharacter} isRecruited={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should show recruited text when character is recruited', () => {
    render(<EnhancedCharacterCard character={mockCharacter} isRecruited={true} />);

    expect(screen.getByText(/recruited/i)).toBeInTheDocument();
  });

  it('should display skill values', () => {
    render(<EnhancedCharacterCard character={mockCharacter} showDetails={true} />);

    // Check for skills - these might be in abbreviated form
    expect(screen.getByText(/stealth/i)).toBeInTheDocument();
    expect(screen.getByText(/8/)).toBeInTheDocument(); // Stealth value
  });

  it('should display character class', () => {
    render(<EnhancedCharacterCard character={mockCharacter} />);

    expect(screen.getByText(/infiltrator/i)).toBeInTheDocument();
  });

  it('should render different rarity styles', () => {
    const legendaryChar = { ...mockCharacter, rarity: 'legendary' as const };
    const { rerender } = render(<EnhancedCharacterCard character={mockCharacter} />);

    const commonCard = screen.getByRole('article') || screen.getByTestId('character-card');
    expect(commonCard).toHaveClass(/rare/);

    rerender(<EnhancedCharacterCard character={legendaryChar} />);

    const legendaryCard = screen.getByRole('article') || screen.getByTestId('character-card');
    expect(legendaryCard).toHaveClass(/legendary/);
  });

  it('should display experience progress when showDetails is true', () => {
    render(<EnhancedCharacterCard character={mockCharacter} showDetails={true} />);

    // Should show experience or progress bar
    expect(screen.getByText(/1,200/)).toBeInTheDocument(); // Current XP
    expect(screen.getByText(/2,500/)).toBeInTheDocument(); // XP to next level
  });

  it('should show special ability when showDetails is true', () => {
    render(<EnhancedCharacterCard character={mockCharacter} showDetails={true} />);

    expect(screen.getByText(/Master of Shadows/i)).toBeInTheDocument();
  });
});
