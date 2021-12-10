import { calendarDetails } from '../../../app/Calendar/util/calendarDetails';
import { dailyMode, monthlyMode, yearlyMode } from '../../../app/Calendar/constants';

describe('calendarDetails', () => {
  let mode;
  let currentYear;
  let currentMonth;
  let currentDay;
  describe('daily', () => {
    beforeEach(() => {
      mode = dailyMode;
    });
    it('should return current (2019, 0, 1), prev (2018, 11, 31) and next (2019, 0, 2)', () => {
      currentYear = 2019;
      currentMonth = 0;
      currentDay = 1;
      expect(calendarDetails(mode, currentYear, currentMonth, currentDay)).toEqual({
        prev: {
          day: 31,
          month: 11,
          year: 2018,
        },
        current: {
          day: currentDay,
          month: currentMonth,
          year: currentYear,
        },
        next: {
          day: 2,
          month: 0,
          year: 2019,
        },
      });
    });
    it('should return current (2019, 5, 30), prev (2019, 5, 29) and next (2019, 6, 1)', () => {
      currentYear = 2019;
      currentMonth = 5;
      currentDay = 30;
      expect(calendarDetails(mode, currentYear, currentMonth, currentDay)).toEqual({
        prev: {
          day: 29,
          month: 5,
          year: 2019,
        },
        current: {
          day: currentDay,
          month: currentMonth,
          year: currentYear,
        },
        next: {
          day: 1,
          month: 6,
          year: 2019,
        },
      });
    });
  });
  describe('monthly', () => {
    beforeEach(() => {
      mode = monthlyMode;
    });
    it('should return current (2019, 0, 1), prev (2018, 11, 1) and next (2019, 1, 1)', () => {
      currentYear = 2019;
      currentMonth = 0;
      currentDay = 1;
      expect(calendarDetails(mode, currentYear, currentMonth, currentDay)).toEqual({
        prev: {
          day: 1,
          month: 11,
          year: 2018,
        },
        current: {
          day: currentDay,
          month: currentMonth,
          year: currentYear,
        },
        next: {
          day: 1,
          month: 1,
          year: 2019,
        },
      });
    });
    it('should return current (2018, 10, 15), prev (2018, 11, 1) and next (2019, 0, 1)', () => {
      currentYear = 2018;
      currentMonth = 11;
      currentDay = 15;
      expect(calendarDetails(mode, currentYear, currentMonth, currentDay)).toEqual({
        prev: {
          day: 1,
          month: 10,
          year: 2018,
        },
        current: {
          day: currentDay,
          month: currentMonth,
          year: currentYear,
        },
        next: {
          day: 1,
          month: 0,
          year: 2019,
        },
      });
    });
  });
  describe('yearly', () => {
    beforeEach(() => {
      mode = yearlyMode;
    });
    it('should return current (2019, 0, 1), prev (2018) and next (2020)', () => {
      currentYear = 2019;
      currentMonth = 0;
      currentDay = 1;
      expect(calendarDetails(mode, currentYear, currentMonth, currentDay)).toEqual({
        prev: {
          year: 2018,
        },
        current: {
          day: currentDay,
          month: currentMonth,
          year: currentYear,
        },
        next: {
          year: 2020,
        },
      });
    });
    it('should return current (2019, 5, 30), prev (2018) and next (2020)', () => {
      currentYear = 2019;
      currentMonth = 5;
      currentDay = 30;
      expect(calendarDetails(mode, currentYear, currentMonth, currentDay)).toEqual({
        prev: {
          year: 2018,
        },
        current: {
          day: currentDay,
          month: currentMonth,
          year: currentYear,
        },
        next: {
          year: 2020,
        },
      });
    });
  });
});
