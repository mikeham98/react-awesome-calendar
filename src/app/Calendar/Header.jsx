import React from 'react';
import {getMonthName} from "./util/calendar";
import styles from './Monthly/index.scss';
import {dailyMode, monthlyMode, yearlyMode} from "./constants";

export default class Header extends React.PureComponent {
    returnTitle() {
        // TODO: refactor
        if(this.props.mode === yearlyMode) {
            return (
                <React.Fragment>
                    <span className={styles.thickText}>{this.props.year}</span>
                </React.Fragment>
            );
        }
        if(this.props.mode === monthlyMode) {
            return (
                <React.Fragment>
                    <span className={styles.thickText}>{getMonthName(this.props.month)}</span>
                    &nbsp;
                    <span className={styles.thinText}>{this.props.year}</span>
                </React.Fragment>
            );
        }
        if(this.props.mode === dailyMode) {
            return (
                <React.Fragment>
                    <span className={styles.thickText}>{this.props.day}</span>
                    &nbsp;
                    <span className={styles.thickText}>{getMonthName(this.props.month)}</span>
                    &nbsp;
                    <span className={styles.thinText}>{this.props.year}</span>
                    &nbsp;
                </React.Fragment>
            );
        }
    }

    render() {
        return (
            <div className={styles.calendarHeader}>
                <div>
                    <button onClick={this.props.onClickPrev}>prev</button>
                    <div>
                        <h1>
                            {this.returnTitle()}
                        </h1>
                    </div>
                    <button onClick={this.props.onClickNext}>next</button>
                </div>
            </div>
        );
    }
}