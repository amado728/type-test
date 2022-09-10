import React from "react";
import splitWord from "../operations/splitWord";
import styled from "styled-components";

export default function Letter(props: any) {
  const { letter, status } = props;

  //letter status 0 = undetermined
  //letter status 1 = incorrect
  //letter status 2 = correct

  if (status === 1) {
    return <Incorrect>{letter}</Incorrect>;
  }
  if (status === 2) {
    return <Correct>{letter}</Correct>;
  } else {
    return <span>{letter}</span>;
  }
}

const Correct = styled.span`
  color: white;
`;

const Incorrect = styled.span`
  color: red;
`;
