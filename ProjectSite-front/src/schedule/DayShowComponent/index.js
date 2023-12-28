import React, {useEffect, useState} from "react";
import {isDayContainCurrentEvent, isDayContainCurrentTimestamp} from "../helpers";
import styled from "styled-components"
import {
    EventBody,
    EventItemWrapper,
    EventListItemWrapper,
    EventListWrapper,
    EventTitle,
    ButtonsWrapper,
    ButtonWrapper,
    Button1Wrapper,
    EventsListWrapper,
    ScaleWrapper,
    RedLine,
    DayShowWrapper,
    ScaleCellWrapper,
    ScaleCellTimeWrapper,
    ScaleCellEventWrapper,
    EventItemButton,
    EventFormWrapper,
    SelectEventTimeWrapper,
    PositionRelative, ListOfEx, NoEventMsg
} from "../containers/StyledComponents";
import {ITEMS_PER_DAY} from "../helpers/constants";
import moment from "moment";
const HoursButton = styled('button')`
  border: none;
  background-color: unset;
  cursor: pointer;
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
export const DayShowComponent = ({
                                     events,
                                     today,
                                     selectedEvent,
                                     changeEventHandler,
                                     cancelButtonHandler,
                                     eventFetchHandler,
                                     method,
                                     removeEventHandler,
                                     openFormHandler, dayItem
                                 }) => {
    const eventList = events.filter(event => isDayContainCurrentEvent(event, dayItem))
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [exercisesPicker, setExercisesPicker] = useState(false);
    const array1 = ["press", "running", "planka", "otjimanie"];
    const cells = [...new Array(ITEMS_PER_DAY)].map((_, i) => {
        const temp = [];
        eventList.forEach(event => {
            if (+moment.unix(+event.date).format('H') === i) {
                temp.push(event);
            }
        })
        return temp;
    })

    const setTimeForEvent = (i) => {
        setShowTimePicker(false);
        const time = moment.unix(+selectedEvent.date).hour(i).format('X')
        changeEventHandler(time, 'date');
    }
    const addExercise = (i) => {
        setExercisesPicker(false);
        changeEventHandler(i, 'exercise');
    }
    const getRedLinePosition = () => ((moment().format('X')-today.format('X'))/86400)*100;
    const [, setCounter] = useState(0);
    useEffect(() =>{
        const timerId = setInterval(() =>{
            setCounter(prevState => prevState + 1);
        },1000);
        return () => clearInterval(timerId);
    }, [])

    return (
        <DayShowWrapper>
            <EventsListWrapper>
                <ScaleWrapper>
                    {
                        isDayContainCurrentTimestamp(moment().format('X'),today) ? (
                            <RedLine position={getRedLinePosition()} />
                        ) : null
                    }
                    {
                        cells.map((eventList, i) => (
                            <ScaleCellWrapper>
                                <ScaleCellTimeWrapper>
                                    {
                                        i ? (
                                            <>
                                                {`${i}`.padStart(2, `0`)}:00
                                            </>
                                        ) : null
                                    }
                                </ScaleCellTimeWrapper>
                                <ScaleCellEventWrapper>
                                    {
                                        eventList.map(event => (
                                            <EventItemButton onClick={() => openFormHandler('Update', event)}>
                                                {event.title}{" "}
                                                {event.exercise}
                                            </EventItemButton>
                                        ))
                                    }
                                </ScaleCellEventWrapper>

                            </ScaleCellWrapper>
                        ))
                    }
                </ScaleWrapper>
            </EventsListWrapper>
            <EventFormWrapper>
                {
                    selectedEvent ? (
                        <div>
                            <SelectEventTimeWrapper>

                                <PositionRelative>
                                    <Button1Wrapper>{moment.unix(+selectedEvent.date).format('dddd, D MMMM')} </Button1Wrapper>
                                </PositionRelative>

                                <PositionRelative>
                                    <Button1Wrapper
                                        onClick={() => setShowTimePicker(prevState => !prevState)}>{moment.unix(+selectedEvent.date).format('HH:mm')} </Button1Wrapper>


                                    {
                                        showTimePicker ? (
                                            <ListOfHours>{
                                                [...new Array(ITEMS_PER_DAY)].map((_, i) => (
                                                    <li>
                                                        <HoursButton
                                                            onClick={() => setTimeForEvent(i)}>{`${i}`.padStart(2, `0`)}:00</HoursButton>
                                                    </li>
                                                ))
                                            }</ListOfHours>
                                        ) : null
                                    }
                                </PositionRelative>
                                <PositionRelative>
                                    <Button1Wrapper
                                        onClick={() => setExercisesPicker(prevState => !prevState)}>{`${selectedEvent.exercise}`}</Button1Wrapper>
                                    {
                                        exercisesPicker ? (
                                            <ListOfEx>{
                                                [...new Array(array1.length)].map((_, i) => (
                                                    <li>
                                                        <HoursButton
                                                            onClick={() => {
                                                                addExercise(array1.at(i))
                                                            }}>{array1.at(i)}</HoursButton>
                                                    </li>
                                                ))
                                            }</ListOfEx>
                                        ) : null}
                                </PositionRelative>
                            </SelectEventTimeWrapper>
                            <EventBody
                                value={selectedEvent.description}
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
                        </div>
                    ) : (
                        <>
                            <div>
                                <ButtonWrapper onClick={() => openFormHandler('Create', null, today)}> Create
                                </ButtonWrapper>
                            </div>
                            <NoEventMsg>No event selected</NoEventMsg>
                        </>
                    )
                }
            </EventFormWrapper>
        </DayShowWrapper>

    )
}
