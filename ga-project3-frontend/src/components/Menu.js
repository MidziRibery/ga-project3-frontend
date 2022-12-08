import React from 'react';
import styled from 'styled-components';
import ComfortTube from '../img/YT Logo.jpg';
import HomeIcon from '@mui/icons-material/Home';
import { style } from '@mui/system';

const Container = styled.div`
    flex:1;
    background-color: #202020;
    height: 100vh;
    color: white;
    font-size: 14px;
`

const Wrapper = styled.div`
    padding: 18px 26px;
`

const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight:bold;
    margin-bottom: 25px;
`
const Img = styled.img`
    height: 25px;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;
`

const HR = styled.hr`
    margin: 15px 0px;
    border: 0.5px solid black;
`

export const Menu = () => {
  return (
    <Container>
        <Wrapper>
            <Logo>
                <Img src={ComfortTube}/>
                ComfortTube
            </Logo>
            <Item>
                <HomeIcon/>
                Home
            </Item>
            <Hr/>
        </Wrapper>
    </Container>
  )
}

export default Menu