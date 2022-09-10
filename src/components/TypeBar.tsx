import React from "react";
import styled from "styled-components";

export default function TypeBar(props: any) {
  const handleInputChange = (e: any): void => {
    props.handleInputChange(e);
  };

  return (
    <StyledInput
      type="text"
      onChange={(e) => {
        handleInputChange(e.target.value);
      }}
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
`;
