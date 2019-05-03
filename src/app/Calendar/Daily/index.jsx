import React from 'react';
import Monthly from "../Monthly";
import {getMonthName} from "../util/calendar";
import styles from './index.scss';

export default class Daily extends React.Component {
    returnHours() {
        const hours = ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'];
        return hours.map(e => {
           return (
               <div>
                   {e}
               </div>
           )
        });
    }

    render() {
        return (
            <div>
                {this.returnHours()}
            </div>
        )
    }
}