import React from 'react';
import styles from './index.scss';
import classnames from "classnames";

export default class Day extends React.PureComponent {
    isCurrentDate() {
        const date = this.props.date.getTime();
        const currentDateTime = new Date();

        // Need to do it this way so that .getTime() is from the start of the day and does include the seconds for the current day
        const currentDate = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate()).getTime();
        return date === currentDate;
    }

    returnDayClassStyle() {
        let className = [styles.dayDate];
        if (!this.props.current) {
            className.push(styles.inactiveDay);
        }
        if (this.isCurrentDate()) {
            className.push(styles.currentDay);
        }
        return classnames(className);
    }

    render() {
        return (
            <div className={styles.dayCell} onClick={this.props.onClickDay}>
                <div className={this.returnDayClassStyle()}>
                    <span>
                    {this.props.date.getDate()}
                    </span>
                </div>
            </div>
        );
    }
}
