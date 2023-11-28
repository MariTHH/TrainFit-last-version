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
 
  background-color: ${props => props.isWeekend ? '#F5F5F5' : '#FFFFFF'};
  color: ${props => props.isSelectedMonth ? `#000000`:`#bbbbbb`};
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
const CalendarGrid = ({startDay, today}) => {
    const day = startDay.clone().subtract(1, "day");
    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());
    const isCurrentDay = (day) => moment().isSame(day, 'day');
    const isSelectedMonth = (day) => today.isSame(day, 'month');
    return (
        <>
            <GridWrapper isHeader>{[...Array(7)].map((_, i) => (
                <CellWrapper isHeader isSelectedMonth>
                    <RowInCell justifyContent={'flex-end'} pr={1}>
                    {moment().day(i+1).format('ddd')}
                    </RowInCell>
            </CellWrapper>))}
            </GridWrapper>
            <GridWrapper>
                {
                    daysArray.map((dayItem) => (
                        <CellWrapper
                            isWeekend={dayItem.day() === 6 || dayItem.day() === 0} // выходные другого цвета
                            key={dayItem.unix()}
                            isSelectedMonth={isSelectedMonth(dayItem)}
                        >
                            <RowInCell
                                justifyContent={'flex-end'}
                            >
                                <DayWrapper>
                                    {!isCurrentDay(dayItem) && dayItem.format("D")}
                                    {isCurrentDay(dayItem) && <CurrentDay>{dayItem.format("D")}</CurrentDay>}
                                </DayWrapper>
                            </RowInCell>
                        </CellWrapper>
                    ))
                }

            </GridWrapper>
        </>
    )
}
export {CalendarGrid}
