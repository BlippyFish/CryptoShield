import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Coin from './E.Coin';
import { useParams } from 'react-router-dom'; //new import




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
    const { coinId } = useParams(); // Extract coinId from URL
    const [cryptoData, setCryptoData] = useState([]);
    // const [moreCryptoData, setMoreCryptoData] = useState([]);  // lint taming. uncomment if you're going to use it
    const [error, setError] = useState(null);


    // const coinId = props.coinId;
    // const coinId = 'ethereum'; // for testing purposes


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
      }, [coinId]);


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


    //added error handling
    if (error) {
        return <div>Error: {error}</div>;
    }


    if (!cryptoData) { // loading state handling
        return <div>Loading...</div>;
    }




     //Ensure that market_data and its price array are defined before accessing
     const marketData = cryptoData.market_data;
     if (!marketData || !marketData.price || !marketData.price[0]) {
         return <div>Loading...</div>;
     }
     const priceData = marketData.price[0];
    return (
        <Container>
            <Content>
                <Coin
                    key={cryptoData.id}
                    coinId={cryptoData.id}
                    name={cryptoData.name}
                    price={`${Number(priceData.price_latest.toFixed(2)).toLocaleString('en-US')}`}
                    symbol={cryptoData.symbol}
                    logo={cryptoData.logo}
                    volume={`$${Number(priceData.vol_spot_24h.toFixed(2)).toLocaleString('en-US')}`}
                    percentChange24H={priceData.price_change_percentage_24h}
                    rank={`#${cryptoData.rank}`}
                    rating={cryptoData.rating ? cryptoData.rating.rating : 'N/A'}
                    marketCap={`$${Number(priceData.market_cap.toFixed(2)).toLocaleString('en-US')}`}
                    circulatingSupply={`${Number(marketData.circulating_supply.toFixed(2)).toLocaleString('en-US')}`}
                    totalSupply={`${Number(marketData.max_supply.toFixed(2)).toLocaleString('en-US')}`}
                    low={`${Number(priceData.low_24h.toFixed(2)).toLocaleString('en-US')}`}
                    high={`${Number(priceData.high_24h.toFixed(2)).toLocaleString('en-US')}`}
                // need to add more data points
                // ^^^like what???
                />
            </Content>
        </Container >


    );


};


export default CoinPage;