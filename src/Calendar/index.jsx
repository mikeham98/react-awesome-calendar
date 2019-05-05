import React from 'react';
import styles from './index.styles.scss';
import Header from "./Header";
import Monthly from "./Monthly";
import Yearly from "./Yearly";
import Daily from "./Daily";
import {dailyMode, monthlyMode, yearlyMode} from './constants/index'
import Mode from "./Mode";
import {formatEvents} from "./util/calendar";
import {calendarDetails} from "./util/calendarDetails";

class Calendar extends React.PureComponent {
    constructor(props) {
        super(props);
        const currentDate = new Date();
        this.state = {
            mode: monthlyMode,
            day: currentDate.getDate(),
            month: currentDate.getMonth(),
            year: currentDate.getFullYear()
        };
        this.onClickDay = this.onClickDay.bind(this);
        this.onClickMonth = this.onClickMonth.bind(this);
        this.onClickMode = this.onClickMode.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
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

    onClickPrev() {
        const {mode, year, month, day} = this.state;
        const details = calendarDetails(mode, year, month, day);
        this.setState({...details.prev});
    }

    onClickNext() {
        const {mode, year, month, day} = this.state;
        const details = calendarDetails(mode, year, month, day);
        this.setState({...details.next});
    }

    onClickMode(mode) {
        this.setState({
            mode
        });
    }

    returnHeader() {
        const {mode, year, month, day} = this.state;
        const props = {
            ...calendarDetails(mode, year, month, day),
            mode,
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
                    active={this.state.mode}
                    onClick={this.onClickMode}
                />
                {this.returnHeader()}
                {this.returnCalendar()}
            </div>
        );
    }
}

export default Calendar;
