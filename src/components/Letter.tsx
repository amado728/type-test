import React from "react";
import styled from "styled-components";

export default function Letter(props: any) {
  const { value, isCurrent, isIncorrect } = props.letter;

  if (isCurrent) {
    return <CurrentLetter>{value}</CurrentLetter>;
  } else {
    if (isIncorrect) {
      return <Incorrect>{value}</Incorrect>;
    } else {
      return <span>{value}</span>;
    }
  }
}

const Correct = styled.span`
  color: green;
`;

const Incorrect = styled.span`
  color: red;
`;

const CurrentLetter = styled.span`
  color: white;
`;
