import React, {useEffect, useState} from 'react';
import {Header} from "../Header";
import {CalendarGrid} from "../CalendarGrid";
import {Monitor} from "../Monitor";
import moment from "moment";
import styled from "styled-components";
import AppSchedule from "../../components/appSchedule/script";
import {useNavigate} from "react-router-dom";
import {DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH} from "../helpers/constants";
import {DayShowComponent} from "../DayShowComponent";

const ShadowWrapper = styled('div')`
  min-width: 850px;

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
  min-width: 320px;
  height: 132px;
  background-color: #1E1F21;
  color: #DDDDDD;
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
  background-color: #FFFFFF;
  justify-content: flex-end;
`;

export const ButtonWrapper = styled('button')`
  color: ${props => props.danger ? '#f00' : '#272282A'};
  border: 1px solid ${props => props.danger ? '#f00' : '#27282A'};
  border-radius: 2px;
  cursor: pointer;
  &:not(:last-child){
    margin-right: 2px;
  }
`;
const ListOfHours = styled('ul')`
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 60px;
  overflow-y: scroll;
  color: #000;
  position: absolute;
  left: 2px;
  background-color: rgb(239, 239, 239);
`;

const HoursButton = styled('button')`
  border: none;
  background-color: unset;
  cursor: pointer;
`;
const url = 'http://localhost:3001';
const totalDays = 42;
const defaultEvent = {
    title: '',
    description: '',
    date: moment().format('X'),
    exercise: "Exercise"

}
const ButEx = styled('div')`
    position: relative;
    left: 0px;
    top: 0px;
    padding: 8px 14px;
    background-color: white;
    border-bottom: inherit;
    border-bottom-color: cornflowerblue;
`;

function Schedule() {
    const [displayMode, setDisplayMode] = useState(DISPLAY_MODE_MONTH);
    const navigate = useNavigate();
    moment.updateLocale('en', {week: {dow: 1}})
    // const today = moment();
    const [today, setToday] = useState(moment())
    const startDay = today.clone().startOf(DISPLAY_MODE_MONTH).startOf('week');
    const prevHandler = () => {
        setToday(prev => prev.clone().subtract(1, displayMode))
    };
    const todayHandler = () => setToday(moment())
    const nextHandler = () => {
        setToday(prev => prev.clone().add(1, displayMode))
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
        setMethod(methodName);
    }
    const openModalFormHandler = (methodName, eventForUpdate, dayItem) => {
        setShowForm(true);
        openFormHandler(methodName, eventForUpdate, dayItem);
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
    const [exercisesPicker, setExercisesPicker] = useState(false);
    const array1 = ["press", "running", "planka", "otjimanie"];
    const addExercise = (i) => {
        setExercisesPicker(false);
        changeEventHandler(i, 'exercise');
    }
    return (
        <>
            {
                isShowForm ? (
                    <FormPositionWrapper onClick={cancelButtonHandler}>
                        <FormWrapper onClick={e => e.stopPropagation()}>
                            <ButEx>
                                <button onClick={() => setExercisesPicker(prevState => !prevState)}>{`${event.exercise}`}</button>
                                {
                                    exercisesPicker ? (
                                        <ListOfHours>{
                                            [...new Array(array1.length)].map((_, i) => (
                                                <li>
                                                    <HoursButton
                                                        onClick={() => addExercise(array1.at(i))}>{array1.at(i)}</HoursButton>
                                                </li>
                                            ))
                                        }</ListOfHours>
                                    ) : null}
                            </ButEx>
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
                                        <ButtonWrapper danger onClick={removeEventHandler}>Remove</ButtonWrapper>
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
                             nextHandler={nextHandler}
                             setDisplayMode={setDisplayMode}
                             displayMode={displayMode}
                    />
                    {
                        displayMode === DISPLAY_MODE_MONTH ? (
                            <CalendarGrid startDay={startDay} today={today} totalDays={totalDays} events={events}
                                          openFormHandler={openModalFormHandler} setDisplayMode={setDisplayMode}/>
                        ) : null
                    }
                    {
                        displayMode === DISPLAY_MODE_DAY ? (
                            <DayShowComponent events={events} today={today} selectedEvent={event}
                                              changeEventHandler={changeEventHandler}
                                              cancelButtonHandler={cancelButtonHandler}
                                              eventFetchHandler={eventFetchHandler}
                                              method={method}
                                              removeEventHandler={removeEventHandler}
                                              openFormHandler={openFormHandler}/>
                        ) : null
                    }
                </ShadowWrapper>
            </AppSchedule>
        </>
    )
}

export default Schedule;
