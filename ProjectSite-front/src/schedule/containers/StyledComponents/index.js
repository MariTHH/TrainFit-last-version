import styled from "styled-components";

export const CellWrapper = styled.div`
  min-width: 200px;
  min-height: ${props => props.isHeader ? 24 : 80}px;
  overflow-y: hidden;
  overflow-y: auto;
  max-height: 95px;
  background-color: ${props => props.isWeekday ? '#F5F5F5' : '#FFFFFF'};
  color: ${props => props.isSelectedMonth ? `#000000` : `#bbbbbb`};
`;
export const RowInCell = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
  ${props => props.pr && `padding-right: ${props.pr * 8}px`}
  
`
export const EventListWrapper = styled('ul')`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const EventListItemWrapper = styled('li')`
	padding-left: 2px;
	padding-right: 2px;
	margin-bottom: 2px;
	display: flex;
`;

export const EventItemWrapper = styled('button')`
	position: relative;
	flex-grow: 1;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	width: 114px;
	border: unset;
	color: black;
	cursor: pointer;
	margin: 0;
	padding: 0;
	text-align: left;
	background-color: #dddddd;
	border: 1px solid #dddddd;
	border-radius: 2px;
`;

export const EventTitle = styled('input')`
  padding: 8px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #FFFFFF;
  color: #000000;
  outline: unset;
  border-bottom: 1px solid #464648;
`;

export const EventBody = styled('textarea')`
  padding: 8px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #FFFFFF;
  color: #000000;
  outline: unset;
  border-bottom: 1px solid #464648;
  resize:none;
  height: 60px;
`;

export const ButtonsWrapper = styled('div')`
  padding: 8px 14px;
  display: flex;
  justify-content: flex-end;
  outline: unset;
 
`;

export const ButtonWrapper = styled('button')`
  color: ${props => props.danger ? '#f00' : 'black'};
  border: 1px solid ${props => props.danger ? '#f00' : '#27282A'};
  border-radius: 2px;
  cursor: pointer;
  &:not(:last-child){
    margin-right: 2px;
  }
  justify-content: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 6px;
    border-radius: 10px;
    transition: all 0.2s ease;
    cursor: pointer;
    margin: 10px;
    width: 80px;
    box-shadow: 0 5px 15px 0 rgba(11, 99, 246, 1);
    background: lightblue;
    transition: all 0.2s ease;
    transform: translate(0, -3px);
    box-shadow: 0 10px 40px 0 lightblue;
    &:hover {
       background: skyblue;
    transition: all 0.2s ease;
    transform: translate(0, -3px);
    box-shadow: 0 20px 40px 0 skyblue;
  }
`;
export const Button1Wrapper = styled('button')`
  color: black;
  border: 1px solid #27282A;
  cursor: pointer;
  height:34px;
  margin:1px;
  border-radius: 10px;
  cursor: pointer;
  background: lightblue;
   &:hover {
       background: skyblue;
    transition: all 0.2s ease;
    transform: translate(0, -3px);
    box-shadow: 0 20px 40px 0 skyblue;
  }
 

`;

export const ShadowWrapper = styled('div')`
  min-width: 850px;

  border-top: 1px solid #C5C5C5;
  border-left: 1px solid #B5B7B9;
  border-right: 1px solid #B5B7B9;
  border-bottom: 2px solid #A4A5A7;
  border-radius: 8px;
  overflow:hidden;
  box-shadow: 0 0 0 1px #CACACA, 0 8px 20px 6px #D5D5D5;
  display: flex;
  flex-direction: column;
`;
export const FormPositionWrapper = styled('div')`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormWrapper = styled(ShadowWrapper)`
  width: 320px;
  min-width: 320px;
  height: 132px;
  background-color: #1E1F21;
  color: #DDDDDD;
  box-shadow:unset;
`;
export const ListOfHours = styled('ul')`
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 60px;
  overflow-y: scroll;
  color: #000;
  position: absolute;
  left: 2px;
  background-color: rgb(239, 239, 239);
`;

export const HoursButton = styled('button')`
  border: none;
  background-color: unset;
  cursor: pointer;
`;

export const ButEx = styled('div')`
    position: relative;
    left: 0px;
    top: 0px;
    padding: 8px 14px;
    background-color: white;
    border-bottom: 1px solid #464648;
`;
export const DayWrapper = styled.div`
  height: 31px;
  width: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  cursor: pointer;
`

export const CurrentDay = styled('div')`
  height: 100%;
  width: 100%;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const ShowDayWrapper = styled('div')`
	display: flex;
	justify-content: flex-end;
`;
export const EventItemWrapperButton = styled('button')`
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
export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  background-color:${props => props.isHeader ? '#FFFFFF' : '#E5E5E5'};
  ${props => props.isHeader && 'border-bottom: 1px solid #E5E5E5'}
    `
;
export const DayShowWrapper = styled('div')`
  display: flex;
  flex-grow: 1;
  border-top: 1px solid #464648;;
`;

export const EventsListWrapper = styled('div')`
  background-color: #FFFFFF;
  color: black;
  flex-grow: 1;
`;
export const EventFormWrapper = styled('div')`
  background-color: #dddddd;
  color: black;
  width: 300px;
  position: relative;
  border-left: 1px solid #464648;;
`;
export const NoEventMsg = styled('div')`
  color: #565759;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%,-50%);
`;
export const ScaleWrapper = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 4px;
  position: relative;
 
`;

export const ScaleCellWrapper = styled('div')`
  flex-grow: 1;
  position: relative;
  &:not(:last-child){
    border-bottom: 1px solid #464648;
  }
  margin-left: 32px;
`;

export const ScaleCellTimeWrapper = styled('div')`
  position: absolute;
  left: -26px;
  top: -6px;
  font-size: 8px;
`;

export const ScaleCellEventWrapper = styled('div')`
  min-height: 20px;
`;
export const EventItemButton = styled(EventItemWrapper)`
    min-width: 50px;
    width: unset;
    margin-left: 4px;
`

export const SelectEventTimeWrapper = styled('div')`
  padding: 8px 14px;
  border-bottom: 1px solid #464648;
  display: flex;
`;
export const ListOfEx = styled('ul')`
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 60px;
  overflow-y: scroll;
  color: #000;
  position: absolute;
  left: 2px;
  background-color: rgb(239, 239, 239);
`;

export const PositionRelative = styled('div')`
  position: relative;
`;

export const RedLine = styled('div')`
    background-color: red;
    height: 1px;
    position:absolute;
    left:0;
    right:0;
    top:${props => props.position}%;
`
export const DivWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  background-color: #FFFFFF;
  border-bottom: 2px solid #E5E5E5;
  color: #1E1F21;
  padding: 16px;
  position: relative;
`
export const TextWrapper = styled('span')`
  font-size: 32px;
`;
export const TitleWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-right: 8px;
  margin-left: 8px;
`;
export const ButtonWrapperSignIn = styled('button')`
  color: black;
  border: 1px solid #27282A;
  cursor: pointer;
  height:34px;
  margin:1px;
  margin-left: 655px;
  margin-top: 22px;
  border-radius: 10px;
  cursor: pointer;
  background: lightblue;
   &:hover {
       background: skyblue;
    transition: all 0.2s ease;
    transform: translate(0, -3px);
    box-shadow: 0 20px 40px 0 skyblue;
  }
 

`;

export const TextWrapperSignIn = styled('span')`
  font-size: 20px;
  color: #fefefe;
  
`;

export const ButtonWrapperSignOut = styled('button')`
  color: black;
  border: 1px solid #27282A;
  cursor: pointer;
  height:34px;
  margin:1px;
  margin-left: 360px;
  margin-top: 22px;
  border-radius: 10px;
  cursor: pointer;
  background: lightblue;
   &:hover {
       background: skyblue;
    transition: all 0.2s ease;
    transform: translate(0, -3px);
    box-shadow: 0 20px 40px 0 skyblue;
  }
 

`;
