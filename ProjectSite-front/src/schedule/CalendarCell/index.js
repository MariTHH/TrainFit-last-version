import React from "react";
import {isCurrentDay, isDayContainCurrentEvent, isSelectedMonth} from "../helpers";
import {
    CellWrapper,
    CurrentDay,
    DayWrapper,
    EventItemWrapperButton,
    RowInCell,
    ShowDayWrapper
} from "../containers/StyledComponents";
import styled from "styled-components";
import {DISPLAY_MODE_DAY} from "../helpers/constants";
const EventListWrapper = styled('ul')`
  list-style-position:inside;
  padding-left: 4px;
`;
const EventItemWrapper = styled('button')`
    position: relative;
    right:20px;
    flex-grow: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 114px;
    border: unset;
    color: #000000;
    cursor: pointer;
    background-color: lightblue;
    border-radius: 2px;
`;
export const CalendarCell = ({dayItem, today, openFormHandler, events, setDisplayMode, setDayItem}) => {
    return (
        <CellWrapper
            isWeekday={dayItem.day() === 6 || dayItem.day() === 0} // выходные другого цвета
            key={dayItem.unix()}
            isSelectedMonth={isSelectedMonth(dayItem, today)}
        >
            <RowInCell
                justifyContent={'flex-end'}
            >
                <EventListWrapper>
                    {
                        events.length > 0 ? (
                            <div key={"Show day"}>
                                <EventItemWrapperButton onClick={() => {
                                    setDisplayMode(DISPLAY_MODE_DAY);
                                    setDayItem(dayItem);
                                }}>
                                    show day
                                </EventItemWrapperButton>
                            </div>
                        ) : null
                    }
                    {
                        events
                            .filter(event => isDayContainCurrentEvent(event, dayItem))
                            .map(event => (
                                <div key={event.id}>
                                    <EventItemWrapper
                                        onDoubleClick={() => openFormHandler("Update", event)}>
                                        {event.exercise}
                                    </EventItemWrapper>
                                </div>
                            ))
                    }
                </EventListWrapper>
                <ShowDayWrapper>
                    <DayWrapper onDoubleClick={() => openFormHandler("Create", null, dayItem)}>
                        {
                            isCurrentDay(dayItem) ? (
                                <CurrentDay>{dayItem.format('D')}</CurrentDay>
                            ) : (
                                dayItem.format('D')
                            )
                        }
                    </DayWrapper>
                </ShowDayWrapper>
            </RowInCell>
        </CellWrapper>
    )
}
