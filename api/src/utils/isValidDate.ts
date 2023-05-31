export function isValidDate(date: string): boolean {
  const formattedDate = new Date(date);

  if(isNaN(formattedDate.getTime())) {
    return false;
  }

  if(formattedDate < new Date()) {
    return false;
  }

  return true;
}
