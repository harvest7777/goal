export const formatMinutesToHoursAndMinutes = (mins: number): string => {
  const hours = Math.floor(mins / 60);
  const minutes = Math.round(mins % 60);

  if (hours >= 1) {
    return `${hours} h ${minutes} m`;
  } else {
    return `${minutes} m`;
  }
}