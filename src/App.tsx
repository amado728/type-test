import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DataDisplay from "./components/DataDisplay";
import RestartButton from "./components/RestartButton";
import Timer from "./components/Timer";
import TypeBar from "./components/TypeBar";
import TypeBox from "./components/TypeBox";
import WordBank from "./models/WordBank";
import shuffleArray from "./operations/shuffleArray";

function App() {
  const [CPM, setCPM] = useState(0);
  const [WPM, setWPM] = useState(0);
  const [time, setTime] = useState(60);
  const [currentWord, setCurrentWord] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetter, setCurrentLetter] = useState("");
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [words, setWords] = useState([""]);

  const checkInput = (input: string) => {};

  const handleInputChange = (input: string) => {
    setUserInput(input);
  };

  useEffect(() => {
    setWords(shuffleArray(WordBank));
  }, []);

  useEffect(() => {
    setCurrentWord(words[0]);
    setCurrentWordIndex(0);
    setCurrentLetter(words[0][0]);
    setCurrentLetterIndex(0);
    console.log(words[0], words[0][0]);
  }, [words]);

  useEffect(() => {
    checkInput(userInput);
  }, [userInput]);

  return (
    <Container>
      <StatusBar>
        <DataDisplay label="CPM: " data={CPM}></DataDisplay>
        <DataDisplay label="WPM: " data={WPM}></DataDisplay>
        <DataDisplay label="Time: " data={time}></DataDisplay>
        <RestartButton></RestartButton>
      </StatusBar>

      <TypeBoxContainer>
        <TypeBox
          words={words}
          currentWordIndex={currentWordIndex}
          currentLetterIndex={currentLetterIndex}
        ></TypeBox>
      </TypeBoxContainer>

      <TypeBarContainer>
        <TypeBar handleInputChange={handleInputChange}></TypeBar>
      </TypeBarContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  height: 400px;
  border-radius: 50px;
  margin: auto;
  background-color: gray;
`;

const StatusBar = styled.div`
  display: block;
  width: 60%;
  margin: auto;
  height: 70px;
`;

const TypeBarContainer = styled.div`
  width: 100%;
  height: 70px;
`;

const TypeBoxContainer = styled.div`
  width: 100%;
  height: 260px;
  margin: auto;
  background-color: white;
  border: 2px solid gray;
  box-sizing: border-box;
  padding: 20px;
  font-size: 2em;
  word-spacing: 1em;
  line-heigh: 1em;
  overflow: hidden;
`;

export default App;
