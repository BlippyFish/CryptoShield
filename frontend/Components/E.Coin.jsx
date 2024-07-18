import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-end;
align-content: flex-start;
`;

const CoinHome = styled.section`
  height: 250px;
  width: 400px;
  margin: 5px;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  color: black;
`;

const CoinName = styled.h3`
  font-weight: bold;
  color: black;
`;

const BuyButton = styled.button`
  height: 20px;
  width: 55px;
  margin: 800px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: right;
  background-color: #A9D4FE;
  border-radius: 10px;
  color: black;
`;



const Coin = ({ name, price, symbol, logo, volume, percentChange24H, rank, rating, marketCap, circulatingSupply, totalSupply, low, high }) => {

    const [cryptoData, setCryptoData] = useState([]);


    return (

        <Container>
            <CoinName>Bitcoin</CoinName>
            <BuyButton type="button"><b>Buy</b></BuyButton>
        </Container>
    );

};


export default Coin;