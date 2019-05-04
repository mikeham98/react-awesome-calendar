import React from 'react';
import styles from './Monthly/index.scss';
import Header from "./Header";
import Monthly from "./Monthly";
import Yearly from "./Yearly";
import Daily from "./Daily";
import {yearMode, monthMode, dayMode} from './constants/index'
import Mode from "./Mode";

class Calendar extends React.PureComponent {
    constructor(props) {
        super(props);
        const currentDate = new Date();
        this.state = {
            mode: monthMode,
            month:  currentDate.getMonth(),
            year: currentDate.getFullYear()
        };
        this.onClickMode = this.onClickMode.bind(this);
        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickMonth = this.onClickMonth.bind(this);
    }

    returnCalendar() {
        switch (this.state.mode) {
            case yearMode:
                return (
                    <Yearly
                        year={this.state.year}
                        onClickPrev={this.onClickPrev}
                        onClickNext={this.onClickNext}
                        onClickMonth={this.onClickMonth}
                    />
                );
            case monthMode:
                return (
                    <Monthly
                        month={this.state.month}
                        year={this.state.year}
                        events={this.props.events}
                        onClickEvent={this.props.onClickEvent}
                        onClickPrev={this.onClickPrev}
                        onClickNext={this.onClickNext}
                    />
                );
            case dayMode:
                return (
                    <Daily/>
                );
        }
    }

    onClickPrev() {
        let month = this.state.month;
        let year = this.state.year;
        switch (this.state.mode) {
            case yearMode:
                year -= 1;
                break;
            case monthMode:
                const prevMonth = this.state.month - 1;
                month = prevMonth;
                if (prevMonth < 0) {
                    month = 11;
                    year -= 1;
                }
                break;
            case dayMode:

                break;
        }
        this.setState({
            month,
            year
        });
    }

    onClickMonth(month) {
        this.setState({
            month,
            mode: monthMode
        })
    }

    onClickNext() {
        let month = this.state.month;
        let year = this.state.year;
        switch (this.state.mode) {
            case yearMode:
                year += 1;
                break;
            case monthMode:
                const nextMonth = this.state.month + 1;
                month = nextMonth;
                if (nextMonth > 11) {
                    month = 0;
                    year += 1;
                }
                break;
            case dayMode:

                break;
        }
        this.setState({
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
