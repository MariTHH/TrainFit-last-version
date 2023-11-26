import React from "react";
import styled from 'styled-components';

const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-template-rows: repeat(6, 1fr);
	grid-gap: 1px;
	background-color: #E5E5E5;
`;
const CellWrapper = styled.div`
	min-width: 140px;
	min-height: 80px;
	background-color: #FFFFFF;
	background-color: ${props => props.isWeekend ? '#F5F5F5' : '#FFFFFF'};
`;
const RowInCell = styled.div`
    display: flex;
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
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
const CalendarGrid = ({startDay}) => {
    const day = startDay.clone();
    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());
    return (
        <GridWrapper>
            {
                daysArray.map((dayItem) => (
                    <CellWrapper
                        key={dayItem.format("DDMMYYYY")}
                        isWeekend={dayItem.day() === 6 || dayItem.day() === 0} // выходные другого цвета
                    >
                        <RowInCell
                            justifyContent={'flex-end'}
                        >
                            <DayWrapper>
                                {dayItem.format("D")}
                            </DayWrapper>
                        </RowInCell>
                    </CellWrapper>
                ))
            }

        </GridWrapper>
    )
}
export {CalendarGrid}
