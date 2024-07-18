import React, { useState } from 'react';
import styled from 'styled-components';

const CardStyle = styled.section`
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

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0 10px;
`;

const CheckBoxStyle = styled.input`
  height: 15px;
  width: 15px;
  cursor: pointer;
`;

const CompareText = styled.span`
  font-size: 0.75rem;
  color: #333;
  text-align: left;
`;

const Name = styled.h3`
  margin: 10px 0;
`;

const Logo = styled.img`
  height: 50px;
  width: 50px;
  margin: 10px 0;
`;

const Price = styled.div`
  margin: 10px 0;
`;

const Rating = styled.div`
  margin: 10px 0;
`;

const PreviewCard = ({ name, price, symbol, logo, rating }) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    // We can't fully build this out yet
  };

  const handleSelect = (event) => {
    event.stopPropagation();
    setChecked(!checked);
  };

  return (
    <CardStyle className='previewCard' onClick={handleClick}>
      <Header>
        <CheckBoxStyle type="checkbox" checked={checked} onChange={handleSelect} />
        <CompareText>Compare</CompareText>
      </Header>
      <Name>{name}</Name>
      <Logo src={logo} alt={`${name} logo`} />
      <Price>Active Price: ${Math.round(price)}</Price>
      <Rating>Rank: {rating}</Rating>
    </CardStyle>
  );
};


export default PreviewCard;