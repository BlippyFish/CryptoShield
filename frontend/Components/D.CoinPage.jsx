import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
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


const CoinPage = ({ rating, market_cap, circulating_supply, max_supply }) => {

    const [cryptoData, setCryptoData] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/completeCoin/${coinId}', {
                    method: "GET"
                });
                if (response.ok) {
                    const data = await response.json();
                    const newArr = data.coinList.data.items;
                    setCryptoData(newArr);
                } else {
                    // throw new Error('Error:', ${ response.status });
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
                        rank={cryptoData.indexOf(crypto) + 1}
                        rating={crypto.rating_score}
                        marketCap={crypto.market_cap}
                        ciruclatingSupply={crypto.circulating_supply}
                        totalSupply={max_supply}
                    // market
                    // rank={crypto}
                    // need to add more data points
                    />
                ))}
            </Content>
        </Container >

    );

};

export default CoinPage;