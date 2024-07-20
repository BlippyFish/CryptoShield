import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Graph from './G.Graph.jsx';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
`;

const GraphContainer = styled.section` //changed variable name to avoid confusion with Graph component
  width: 60%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  color: black;
`;

const Sidebar = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 20px;
`;

const CoinName = styled.h3`
  font-weight: bold;
  color: white;
  font-size: 1.5em;
`;

const Price = styled.h1`
  font-size: 2em;
  color: white;
`;

const BuyButton = styled.button`
  padding: 10px 20px;
  margin: 10px 0;
  background-color: #A9D4FE;
  border-radius: 10px;
  color: black;
  border: none;
  cursor: pointer;
`;

const CoinDetail = styled.p`
  font-weight: bold;
  color: white;
`;

const NewsCard = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
`;

const NewsImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const NewsText = styled.div`
  display: flex;
  flex-direction: column;
`;


const Coin = ({ coinId, name, price, symbol, logo, volume, percentChange24H, rank, rating, marketCap, circulatingSupply, totalSupply, low, high }) => {

  const [coinsData, setCoinsData] = useState([]);
  const [ratingsData, setRatingsData] = useState([]);

  return (
    <Container>
      <GraphContainer>
        <Graph coinId={coinId} /> {/* Pass the coinId to the Graph component */}
      </GraphContainer>
      <Sidebar>
        <CoinName>{name}</CoinName>
        <BuyButton type="button"><b>Buy</b></BuyButton>
        <Price>{`${'$' + price.toLocaleString('en-US')}`}</Price>
        <CoinDetail>Rank: {rank}</CoinDetail>
        <CoinDetail>Rating: {rating}</CoinDetail>
        <CoinDetail>Market Cap: {marketCap}</CoinDetail>
        <CoinDetail>24H Volume: {volume}</CoinDetail>
        <CoinDetail>Circulating Supply: {circulatingSupply}</CoinDetail>
        <CoinDetail>Total Supply: {totalSupply}</CoinDetail>
        <CoinDetail>24H Low: {low}</CoinDetail>
        <CoinDetail>24H High: {high}</CoinDetail>
        <NewsCard>
          <NewsImage src="https://via.placeholder.com/50" alt="news" />
          <NewsText>
            <div><b>Bitcoin Soars</b></div>
            <div>Yahoo Finance</div>
            <div>Kim Smith - July 11, 2024</div>
          </NewsText>
        </NewsCard>
      </Sidebar>
    </Container>
  );
};


export default Coin;