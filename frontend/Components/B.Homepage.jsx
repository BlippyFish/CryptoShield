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
margin: 300px;
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
        const fetchData = async () => {
            try {
                // console.log("Inside fetchData")
                const response = await fetch('/api/coins', {
                    method: "GET"
                });
                if (response.ok) {
                    // console.log("Inside if response ok")
                    const data = await response.json();
                    console.log("data: ", data);
                    console.log("trying to access items list:", data.coinList.data.items)
                    const newArr = data.coinList.data.items;
                    console.log("newArr: ", newArr)
                    // if (Array.isArray(newArr)) {
                    //     console.log("Inside Array.isArray")
                    setCryptoData(newArr);
                    setFilteredData(newArr);
                    //}
                    // console.log("cryptoData: ", cryptoData);
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            } catch (error) {
                // console.error("Fetch Error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {



    // })

    useEffect(() => {
        console.log("cryptoData: ", cryptoData)
        const filtered = cryptoData.filter((crypto) =>
            crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log("filtered: ", filtered)
        setFilteredData(filtered);
    }, [searchTerm, cryptoData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Container>
            <Title>CryptoShield</Title>

            <CardContainer>
                {cryptoData.map((crypto, index) => (
                    <PreviewCard
                        key={index}
                        name={crypto.name}
                        price={crypto.price}
                        logo={crypto.logo}
                        rank={crypto.rank}
                    />
                ))}
            </CardContainer>

            <SearchBarContainer>
                <SearchIcon>≡</SearchIcon>
                <SearchBar
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon>🔍</SearchIcon>
            </SearchBarContainer>
        </Container>
    );
};

export default HomePage;