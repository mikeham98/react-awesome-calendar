import React from 'react';
import {getMonthName} from "./util/calendar";
import styles from './Monthly/index.scss';

export default class Header extends React.PureComponent {
    returnTitle() {
        if(this.props.mode === 'yearMode') {
            return (
                <React.Fragment>
                    <span className={styles.thickText}>{this.props.year}</span>
                </React.Fragment>
            );
        }
        if(this.props.mode === 'monthMode') {
            return (
                <React.Fragment>
                    <span className={styles.thickText}>{getMonthName(this.props.month)}</span>
                    &nbsp;
                    <span className={styles.thinText}>{this.props.year}</span>
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