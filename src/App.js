import React, { useEffect } from "react";
import "./App.css";
import Menu from "./components/Menu";
import { Navbar } from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./redux/userSlice";
import { API_URL } from "./api-util";
// import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import SignIn from "./pages/SignIn";
import Video from "./pages/Video";
import axios from "axios";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;
const Main = styled.div`
  flex: 7;
`;
const Wrapper = styled.div`
  padding: 22px;
`;

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRes = await axios.get(`${API_URL}users/retrieve/`, {
          headers: { access_token: cookies.access_token },
        });
        if (userRes.data) {
          dispatch(loginSuccess(userRes.data));
        }
      } catch (err) {
        console.log(err.response.data);
      }
    };
    if (cookies.access_token) {
      fetchUserData();
    }
  }, []);

  return (
    <Container>
      <BrowserRouter>
        <Menu />
        <Main>
          <Navbar removeCookie={removeCookie} />
          <Wrapper>
            <Routes>
              <Route path="/">
                <Route index element={<Navigate to="video/random" />} />
                {/* <Route index element={<Home />} /> */}
                <Route
                  path="signin"
                  element={<SignIn setCookie={setCookie} cookies={cookies} />}
                />
                <Route
                  path="admin"
                  element={<AdminDashboard cookies={cookies} />}
                />
                <Route path="video">
                  <Route path=":id" element={<Video cookies={cookies} />} />
                </Route>
              </Route>
            </Routes>
          </Wrapper>
        </Main>
      </BrowserRouter>
    </Container>
  );
}

export default App;
