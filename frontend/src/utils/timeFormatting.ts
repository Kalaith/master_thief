/**
 * Formats hours into a human-readable duration string
 * @param hours - Duration in hours (can be decimal)
 * @returns Formatted string like "5 minutes", "1 hour", "1 hour and 30 minutes"
 */
export function formatDuration(hours: number): string {
  // Convert hours to minutes
  const totalMinutes = Math.round(hours * 60);

  // Less than 60 minutes - show as minutes
  if (totalMinutes < 60) {
    return `${totalMinutes} minute${totalMinutes !== 1 ? 's' : ''}`;
  }

  // Calculate hours and remaining minutes
  const wholeHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  // Just hours (no minutes)
  if (remainingMinutes === 0) {
    return `${wholeHours} hour${wholeHours !== 1 ? 's' : ''}`;
  }

  // Hours and minutes
  const hourText = `${wholeHours} hour${wholeHours !== 1 ? 's' : ''}`;
  const minuteText = `${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
  return `${hourText} and ${minuteText}`;
}
