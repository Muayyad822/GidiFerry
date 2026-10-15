export const isNightBanActive = (departureDate: Date): boolean => {
  const hours = departureDate.getHours();
  const minutes = departureDate.getMinutes();

  // 18:30 is 6:30 PM
  if (hours > 18 || (hours === 18 && minutes >= 30)) {
    return true; // Ban is active
  }
  return false;
};

export const canIssueTicket = (vesselOccupancy: number, vesselCapacity: number): boolean => {
  if (vesselOccupancy >= vesselCapacity) {
    return false; // Vessel is full or overloaded
  }
  return true; // Safe to issue
};
