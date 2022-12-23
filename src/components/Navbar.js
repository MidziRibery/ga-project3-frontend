import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ComfortTube from "../img/comfort_tube_logo.png";
import defaultProfileImg from "../img/default_profile_img.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const Img = styled.img`
  height: 25px;
`;

const Logo = styled.div`
  display: flex;
  align-self: center;
  gap: 5px;
  font-weight: bold;
  color: white;
`;

const Container = styled.div`
  postion: sticky;
  top: 0;
  background-color: #202020;
  height: 56px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 100%;
  padding: 0px 20px;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: mediumpurple;
  color: white;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  &:hover {
    background-color: mediumslateblue;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  padding: 18px 20px;
  border-bottom: 1px solid lightgrey;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
  border: 1px solid black;
`;

const DropdownMenu = styled.div`
  position: absolute;
  background-color: white;
  top: 56px;
  right: 10px;
  border-radius: 5px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  opacity: ${(props) => (props.menuExpanded ? "100%" : "0")};
  visibility: ${(props) => (props.menuExpanded ? "visible" : "hidden")};
`;

const MenuItem = styled.li`
  list-style-type: none;
  padding: 5px 20px;
  cursor: pointer;
  &:hover {
    background-color: mediumpurple;
    color: white;
  }
`;

export const Navbar = ({ removeCookie }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = useLocation().pathname.split("/")[1];

  const handleLogout = () => {
    removeCookie("access_token", {
      path: "/",
      sameSite: "none",
      secure: true,
    });
    dispatch(logout());
    setMenuExpanded(false);
    if (path === "admin" || path === "playlist") {
      navigate("/");
    }
  };

  useEffect(() => {
    setMenuExpanded(false);
  }, [path]);

  return (
    <Container>
      <Wrapper>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "block",
          }}
        >
          <Logo>
            <Img src={ComfortTube} />
            TranquilTube
          </Logo>
        </Link>
        {/* <Button>Register</Button> */}
        {currentUser ? (
          <>
            <Avatar
              onClick={() => {
                setMenuExpanded(!menuExpanded);
              }}
              src={currentUser.image ? currentUser.image : defaultProfileImg}
            />
            <DropdownMenu menuExpanded={menuExpanded}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                <User>
                  <Avatar
                    src={
                      currentUser.image ? currentUser.image : defaultProfileImg
                    }
                  />
                  {currentUser.name}
                </User>
              </Link>
              <ul style={{ paddingLeft: "0", marginBlock: "5px" }}>
                <MenuItem>
                  <Link
                    to="playlist"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    My Playlist
                  </Link>
                </MenuItem>
                {currentUser.isAdmin ? (
                  <MenuItem>
                    <Link
                      to="admin"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Admin Dashboard
                    </Link>
                  </MenuItem>
                ) : (
                  ""
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </ul>
            </DropdownMenu>
          </>
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
