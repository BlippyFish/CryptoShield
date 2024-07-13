import React from 'react';

const Coin = ({ name, price, symbol, logo, volume, percentChange24H, rank, rating, marketCap, circulatingSupply, totalSupply, low, high }) => {

    return (

        <div className="coin-page">

            <img src={logo} alt={name} />
            <div className="coin-name">{name}</div>
            <button className="buy-button" >Buy</button>
            <div className="price">{price}</div>

            <div className="coin-details" >

                <div className="rank"><b>Rank: </b>{rank}</div>
                <div className="rating"><b>Rating: </b>{rating}</div>
                <div className="market-cap"><b>Market Cap: </b>{rank}</div>
                <div className="volume"><b>24H Volume: </b>{volume}</div>
                <div className="circulating-supply"><b>Circulating Supply: </b>{circulatingSupply}</div>
                <div className="total-supply"><b>Circulating Supply: </b>{totalSupply}</div>

                <button className="dropdown">24H</button>
                <div className="low"><b>Low: </b>{totalSupply}</div>
                <div className="high"><b>High: </b>{totalSupply}</div>

            </div>
        </div>

    );

};


export default Coin;