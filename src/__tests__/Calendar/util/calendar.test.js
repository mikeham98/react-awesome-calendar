import { getCalendarMonth, formatEvents, getEventsForCalendar, getMonthName } from '../../../app/Calendar/util/calendar';
import {events} from '../../__constants__/events';

describe('calendar', () => {
  describe('getCalendarMonth', () => {
    it('should return a month from 28th April - 1st June', () => {
      const month = 4;
      const year = 2019;
      expect(getCalendarMonth(month, year)).toMatchSnapshot();
    });
  });
  describe('formatEvents', () => {
    it('should return an object of key value pairs of dates with an array', () => {
      expect(formatEvents(events)).toMatchSnapshot();
    });
  });
});