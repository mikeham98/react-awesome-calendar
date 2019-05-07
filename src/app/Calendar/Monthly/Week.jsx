import React from 'react';
import styles from './Week.styles.scss';
import Day from './Day';

export default class Week extends React.PureComponent {
  onClickDay(day) {
    const { current, date } = day;
    if (!current) {
      if (date.getMonth() < this.props.current.month) {
        this.props.onClickPrev();
      } else {
        this.props.onClickNext();
      }
    } else {
      this.props.onClickDay(day.date);
    }
  }

  returnWeeks(week) {
    if (Array.isArray(week) && week.length) {
      return week.map((day, i) => {
        return (
          <Day
            key={i}
            date={day.date}
            current={day.current}
            events={day.events}
            // onClickEvent={this.props.onClickEvent}
            onClickDay={() => this.onClickDay(day)}
          />
        );
      });
    }
  }

  render() {
    return (
      <div className={styles.weekRow}>{this.returnWeeks(this.props.week)}</div>
    );
  }
}
