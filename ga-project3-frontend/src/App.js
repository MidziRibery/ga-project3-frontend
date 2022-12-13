import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Menu from "./components/Menu";
import { Navbar } from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Routes,
  Route,
  Link,
  BrowserRouter,
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
  return (
    <Container>
      <BrowserRouter>
        <Menu />
        <Main>
          <Navbar />
          <Wrapper>
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="signin" element={<SignIn />} />
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
