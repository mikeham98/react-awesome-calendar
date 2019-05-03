import {startPosition, middlePosition, endPosition} from "../constants";

let firstDayOfWeek = 0;
let lastDayOfWeek = 6;

const dateDiff = (start, end) => {
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const getStartOfCalendar = (date) => {
    let originalStartDate = new Date(date.getTime());
    let actualStartDate = new Date(date.getTime());

    if (originalStartDate.getDay() !== firstDayOfWeek) {
        actualStartDate.setDate(originalStartDate.getDate() - originalStartDate.getDay() + firstDayOfWeek);
    }
    return actualStartDate;
};

const getEndOfCalendar = (date) => {
    let originalEndDate = new Date(date.getTime());
    let actualEndDate = new Date(date.getTime());

    if (originalEndDate !== 7 - 1 - firstDayOfWeek) {
        actualEndDate.setDate(originalEndDate.getDate() - originalEndDate.getDay() + lastDayOfWeek);
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
            currentDate.setDate(actualStartDate.getDate() + (x * 7) + y);
            week.push({
                current: currentDate.getMonth() === originalStartDate.getMonth(),
                date: currentDate
            });
        }
        calendar.push(week);
    }
    return calendar;
};

export const formatEvents = (events) => {
    let formattedEvents = {};
    events.forEach(event => {
        const from = new Date(event.from);
        const to = new Date(event.to);
        const fromDateOnly = new Date(from.getFullYear(), from.getMonth(), from.getDate());
        const toDateOnly = new Date(to.getFullYear(), to.getMonth(), to.getDate());

        if (fromDateOnly.getTime() === toDateOnly.getTime()) {
            if (!Array.isArray(formattedEvents[fromDateOnly.getTime()])) {
                formattedEvents[fromDateOnly.getTime()] = [];
            }
            formattedEvents[fromDateOnly.getTime()].push({
                ...event,
                date: from,
                from,
                to
            });
        } else {
            const daySpan = dateDiff(from, to);
            for (let x = 0; x < daySpan; x++) {
                const date = new Date(fromDateOnly.getTime());
                date.setDate(fromDateOnly.getDate() + x);
                let position;
                if (x === 0) {
                    position = startPosition;
                } else if (x < daySpan - 1) {
                    position = middlePosition
                } else {
                    position = endPosition
                }

                const dateTime = date.getTime();
                if (!Array.isArray(formattedEvents[dateTime])) {
                    formattedEvents[dateTime] = [];
                }
                formattedEvents[dateTime].push({
                    ...event,
                    date,
                    position
                });
            }
        }
    });

    Object.keys(formattedEvents).forEach(date => {
        formattedEvents[date] = formattedEvents[date].sort((a,b) =>  new Date(a.from) - new Date(b.from));
    });

    console.log('formattedEvents',formattedEvents);
    return formattedEvents;
};

export const getEventsForCalendar = (events, calendar) => {
    if (Array.isArray(events) && events.length) {
        const formattedEvents = formatEvents(events);

        return calendar.map(week => {
            return week.map(day => {
                let events = undefined;
                if(formattedEvents[day.date.getTime()]) {
                    events = formattedEvents[day.date.getTime()];
                }
                return {
                    ...day,
                    events
                }
            });
        })
    }
    return calendar;
};

export const getMonthName = (month) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
};

export const prevCalendar = () => {

};
export const nextCalendar = () => {

};