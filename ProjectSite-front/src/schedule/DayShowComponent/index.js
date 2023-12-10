import React, {useState} from "react";
import {isDayContainCurrentEvent} from "../helpers";
import styled from "styled-components"
import {
    EventBody,
    EventItemWrapper,
    EventListItemWrapper,
    EventListWrapper,
    EventTitle,
    ButtonsWrapper,
    ButtonWrapper
} from "../containers/StyledComponents";
import {ITEMS_PER_DAY} from "../helpers/constants";
import moment from "moment";

const DayShowWrapper = styled('div')`
  display: flex;
  flex-grow: 1;
  border-top: 1px solid #464648;;
`;

const EventsListWrapper = styled('div')`
  background-color: #FFFFFF;
  color: black;
  flex-grow: 1;
`;
const EventFormWrapper = styled('div')`
  background-color: #dddddd;
  color: black;
  width: 300px;
  position: relative;
  border-left: 1px solid #464648;;
`;
const NoEventMsg = styled('div')`
  color: #565759;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%,-50%);
`;
const ScaleWrapper = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 4px;
  position: relative;
`;

const ScaleCellWrapper = styled('div')`
  flex-grow: 1;
  position: relative;
  &:not(:last-child){
    border-bottom: 1px solid #464648;
  }
  margin-left: 32px;
`;

const ScaleCellTimeWrapper = styled('div')`
  position: absolute;
  left: -26px;
  top: -6px;
  font-size: 8px;
`;

const ScaleCellEventWrapper = styled('div')`
  min-height: 20px;
`;
const EventItemButton = styled(EventItemWrapper)`
    min-width: 50px;
    width: unset;
    margin-left: 4px;
`

const SelectEventTimeWrapper = styled('div')`
  padding: 8px 14px;
  border-bottom: 1px solid #464648;
  display: flex;
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

const PositionRelative = styled('div')`
  position: relative;
`;

const HoursButton = styled('button')`
  border: none;
  background-color: unset;
  cursor: pointer;
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
                                     openFormHandler
                                 }) => {
    const eventList = events.filter(event => isDayContainCurrentEvent(event, today))
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

    return (
        <DayShowWrapper>
            <EventsListWrapper>
                <ScaleWrapper>
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
                            <ButEx>
                                <button
                                        onClick={() => setExercisesPicker(prevState => !prevState)}>{`${selectedEvent.exercise}`}</button>
                                    {
                                        exercisesPicker ? (
                                            <ListOfHours>{
                                                [...new Array(array1.length)].map((_, i) => (
                                                    <li>
                                                        <HoursButton
                                                            onClick={() => {
                                                                addExercise(array1.at(i))
                                                            }}>{array1.at(i)}</HoursButton>
                                                    </li>
                                                ))
                                            }</ListOfHours>
                                        ) : null}

                            </ButEx>
                            <SelectEventTimeWrapper>
                                <PositionRelative>
                                    <button>{moment.unix(+selectedEvent.date).format('dddd, D MMMM')} </button>
                                </PositionRelative>

                                <PositionRelative>
                                    <button
                                        onClick={() => setShowTimePicker(prevState => !prevState)}>{moment.unix(+selectedEvent.date).format('HH:mm')} </button>


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
                                <button onClick={() => openFormHandler('Create', null, today)}> Create
                                </button>
                            </div>
                            <NoEventMsg>No event selected</NoEventMsg>
                        </>
                    )
                }
            </EventFormWrapper>
        </DayShowWrapper>

    )
}
