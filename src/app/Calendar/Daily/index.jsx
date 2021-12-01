import React from 'react';
import styles from './index.styles.scss';
import { getElementHeight } from '../util/getElementHeight';
import Event from './Event';
import { endPosition, middlePosition, startPosition } from '../constants';

export default class Daily extends React.Component {
  constructor(props) {
    super(props);
    this.onClickTimeLine = this.onClickTimeLine.bind(this);
  }

  componentDidMount() {
    this.getHourPosition();
  }

  componentDidUpdate() {
    this.getHourPosition();
  }

  returnHourWrapperHeight() {
    const hourWrappers = document.getElementsByClassName('dailyHourWrapper');
    const wrapper = getElementHeight(hourWrappers[0]);
    return wrapper || 0;
  }

  returnHourHeaderHeight() {
    const hourHeader = document.getElementsByClassName('dailyHour');
    const header = getElementHeight(hourHeader[0]);
    return header || 0;
  }

  getTimeLineEvents() {
    const { events } = this.props;
    if (Array.isArray(events) && events.length) {
      return events.filter(e => (
        e.position !== middlePosition &&
        !e.allDay &&
        !(e.position === endPosition && this.getTimeInHours(new Date(e.to)) === 0)
      ));
    }
    return [];
  }

  getAllDayEvents() {
    const { events } = this.props;
    if (Array.isArray(events) && events.length) {
      return events.filter(e => (
        e.position === middlePosition ||
        e.allDay ||
        (e.position === endPosition && this.getTimeInHours(new Date(e.to)) === 0)
      ));
    }
    return [];
  }

  getHourPosition() {
    const { events } = this.props;
    if (Array.isArray(events) && events.length) {
      const dayEvents = this.getTimeLineEvents();
      const hourWrapperHeight = this.returnHourWrapperHeight();
      const hourHeaderHeight = this.returnHourHeaderHeight() / 2;

      // const eventWidthHandled = [];
      dayEvents.forEach((event, index) => {
        const id = `dailyEvent-${event.id}-${event.date.getDate()}`;
        let fromDate = new Date(event.from);
        let toDate = new Date(event.to);
        let fromHour = this.getTimeInHours(fromDate);
        let toHour = this.getTimeInHours(toDate);
        console.log('toHour',toHour);
        if (event.position === endPosition) {
          fromHour = 0;
          if (toHour === 0) {
            toHour = 24;
          }
        }
        if (event.position === startPosition || (event.span === 1 && toHour === 0)) {
          toHour = 24;
        }
        const timeDiff = toHour - fromHour;

        const eventHeight = timeDiff * hourWrapperHeight;
        const eventPosition = fromHour * hourWrapperHeight + hourHeaderHeight;

        // eventWidthHandled.push(event.id);
        // this.handleEventWidth(
        //   eventWidthHandled,
        //   dayEvents,
        //   fromHour,
        //   toHour,
        //   event.id,
        // );

        document.getElementById(id).style.top = `${eventPosition}px`;
        document.getElementById(id).style.height = `${eventHeight}px`;
        document.getElementById(id).style.width = `calc((100% / ${dayEvents.length}) - 10px)`;
        document.getElementById(id).style.left = `calc((100% / ${dayEvents.length}) * ${index})`;
      });
    }
  }

  getTimeInHours(date) {
    return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600000;
  }

  // handleEventWidth(eventWidthHandled, events, fromHour, toHour, currentId) {
  //   // const changedEvents = events.filter(
  //   //   e => !eventWidthHandled.find(id => id === e.id),
  //   // );
  //   const changedEvents = events;
  //   if (Array.isArray(changedEvents) && changedEvents.length) {
  //     const dayEventMultiple = ' dayEventMultiple';
  //     const numberOfEvents = changedEvents.length + 1;
  //     const width = `${100 / numberOfEvents}%`;
  //     console.log('changedEvents',changedEvents);
  //     changedEvents.forEach((e, i) => {
  //       eventWidthHandled.push(e.id);
  //       const eventId = `dailyEvent-${e.id}-${e.date.getDate()}`;
  //       console.log(eventId, document.getElementById(eventId))
  //       document.getElementById(eventId).style.width = width;
  //       document.getElementById(eventId).style.left = `${(100 /
  //         numberOfEvents) *
  //       (i + 1)}%`;
  //       document.getElementById(eventId).className += dayEventMultiple;
  //     });
  //   }
  // }

  returnHours() {
    const hours = [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
      '24:00',
    ];
    return hours.map((hour, i) => {
      return (
        <div key={i} className={styles.dailyHourWrapper}>
          <div className={styles.dailyHourText}>
            <span>{hour}</span>
          </div>
        </div>
      );
    });
  }

  returnHoursLine() {
    const hours = [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
      '24:00',
    ];
    return hours.map((hour, i) => {
      return (
        <div key={i} className={styles.dailyHourWrapper}>
          <div className={styles.dailyHour}>
            <div className={styles.dailyHourLine}/>
          </div>
        </div>
      );
    });
  }

  returnEvents() {
    const dayEvents = this.getTimeLineEvents();
    if (Array.isArray(dayEvents) && dayEvents.length) {
      return dayEvents.map(event => {
        return (
          <div
            key={event.id}
            id={`dailyEvent-${event.id}-${event.date.getDate()}`}
            className={styles.dayEvent}
          >
            <Event
              color={event.color}
              title={event.title}
              onClick={() => this.onClickEvent(event.id)}
            />
          </div>
        );
      });
    }
  }

  onClickEvent(id) {
    if (this.props.onClickEvent) {
      this.props.onClickEvent(id);
    }
  }

  onClickTimeLine(event) {
    if (this.props.onClickTimeLine) {
      const scrollTop = document.getElementById('dailyTimeLine').scrollTop;
      const clientY = event.clientY;
      let rect = document.getElementById('dailyTimeLine').getBoundingClientRect();
      const positionY = clientY + scrollTop - rect.top - (this.returnHourHeaderHeight() / 2);
      let hourPosition = positionY / this.returnHourWrapperHeight();
      let hour = Math.round(hourPosition * 2) / 2;
      if (hour <= 0) {
        hour = 0;
      }
      if (hour > 24) {
        hour = 24;
      }
      this.props.onClickTimeLine(hour);
    }
  }

  returnTimeLine() {
    return (
      <div id='dailyTimeLine' className={styles.dailyTimeLineWrapper} onClick={this.onClickTimeLine}>
        <div className={styles.dailyHourTextWrapper}>{this.returnHours()}</div>
        <div className={styles.dailyTimeLine}>
          <div>
            {this.returnEvents()}
          </div>
          {this.returnHoursLine()}
        </div>
      </div>
    );
  }

  returnAllDayEvents() {
    const dailyEvents = this.getAllDayEvents();
    console.log('dailyEvents',dailyEvents);
    if (Array.isArray(dailyEvents) && dailyEvents.length) {
      return dailyEvents.map(event => {
        return (
          <div key={event.id} className={styles.allDayEvent}>
            <Event
              color={event.color}
              title={event.title}
              onClick={() => this.onClickEvent(event.id)}
            />
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className={styles.dailyWrapper}>
        {this.returnAllDayEvents()}
        {this.returnTimeLine()}
      </div>
    );
  }
}
