import React from 'react';
import Calendar from "react-awesome-calendar";
import styles from './themes/app.scss';

const events = [{
    id: 1,
    color: '#fd3153',
    from: '2019-05-02T18:00:00+00:00',
    to: '2019-05-05T19:00:00+00:00',
    title: 'Seeing family'
}, {
    id: 2,
    color: '#1ccb9e',
    from: '2019-05-01T13:00:00+00:00',
    to: '2019-05-05T14:00:00+00:00',
    title: 'Holiday'
}, {
    id: 3,
    color: '#F480A8',
    from: '2019-05-05T12:00:00+00:00',
    to: '2019-05-05T14:00:00+00:00',
    title: 'Jet skiing'
}, {
    id: 4,
    color: '#fda256',
    from: '2019-05-05T18:00:00+00:00',
    to: '2019-05-05T19:30:00+00:00',
    title: 'Dinner'
}, {
    id: 5,
    color: '#8281fd',
    from: '2019-05-15T12:00:00+00:00',
    to: '2019-05-15T21:00:00+00:00',
    title: 'Doctors'
}];

class App extends React.Component {
    render() {
        return (
            <div className={styles.pageCalendar}>
                <Calendar
                    onClickEvent={(event) => console.log('this is an event', event)}
                    events={events}
                />
            </div>
        );
    }
}

export default App;