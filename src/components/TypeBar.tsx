import React from "react";
import styled from "styled-components";

export default class TypeBar extends React.Component {
  handleInputChange() {
    //do something
  }

  render() {
    return <StyledInput type="text" onChange={this.handleInputChange} />;
  }
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
