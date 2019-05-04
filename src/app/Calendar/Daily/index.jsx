import React from 'react';
import styles from './index.scss';
import {getElementHeight, getElementWidth} from "../util/getElementHeight";
import Event from "./Event";

export default class Daily extends React.Component {
    componentDidMount() {
        this.getHourPosition();
    }

    componentDidUpdate() {
        this.getHourPosition();
    }

    getHourPosition() {
        const {events} = this.props;
        if (Array.isArray(events) && events.length) {
            const dayEvents = events.filter(e => !e.spread);
            const hourWrapper = document.getElementsByClassName('dailyHourWrapper');
            const hourHeader = document.getElementsByClassName('dailyHour');
            //TODO: change singlehour height in the other place event height?
            const hourWrapperHeight = getElementHeight(hourWrapper[0]);
            const hourHeaderHeight = getElementHeight(hourHeader[0]) / 2;
            const eventWidthHandled = [];
            dayEvents.forEach(event => {
                const id = `dailyEvent-${event.id}`;
                const fromDate = new Date(event.from);
                const toDate = new Date(event.to);
                const fromHour = this.getHoursMins(fromDate);
                const toHour = this.getHoursMins(toDate);

                const timeDiff = toHour - fromHour;

                const eventHeight = timeDiff * hourWrapperHeight;
                const eventPosition = (fromHour * hourWrapperHeight) + hourHeaderHeight;

                eventWidthHandled.push(event.id);
                this.handleEventWidth(eventWidthHandled, dayEvents, fromHour, toHour, event.id);

                document.getElementById(id).style.top = `${eventPosition}px`;
                document.getElementById(id).style.height = `${eventHeight}px`;
            });
        }
    }

    getHoursMins(date) {
        return (date.getHours() + date.getMinutes() / 60);
    }

    handleEventWidth(eventWidthHandled, events, fromHour, toHour, currentId) {
        const changedEventsTest = events.filter(e => !eventWidthHandled.find(id => id === e.id));

        const otherEvents = changedEventsTest.filter(event => {
            const eventFromDate = new Date(event.from);
            const eventToDate = new Date(event.to);
            const eventFromHour = (eventFromDate.getHours() + eventFromDate.getMinutes() / 60);
            const eventToHour = (eventToDate.getHours() + eventToDate.getMinutes() / 60);

            return (fromHour >= eventToHour && toHour < eventFromHour) || (eventToHour >= fromHour && eventFromHour < toHour);
        });
        if (Array.isArray(otherEvents) && otherEvents.length) {
            const id = `dailyEvent-${currentId}`;
            const numberOfEvents = otherEvents.length + 1;
            const width = `${100 / numberOfEvents}%`;
            document.getElementById(id).style.width = width;
            document.getElementById(id).style.left = '0px';

            otherEvents.forEach((e, i) => {
                eventWidthHandled.push(e.id);
                const eventId = `dailyEvent-${e.id}`;
                console.log('others', eventId);
                document.getElementById(eventId).style.width = width;
                document.getElementById(eventId).style.left = `${(100 / numberOfEvents) * (i + 1)}%`;
            });
        }
    }

    returnHours() {
        const hours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
        return hours.map((hour, i) => {
            return (
                <div key={i} className={styles.dailyHourWrapper}>
                    <div className={styles.dailyHourText}>
                        <span>{hour}</span>
                    </div>
                </div>
            )
        });
    }

    returnHoursLine() {
        const hours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
        return hours.map((hour, i) => {
            return (
                <div key={i} className={styles.dailyHourWrapper}>
                    <div className={styles.dailyHour}>
                        <div className={styles.dailyHourLine}/>
                    </div>
                </div>
            )
        });
    }

    returnEvents() {
        const {events} = this.props;
        if (Array.isArray(events) && events.length) {
            const dayEvents = events.filter(e => !e.spread);
            return dayEvents.map(event => {
                return (
                    <div key={event.id} id={`dailyEvent-${event.id}`} className={styles.dayEvent}>
                        <Event
                            color={event.color}
                            title={`${event.id} ${event.title}`}
                            onClick={() => this.onClickEvent(event)}
                        />
                    </div>
                )
            });
        }
    }

    onClickEvent(event) {
        if(this.props.onClickEvent) {
            this.props.onClickEvent(event);
        }
    }

    returnTimeLine() {
        return (
            <div className={styles.dailyTimeLineWrapper}>
                <div className={styles.dailyHourTextWrapper}>
                    {this.returnHours()}
                </div>
                <div className={styles.dailyTimeLine}>
                    {this.returnEvents()}
                    {this.returnHoursLine()}
                </div>
            </div>
        )
    }

    returnAllDayEvents() {
        const {events} = this.props;
        if (Array.isArray(events) && events.length) {
            const dailyEvents = events.filter(e => e.spread);
            return dailyEvents.map(event => {
                return (
                    <div key={event.id} className={styles.allDayEvent}>
                        <Event
                            color={event.color}
                            title={event.title}
                            onClick={() => this.onClickEvent(event)}
                        />
                    </div>
                )
            })
        }
    }

    render() {
        return (
            <div className={styles.dailyWrapper}>
                {this.returnAllDayEvents()}
                {this.returnTimeLine()}
            </div>
        )
    }
}