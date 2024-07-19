import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Coin from './E.Coin';

const Container = styled.div`
background-color: white;
min-height: 100vh;
color: #0f1c3f;
padding: 20px;
text-align: center;
`;

const Content = styled.div`
  background-color: #0f1c3f; 
  padding: 40px;
  font-color: white;
  border-radius: 10px;
`;

/*

Rank = index
Rating = rating
Market Cap = market_cap
Circulating Supply = circulating_supply
Total Supply = max_supply

*/

const CoinPage = ({ rating, market_cap, circulating_supply, max_supply }) => {

    const [cryptoData, setCryptoData] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/coins', {
                    method: "GET"
                });
                if (response.ok) {
                    const data = await response.json();
                    const newArr = data.coinList.data.items;
                    setCryptoData(newArr);
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            } catch (error) {
                // console.error("Fetch Error:", error);
                setError(error.message);
            }
        };

        fetchData();

    }, []);



    return (

        <Container>
            <Content>
                {cryptoData.slice(0, 1).map((crypto, index) => (
                    <Coin
                        key={index}
                        name={crypto.name}
                        price={crypto.price.toLocaleString('en-US')}
                        rating={crypto.rating_score}
                        rank={cryptoData.indexOf(crypto) + 1}
                    // need to add more data points
                    />
                ))}
            </Content>
        </Container >

    );

};

export default CoinPage;
