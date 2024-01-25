import styled from "styled-components";

export const CellWrapper = styled.div`
  background-color: ${props => props.isWeekday ? '#F5F5F5' : '#FFFFFF'};
  color: ${props => props.isSelectedMonth ? `#000000` : `#bbbbbb`};
  max-height: 95px;
  overflow-y: hidden;
  min-height: ${props => props.isHeader ? 24 : 80}px;
  min-width: 200px;
`;
export const RowInCell = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
  ${props => props.pr && `padding-right: ${props.pr * 8}px`}

`
export const EventListWrapper = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const EventListItemWrapper = styled('li')`
  display: flex;
  margin-bottom: 2px;
  padding-left: 2px;
  padding-right: 2px;
`;

export const EventItemWrapper = styled('button')`
  background-color: #dddddd;
  border-radius: 2px;
  border: 1px solid #dddddd;
  border: unset;
  color: black;
  cursor: pointer;
  flex-grow: 1;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: relative;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 114px;
`;

export const EventTitle = styled('input')`
  background-color: #FFFFFF;
  border-bottom: 1px solid #464648;
  border: unset;
  color: #000000;
  font-size: .85rem;
  outline: unset;
  padding: 8px 14px;
  width: 100%;
`;

export const EventBody = styled('textarea')`
  background-color: #FFFFFF;
  border-bottom: 1px solid #464648;
  border: unset;
  color: #000000;
  font-size: .85rem;
  height: 60px;
  outline: unset;
  padding: 8px 14px;
  resize: none;
  width: 100%;
`;

export const ButtonsWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
  outline: unset;
  padding: 8px 14px;

`;

export const ButtonWrapper = styled('button')`
  align-items: center;
  background: lightblue;
  border-radius: 10px;
  border: 1px solid ${props => props.danger ? '#f00' : '#27282A'};
  box-shadow: 0 10px 40px 0 lightblue;
  color: ${props => props.danger ? '#f00' : 'black'};
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px;
  padding: 6px;
  transform: translate(0, -3px);
  transition: all 0.2s ease;
  width: 80px;

  &:not(:last-child) {
    margin-right: 2px;
  }

  &:hover {
    background: skyblue;
    transition: all 0.2s ease;
    transform: translate(0, -3px);
    box-shadow: 0 20px 40px 0 skyblue;
  }
`;
export const Button1Wrapper = styled('button')`
  background: lightblue;
  border-radius: 10px;
  border: 1px solid #27282A;
  color: black;
  cursor: pointer;
  height: 34px;
  margin: 1px;

  &:hover {
    background: skyblue;
    transition: all 0.2s ease;
    transform: translate(0, -3px);
    box-shadow: 0 20px 40px 0 skyblue;
  }


`;

export const ShadowWrapper = styled('div')`
  border-bottom: 2px solid #A4A5A7;
  border-left: 1px solid #B5B7B9;
  border-radius: 8px;
  border-right: 1px solid #B5B7B9;
  border-top: 1px solid #C5C5C5;
  box-shadow: 0 0 0 1px #CACACA, 0 8px 20px 6px #D5D5D5;
  display: flex;
  flex-direction: column;
  min-width: 850px;
  overflow: hidden;
`;
export const FormPositionWrapper = styled('div')`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.35);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 100;
`;

export const FormWrapper = styled(ShadowWrapper)`
  background-color: #1E1F21;
  box-shadow: unset;
  color: #DDDDDD;
  height: 132px;
  min-width: 320px;
  width: 320px;
`;
export const ListOfHours = styled('ul')`
  background-color: rgb(239, 239, 239);
  color: #000;
  height: 60px;
  left: 2px;
  list-style-type: none;
  margin: 0;
  overflow-y: scroll;
  padding: 0;
  position: absolute;
`;

export const HoursButton = styled('button')`
  background-color: unset;
  border: none;
  cursor: pointer;
`;

export const ButEx = styled('div')`
  background-color: white;
  border-bottom: 1px solid #464648;
  left: 0;
  padding: 8px 14px;
  position: relative;
  top: 0;
`;
export const DayWrapper = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 31px;
  justify-content: center;
  margin: 2px;
  width: 31px;
`

export const CurrentDay = styled('div')`
  align-items: center;
  background: #f00;
  border-radius: 50%;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`
export const ShowDayWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
`;
export const EventItemWrapperButton = styled('button')`
  background-color: #dddddd;
  border-radius: 2px;
  border: unset;
  color: #000000;
  cursor: pointer;
  flex-grow: 1;
  float: none;
  overflow: hidden;
  position: relative;
  right: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 114px;
`;
export const GridWrapper = styled.div`
          ${props => props.isHeader && 'border-bottom: 1px solid #E5E5E5'}
          background-color: ${props => props.isHeader ? '#FFFFFF' : '#E5E5E5'};
          display: grid;
          grid-gap: 1px;
          grid-template-columns: repeat(7, 1fr);
    `
;
export const DayShowWrapper = styled('div')`
  border-top: 1px solid #464648;
  display: flex;
  flex-grow: 1;
`;

export const EventsListWrapper = styled('div')`
  background-color: #FFFFFF;
  color: black;
  flex-grow: 1;
`;
export const EventFormWrapper = styled('div')`
  background-color: #dddddd;
  border-left: 1px solid #464648;
  color: black;
  position: relative;
  width: 300px;
`;
export const NoEventMsg = styled('div')`
  color: #565759;
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
`;
export const ScaleWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 4px;
  position: relative;

`;

export const ScaleCellWrapper = styled('div')`
  flex-grow: 1;
  margin-left: 32px;
  position: relative;

  &:not(:last-child) {
    border-bottom: 1px solid #464648;
  }
`;

export const ScaleCellTimeWrapper = styled('div')`
  font-size: 8px;
  left: -26px;
  position: absolute;
  top: -6px;
`;

export const ScaleCellEventWrapper = styled('div')`
  min-height: 20px;
`;
export const EventItemButton = styled(EventItemWrapper)`
  margin-left: 4px;
  min-width: 50px;
  width: unset;
`

export const SelectEventTimeWrapper = styled('div')`
  border-bottom: 1px solid #464648;
  display: flex;
  padding: 8px 14px;
`;
export const ListOfEx = styled('ul')`
  background-color: rgb(239, 239, 239);
  color: #000;
  height: 60px;
  left: 2px;
  list-style-type: none;
  margin: 0;
  overflow-y: scroll;
  padding: 0;
  position: absolute;
`;

export const PositionRelative = styled('div')`
  position: relative;
`;

export const RedLine = styled('div')`
  background-color: red;
  height: 1px;
  left: 0;
  position: absolute;
  right: 0;
  top: ${props => props.position}%;
`
export const DivWrapper = styled('div')`
  background-color: #FFFFFF;
  border-bottom: 2px solid #E5E5E5;
  color: #1E1F21;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  position: relative;
`
export const TextWrapper = styled('span')`
  font-size: 32px;
`;
export const TitleWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-left: 8px;
  margin-right: 8px;
`;
export const ButtonWrapperSignIn = styled('button')`
  background: lightblue;
  border-radius: 10px;
  border: 1px solid #27282A;
  color: black;
  cursor: pointer;
  height: 34px;
  margin-left: 655px;
  margin-top: 22px;

  &:hover {
    background: skyblue;
    box-shadow: 0 20px 40px 0 skyblue;
    transform: translate(0, -3px);
    transition: all 0.2s ease;
  }


`;

export const TextWrapperSignIn = styled('span')`
  color: #fefefe;
  font-size: 20px;

`;

export const ButtonWrapperSignOut = styled('button')`
  background: lightblue;
  border-radius: 10px;
  border: 1px solid #27282A;
  color: black;
  cursor: pointer;
  height: 34px;
  margin-left: 360px;
  margin-top: 22px;

  &:hover {
    background: skyblue;
    transition: all 0.2s ease;
    transform: translate(0, -3px);
    box-shadow: 0 20px 40px 0 skyblue;
  }


`;
