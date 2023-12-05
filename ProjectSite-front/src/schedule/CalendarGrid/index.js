import React from "react";
import styled from 'styled-components';
import moment from "moment";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  //grid-template-rows: repeat(6, 1fr);
  grid-gap: 1px;
  background-color:${props => props.isHeader ? '#FFFFFF' : '#E5E5E5'};
  ${props => props.isHeader && 'border-bottom: 1px solid #E5E5E5'}
    `
;
const CellWrapper = styled.div`
  min-width: 200px;
  min-height: ${props => props.isHeader ? 24 : 80}px;
 
  background-color: ${props => props.isWeekday ? '#F5F5F5' : '#FFFFFF'};
  color: ${props => props.isSelectedMonth ? `#000000` : `#bbbbbb`};
`;
const RowInCell = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
  ${props => props.pr && `padding-right: ${props.pr * 8}px`}
  
`
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
const CalendarGrid = ({startDay, today, totalDays, events, openFormHandler}) => {
    const day = startDay.clone().subtract(1, "day");
    const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());
    const isCurrentDay = (day) => moment().isSame(day, 'day');
    const isSelectedMonth = (day) => today.isSame(day, 'month');
    return (
        <>
            <GridWrapper isHeader>{[...Array(7)].map((_, i) => (
                <CellWrapper isHeader isSelectedMonth key={i}>
                    <RowInCell justifyContent={'flex-end'} pr={1}>
                        {moment().day(i + 1).format('ddd')}
                    </RowInCell>
                </CellWrapper>))}
            </GridWrapper>
            <GridWrapper>
                {
                    daysArray.map((dayItem) => (
                        <CellWrapper
                            isWeekday={dayItem.day() === 6 || dayItem.day() === 0} // выходные другого цвета
                            key={dayItem.unix()}
                            isSelectedMonth={isSelectedMonth(dayItem)}
                        >
                            <RowInCell
                                justifyContent={'flex-end'}
                            >
                                <ShowDayWrapper>
                                    <DayWrapper onDoubleClick={() => openFormHandler("Create",null,dayItem)}>
                                        {
                                            isCurrentDay(dayItem) ? (
                                                <CurrentDay>{dayItem.format('D')}</CurrentDay>
                                            ) : (
                                                dayItem.format('D')
                                            )
                                        }
                                    </DayWrapper>
                                </ShowDayWrapper>
                                <EventListWrapper>
                                    {
                                        events
                                            .filter(event => event.date >= dayItem.format('X') && event.date <= dayItem.clone().endOf('day').format('X'))
                                            .map(event =>(
                                                <div key={event.id}>
                                                    <EventItemWrapper onDoubleClick={() => openFormHandler("Update",event)}>
                                                        {event.title}
                                                    </EventItemWrapper>
                                                </div>
                                            ))
                                    }
                                </EventListWrapper>
                            </RowInCell>
                        </CellWrapper>
                    ))
                }

            </GridWrapper>
        </>
    )
}
export {CalendarGrid}
