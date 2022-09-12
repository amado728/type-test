import React, { useState } from "react";
import styled from "styled-components";

export default function TypeBar(props: any) {
  const handleInputChange = (key: string): void => {
    props.handleInputChange(key);
    let alphabet = /^[a-z]+$/i;
    if (alphabet.test(key) && key.length === 1) {
      setValue(value + key);
    } else if (key === " ") {
      setValue("");
    }
  };

  const handleValueChange = (e: any) => {};

  const [value, setValue] = useState("");

  return (
    <StyledInput
      disabled={props.disabled}
      type="text"
      onKeyDown={(e) => {
        handleInputChange(e.key);
      }}
      onChange={(e) => {
        handleValueChange(e);
      }}
      value={value}
      autoFocus
    />
  );
}

const StyledInput = styled.input`
  display: block;
  margin: 10px auto;
  width: 90%;
  height: 40px;
  border-radius: 10px;
  outline: none;
  text-align: center;
  font-size: 1.8em;
`;
