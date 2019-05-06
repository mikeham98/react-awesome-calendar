# React Awesome Calendar 📅
*react-awesome-calendar* is a library that allows you to easily add a calendar to your application. React Awesome Calendar also supports the ability to display events.

## Installation
```bash
npm install --save react-awesome-calendar
```

## Basic use
```bash
import Calendar from 'react-awesome-calendar';


const events = [{
    id: 1,
    color: '#fd3153',
    from: '2019-05-02T18:00:00+00:00',
    to: '2019-05-05T19:00:00+00:00',
    title: 'This is an event'
}, {
    id: 2,
    color: '#1ccb9e',
    from: '2019-05-01T13:00:00+00:00',
    to: '2019-05-05T14:00:00+00:00',
    title: 'This is another event'
}, {
    id: 3,
    color: '#3694DF',
    from: '2019-05-05T13:00:00+00:00',
    to: '2019-05-05T20:00:00+00:00',
    title: 'This is also another event'
}];

class MyComponent extends React.Component {
    render() {
        return (
            <Calendar
                events={events}
            />
        );
    }
}

```

## Props
|Name                   |Type         |Description         |Default Value       |
|-----------------------|-------------|--------------------|--------------------|
|events                 |array        |Events is an array that can be passed into the calendar and will render events on the Monthly and Daily view|undefined           |
|onClickEvent           |function     |This function is called on click of an event on the daily mode     |undefined           |
|header           |component     |This allows you to provide a custom header component for the calendar     |undefined           |

### events

The events array prop has the following shape
```bash
{
    id: (string or numeric) - this is used to uniquely identify an event,
    color: (hex or RBG/RGBA value) - this sets the event color on the calendar,
    from: (utc timestamp) - start date/time of event e.g. '2019-05-05T13:00:00+00:00',
    to: (utc timestamp) - end date/time of event e.g. '2019-05-05T20:00:00+00:00',
    title: (string) - name of event
}
```

### onClickEvent

The onClickEvent prop is a function that will be called on click of an event on the Day mode of the calendar

### header
If you wish to provide a customer header component you can pass in a prop which will override the header used by default. The following props will be passed into this component:
#### props

```bash
{
    current: {
        year: numeric,
        month: numeric,
        day: numeric
    },
    mode: "dailyMode" || "monthlyMode" || "yearlyMode" - this can be used to determine what the current mode of the calender is. This way you can choose whether to show a year, month or day depending on the mode,
    prev: {
        year: numeric,
        month: numeric,
        day: numeric
    },
    next: {
        year: numeric,
        month: numeric,
        day: numeric
    },
    onClickPrev: function - this will change the calendar to the prev year, month, day depending on the mode
    onClickNext: function - this will change the calendar to the next year, month, day depending on the mode
}
```