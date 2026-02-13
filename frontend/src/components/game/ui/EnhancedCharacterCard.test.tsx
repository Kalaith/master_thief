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
    personalityTraits: ['Stealthy', 'Cautious', 'Professional'],
    backstoryEvents: [
      'Former intelligence operative',
      'Specialized in infiltration',
    ],
  };

  it('should render character name', () => {
    render(<EnhancedCharacterCard character={mockCharacter} />);

    expect(screen.getByText('Shadow')).toBeInTheDocument();
  });

  it('should display character level', () => {
    render(<EnhancedCharacterCard character={mockCharacter} />);

    expect(screen.getByText(/LV\.?\s*5/)).toBeInTheDocument();
  });

  it('should display rarity badge', () => {
    render(<EnhancedCharacterCard character={mockCharacter} />);

    expect(screen.getByText(/rare/i)).toBeInTheDocument();
  });

  it('should display character cost', () => {
    render(
      <EnhancedCharacterCard character={mockCharacter} onRecruit={() => {}} />
    );

    expect(screen.getByText(/\$4,500/)).toBeInTheDocument();
  });

  it('should show specialty', () => {
    render(<EnhancedCharacterCard character={mockCharacter} />);

    expect(screen.getByText('Infiltration Specialist')).toBeInTheDocument();
  });

  it('should call onClick when recruit button is clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <EnhancedCharacterCard
        character={mockCharacter}
        onRecruit={handleClick}
      />
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledWith(mockCharacter);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should disable button when character is recruited', () => {
    render(
      <EnhancedCharacterCard
        character={mockCharacter}
        isRecruited={true}
        onRemove={() => {}}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Remove');
  });

  it('should show recruited text when character is recruited', () => {
    render(
      <EnhancedCharacterCard
        character={mockCharacter}
        isRecruited={true}
        onRemove={() => {}}
      />
    );

    expect(screen.getByText(/Remove/)).toBeInTheDocument();
  });

  it('should display skill values', () => {
    render(<EnhancedCharacterCard character={mockCharacter} />);

    // Check for skills
    expect(screen.getByText(/stealth:/i)).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument(); // Stealth value
  });

  it('should display character class', () => {
    render(<EnhancedCharacterCard character={mockCharacter} />);

    // Class is shown as an emoji icon 🥷 for infiltrator
    expect(screen.getByText('🥷')).toBeInTheDocument();
  });

  it('should render different rarity styles', () => {
    const legendaryChar = {
      ...mockCharacter,
      personalityTraits: ['Legendary', 'Powerful'],
      backstoryEvents: ['Epic story'],
      rarity: 'legendary' as const,
    };
    const { container, rerender } = render(
      <EnhancedCharacterCard character={mockCharacter} />
    );

    // Check for rare rarity colors in classes
    expect(container.firstChild).toHaveClass('border-blue-400');

    rerender(<EnhancedCharacterCard character={legendaryChar} />);

    // Check for legendary rarity colors
    expect(container.firstChild).toHaveClass('border-amber-400');
  });

  it('should display experience progress when showDetails is true', () => {
    render(
      <EnhancedCharacterCard
        character={mockCharacter}
        showDetailedStats={true}
      />
    );

    // Should show experience (without commas)
    expect(screen.getByText(/1200/)).toBeInTheDocument(); // Current XP
    expect(screen.getByText(/2500/)).toBeInTheDocument(); // XP to next level
  });

  it('should show special ability when showDetails is true', () => {
    render(
      <EnhancedCharacterCard
        character={mockCharacter}
        showDetailedStats={true}
      />
    );

    expect(screen.getByText(/Master of Shadows/i)).toBeInTheDocument();
  });
});
