import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PreviewCard from './C.PreviewCard';
import Select from 'react-select';

const Container = styled.div`
background-color: #0f1c3f;
color: white;
padding: 12px;
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

// Styling for Select menu dropdown -- don't touch
const customStyles = {
    control: (provided) => ({
        ...provided,
        borderRadius: '10px',
        borderColor: '#ccc',
        boxShadow: 'none',
        '&:hover': {
            borderColor: '#888',
        },
        height: '50px',
        minHeight: '50px',
        backgroundColor: '#f0f0f0',
        width: '500px',
    }),
    input: (provided) => ({
        ...provided,
        color: '#333',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#999',
        textAlign: 'left',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#333',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#fff',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#ccc' : state.isFocused ? '#e0e0e0' : '#fff',
        color: '#333',
    }),
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
                // console.log("Inside fetchData")
                const response = await fetch('/api/coins', {
                    method: "GET"
                });
                if (response.ok) {
                    // console.log("Inside if response ok")
                    const data = await response.json();
                    //console.log("data: ", data);
                    //console.log("trying to access items list:", data.coinList.data.items)
                    const newArr = data.coinList.data.items;
                    //console.log("newArr: ", newArr)
                    // if (Array.isArray(newArr)) {
                    //     console.log("Inside Array.isArray")
                    setCryptoData(newArr);
                    //setFilteredData(newArr);
                    //}
                    // console.log("cryptoData: ", cryptoData);
                    //console.log("Trying to get rank: ", cryptoData.indexOf("ethereum"))
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
    // const colors = [
    //     {
    //         value: 'blue',
    //         label: 'Blue'
    //     },
    //     {
    //         value: 'red',
    //         label: 'Red'
    //     }
    // ]
    useEffect(() => {
        //console.log("cryptoData: ", cryptoData)
        //console.log("searchTerm: ", searchTerm)
        // const filtered = cryptoData.filter((crypto) =>
        //     crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
        // );
        //console.log("filtered: ", filteredData)
        let options = cryptoData.map(function (coin) {
            return { value: coin.name, label: coin.name };
        })
        setFilteredData(options);
    }, [searchTerm, cryptoData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }

    // const handleSelectChange = (selectedOption) => {
    //     navigate(`/coin/${selectedOption.value}`);
    // };


    return (
        <Container>
            <Title>CryptoShield</Title>

            <CardContainer>
                {cryptoData.slice(0, 6).map((crypto, index) => (
                    <PreviewCard
                        key={index}
                        name={crypto.name}
                        price={crypto.price}
                        logo={crypto.logo}
                        rank={index + 1}
                    />
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
            Col
        </Container>
    );
};

export default HomePage;