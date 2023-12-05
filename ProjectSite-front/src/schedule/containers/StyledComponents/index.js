import styled from "styled-components";

export const CellWrapper = styled.div`
  min-width: 200px;
  min-height: ${props => props.isHeader ? 24 : 80}px;
  max-height: 95px;
 overflow-y:scroll;
  background-color: ${props => props.isWeekday ? '#F5F5F5' : '#FFFFFF'};
  color: ${props => props.isSelectedMonth ? `#000000` : `#bbbbbb`};
`;
export const RowInCell = styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
  ${props => props.pr && `padding-right: ${props.pr * 8}px`}
  
`
