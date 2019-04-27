import React from 'react';
import {getMonthName} from "./util/calendar";
import styles from './index.scss';

export default class Header extends React.PureComponent {
    render() {
        return (
            <div className={styles.calendarHeader}>
                <div>
                    <button onClick={this.props.onClickPrev}>prev</button>
                    <div>
                        <h1>
                            <span className={styles.monthText}>{getMonthName(this.props.month)}</span>
                            &nbsp;
                            <span className={styles.yearText}>{this.props.year}</span>
                        </h1>
                    </div>
                    <button onClick={this.props.onClickNext}>next</button>
                </div>
                <div className={styles.calendarDayOfWeek}>
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>
            </div>
        );
    }
}