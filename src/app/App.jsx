import React from 'react';
import Calendar from "./Calendar/index";
import styles from '../themes/app.scss';

const events = [{
    id: 1,
    color: '#fd3153',
    from: '2019-05-02T18:00:00+00:00',
    to: '2019-05-05T19:00:00+00:00',
    title: 'This is a long event'
}, {
    id: 2,
    color: '#1ccb9e',
    from: '2019-05-01T13:00:00+00:00',
    to: '2019-05-05T14:00:00+00:00',
    title: 'This is another title'
}, {
    id: 3,
    color: '#fd3153',
    from: '2019-05-01T13:00:00+00:00',
    to: '2019-05-05T14:00:00+00:00',
    title: 'This is another title'
}, {
    id: 4,
    color: 'green',
    from: '2019-05-03T17:00:00+00:00',
    to: '2019-05-03T19:00:00+00:00',
    title: 'This is another title'
}, {
    id: 5,
    color: '#8281fd',
    from: '2019-06-01T09:00:00+00:00',
    to: '2019-06-01T10:00:00+00:00',
    title: 'This is final title'
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