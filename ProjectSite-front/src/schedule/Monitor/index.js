import React from "react";
import styled from "styled-components";

const DivWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  background-color: #FFFFFF;
  border-bottom: 2px solid #E5E5E5;
  color: #1E1F21;
  padding: 16px;
  position: relative;
`
const TextWrapper = styled('span')`
  font-size: 32px;
`;
const TitleWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-right: 8px;
  margin-left: 8px;
`;
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
const Monitor = ({today}) => {
    return (
        <DivWrapper>
            <div>
                <TitleWrapper>
                    {today.format("MMMM")}
                </TitleWrapper>
                <TextWrapper>
                    {today.format("YYYY")}
                </TextWrapper>
            </div>
            <ButtonsWrapper>
                <ButtonWrapper> &lt; </ButtonWrapper>
                <TodayButton>Today</TodayButton>
                <ButtonWrapper> &gt; </ButtonWrapper>
            </ButtonsWrapper>

        </DivWrapper>
    )
}
export {Monitor}
