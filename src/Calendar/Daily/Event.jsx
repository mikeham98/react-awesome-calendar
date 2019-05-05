import React from 'react';
import styles from './Event.styles.scss';

export default class Event extends React.Component {
    render() {
        return (
            <div style={{backgroundColor: this.props.color}} onClick={this.props.onClick} className={styles.dailyEventWrapper}>
                <span className={styles.dailyEventTitle}>{this.props.title}</span>
            </div>
        )
    }
}