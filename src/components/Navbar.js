import React from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const Container = styled.div`
  postion: sticky;
  top: 0;
  background-color: #202020;
  height: 56px;
`;
const Wrapper = styled.div`
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
  border: 1px solid white;
  color: white;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: white;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

export const Navbar = ({ removeCookie }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    removeCookie("access_token", {
      path: "/",
      sameSite: "none",
      secure: true,
    });
    dispatch(logout());
  };
  return (
    <Container>
      <Wrapper>
        {/* <Button>Register</Button> */}
        {currentUser ? (
          <User>
            <Button>My Playlist</Button>
            {currentUser.isAdmin ? <Button>Admin Dashboard</Button> : ""}
            <Button onClick={handleLogout}>Logout</Button>
            <Avatar />
            {currentUser.name}
          </User>
        ) : (
          <Link to="signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlinedIcon /> Sign In
            </Button>
          </Link>
        )}
      </Wrapper>
    </Container>
  );
};
