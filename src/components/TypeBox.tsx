import React from "react";
import WordBank from "../models/WordBank";

function TypeBox() {
  const words = shuffle(WordBank);

  function shuffle(array: Array<string>) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return <div>{words.join(" ")}</div>;
}

export default TypeBox;
