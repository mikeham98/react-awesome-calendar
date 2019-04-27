import React from 'react';
import Calendar from "./Calendar/index";
import styles from '../themes/app.scss';

class App extends React.Component {
    render() {
        return (
            <div>
                <div className={styles.pageCalendar}>
                    <Calendar/>
                </div>
            </div>
        );
    }
}

export default App;