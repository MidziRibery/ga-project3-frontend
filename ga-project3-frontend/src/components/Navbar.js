import React from 'react';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Container = styled.div `
  postion: sticky;
  top: 0;
  background-color: #202020;
  height: 56px;
`;
const Wrapper = styled.div `
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  height: 100%;
  padding: 0px 20px;
`;

const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid blue;
    color: blue;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`

export const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Button><AccountCircleOutlinedIcon/> Sign In</Button>
      </Wrapper>
    </Container>
  )
}
