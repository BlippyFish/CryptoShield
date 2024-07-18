import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Coin from './E.Coin';

const Container = styled.div`
background-color: #DFF0EA;
min-height: 100vh;
color: white;
padding: 20px;
text-align: center;
`;

const CoinPage = () => {

    return (

        <Container>
            <Coin></Coin>
        </Container>

    );

};

export default CoinPage;