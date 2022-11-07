export const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export function getDaysForCalendarPage(date: Date) {
  let current = new Date(date);
  current.setDate(1);
  const untilMonth = getNextMonthIndex(current);
  const result: Date[][] = [[], [], [], [], [], [], []];
  let week = -1;
  while (current.getDay() !== 1) {
    current.setTime(current.getTime() - DAY);
  }
  while (current.getMonth() !== untilMonth) {
    current.getDay() === 1 && week++;
    result[week].push(new Date(current));
    current.setTime(current.getTime() + DAY);
  }
  return result;
}

export function getMonth(date: Date) {
  return MONTHS[date.getMonth()];
}

export function getNextMonthIndex(date: Date) {
  const month = date.getMonth();
  return month === 11 ? 0 : month + 1;
}

export function getPrevMonthIndex(date: Date) {
  const month = date.getMonth();
  return month === 0 ? 11 : month - 1;
}

export function changeMonth(date: Date, month: number) {
  const result = new Date(date);
  result.setMonth(month);
  return result;
}

export function nextMonth(date: Date) {
  return changeMonth(date, getNextMonthIndex(date));
}

export function prevMonth(date: Date) {
  return changeMonth(date, getPrevMonthIndex(date));
}

export function notSunday(date: Date) {
  if (date.getDay() === 0) {
    return new Date(date.getTime() + DAY);
  }
  return new Date(date);
}
