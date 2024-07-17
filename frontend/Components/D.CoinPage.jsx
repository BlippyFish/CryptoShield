import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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

const Container = styled.div`
background-color: #0f1c3f;
min-height: 100vh;
color: white;
padding: 20px;
text-align: center;
`;

const Title = styled.h1`
font-size: 3rem;
margin-bottom: 40px;
`;

const CoinPage = () => {

    return (

        <CoinHome>
            <Coin />
        </CoinHome>

    );

};

export default CoinPage;