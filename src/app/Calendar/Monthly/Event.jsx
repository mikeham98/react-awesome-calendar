import React from 'react';
import classnames from 'classnames';
import { middlePosition, startPosition } from '../constants';
import styles from './Event.styles.scss';

export default class Event extends React.PureComponent {
  returnEventsClassName(position) {
    const { inactive } = this.props;
    const className = [styles.dayCellEvent];
    if (position) {
      if (position === startPosition) {
        className.push(styles.eventStart);
      } else if (position === middlePosition) {
        className.push(styles.eventMiddle);
      } else {
        className.push(styles.eventEnd);
      }
    }
    if (inactive) {
      className.push(styles.eventInactive);
    }
    return classnames(className);
  }

  returnEventName(title, position) {
    let showTitle = false;
    if (position) {
      if (position === startPosition) {
        showTitle = true;
      }
    } else {
      showTitle = true;
    }
    if (showTitle) {
      return <span className={styles.eventTitle}>{title}</span>;
    }
  }

  render() {
    const { color, position, title, height } = this.props;
    return (
      <div
        style={{ backgroundColor: color, height }}
        className={this.returnEventsClassName(position)}
        onClick={this.props.onClick}
      >
        {this.returnEventName(title, position)}
      </div>
    );
  }
}
