import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Tab from '../components/Tab';
import Match from '../components/Match';

const fetchEvents = async (sport) => {
  const { events } = await fetch(`https://corsproxy.io/?https://api.smarkets.com/v3/events/?state=upcoming&type=${sport}_match&type_domain=${sport}&type_scope=single_event&with_new_type=true&sort=id&limit=20&include_hidden=false`)
    .then((res) => res.json());
  // eslint-disable-next-line camelcase
  return events?.map(({ id, start_date }) => ({ eventId: id, startDate: start_date }));
};

const fetchMarkets = async (events) => {
  const eventIds = events?.map((event) => event.eventId).join(',');
  const { markets } = await fetch(`https://corsproxy.io/?https://api.smarkets.com/v3/events/${eventIds}/markets/?sort=event_id%2Cdisplay_order&limit_by_event=1&popular=false&include_hidden=true`)
    .then((res) => res.json());
  return markets?.map(({ id }) => ({ marketId: id }));
};

const fetchContracts = async (markets) => {
  const marketIds = markets?.map((market) => market.marketId).join(',');
  const { contracts } = await fetch(`https://corsproxy.io/?https://api.smarkets.com/v3/markets/${marketIds}/contracts/?include_hidden=false`)
    .then((res) => res.json());
  return contracts
    // eslint-disable-next-line camelcase
    ?.map(({ id, name, market_id }) => ({ contractId: id, name, marketId: market_id }));
};

const fetchLastPrice = async (markets) => {
  const marketIds = markets?.map((market) => market.marketId).join(',');
  const lastPrices = await fetch(`https://corsproxy.io/?https://api.smarkets.com/v3/markets/${marketIds}/last_executed_prices/`)
    .then((res) => res.json());
  return lastPrices;
};

const fetchData = async (sport) => {
  if (!sport) {
    return null;
  }

  const events = await fetchEvents(sport);
  const markets = await fetchMarkets(events);
  const contracts = await fetchContracts(markets);
  const lastPrice = await fetchLastPrice(markets);

  const results = events?.map((event, index) => ({
    eventId: event.eventId,
    startDate: event.startDate,
    marketId: markets[index].marketId,
    home: {
      contractId: contracts
        .filter((contract) => contract.marketId === markets[index].marketId)[0].contractId,
      name: contracts.filter((contract) => contract.marketId === markets[index].marketId)[0].name,
      lastPrice: lastPrice.last_executed_prices[markets[index].marketId][0].last_executed_price,
    },
    away: {
      contractId: contracts
        .filter((contract) => contract.marketId === markets[index].marketId)[1].contractId,
      name: contracts.filter((contract) => contract.marketId === markets[index].marketId)[1].name,
      lastPrice: lastPrice.last_executed_prices[markets[index].marketId][1].last_executed_price,
    },
  }));

  return results;
};

fetchData();

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [activeSport, setActiveSport] = useState('csgo');

  useEffect(() => {
    fetchData(activeSport).then((res) => setMatches(res));
  }, [activeSport]);

  return (
    <div>
      <Div>
        <Tab title="CS GO" isActive={activeSport === 'csgo'} onClick={() => setActiveSport('csgo')} />
        <Tab title="Cricket" isActive={activeSport === 'cricket'} onClick={() => setActiveSport('cricket')} />
        <Tab title="Baseball" isActive={activeSport === 'baseball'} onClick={() => setActiveSport('baseball')} />
        <Tab title="Boxing" isActive={activeSport === 'boxing'} onClick={() => setActiveSport('boxing')} />
      </Div>
      <MatchWrapper>
        {matches?.map((match) => <Match firstCompetitor={match.home.name} secondCompetitor={match.away.name} date={match.startDate} tickBuy={match.home.lastPrice} tickSell={match.away.lastPrice} volume="£483k" />)}

      </MatchWrapper>
    </div>
  );
}
const Div = styled.div`
  margin: 30px;
  display: flex;
  gap: 30px;
`;
const MatchWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin: 30px;
  flex-wrap: wrap;
`;
