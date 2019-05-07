import { dailyMode, monthlyMode, yearlyMode } from '../constants';

export const calendarDetails = (mode, year, month, day) => {
  const current = { year, month, day };
  const prev = prevCalendar(mode, year, month, day);
  const next = nextCalendar(mode, year, month, day);
  return { prev, current, next };
};

const prevCalendar = (mode, year, month, day) => {
  let prev = {};
  switch (mode) {
    case yearlyMode:
      prev.year = year - 1;
      break;
    case monthlyMode:
      prev.year = year;
      prev.month = month - 1;
      prev.day = 1;
      if (prev.month < 0) {
        prev.year -= 1;
        prev.month = 11;
      }
      break;
    case dailyMode:
      const currentDay = new Date(year, month, day);
      currentDay.setDate(currentDay.getDate() - 1);
      prev.day = currentDay.getDate();
      prev.month = currentDay.getMonth();
      prev.year = currentDay.getFullYear();
      break;
  }
  return prev;
};

const nextCalendar = (mode, year, month, day) => {
  let next = {};
  switch (mode) {
    case yearlyMode:
      next.year = year + 1;
      break;
    case monthlyMode:
      next.year = year;
      next.month = month + 1;
      next.day = 1;
      if (next.month > 11) {
        next.year += 1;
        next.month = 0;
      }
      break;
    case dailyMode:
      const currentDay = new Date(year, month, day);
      currentDay.setDate(currentDay.getDate() + 1);
      next.day = currentDay.getDate();
      next.month = currentDay.getMonth();
      next.year = currentDay.getFullYear();
      break;
  }
  return next;
};
