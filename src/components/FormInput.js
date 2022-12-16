import { useState } from "react";
import styled from "styled-components";

const ErrorMessage = styled.span`
  color: red;
  font-size: 13px;
  display: none;
`;

const Input = styled.input`
  border: 1px solid black;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  &:invalid[data-focused="true"] {
    border: 1px solid red;
  }
  &:invalid[data-focused="true"] ~ ${ErrorMessage} {
    display: block;
  }
`;

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <Input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        data-focused={focused.toString()}
      />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </div>
  );
};

export default FormInput;
