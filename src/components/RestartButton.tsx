import React from "react";
import styled from "styled-components";

function RestartButton() {
  const handleClick = () => {
    window.location.reload();
  };
  return (
    <StyledButton style={{ margin: "auto" }} onClick={handleClick}>
      RESTART
    </StyledButton>
  );
}

export default RestartButton;

const StyledButton = styled.button``;
