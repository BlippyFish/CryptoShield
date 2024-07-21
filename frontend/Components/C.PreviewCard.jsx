import React, { useState } from 'react';
import styled from 'styled-components';

const CardStyle = styled.section`
  height: 200px;
  width: 400px;
  margin: 12px;
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

const Footer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
//Stretch feature:
// const CheckBoxStyle = styled.input`
//   height: 15px;
//   width: 15px;
//   cursor: pointer;
//   margin-top: 25px;
// `;

// const CompareText = styled.span`
//   font-size: 0.75rem;
//   color: #333;
//   text-align: left;
//   margin-top: 25px;
//   margin-right: 5px;
// `;

const Name = styled.h3`
`;

const Logo = styled.img`
  height: 75px;
  width: 75px;
  margin-top: 5px;
  margin-bottom: 20px;
`;

const Price = styled.div`
  margin-left: 15px;
`;

const Rank = styled.div`
  margin-right: 15px;
`;

const PreviewCard = ({ name, price, symbol, logo, rank }) => { // Added onClick prop
  const [checked, setChecked] = useState(false);

  

  const handleSelect = (event) => {
    event.stopPropagation(); //allows click on select btn w/o triggering whole card click
    setChecked(!checked);
  };

  return (
    <CardStyle className='previewCard'>
      <Header>
        {/* <CheckBoxStyle type="checkbox" checked={checked} onChange={handleSelect} />
        <CompareText>Compare</CompareText> */}
      </Header>
      <Name>{name}</Name>
      <Logo src={logo} alt={`${name} logo`} />
      <Footer>
        <Price><b>Active Price:</b> ${Number(price.toFixed(2)).toLocaleString('en-US')}</Price>
        <Rank><b>Rank:</b> #{rank}</Rank>
      </Footer>
    </CardStyle>
  );
};

export default PreviewCard;