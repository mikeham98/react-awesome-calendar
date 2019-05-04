import React from 'react';
import styles from './Event.scss';

export default class Event extends React.Component {
    render() {
        return (
            <div style={{backgroundColor: this.props.color}} onClick={this.props.onClick} className={styles.dailyEventWrapper}>
                {this.props.title}
            </div>
        )
    }
}