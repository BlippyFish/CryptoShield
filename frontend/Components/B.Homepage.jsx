import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PreviewCard from './C.PreviewCard';
import Select from 'react-select';

const Container = styled.div`
background-color: #0f1c3f;
color: white;
padding: 200px;
text-align: center;
`;

const Title = styled.h1`
justify-content: center;
font-size: 3rem;
margin-bottom: 25px;
`;

const SearchBarContainer = styled.div`
display: flex;
justify-content: center;
background-color: #2c3e50;
padding: 10px 12px;
border-radius: 10px;
width: 400px;
margin: 20px;
margin-left: 544px;
`;

const CardContainer = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, 425px);
align-items: start;
justify-content: center;
overflow-y:auto;
scrollbar-width: none;
max-height: 460px;
max-width: 100%;
`;

const handleClick = (name) => {
    console.log(`clicked ${name}`)
    // We can't fully build this out yet
};

const HomePage = () => {

    const [cryptoData, setCryptoData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/coins', {
                    method: "GET"
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("data: ", data)
                    const newArr = data.coinList.data.items;
                    setCryptoData(newArr);
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        //format the API response for react-select
        let options = cryptoData.map(function (coin) {
            return { value: coin.name, label: coin.name };
        })
        setFilteredData(options);
    }, [searchTerm, cryptoData]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

  

    // const handleSelectChange = (selectedOption) => {
    //     navigate(`/coin/${selectedOption.value}`);
    // };


    return (
        <Container>
            <Title>CryptoShield</Title>

            <CardContainer>
        {cryptoData.map((crypto, index) => (
          <Link key={index} to={`/coinpage/${crypto.id}`} style={{ textDecoration: 'none' }}>
            <PreviewCard
              name={crypto.name}
              price={crypto.price}
              logo={crypto.logo}
              rank={index + 1}
              symbol={crypto.symbol}
            />
          </Link>
        ))}
      </CardContainer>

            <SearchBarContainer>
                <div style={{ width: '100%' }}>
                    {/* needed separate div to format width of Select */}
                    <Select
                        styles={{
                            menu: (baseStyles) => ({
                                ...baseStyles,
                                color: 'black',
                            }),
                        }}
                        menuPlacement='auto'
                        placeholder="Search"
                        options={filteredData}
                        value={searchTerm}
                        labelKey='name'
                        valueKey='name'
                        color='black'
                        //onChange={(e) => setSearchTerm(e.target.value)} 
                        onChange={(e) => handleClick(e.value)}
                    />

                </div>
            </SearchBarContainer>
        </Container>
    );
};

export default HomePage;