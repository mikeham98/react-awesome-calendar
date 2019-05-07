import React from 'react';
import Monthly from '../Monthly';
import { getMonthName } from '../util/calendar';
import styles from './index.styles.scss';

const shortHandDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default class Yearly extends React.Component {
  returnCalendar() {
    let calendar = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return calendar.map(month => {
      return (
        <div key={month} className={styles.yearlyMonth}>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => this.props.onClickMonth(month)}
          >
            <h3 className={styles.yearlyMonthName}>{getMonthName(month)}</h3>
            <Monthly
              month={month}
              daysOfWeek={shortHandDays}
              year={this.props.year}
            />
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className={styles.yearlyCalendar}>
        <div className={styles.yearlyMonthWrapper}>{this.returnCalendar()}</div>
      </div>
    );
  }
}
