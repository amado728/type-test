import React from "react";
import Word from "./Word";

function TypeBox(props: any) {
  const { words, currentWordIndex, currentLetterIndex } = props;

  //   getLetter = () => {
  //     if (currentLetter)
  //   }

  return (
    <div>
      {words.map((word: string) => {
        return <Word word={word} key={word} />;
      })}
    </div>
  );
}

export default TypeBox;
