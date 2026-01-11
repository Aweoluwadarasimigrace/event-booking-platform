export const isEventEnded = (endDate: string, endTime?: string) => {
  if (!endDate) return false;

  const endDateTime = endTime
    ? new Date(`${endDate}T${endTime}`)
    : new Date(endDate);

  return new Date() > endDateTime;
};
