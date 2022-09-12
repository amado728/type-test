import React from "react";
import Word from "./Word";
import WordModel from "../models/WordModel";

function TypeBox(props: any) {
  const { words, currentWordIndex, currentLetterIndex } = props;

  return (
    <div>
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
    </div>
  );
}

export default TypeBox;
