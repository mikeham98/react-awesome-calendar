import React from 'react';
import { getMonthName } from './util/calendar';
import styles from './index.styles.scss';
import { dailyMode, monthlyMode, yearlyMode } from './constants';

export default class Header extends React.PureComponent {
  returnTitle() {
    const { mode, current } = this.props;
    const { year, month, day } = current;
    const monthName = getMonthName(month);
    switch (mode) {
      case yearlyMode:
        return (
          <React.Fragment>
            <span className={styles.thickText}>{year}</span>
          </React.Fragment>
        );
      case monthlyMode:
        return (
          <React.Fragment>
            <span className={styles.thickText}>{monthName}</span>
            &nbsp;
            <span className={styles.thinText}>{year}</span>
          </React.Fragment>
        );
      case dailyMode:
        return (
          <React.Fragment>
            <span className={styles.thickText}>{day}</span>
            &nbsp;
            <span className={styles.thickText}>{monthName}</span>
            &nbsp;
            <span className={styles.thinText}>{year}</span>
            &nbsp;
          </React.Fragment>
        );
    }
  }

  returnButtonText(type) {
    const { mode } = this.props;
    const monthName = getMonthName(type.month);
    switch (mode) {
      case yearlyMode:
        return type.year;
      case monthlyMode:
        return monthName;
      case dailyMode:
        return `${type.day} ${monthName}`;
    }
  }

  render() {
    const { prev, next } = this.props;
    return (
      <div className={styles.calendarHeader}>
        <h1>{this.returnTitle()}</h1>
        <div className={styles.calendarHeaderButtons}>
          <button onClick={this.props.onClickPrev}>
            {this.returnButtonText(prev)}
          </button>
          <button onClick={this.props.onClickNext}>
            {this.returnButtonText(next)}
          </button>
        </div>
      </div>
    );
  }
}
