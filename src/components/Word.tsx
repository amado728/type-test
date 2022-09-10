import React from "react";
import splitWord from "../operations/splitWord";
import styled from "styled-components";
import Letter from "./Letter";

export default function Word(props: any) {
  const word = splitWord(props.word);
  const { letterStatus } = props;

  return (
    <WordWrapper>
      {word.map((char, i) => {
        return <Letter key={char + i} letter={char} status={0} />;
      })}
    </WordWrapper>
  );
}

const WordWrapper = styled.div`
  margin: 20px;
  display: inline-block;
`;
