/**
 * Pricing constants for registration
 * Update these values in a single place to change pricing across the application
 */
export const PARTICIPANT_COST = 510;
export const GUEST_COST = 510;

/**
 * Calculate the total cost for registration
 * @param guestCount - Number of guests
 * @returns Total cost in BDT
 */
export function calculateTotalCost(guestCount: number): number {
  return PARTICIPANT_COST + guestCount * GUEST_COST;
}
