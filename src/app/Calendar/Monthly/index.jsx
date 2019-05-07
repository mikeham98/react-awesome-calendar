import React from 'react';
import styles from './index.styles.scss';
import { getCalendarMonth, getEventsForCalendar } from '../util/calendar';
import Week from './Week';

export default class Monthly extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDay = this.onClickDay.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
  }

  onClickDay(date) {
    if (this.props.onClickDay) {
      this.props.onClickDay(date);
    }
  }

  onClickPrev() {
    if (this.props.onClickPrev) {
      this.props.onClickPrev();
    }
  }

  onClickNext() {
    if (this.props.onClickNext) {
      this.props.onClickNext();
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
            onClickDay={this.onClickDay}
            // onClickEvent={this.props.onClickEvent}
            onClickPrev={this.onClickPrev}
            onClickNext={this.onClickNext}
          />
        );
      });
    }
  }

  returnDayOfWeekHeader() {
    return this.props.daysOfWeek.map((day, i) => {
      return <div key={i}>{day}</div>;
    });
  }

  render() {
    return (
      <div className={styles.monthlyCalendar}>
        <div className={styles.calendarDayOfWeek}>
          {this.returnDayOfWeekHeader()}
        </div>
        {this.returnCalendar()}
      </div>
    );
  }
}

Monthly.defaultProps = {
  daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
