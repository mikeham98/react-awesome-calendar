import { endPosition, middlePosition, startPosition } from '../constants';
import { getDate } from './date';

let firstDayOfWeek = 0;
let lastDayOfWeek = 6;

// export const dateDiff = (start, end) => {
//   const from = new Date(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
//   const to = new Date(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());
//
//   const timeDiff = Math.abs(from.getTime() - to.getTime());
//   const dayDiff = timeDiff / (1000 * 3600 * 24);
//   let value =  dayDiff + 1;
//   const toDate = getDate(end);
//   const toDateAsTime = toDate.getTime();
//   if (end.getTime() === toDateAsTime) {
//     value -= 1;
//   }
//   return value;
// };

export const dateDiff = (start, end) => {
  const from = new Date(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate());
  const to = new Date(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate());

  const timeDiff = Math.abs(from.getTime() - to.getTime());
  const dayDiff = timeDiff / (1000 * 3600 * 24);
  let value =  dayDiff + 1;
  if (end.getUTCHours() === 0 && end.getUTCMinutes() === 0 && end.getUTCSeconds() === 0) {
    value -= 1;
  }
  return value;
};

const getStartOfCalendar = date => {
  let originalStartDate = new Date(date.getTime());
  let actualStartDate = new Date(date.getTime());

  if (originalStartDate.getDay() !== firstDayOfWeek) {
    actualStartDate.setDate(
      originalStartDate.getDate() - originalStartDate.getDay() + firstDayOfWeek,
    );
  }
  return actualStartDate;
};

const getEndOfCalendar = date => {
  let originalEndDate = new Date(date.getTime());
  let actualEndDate = new Date(date.getTime());

  if (originalEndDate !== 7 - 1 - firstDayOfWeek) {
    actualEndDate.setDate(
      originalEndDate.getDate() - originalEndDate.getDay() + lastDayOfWeek,
    );
  }
  return actualEndDate;
};

export const getCalendarMonth = (month, year) => {
  let originalStartDate = new Date(year, month, 1);
  let originalEndDate = new Date(year, month + 1, 0);

  let actualStartDate = getStartOfCalendar(originalStartDate);
  let actualEndDate = getEndOfCalendar(originalEndDate);

  let dayDifference = dateDiff(actualStartDate, actualEndDate);

  let calendar = [];

  for (let x = 0; x < dayDifference / 7; x++) {
    let week = [];
    for (let y = 0; y < 7; y++) {
      let currentDate = new Date(actualStartDate.getTime());
      currentDate.setDate(actualStartDate.getDate() + x * 7 + y);
      week.push({
        current: currentDate.getMonth() === originalStartDate.getMonth(),
        date: currentDate,
      });
    }
    calendar.push(week);
  }
  return calendar;
};

export const formatEvents = events => {
  let formattedEvents = {};
  if (Array.isArray(events) && events.length) {
    events.forEach(event => {
      const from = new Date(event.from);
      const to = new Date(event.to);
      const fromDate = getDate(from);
      const toDate = getDate(to);
      const fromDateAsTime = fromDate.getTime();
      const toDateAsTime = toDate.getTime();
      // if the from date is the same as the to date

      if (fromDateAsTime === toDateAsTime) {
        if (!Array.isArray(formattedEvents[fromDateAsTime])) {
          formattedEvents[fromDateAsTime] = [];
        }
        formattedEvents[fromDateAsTime].push({
          ...event,
          date: from,
          from,
          to,
        });
      } else {
        const daySpan = dateDiff(from, to);
        if (daySpan === 1) {
          if (!Array.isArray(formattedEvents[fromDateAsTime])) {
            formattedEvents[fromDateAsTime] = [];
          }
          if(from.getUTCHours() === 0 && to.getUTCHours() === 0) {
            formattedEvents[fromDateAsTime].push({
              ...event,
              allDay: true,
              date: from,
              span: daySpan
            });
          }else {
            formattedEvents[fromDateAsTime].push({
              ...event,
              date: from,
              span: daySpan
            });
          }
        } else {
          // loop over each day between the from - to date
          for (let x = 0; x < daySpan; x++) {
            const dateIteration = new Date(fromDateAsTime);
            dateIteration.setDate(fromDate.getDate() + x);

            // work out whether the event is positioned first, middle or last
            let position;
            if (x === 0) {
              position = startPosition;
            } else if (x < daySpan - 1) {
              position = middlePosition;
            } else {
              position = endPosition;
            }

            const dateTime = dateIteration.getTime();
            if (!Array.isArray(formattedEvents[dateTime])) {
              formattedEvents[dateTime] = [];
            }
            formattedEvents[dateTime].push({
              ...event,
              spread: true,
              date: dateIteration,
              position,
              span: daySpan
            });
          }
        }
      }
    });
    // sort each event by date time
    Object.keys(formattedEvents).forEach(date => {
      formattedEvents[date] = formattedEvents[date].sort(
        (a, b) => new Date(a.from) - new Date(b.from),
      );
    });
  }

  return formattedEvents;
};

export const getEventsForCalendar = (events, calendar) => {
  if (events && Object.keys(events)) {
    return calendar.map(week => {
      return week.map(day => {
        let dayEvents;
        if (events[day.date.getTime()]) {
          dayEvents = events[day.date.getTime()];
        }
        return {
          ...day,
          events: dayEvents,
        };
      });
    });
  }
  return calendar;
};

export const getMonthName = month => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[month];
};
