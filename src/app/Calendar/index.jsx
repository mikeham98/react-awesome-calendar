import React from 'react';
import {getCalendar} from "./util/calendar";
import styles from './index.scss';
import Header from "./Header";
import Week from "./Week";

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        const currentDate = new Date();
        this.state = {
            month: 7,
            // month: currentDate.getMonth(),
            year: currentDate.getFullYear()
        };
        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
    }

    returnCalendar(calendar) {
        if (Array.isArray(calendar) && calendar.length) {
            return calendar.map((week, i) => {
                return (
                    <Week
                        key={i}
                        week={week}
                        current={{
                            month: this.state.month,
                            year: this.state.year,
                        }}
                        onClickPrev={this.onClickPrev}
                        onClickNext={this.onClickNext}
                    />
                )
            });
        }
    }

    onClickPrev() {
        const prevMonth = this.state.month - 1;
        let month = prevMonth;
        let year = this.state.year;
        if (prevMonth < 0) {
            month = 11;
            year -= 1;
        }
        this.setState({
            month,
            year
        });
    }

    onClickNext() {
        const nextMonth = this.state.month + 1;
        let month = nextMonth;
        let year = this.state.year;
        if (nextMonth > 11) {
            month = 0;
            year += 1;
        }
        this.setState({
            month,
            year
        });
    }

    render() {
        const calendar = getCalendar(this.state.month, this.state.year);
        return (
            <div className={styles.calendarWrapper}>
                <Header
                    month={this.state.month}
                    year={this.state.year}
                    onClickPrev={this.onClickPrev}
                    onClickNext={this.onClickNext}
                />
                {this.returnCalendar(calendar)}
            </div>
        );
    }
}

export default Calendar;
