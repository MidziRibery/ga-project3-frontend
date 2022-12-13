import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 0;
  align-self: start;
`;

const Input = styled.input`
  border: 1px solid black;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: light-grey;
`;

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://odd-rose-lobster-hem.cyclic.app/api/auth/signin/",
        {
          email,
          password,
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err.response.data);
      setLoginErrorMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    setLoginErrorMessage("");
    setRegisterErrorMessage("");
  }, [name, email, password]);

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to ComfortTube</SubTitle>
        <ErrorMessage>{loginErrorMessage}</ErrorMessage>
        <Input
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <ErrorMessage>{registerErrorMessage}</ErrorMessage>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <Button>Sign up</Button>
      </Wrapper>
    </Container>
  );
};

export default SignIn;
