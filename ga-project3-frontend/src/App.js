import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Menu from "./components/Menu";
import { Navbar } from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Routes,
  Route,
  Link,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Video from "./pages/Video";

const Container = styled.div`
  display: flex;
`;
const Main = styled.div`
  flex: 7;
`;
const Wrapper = styled.div`
  padding: 22px;
`;

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["cookie-name"]);
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
                  element={<SignIn setCookie={setCookie} />}
                />
                <Route path="video">
                  <Route path=":id" element={<Video />} />
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
