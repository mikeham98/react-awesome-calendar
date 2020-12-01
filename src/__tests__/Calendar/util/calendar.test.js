import {
  getCalendarMonth,
  formatEvents,
  getEventsForCalendar,
  getMonthName,
  dateDiff,
} from '../../../app/Calendar/util/calendar';
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
  describe('dateDiff', () => {
    it('should return the correct number of days between the dates', () => {
      expect(dateDiff(new Date('2020-10-01T08:15:00.000000Z'), new Date('2020-10-01T11:15:00.000000Z'))).toBe(1);
      expect(dateDiff(new Date('2020-10-02T09:00:00.000000Z'), new Date('2020-10-02T13:00:00.000000Z'))).toBe(1);
      expect(dateDiff(new Date('2020-10-03T13:30:00.000000Z'), new Date('2020-10-03T18:30:00.000000Z'))).toBe(1);
      expect(dateDiff(new Date('2020-10-04T09:00:00.000000Z'), new Date('2020-10-04T12:00:00.000000Z'))).toBe(1);
      expect(dateDiff(new Date('2020-10-05T12:00:00.000000Z'), new Date('2020-10-05T15:00:00.000000Z'))).toBe(1);
      expect(dateDiff(new Date('2020-10-06T10:00:00.000000Z'), new Date('2020-10-07T00:00:00.000000Z'))).toBe(1);
      expect(dateDiff(new Date('2020-10-07T13:45:00.000000Z'), new Date('2020-10-08T00:00:00.000000Z'))).toBe(1);
      expect(dateDiff(new Date('2020-10-08T12:00:00.000000Z'), new Date('2020-10-09T00:00:00.000000Z'))).toBe(1);

      expect(dateDiff(new Date('2020-08-31T11:00:00.000000Z'), new Date('2020-09-01T11:00:00.000000Z'))).toBe(2);
      expect(dateDiff(new Date('2020-09-01T11:00:00.000000Z'), new Date('2020-09-02T14:00:00.000000Z'))).toBe(2);
      expect(dateDiff(new Date('2020-09-03T13:30:00.000000Z'), new Date('2020-09-04T18:30:00.000000Z'))).toBe(2);
      expect(dateDiff(new Date('2020-09-04T10:00:00.000000Z'), new Date('2020-09-05T12:00:00.000000Z'))).toBe(2);
      expect(dateDiff(new Date('2020-09-06T12:00:00.000000Z'), new Date('2020-09-07T21:00:00.000000Z'))).toBe(2);
      expect(dateDiff(new Date('2020-09-07T06:00:00.000000Z'), new Date('2020-09-09T00:00:00.000000Z'))).toBe(2);
      expect(dateDiff(new Date('2020-09-09T16:30:00.000000Z'), new Date('2020-09-11T00:00:00.000000Z'))).toBe(2);
      expect(dateDiff(new Date('2020-09-11T12:00:00.000000Z'), new Date('2020-09-13T00:00:00.000000Z'))).toBe(2);
      expect(dateDiff(new Date('2020-09-13T13:45:00.000000Z'), new Date('2020-09-14T09:00:00.000000Z'))).toBe(2);


      expect(dateDiff(new Date('2020-09-15T08:30:00.000000Z'), new Date('2020-09-17T11:00:00.000000Z'))).toBe(3);
      expect(dateDiff(new Date('2020-09-18T08:45:00.000000Z'), new Date('2020-09-20T17:45:00.000000Z'))).toBe(3);
      expect(dateDiff(new Date('2020-09-21T14:00:00.000000Z'), new Date('2020-09-23T17:00:00.000000Z'))).toBe(3);
      expect(dateDiff(new Date('2020-09-24T11:15:00.000000Z'), new Date('2020-09-26T12:00:00.000000Z'))).toBe(3);
      expect(dateDiff(new Date('2020-09-25T12:00:00.000000Z'), new Date('2020-09-27T17:30:00.000000Z'))).toBe(3);
      expect(dateDiff(new Date('2020-09-28T04:00:00.000000Z'), new Date('2020-10-01T00:00:00.000000Z'))).toBe(3);
      expect(dateDiff(new Date('2020-10-01T16:00:00.000000Z'), new Date('2020-10-04T00:00:00.000000Z'))).toBe(3);
      expect(dateDiff(new Date('2020-10-03T12:00:00.000000Z'), new Date('2020-10-06T00:00:00.000000Z'))).toBe(3);
      expect(dateDiff(new Date('2020-07-06T17:00:00.000000Z'), new Date('2020-07-08T09:00:00.000000Z'))).toBe(3);

      expect(dateDiff(new Date('2020-06-01T09:50:00.000000Z'), new Date('2020-06-04T11:00:00.000000Z'))).toBe(4);
      expect(dateDiff(new Date('2020-06-05T11:50:00.000000Z'), new Date('2020-06-08T21:20:00.000000Z'))).toBe(4);
      expect(dateDiff(new Date('2020-06-09T14:00:00.000000Z'), new Date('2020-06-12T21:00:00.000000Z'))).toBe(4);
      expect(dateDiff(new Date('2020-06-13T05:00:00.000000Z'), new Date('2020-06-16T12:00:00.000000Z'))).toBe(4);
      expect(dateDiff(new Date('2020-06-17T12:00:00.000000Z'), new Date('2020-06-20T21:00:00.000000Z'))).toBe(4);
      expect(dateDiff(new Date('2020-06-21T09:50:00.000000Z'), new Date('2020-06-25T00:00:00.000000Z'))).toBe(4);
      expect(dateDiff(new Date('2020-06-25T17:00:00.000000Z'), new Date('2020-06-29T00:00:00.000000Z'))).toBe(4);
      expect(dateDiff(new Date('2020-06-30T12:00:00.000000Z'), new Date('2020-07-04T00:00:00.000000Z'))).toBe(4);
      expect(dateDiff(new Date('2020-07-05T17:10:00.000000Z'), new Date('2020-07-08T09:30:00.000000Z'))).toBe(4);
    });
  });
});
