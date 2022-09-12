import React from "react";
import styled from "styled-components";
import Letter from "./Letter";
import LetterModel from "../models/LetterModel";

export default function Word(props: any) {
  const { letters, isCurrent, isIncorrect } = props.word;

  return (
    <WordWrapper
      style={{
        backgroundColor: isCurrent ? "green" : "",
        color: isIncorrect ? "red" : "black",
      }}
    >
      {letters.map((letter: LetterModel, i: number) => {
        return <Letter key={letter.value + i} letter={letter} />;
      })}
    </WordWrapper>
  );
}

const WordWrapper = styled.div`
  margin: 20px;
  display: inline-block;
`;
