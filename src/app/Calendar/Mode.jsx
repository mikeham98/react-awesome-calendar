import React from 'react';
import classnames from 'classnames';
import { dailyMode, monthlyMode, yearlyMode } from './constants';
import styles from './index.styles.scss';
const year = 'year';
const month = 'month';
const day = 'day';

export default class Mode extends React.PureComponent {
  returnModes() {
    const { active } = this.props;
    const modes = [
      {
        id: year,
        mode: yearlyMode,
        text: 'Year',
      },
      {
        id: month,
        mode: monthlyMode,
        text: 'Month',
      },
      {
        id: day,
        mode: dailyMode,
        text: 'Day',
      },
    ];
    if (Array.isArray(modes) && modes.length) {
      return modes.map(mode => {
        const classNames = [styles.modeButton];
        if (mode.mode === active) {
          classNames.push(styles.modeButtonActive);
        }
        return (
          <button
            className={classnames(classNames)}
            key={mode.id}
            onClick={() => this.props.onClick(mode.mode)}
          >
            {mode.text}
          </button>
        );
      });
    }
  }

  render() {
    return <div className={styles.modeWrapper}>{this.returnModes()}</div>;
  }
}
