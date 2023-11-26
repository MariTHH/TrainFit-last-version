import React, {useState} from 'react';
import AppContainer from "../../components/appContainer/script";
import {Header} from "../Header";
import {CalendarGrid} from "../CalendarGrid";
import {Monitor} from "../Monitor";
import moment from "moment";

function Schedule() {
    const startDay = moment().startOf('month').startOf('week');
    return (
        <AppContainer>
            <div>
                <Header/>
                <Monitor/>
                <CalendarGrid startDay={startDay}/>
            </div>
        </AppContainer>
    )
}

export default Schedule;
