import { getCalendarMonth, formatEvents, getEventsForCalendar, getMonthName } from '../../../app/Calendar/util/calendar';

describe('calendar', () => {
  describe('getCalendarMonth', () => {
    it('should return a month from 28th April - 1st June', () => {
      const month = 4;
      const year = 2019;
      expect(getCalendarMonth(month, year)).toMatchSnapshot();
    });
  });
});