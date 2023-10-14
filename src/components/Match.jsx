import React from 'react';
import styled, { css } from 'styled-components';

export default function Match({
  firstCompetitor, secondCompetitor, date, tickBuy, tickSell, volume,
}) {
  return (
    <MatchWrapper>
      <MatchInfo>
        <div>
          <p>{firstCompetitor}</p>
          <p>{secondCompetitor}</p>
        </div>
        <Date>{date}</Date>
      </MatchInfo>
      <MatchRate>
        <div>
          <Tick>{tickBuy}</Tick>
          <Tick isSell>{tickSell}</Tick>
        </div>
        <Volume>{volume}</Volume>
      </MatchRate>
    </MatchWrapper>
  );
}

const MatchWrapper = styled.div`
  background: #2e2a2b;
  width: 360px;
  height: 160px;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const MatchInfo = styled.div`
  display: flex;
  justify-content: space-between;
  & p {
    margin: 0 0 6px 0;
    font-weight: bold;
    font-size: 20px;
    flex: 1;
  }
`;
const Date = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #605e5f;
`;

const MatchRate = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: flex-end;
  padding-bottom: 15px;
`;

const Tick = styled.span`
  background: #54b754;
  padding: 15px;
  margin-right: 10px;
  border-radius: 5px;
  font-size: 20px;
  

  ${(props) => props.isSell
    && css`
      background: #2b2fe5;
    `};
`;
const Volume = styled.div`
font-size: 20px;
color: #b59f35;
`;
