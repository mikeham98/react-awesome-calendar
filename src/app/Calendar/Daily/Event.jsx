import React from 'react';
import styles from './Event.styles.scss';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.stopPropagation();
    this.props.onClick();
  }

  render() {
    return (
      <div
        style={{ backgroundColor: this.props.color }}
        onClick={this.onClick}
        className={styles.dailyEventWrapper}
      >
        <span className={styles.dailyEventTitle}>{this.props.title}</span>
      </div>
    );
  }
}
