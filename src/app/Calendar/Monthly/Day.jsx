import React from 'react';
import styles from './Day.styles.scss';
import classnames from "classnames";
import Event from "./Event";
import {getElementHeight} from "../util/getElementHeight";

export default class Day extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            eventNumber: 1
        };
    }

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
        return classnames(className);
    }

    componentDidMount() {
        this.shouldShowRemainder();
    }

    componentDidUpdate() {
        this.shouldShowRemainder();
    }

    shouldShowRemainder() {
        const {events} = this.props;
        if (Array.isArray(events) && events.length) {
            const dayCell = document.getElementById('dayCell');
            const dayCellHeight = getElementHeight(dayCell);

            const dayHeader = document.getElementById('dayHeader');
            const dayHeaderHeight = getElementHeight(dayHeader);

            const eventsList = document.getElementsByClassName('dayCellEvent');
            const singleEvent = eventsList[0];
            const singleEventHeight = getElementHeight(singleEvent);

            const remainingTextHeight = 16;

            const eventGroupHeight = dayCellHeight - dayHeaderHeight - remainingTextHeight;

            const numberOfEventsToDisplay = Math.floor(eventGroupHeight / singleEventHeight);

            this.setState({
                eventNumber: numberOfEventsToDisplay
            })
        }
    }

    returnEventList() {
        const {events} = this.props;
        if (Array.isArray(events) && events.length) {
            let displayEvents = events.slice(0, this.state.eventNumber);
            return (
                <div className={styles.dayCellEventWrapper}>
                    {this.returnEvents(displayEvents)}
                </div>
            )
        }
    }

    returnEvents(events) {
        return events.map(event => {
            return (
                <Event
                    height={16}
                    inactive={!this.props.current}
                    key={event.id}
                    color={event.color}
                    title={event.title}
                    position={event.position}
                    onClick={() => this.props.onClickEvent(event)}
                />
            )
        });
    }

    returnEventRemainder() {
        const {events} = this.props;
        if (Array.isArray(events) && events.length && events.length > this.state.eventNumber) {
            const remainder = events.length - this.state.eventNumber;
            return (
                <span className={styles.dayEventsRemaining}>
                    {`${remainder} more...`}
                </span>
            );
        }
    }

    returnDayTextClass() {
        let className = [styles.dayText];
        if (this.isCurrentDate()) {
            className.push(styles.currentDay);
        }
        return classnames(className);
    }

    render() {
        return (
            <div id={'dayCell'} className={styles.dayCell} onClick={this.props.onClickDay}>
                <div id={'dayHeader'} className={this.returnDayClassStyle()}>
                    <div className={this.returnDayTextClass()}>
                        <span>
                            {this.props.date.getDate()}
                        </span>
                    </div>
                </div>
                {this.returnEventList()}
                {this.returnEventRemainder()}
            </div>
        );
    }
}
