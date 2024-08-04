export function parseDateString(dateStr) {
  const date = new Date(Number(dateStr));
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  } else {
    return date.toLocaleDateString(); // Outputs the date
  }
}
