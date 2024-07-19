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

    // const coinId = props.coinId;
    const coinId = 'ethereum';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/completeCoin/${coinId}`, {
                    method: "GET"
                });
                if (response.ok) {
                    const data = await response.json();
                    const newArr = data.completeCoin.data;
                    setCryptoData(newArr).toLocaleString('en-US');
                    // setFilteredData(newArr);
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

    // useEffect(() => {
    //     const fetchMoreData = async () => {
    //         try {
    //             const response = await fetch('/api/ratings', {
    //                 method: "GET"
    //             });
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 const moreDataArr = data.data.items;
    //                 setMoreCryptoData(moreDataArr);
    //             } else {
    //                 throw new Error(`Error: ${response.status}`);
    //             }
    //         } catch (error) {
    //             // console.error("Fetch Error:", error);
    //             setError(error.message);
    //         }
    //     };

    //     fetchMoreData();
    // }, []);




    return (

        <Container>
            <Content>
                <Coin
                    key={coinId}
                    id={coinId}
                    name={cryptoData.name}
                    price={cryptoData.price}
                    rank={cryptoData.whereToFindTheRank}
                    rating={cryptoData.rating_score}
                    symbol={cryptoData.symbol}
                    logo={cryptoData.logo}
                    volume={cryptoData.volume}
                    percentChange24H={cryptoData.percentChange24H}
                    marketCap={cryptoData.marketCap}
                    circulatingSupply={cryptoData.circulatingSupply}
                    totalSupply={cryptoData.totalSupply}
                    low={cryptoData.low}
                    high={cryptoData.high}
                // need to add more data points
                />
            </Content>
        </Container >

    );

};

export default CoinPage;