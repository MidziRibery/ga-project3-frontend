import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const Container = styled.div`
    width: 360px;
    margin-bottom: 45px;
    cursor: pointer;
`;

const Image = styled.img`
    width: 1000px;
    height: 500px;
    background-color: #999;

`;

const Details = styled.div`
    display: flex;
    margin-top: 16px;
    gap: 12px;
`;

const ChannelImage = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #999;
`;

const Texts = styled.div``;
const Title = styled.h1`
    font-size: 16px;
    font-weight: 500;
    color
`;
const ChannelName = styled.h2`
    font-size: 14px;
    margin: 10px 0px;

`;
const Info = styled.div`
    font-size: 14px;
`;

function Card() {
  return (
    <Link to='/video/test' style={{textDecoration:'none', color:'inherit'}}>
    <Container>
       <Image/>
       <Details>
        <ChannelImage/>
        <Texts>
            <Title>Test Video</Title>
            <ChannelName>ComfortTube</ChannelName>
            <Info>9,009 views ● 1 day ago</Info>
        </Texts>
       </Details>
    </Container>
    </Link>
  )
}

export default Card