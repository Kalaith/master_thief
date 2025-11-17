import { describe, it, expect } from 'vitest';
import { formatDuration } from './timeFormatting';

describe('formatDuration', () => {
  it('formats minutes correctly', () => {
    expect(formatDuration(0.083)).toBe('5 minutes'); // 5 minutes
    expect(formatDuration(0.167)).toBe('10 minutes'); // 10 minutes
    expect(formatDuration(0.417)).toBe('25 minutes'); // 25 minutes
  });

  it('formats single minute correctly', () => {
    expect(formatDuration(0.017)).toBe('1 minute'); // 1 minute (singular)
  });

  it('formats hours correctly', () => {
    expect(formatDuration(1)).toBe('1 hour');
    expect(formatDuration(2)).toBe('2 hours');
    expect(formatDuration(24)).toBe('24 hours');
  });

  it('formats hours and minutes correctly', () => {
    expect(formatDuration(1.5)).toBe('1 hour and 30 minutes'); // 1 hour 30 minutes
    expect(formatDuration(2.25)).toBe('2 hours and 15 minutes'); // 2 hours 15 minutes
    expect(formatDuration(3.75)).toBe('3 hours and 45 minutes'); // 3 hours 45 minutes
  });

  it('handles edge cases', () => {
    expect(formatDuration(0)).toBe('0 minutes');
    expect(formatDuration(0.016)).toBe('1 minute'); // Rounds to 1 minute
  });

  it('formats game mission durations correctly', () => {
    // Quick jobs
    expect(formatDuration(0.083)).toBe('5 minutes'); // Pickpocket
    expect(formatDuration(0.133)).toBe('8 minutes'); // Car break-in

    // Beginner
    expect(formatDuration(1)).toBe('1 hour'); // Corner store
    expect(formatDuration(2)).toBe('2 hours'); // Parking meters

    // Amateur
    expect(formatDuration(3)).toBe('3 hours'); // Apartment burglary
    expect(formatDuration(4)).toBe('4 hours'); // Electronics store

    // Professional
    expect(formatDuration(5)).toBe('5 hours'); // Art gallery
    expect(formatDuration(6)).toBe('6 hours'); // Jewelry store
    expect(formatDuration(8)).toBe('8 hours'); // Corporate espionage

    // Expert
    expect(formatDuration(10)).toBe('10 hours'); // Casino
    expect(formatDuration(12)).toBe('12 hours'); // Bank vault

    // Legendary
    expect(formatDuration(24)).toBe('24 hours'); // Federal reserve
  });
});
