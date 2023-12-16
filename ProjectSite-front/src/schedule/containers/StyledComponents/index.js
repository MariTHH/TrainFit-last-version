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

