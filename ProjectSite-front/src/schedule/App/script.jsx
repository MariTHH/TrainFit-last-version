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
import localStorage from "mobx-localstorage";

import {
    ButEx,
    Button1Wrapper, ButtonWrapperSignIn, ButtonWrapperSignOut, EventBody,
    FormPositionWrapper,
    FormWrapper, HoursButton,
    ListOfHours,
    ShadowWrapper, TextWrapper, TextWrapperSignIn
} from "../containers/StyledComponents";
import {useSession, useSessionContext, useSupabaseClient} from "@supabase/auth-helpers-react";

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

  &:not(:last-child) {
    margin-right: 2px;
  }
`;
const url = 'http://localhost:3001';
const totalDays = 42;
const defaultEvent = {
    title: '',
    description: '',
    login: localStorage.getItem("login"),
    date: moment().format('X'),
    exercise: "Exercise",
    googleId: null

}


function Schedule() {
    const [displayMode, setDisplayMode] = useState(DISPLAY_MODE_MONTH);
    const [dayItem, setDayItem] = useState(null);
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
        const currLogin = localStorage.getItem('login');
        fetch(`${url}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}&login=${currLogin}`)
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
    const removeEventHandler = async () => {
        const fetchUrl = `${url}/events/${event.id}`;
        const httpMethod = 'DELETE';
        await deleteCalendarEvent(event.googleId)
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
    let idGoogle
    const eventFetchHandler = async () => {
        const fetchUrl = method === 'Update' ? `${url}/events/${event.id}` : `${url}/events`;
        const httpMethod = method === 'Update' ? 'PATCH' : 'POST';
        if (method === 'Create') {
            idGoogle = await createCalendarEvent(event.exercise, event.description, event.date);
            event.googleId = idGoogle;
            await changeEventHandler(idGoogle, 'googleId');
        }
        if (method === 'Update') {
            await updateGoogleCalendarEvent(event.googleId, event.exercise, event.description, event.date)
        }
        fetch(fetchUrl, {
            method: httpMethod,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })
            .then(res => res.json())
            .then(res => {
                if (httpMethod === 'PATCH') {
                    setEvents(prevState => prevState.map(eventEl => eventEl.id === res.id ? res : eventEl))
                } else {
                    setEvents(prevState => [...prevState, res]);

                }
                cancelButtonHandler()
            });
    };
    const [exercisesPicker, setExercisesPicker] = useState(false);
    const array1 = ["press", "running", "plank", "push up"];
    const addExercise = (i) => {
        setExercisesPicker(false);
        changeEventHandler(i, 'exercise');
    }
    const session = useSession(); // tokens, when session exists we have a user
    const supabase = useSupabaseClient(); // talk to supabase!
    const {isLoading} = useSessionContext();

    if (isLoading) {
        return <></>
    }

    async function googleSignIn() {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                scopes: 'https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/calendar'
            }
        });
        if (error) {
            alert("Error logging in to Google provider with Supabase");
            console.log(error);
        }
    }

    async function signOut() {
        await supabase.auth.signOut();
    }

    let a;

    async function createCalendarEvent(eventName, eventDescription, eventDate) {
        const date = new Date(eventDate * 1000);
        const dateString = date.toISOString();
        const event1 = {
            'summary': eventName,
            'description': eventDescription,
            'start': {
                'dateTime': dateString
            },
            'end': {
                'dateTime': dateString
            }
        }
        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + session.provider_token // Access token for google
            },
            body: JSON.stringify(event1)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            a = data.id;
        });
        return a;
    }

    async function updateGoogleCalendarEvent(eventId, eventName, eventDescription, eventDate) {
        const date = new Date(eventDate * 1000);
        const dateString = date.toISOString();
        console.log(dateString);
        const event = {
            'summary': eventName,
            'description': eventDescription,
            'start': {
                'dateTime': dateString
            },
            'end': {
                'dateTime': dateString
            }
        };
        try {
            const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events/" + eventId, {
                method: "PUT",
                headers: {
                    'Authorization': 'Bearer ' + session.provider_token // Access token for google
                },
                body: JSON.stringify(event)
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteCalendarEvent(eventId) {
        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events/" + eventId, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + session.provider_token // Access token for google
            }
        }).then((data) => {
            console.log('done');
        });
    }

    return (
        <>
            {session ?
                <>
                    <TextWrapperSignIn>Hey there {session.user.email}</TextWrapperSignIn>
                    <ButtonWrapperSignOut onClick={() => signOut()}>Sign Out</ButtonWrapperSignOut>
                </>
                :
                <>
                    <ButtonWrapperSignIn onClick={() => googleSignIn()}>Sign In With Google</ButtonWrapperSignIn>
                </>
            }
            {
                isShowForm ? (
                    <FormPositionWrapper onClick={cancelButtonHandler}>
                        <FormWrapper onClick={e => e.stopPropagation()}>
                            <ButEx>
                                <Button1Wrapper
                                    onClick={() => setExercisesPicker(prevState => !prevState)}>{`${event.exercise}`}</Button1Wrapper>
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
                                <Button1Wrapper onClick={cancelButtonHandler}>Cancel</Button1Wrapper>
                                <Button1Wrapper onClick={eventFetchHandler}>{method}</Button1Wrapper>
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
                             dayItem={dayItem}
                             setDayItem={setDayItem}

                    />
                    {
                        displayMode === DISPLAY_MODE_MONTH ? (
                            <CalendarGrid startDay={startDay} today={today} totalDays={totalDays} events={events}
                                          openFormHandler={openModalFormHandler} setDisplayMode={setDisplayMode}
                                          setDayItem={setDayItem}/>
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
                                              openFormHandler={openFormHandler} dayItem={dayItem}/>
                        ) : null
                    }
                </ShadowWrapper>
            </AppSchedule>
        </>
    )
}

export default Schedule;
