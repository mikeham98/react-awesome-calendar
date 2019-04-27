const firstDayOfWeek = 0;
const lastDayOfWeek = 6;

const returnDifferenceInDaysBetweenTwoDate = (start, end) => {
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const getStartOfCalendar = (date) => {
    let originalStartDate = new Date(date.getTime());
    let actualStartDate = new Date(date.getTime());

    if (originalStartDate !== firstDayOfWeek) {
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

export const getCalendar = (month, year) => {
    let originalStartDate = new Date(year, month, 1);
    let originalEndDate = new Date(year, month + 1, 0);
    let actualStartDate = getStartOfCalendar(originalStartDate);
    let actualEndDate = getEndOfCalendar(originalEndDate);

    let dayDifference = returnDifferenceInDaysBetweenTwoDate(actualStartDate, actualEndDate);

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

export const getMonthName = (month) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
};