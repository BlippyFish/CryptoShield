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
                    console.log(newArr.market_data.price[0].price_latest);
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
                    coinId={coinId}
                    name={cryptoData.name}
                    price={cryptoData.market_data.price[0].price_latest}
                    symbol={cryptoData.symbol}
                    logo={cryptoData.logo}
                    volume={cryptoData.market_data.price[0].vol_spot_24h}
                    percentChange24H={cryptoData.market_data.price[0].price_change_percentage_24h}
                    rank={cryptoData.rank}
                    rating={cryptoData.rating.rating}
                    marketCap={cryptoData.market_data.price[0].market_cap}
                    circulatingSupply={cryptoData.market_data.circulating_supply}
                    totalSupply={cryptoData.market_data.max_supply}
                    low={cryptoData.market_data.price[0].low_24h}
                    high={cryptoData.market_data.price[0].high_24h}
                // need to add more data points
                />
            </Content>
        </Container >

    );

};

export default CoinPage;