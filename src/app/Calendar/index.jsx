import React from 'react';
import styles from './Monthly/index.scss';
import Header from "./Header";
import Monthly from "./Monthly";
import Yearly from "./Yearly";
import Daily from "./Daily";
import {yearlyMode, monthlyMode, dailyMode} from './constants/index'
import Mode from "./Mode";
import {formatEvents} from "./util/calendar";

class Calendar extends React.PureComponent {
    constructor(props) {
        super(props);
        const currentDate = new Date();
        this.state = {
            mode: monthlyMode,
            day: currentDate.getDate(),
            month:  currentDate.getMonth(),
            year: currentDate.getFullYear()
        };
        this.onClickDay = this.onClickDay.bind(this);
        this.onClickMode = this.onClickMode.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickMonth = this.onClickMonth.bind(this);
    }

    returnDailyEvents(events) {
        const {year, month, day} = this.state;
        const date = new Date(year, month, day);
        return events[date.getTime()];
    }

    returnCalendar() {
        const events = formatEvents(this.props.events);
        switch (this.state.mode) {
            case yearlyMode:
                return (
                    <Yearly
                        year={this.state.year}
                        onClickMonth={this.onClickMonth}
                    />
                );
            case monthlyMode:
                return (
                    <Monthly
                        month={this.state.month}
                        year={this.state.year}
                        events={events}
                        onClickDay={this.onClickDay}
                        onClickEvent={this.props.onClickEvent}
                    />
                );
            case dailyMode:
                return (
                    <Daily
                        events={this.returnDailyEvents(events)}
                        onClickEvent={this.props.onClickEvent}
                    />
                );
        }
    }

    onClickPrev() {
        let day = this.state.day;
        let month = this.state.month;
        let year = this.state.year;
        switch (this.state.mode) {
            case yearlyMode:
                year -= 1;
                break;
            case monthlyMode:
                const prevMonth = this.state.month - 1;
                month = prevMonth;
                if (prevMonth < 0) {
                    month = 11;
                    year -= 1;
                }
                break;
            case dailyMode:
                const testDate = new Date(year, month, day);
                testDate.setDate(testDate.getDate() - 1);
                day = testDate.getDate();
                month = testDate.getMonth();
                year = testDate.getFullYear();
                break;
        }
        this.setState({
            day,
            month,
            year
        });
    }

    onClickDay(date) {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        this.setState({
            mode: dailyMode,
            day,
            month,
            year
        });
    }

    onClickMonth(month) {
        this.setState({
            month,
            mode: monthlyMode
        })
    }

    onClickNext() {
        let day = this.state.day;
        let month = this.state.month;
        let year = this.state.year;
        switch (this.state.mode) {
            case yearlyMode:
                year += 1;
                break;
            case monthlyMode:
                const nextMonth = this.state.month + 1;
                month = nextMonth;
                if (nextMonth > 11) {
                    month = 0;
                    year += 1;
                }
                break;
            case dailyMode:
                const testDate = new Date(year, month, day);
                testDate.setDate(testDate.getDate() + 1);
                day = testDate.getDate();
                month = testDate.getMonth();
                year = testDate.getFullYear();
                break;
        }
        this.setState({
            day,
            month,
            year
        });
    }

    onClickMode(mode) {
        this.setState({
            mode
        });
    }

    returnHeader() {
        const props = {
            month: this.state.month,
            year: this.state.year,
            day: this.state.day,
            mode: this.state.mode,
            onClickPrev: this.onClickPrev,
            onClickNext: this.onClickNext,
        };
        if (this.props.header) {
            return this.props.header(props)
        }
        return (
            <Header
                {...props}
            />
        );
    }

    render() {
        return (
            <div className={styles.calendarWrapper}>
                <Mode
                    onClick={this.onClickMode}
                />
                {this.returnHeader()}
                {this.returnCalendar()}
            </div>
        );
    }
}

export default Calendar;
