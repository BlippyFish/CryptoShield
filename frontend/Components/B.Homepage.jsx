import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PreviewCard from './C.PreviewCard';

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

const SearchBarContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-bottom: 20px;
background-color: #2c3e50;
padding: 10px 20px;
border-radius: 25px;
width: 50%;
margin: 0 auto;
`;

const SearchBar = styled.input`
width: 100%;
padding: 10px;
border: none;
outline: none;
font-size: 1rem;
background-color: transparent;
color: white;
`;

const SearchIcon = styled.div`
font-size: 1.5rem;
color: white;
margin: 0 10px;
`;

const CardContainer = styled.div`
display: flex;
justify-content: center;
gap: 20px;
`;

const HomePage = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('{We need to put API endpoint here}')
            .then((response) => response.json())
            .then((data) => {
                setCryptoData(data);
                setFilteredData(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const filtered = cryptoData.filter((crypto) =>
            crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchTerm, cryptoData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }

    return (
        <Container>
            <Title>CryptoShield</Title>
            <CardContainer>
                {filteredData.map((crypto, index) => (
                    <PreviewCard
                        key={index}
                        name={crypto.name}
                        price={crypto.price}
                        symbol={crypto.symbol}
                        logo={crypto.logo}
                        rating={crypto.rating}
                    />
                ))}
            </CardContainer>
            <SearchBarContainer>
                <SearchIcon>≡</SearchIcon>
                <SearchBar
                    type="text"
                    placeholder="Hinted search text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon>🔍</SearchIcon>
            </SearchBarContainer>
        </Container>
    );
};

export default HomePage;