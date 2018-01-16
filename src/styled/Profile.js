
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  font-family: Helvetica, sans-serif;
`;

export const Name = styled.h2`
  display: flex;
`;

export const GameListHeader = styled.h3`
  display: flex;
  padding-bottom: 2px;
  margin: -10px 0 10px 0;
`;

export const GameList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  padding: 5%;
`;

export const GameRecord = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  padding: 5px 0;
  margin: 1px 0;
  background-color: ${props => (props.index % 2 === 1) ? '#fafafa' : '#dbdbdb'};
  box-sizing: border-box;
`;

export const ColumnLabels = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  padding: 5px 0;
  margin: 3px 0;
  box-sizing: border-box;
  font-weight: bold;
`;

export const Column = styled.span`
  display: flex;
  width: 25%;
`;
