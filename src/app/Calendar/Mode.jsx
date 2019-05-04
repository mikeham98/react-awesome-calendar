import React from 'react';
import {dayMode, monthMode, yearMode} from "./constants";

export default class Mode extends React.PureComponent {
    render() {
        return (
            <div>
                <button onClick={() => this.props.onClick(yearMode)}>year</button>
                <button onClick={() => this.props.onClick(monthMode)}>month</button>
                <button onClick={() => this.props.onClick(dayMode)}>day</button>
            </div>
        )
    }
}