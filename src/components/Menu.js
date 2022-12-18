import React from "react";
import styled from "styled-components";
import ComfortTube from "../img/YT Logo.jpg";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  background-color: #202020;
  color: white;
  font-size: 14px;
  postion: sticky;
  top: 0;
  bottom: 0;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;
const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  &:hover {
    background-color: gray;
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid white;
`;

const Login = styled.div``;

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
`;

export const Menu = () => {
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={ComfortTube} />
            ComfortTube
          </Logo>
        </Link>
        <Item>
          <HomeIcon />
          Home
        </Item>
        <Hr />
        <Login>Sign in to like videos, comment, and subscribe.</Login>
        <Button>
          <AccountCircleOutlinedIcon /> Sign In
        </Button>
        <Hr />
      </Wrapper>
    </Container>
  );
};

export default Menu;
