import React from "react";
import Word from "./Word";
import WordModel from "../models/WordModel";
import styled from "styled-components";

function TypeBox(props: any) {
  const { words, currentWordIndex, currentLetterIndex, yPosition } = props;

  return (
    <PositionedDiv style={{ top: yPosition + "px" }}>
      {words.map((word: WordModel) => {
        return (
          <Word
            word={word}
            key={word.value}
            currentWordIndex={currentWordIndex}
            currentLetterIndex={currentLetterIndex}
          />
        );
      })}
    </PositionedDiv>
  );
}

export default TypeBox;

const PositionedDiv = styled.div`
  position: relative;
`;
