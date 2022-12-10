import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Menu from './components/Menu';
import { Navbar } from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

const Container = styled.div`
  display: flex;
  
`
const Main = styled.div`
  flex: 7;
`;
const Wrapper = styled.div``;

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Menu/>
        <Main>
          <Navbar/>
          <Wrapper>
            <RouterProvider>
              <Route path='/'>
                  <Route index/>
              </Route>
            </RouterProvider>
          </Wrapper>
        </Main>
      </BrowserRouter>
    </Container>
  );
}

export default App;
