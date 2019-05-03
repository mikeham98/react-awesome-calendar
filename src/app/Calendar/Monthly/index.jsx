import React from 'react';
import styles from './index.scss';
import {getCalendarMonth, getEventsForCalendar} from "../util/calendar";
import Week from "./Week";

export default class Monthly extends React.Component {

    onClickEvent(event) {
        if (this.props.onClickEvent) {
            this.props.onClickEvent(event);
        }
    }

    returnCalendar() {
        let calendar = getCalendarMonth(this.props.month, this.props.year);
        calendar = getEventsForCalendar(this.props.events, calendar);
        if (Array.isArray(calendar) && calendar.length) {
            return calendar.map((week, i) => {
                return (
                    <Week
                        key={i}
                        week={week}
                        current={{
                            month: this.props.month,
                            year: this.props.year,
                        }}
                        onClickEvent={this.onClickEvent}
                        onClickPrev={this.props.onClickPrev}
                        onClickNext={this.props.onClickNext}
                    />
                )
            });
        }
    }

    returnDayOfWeekHeader() {
        // let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        // days = [...days.slice(this.props.firstDayOfWeek), ...days.slice(0, this.props.firstDayOfWeek)];
        return this.props.daysOfWeek.map(day => {
            return (
                <div key={day}>{day}</div>
            )
        });
    }

    render() {
        return (
            <div>
                <div className={styles.calendarDayOfWeek}>
                    {this.returnDayOfWeekHeader()}
                </div>
                {this.returnCalendar()}
            </div>
        )
    }
}

Monthly.defaultProps = {
    daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};