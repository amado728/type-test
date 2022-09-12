import React from "react";
import RestartButton from "./RestartButton";
import styled from "styled-components";
import WordModel from "../models/WordModel";
import LetterModel from "../models/LetterModel";

export default function Results(props: any) {
  const { CPM, WPM, words, currentWordIndex, currentLetterIndex } = props;

  const calculateWordMistakes = () => {
    let count = 0;
    words.forEach((word: WordModel) => {
      if (word.isIncorrect) {
        count++;
      }
    });
    return count;
  };

  const calculateLetterMistakes = () => {
    let count = 0;
    words.forEach((word: WordModel) => {
      word.letters.filter((letter: LetterModel) => {
        if (letter.isIncorrect) {
          count++;
        }
      });
    });
    return count;
  };

  return (
    <ResultsContainer>
      <Title>Results:</Title>
      <Stats>
        You have acheived <Green>{CPM}</Green> CPM and <Green>{WPM}</Green> WPM
      </Stats>
      <Stats>
        You typed <Red>{calculateLetterMistakes()}</Red> characters and{" "}
        <Red>{calculateWordMistakes()}</Red> words incorrectly
      </Stats>
      <Stats>Click below to restart</Stats>
      <Centered>
        <RestartButton />
      </Centered>
    </ResultsContainer>
  );
}

const Title = styled.h3`
  text-align: center;
`;

const Stats = styled.h5`
  text-align: center;
  word-spacing: 0.8em;
  line-height: 0.8em;
`;

const ResultsContainer = styled.div`
  display: block;
  width: 100%;
  height: auto;
  margin: auto;
`;

const Centered = styled.div`
  display: block;
  width: 80px;
  margin: auto;
`;

const Green = styled.span`
  color: white;
  padding 10px;
  background-color: green;
`;

const Red = styled.span`
  color: red;
`;
