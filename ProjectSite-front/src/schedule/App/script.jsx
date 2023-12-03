import React, {useEffect, useState} from 'react';
import {Header} from "../Header";
import {CalendarGrid} from "../CalendarGrid";
import {Monitor} from "../Monitor";
import moment from "moment";
import styled from "styled-components";
import AppSchedule from "../../components/appSchedule/script";
import {useNavigate} from "react-router-dom";

const ShadowWrapper = styled('div')`
  border-top: 1px solid #C5C5C5;
  border-left: 1px solid #B5B7B9;
  border-right: 1px solid #B5B7B9;
  border-bottom: 2px solid #A4A5A7;
  border-radius: 8px;
  overflow:hidden;
  box-shadow: 0 0 0 1px #CACACA, 0 8px 20px 6px #D5D5D5;
  display: flex;
  flex-direction: column;
`;
const url = 'http://localhost:3001';
const totalDays = 42;

function Schedule() {
    const navigate = useNavigate();
    moment.updateLocale('en', {week: {dow: 1}})
    // const today = moment();
    const [today, setToday] = useState(moment())
    const startDay = today.clone().startOf('month').startOf('week');
    const prevHandler = () => {
        setToday(prev => prev.clone().subtract(1, 'month'))
    };
    const todayHandler = () => setToday(moment())
    const nextHandler = () => {
        setToday(prev => prev.clone().add(1, 'month'))
    };
    const [event, setEvent] = useState(null);//event for redaction
    const [events, setEvents] = useState([]);
    const startDateQuery = startDay.clone().format('X');
    const endDateQuery = today.clone().add(totalDays,'days').format('X');
    useEffect(() => {
        fetch(`${url}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setEvents(res);
            })
    }, [today])
    const openFormHandler = (method, eventForUpdate) => {
        console.log("s", method);
        setEvent(eventForUpdate)
    }
    return (
        <AppSchedule>
            <ShadowWrapper>
                <Header/>
                <Monitor today={today}
                         prevHandler={prevHandler}
                         todayHandler={todayHandler}
                         nextHandler={nextHandler}/>

                <CalendarGrid startDay={startDay} today={today} totalDays={totalDays} events={events} openFormHandler={openFormHandler}/>
            </ShadowWrapper>
        </AppSchedule>
    )
}

export default Schedule;
