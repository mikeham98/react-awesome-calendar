import React from 'react';
import styles from './index.scss';
import {getElementHeight} from "../util/getElementHeight";
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
            dayEvents.forEach(event => {
                const id = `dailyEvent-${event.id}`;
                const fromDate = new Date(event.from);
                const toDate = new Date(event.to);
                const fromHour = (fromDate.getHours() + fromDate.getMinutes() / 60) - 1;
                const toHour = (toDate.getHours() + toDate.getMinutes() / 60) - 1;

                const timeDiff = toHour - fromHour;
                console.log(fromHour);
                console.log(toHour);
                console.log(timeDiff);
                const eventHeight = timeDiff * hourWrapperHeight;
                const eventPosition = (fromHour * hourWrapperHeight) + hourHeaderHeight;
                document.getElementById(id).style.top = `${eventPosition}px`;
                // TODO: need to create a function called getElementWidth and use this on dailyHourText
                document.getElementById(id).style.left = '50px';
                document.getElementById(id).style.height = `${eventHeight}px`;
            });
        }
    }

    returnHours() {
        const hours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'];
        return hours.map((hour, i) => {
            return (
                <div key={i} className={styles.dailyHourWrapper}>
                    <div className={styles.dailyHour}>
                        <div className={styles.dailyHourText}>
                            <span>{hour}</span>
                        </div>
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
                    <div id={`dailyEvent-${event.id}`} className={styles.dayEvent}>
                        <Event
                            color={event.color}
                            title={event.title}
                        />
                    </div>
                )
            });
        }
    }

    returnTimeLine() {
        return (
            <div id='dailyEventList' className={styles.dailyTimeLine}>
                {this.returnEvents()}
                {this.returnHours()}
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
                        />
                    </div>
                )
            })
        }
    }

    render() {
        //TODO: enable multiple events on same hour
        return (
            <div className={styles.dailyWrapper}>
                {this.returnAllDayEvents()}
                {this.returnTimeLine()}
            </div>
        )
    }
}