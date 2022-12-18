import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess, loginStart } from "../redux/userSlice";
import { API_URL } from "../api-util";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 420px;
  display: flex;
  flex-direction: column;
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
`;

const SuccessMessage = styled.p`
  color: green;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: #dee2e6;
`;

const SignIn = ({ setCookie, cookie }) => {
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [registrationSuccessMessage, setRegistrationSuccessMessage] =
    useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const [registerValues, setRegisterValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onLoginChange = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };
  const onRegisterChange = (e) => {
    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value });
  };

  const loginInputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      required: true,
    },
  ];

  const registerInputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 6-20 characters",
      pattern: "^[a-zA-Z0-9!@#$%^&*]{6,20}$",
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Re-enter Password",
      errorMessage: "Passwords don't match!",
      pattern: registerValues.password,
      required: true,
    },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post(`${API_URL}auth/signin/`, loginValues, {
        withCredentials: true,
      });
      // console.log(res.data);
      if (res.data) {
        const { access_token, ...userData } = res.data;
        // console.log(access_token);
        setCookie("access_token", access_token, {
          path: "/",
          sameSite: "lax",
          secure: true,
        });
        dispatch(loginSuccess(userData));
        navigate("/video/random");
      }
    } catch (err) {
      console.log(err.response.data);
      setLoginErrorMessage(err.response.data.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...newUser } = registerValues;
    // console.log(newUser);
    try {
      const res = await axios.post(`${API_URL}auth/signup/`, newUser);
      setRegistrationSuccessMessage(
        `${res.data} You can now log into your account!`
      );
      //   console.log(res.data);
    } catch (err) {
      console.log(err.response.data);
      setRegisterErrorMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    setLoginErrorMessage("");
    setRegisterErrorMessage("");
  }, [loginValues, registerValues]);

  return (
    <Container>
      <Title>Sign in</Title>
      <SubTitle>to continue to ComfortTube</SubTitle>
      <ErrorMessage>{loginErrorMessage}</ErrorMessage>
      <Form onSubmit={handleLogin}>
        {loginInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={loginValues[input.name]}
            onChange={onLoginChange}
          />
        ))}
        <Button>Sign in</Button>
      </Form>

      <Title>or</Title>
      <ErrorMessage>{registerErrorMessage}</ErrorMessage>
      {registrationSuccessMessage === "" ? (
        <Form onSubmit={handleRegister}>
          {registerInputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={registerValues[input.name]}
              onChange={onRegisterChange}
            />
          ))}
          <Button>Sign up</Button>
        </Form>
      ) : (
        ""
      )}
      <SuccessMessage>{registrationSuccessMessage}</SuccessMessage>
    </Container>
  );
};

export default SignIn;
