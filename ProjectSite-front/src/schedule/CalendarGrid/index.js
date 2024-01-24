import React from "react";
import {CalendarGridHeader} from "../CalendarGridHeader";
import {MonthDaysList} from "../MonthDaysList";
import {GridWrapper} from "../containers/StyledComponents";

const CalendarGrid = ({startDay, today, totalDays, events, openFormHandler, setDisplayMode, setDayItem}) => {

    return (
        <>
            <GridWrapper isHeader>
                <CalendarGridHeader/>
            </GridWrapper>
            <GridWrapper>
                <MonthDaysList totalDays={totalDays} openFormHandler={openFormHandler} events={events}
                               startDay={startDay} today={today} setDisplayMode={setDisplayMode}
                               setDayItem={setDayItem}/>

            </GridWrapper>
        </>
    )
}
export {CalendarGrid}
