import React from "react";
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

const DayShowWrapper = styled('div')`
  display: flex;
  flex-grow: 1;
  border-top: 1px solid #464648;;
`;

const EventsListWrapper = styled('div')`
  background-color: #FFFFFF;
  color: #DDDDDD;
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
    return (
        <DayShowWrapper>
            <EventsListWrapper>
                <EventListWrapper>
                    {
                        eventList.map(event => (
                            <EventListItemWrapper key={event.id}>
                                <EventItemWrapper onClick={() => openFormHandler('Update', event)}>
                                    {event.title}
                                </EventItemWrapper>
                            </EventListItemWrapper>
                        ))
                    }
                </EventListWrapper>
            </EventsListWrapper>
            <EventFormWrapper>
                {
                    selectedEvent ? (
                        <div>
                            <EventTitle
                                value={selectedEvent.title}
                                onChange={e => changeEventHandler(e.target.value, 'title')}
                                placeholder="Title"
                            />
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
