import React from "react";
import styled from "styled-components";
import {DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH} from "../helpers/constants";
import {DivWrapper, TextWrapper, TitleWrapper} from "../containers/StyledComponents";
const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled('button')`
  border: unset;
  background-color: #FFFFFF;
  border: 1px solid #565759;
  height: 30px;
  border-radius: 4px;
  cursor:pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TodayButton = styled(ButtonWrapper)`
	font-weight: bold;
`;

function ButtonsCenterWrapper(props) {
    return null;
}

const Monitor = ({today, prevHandler, todayHandler, nextHandler, setDisplayMode, displayMode}) => {
    return (
        <DivWrapper>
            <div>
                {
                    displayMode === DISPLAY_MODE_DAY ? (
                        <TextWrapper>
                            {today.format("DD")}
                        </TextWrapper>
                    ) : null
                }
                <TitleWrapper>
                    {today.format("MMMM")}
                </TitleWrapper>
                <TextWrapper>
                    {today.format("YYYY")}
                </TextWrapper>
            </div>
            <ButtonsCenterWrapper>
                <ButtonWrapper unPressed={displayMode === DISPLAY_MODE_MONTH}
                               onClick={() => setDisplayMode(DISPLAY_MODE_MONTH)}>Month</ButtonWrapper>
                <ButtonWrapper unPressed={displayMode === DISPLAY_MODE_DAY}
                               onClick={() => setDisplayMode(DISPLAY_MODE_DAY)}>Day</ButtonWrapper>
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
