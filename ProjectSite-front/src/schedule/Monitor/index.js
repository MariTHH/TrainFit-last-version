import React from "react";
import styled from "styled-components";
import {DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH} from "../helpers/constants";
import {DivWrapper, TextWrapper, TitleWrapper} from "../containers/StyledComponents";
import moment from "moment";

const ButtonsWrapper = styled('div')`
  align-items: center;
  display: flex;
`;

const ButtonWrapper = styled('button')`
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #565759;
  cursor: pointer;
  display: flex;
  height: 30px;
  justify-content: center;
`;
const TodayButton = styled(ButtonWrapper)`
  font-weight: bold;
`;

const ButtonsCenterWrapper = styled(ButtonsWrapper)`
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
`;


const Monitor = ({prevHandler, todayHandler, nextHandler, setDisplayMode, displayMode, dayItem, setDayItem}) => {
    return (
        <DivWrapper>
            <div>
                {
                    displayMode === DISPLAY_MODE_DAY ? (
                        <TextWrapper>
                            {
                                dayItem.format("DD")
                            }
                        </TextWrapper>
                    ) : null
                }
                <TitleWrapper>
                    {dayItem.format("MMMM")}
                </TitleWrapper>
                <TextWrapper>
                    {dayItem.format("YYYY")}
                </TextWrapper>
            </div>
            <ButtonsCenterWrapper>
                <ButtonWrapper unPressed={displayMode === DISPLAY_MODE_MONTH}
                               onClick={() => setDisplayMode(DISPLAY_MODE_MONTH)}>Month</ButtonWrapper>
                <ButtonWrapper unPressed={displayMode === DISPLAY_MODE_DAY}
                               onClick={() => {
                                   setDisplayMode(DISPLAY_MODE_DAY);
                                   setDayItem(moment())
                               }}>Day</ButtonWrapper>
            </ButtonsCenterWrapper>
            <ButtonsWrapper>
                <ButtonWrapper onClick={prevHandler}> &lt; </ButtonWrapper>
                <TodayButton onClick={todayHandler}>Today</TodayButton>
                <ButtonWrapper onClick={nextHandler}> &gt; </ButtonWrapper>
            </ButtonsWrapper>

        </DivWrapper>
    )
}
export {Monitor}
