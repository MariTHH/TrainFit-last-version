import React from "react";
import {isCurrentDay, isDayContainCurrentEvent, isSelectedMonth} from "../helpers";
import {CellWrapper, RowInCell} from "../containers/StyledComponents";
import styled from "styled-components";
import {DISPLAY_MODE_DAY} from "../helpers/constants";

const DayWrapper = styled.div`
  height: 31px;
  width: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  cursor: pointer;
`

const CurrentDay = styled('div')`
  height: 100%;
  width: 100%;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ShowDayWrapper = styled('div')`
	display: flex;
	justify-content: flex-end;
`;
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
const EventItemWrapperButton = styled('button')`
    float:none;
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
	background-color:#dddddd;
	border-radius: 2px;
`;
export const CalendarCell = ({dayItem, today, openFormHandler, events, setDisplayMode}) => {
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
                                <EventItemWrapperButton onClick={() => setDisplayMode(DISPLAY_MODE_DAY)}>
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
                                        {event.title}
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
