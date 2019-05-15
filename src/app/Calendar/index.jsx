import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.styles.scss';
import Header from './Header';
import Monthly from './Monthly';
import Yearly from './Yearly';
import Daily from './Daily';
import { dailyMode, monthlyMode, yearlyMode } from './constants/index';
import Mode from './Mode';
import { formatEvents } from './util/calendar';
import { calendarDetails } from './util/calendarDetails';

//TODO: Upcoming features:
//set beginning day of the week
//be able to export Yearly, Monthly and Daily

const modes = {
  day: dailyMode,
  month: monthlyMode,
  year: yearlyMode,
};

class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    this.state = {
      mode: monthlyMode,
      day: currentDate.getDate(),
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
    };
    this.onClickDay = this.onClickDay.bind(this);
    this.onClickTimeLine = this.onClickTimeLine.bind(this);
    this.onClickMonth = this.onClickMonth.bind(this);
    this.onClickMode = this.onClickMode.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
  }

  getDetails() {
    const { mode, year, month, day } = this.state;
    return { mode, year, month, day };
  }

  returnDailyEvents() {
    const events = formatEvents(this.props.events);
    const { year, month, day } = this.state;
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
            onClickPrev={this.onClickPrev}
            onClickNext={this.onClickNext}
          />
        );
      case dailyMode:
        return (
          <Daily
            events={this.returnDailyEvents()}
            onClickEvent={this.props.onClickEvent}
            onClickTimeLine={this.onClickTimeLine}
          />
        );
    }
  }

  onClickTimeLine(hour) {
    if (this.props.onClickTimeLine) {
      const { year, month, day } = this.state;
      this.props.onClickTimeLine({
        year,
        month,
        day,
        hour,
      });
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
        year,
      },
      this.onChange,
    );
  }

  onClickMonth(month) {
    this.setState(
      {
        month,
        mode: monthlyMode,
      },
      this.onChange,
    );
  }

  onClickPrev() {
    const { mode, year, month, day } = this.state;
    const details = calendarDetails(mode, year, month, day);
    this.setState({ ...details.prev }, this.onChange);
  }

  onClickNext() {
    const { mode, year, month, day } = this.state;
    const details = calendarDetails(mode, year, month, day);
    this.setState({ ...details.next }, this.onChange);
  }

  onClickMode(mode) {
    let date = {};
    if (mode === yearlyMode) {
      date.year = this.state.year;
      date.month = 0;
      date.day = 1;
    }
    this.setState(
      {
        mode,
        ...date,
      },
      this.onChange,
    );
  }

  onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.getDetails());
    }
  }

  returnHeader() {
    const { mode, year, month, day } = this.state;
    const props = {
      ...calendarDetails(mode, year, month, day),
      mode,
      onClickPrev: this.onClickPrev,
      onClickNext: this.onClickNext,
    };
    if (this.props.header) {
      let CustomHeader = this.props.header;
      return <CustomHeader {...props} />;
    }
    return <Header {...props} />;
  }

  render() {
    return (
      <div className={styles.calendarWrapper}>
        <Mode
          modes={this.props.modes}
          active={this.state.mode}
          onClick={this.onClickMode}
        />
        {this.returnHeader()}
        {this.returnCalendar()}
      </div>
    );
  }
}

Calendar.propTypes = {
  modes: PropTypes.array,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  onClickEvent: PropTypes.func,
  header: PropTypes.func,
};

export default Calendar;
