//SARAH
//calculate teams week numbers
export function getWeekNumber(date) {
  const currentDate = new Date(date);
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startOfYear) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return weekNumber < 10 ? `0${weekNumber}` : weekNumber; //add 0 for single-digit weeks
}
