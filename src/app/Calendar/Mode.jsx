import React from 'react';
import {dailyMode, monthlyMode, yearlyMode} from "./constants";

export default class Mode extends React.PureComponent {
    render() {
        return (
            <div>
                <button onClick={() => this.props.onClick(yearlyMode)}>year</button>
                <button onClick={() => this.props.onClick(monthlyMode)}>month</button>
                <button onClick={() => this.props.onClick(dailyMode)}>day</button>
            </div>
        )
    }
}