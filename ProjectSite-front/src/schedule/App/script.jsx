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
const FormPositionWrapper = styled('div')`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FormWrapper = styled(ShadowWrapper)`
  width: 320px;
  background-color: #FFFFFF;
  color: #000000;
  box-shadow:unset;
`;
const EventTitle = styled('input')`
  padding: 8px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #FFFFFF;
  color: #000000;
  outline: unset;
  border-bottom: 1px solid #464648;
`;

const EventBody = styled('textarea')`
  padding: 8px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #FFFFFF;
  color: #000000;
  outline: unset;
  border-bottom: 1px solid #464648;
  resize:none;
  height: 60px;
`;
export const ButtonsWrapper = styled('div')`
  padding: 8px 14px;
  display: flex;
  justify-content: flex-end;
`;

export const ButtonWrapper = styled('button')`
  color: black;
  border: 1px solid black;
  border-radius: 2px;
  cursor: pointer;
  &:not(:last-child){
    margin-right: 2px;
  }
`;
const url = 'http://localhost:3001';
const totalDays = 42;
const defaultEvent = {
    title: '',
    description: '',
    date: moment().format('X')

}

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

    const [method, setMethod] = useState(null)
    const [isShowForm, setShowForm] = useState(false)
    const [event, setEvent] = useState(null);//event for redaction
    const [events, setEvents] = useState([]);
    const startDateQuery = startDay.clone().format('X');
    const endDateQuery = today.clone().add(totalDays, 'days').format('X');
    useEffect(() => {
        fetch(`${url}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setEvents(res);
            })
    }, [today])
    const openFormHandler = (methodName, eventForUpdate, dayItem) => {
        setEvent(eventForUpdate || {...defaultEvent, date: dayItem.format('X')});
        setShowForm(true);
        setMethod(methodName);
        console.log(event);
    }
    const cancelButtonHandler = () => {
        setShowForm(false);
        setEvent(null);
    }
    const changeEventHandler = (text, field) => {
        setEvent(prevState => ({
            ...prevState,
            [field]: text
        }))
    }
    const removeEventHandler = () => {
        const fetchUrl = `${url}/events/${event.id}`;
        const httpMethod = 'DELETE';

        fetch(fetchUrl, {
                method: httpMethod,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(res => {
                setEvents(prevState => prevState.filter(eventEl => eventEl.id !== event.id))
                cancelButtonHandler()
            })

    }
    const eventFetchHandler = () => {
        const fetchUrl = method === 'Update' ? `${url}/events/${event.id}` : `${url}/events`;
        const httpMethod = method === 'Update' ? 'PATCH' : 'POST';

        fetch(fetchUrl, {
                method: httpMethod,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            }
        )
            .then(res => res.json())
            .then(res => {
                if (httpMethod === 'PATCH') {
                    setEvents(prevState => prevState.map(eventEl => eventEl.id === res.id ? res : eventEl))
                } else {
                    setEvents(prevState => [...prevState, res]);
                }
                cancelButtonHandler()
            })

    }
    return (
        <>
            {
                isShowForm ? (
                    <FormPositionWrapper onClick={cancelButtonHandler}>
                        <FormWrapper onClick={e => e.stopPropagation()}>
                            <EventTitle
                                value={event.title}
                                onChange={e => changeEventHandler(e.target.value, 'title')}
                                placeholder="Title"
                            />
                            <EventBody
                                value={event.description}
                                onChange={e => changeEventHandler(e.target.value, 'description')}
                                placeholder="Description"
                            />
                            <ButtonsWrapper>
                                <ButtonWrapper onClick={cancelButtonHandler}>Cancel</ButtonWrapper>
                                <ButtonWrapper onClick={eventFetchHandler}>{method}</ButtonWrapper>
                                {
                                    method === 'Update' ? (
                                        <ButtonWrapper onClick={removeEventHandler}>Remove</ButtonWrapper>
                                    ) : null
                                }
                            </ButtonsWrapper>
                        </FormWrapper>
                    </FormPositionWrapper>
                ) : null
            }
            <AppSchedule>
                <ShadowWrapper>
                    <Header/>
                    <Monitor today={today}
                             prevHandler={prevHandler}
                             todayHandler={todayHandler}
                             nextHandler={nextHandler}/>

                    <CalendarGrid startDay={startDay} today={today} totalDays={totalDays} events={events}
                                  openFormHandler={openFormHandler}/>
                </ShadowWrapper>
            </AppSchedule>
        </>
    )
}

export default Schedule;
