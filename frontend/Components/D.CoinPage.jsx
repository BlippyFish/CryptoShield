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

const CoinPage = () => {

    const [cryptoData, setCryptoData] = useState([]);
    const [moreCryptoData, setMoreCryptoData] = useState([]);
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
                    setCryptoData(newArr).toLocaleString('en-US');
                    setFilteredData(newArr);
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

    useEffect(() => {
        const fetchMoreData = async () => {
            try {
                const response = await fetch('/api/ratings', {
                    method: "GET"
                });
                if (response.ok) {
                    const data = await response.json();
                    const moreDataArr = data.data.items;
                    setMoreCryptoData(moreDataArr);
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            } catch (error) {
                // console.error("Fetch Error:", error);
                setError(error.message);
            }
        };

        fetchMoreData();
    }, []);




    return (

        <Container>
            <Content>
                {cryptoData.slice(0, 1).map((crypto, index) => (
                    <Coin
                        key={index}
                        name={crypto.name}
                        price={crypto.price}
                        rank={cryptoData.indexOf(crypto)}
                        rating={crypto.rating_score}
                    // need to add more data points

                    />
                ))}
            </Content>
        </Container >

    );

};

export default CoinPage;