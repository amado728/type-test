/* LIBRARIES */
import React, { useState, useEffect } from "react";
import styled from "styled-components";

/* COMPONENTS */
import DataDisplay from "./components/DataDisplay";
import RestartButton from "./components/RestartButton";
import TypeBar from "./components/TypeBar";
import TypeBox from "./components/TypeBox";
import Results from "./components/Results";

/* OPERATIONS */
import shuffleArray from "./operations/shuffleArray";

/* MODELS */
import WordBank from "./models/WordBank";
import WordModel from "./models/WordModel";

function App() {
  const [CPM, setCPM] = useState(0); // Characters Per Minute (character)
  const [WPM, setWPM] = useState(0); // Words per Minute
  const [time, setTime] = useState(60); // Time remaining
  const [timeLimit, setTimeLimit] = useState(60); // Initial time
  const [characterScore, setCharacterScore] = useState(0);
  const [wordScore, setWordScore] = useState(0);
  const [intervalID, setIntervalID] = useState(60); // stores our interval for our timer
  const [endTimer, setEndTimer] = useState(false); // flag to stop timer and end the game
  const [startedTyping, setStartedTyping] = useState(false); // has the user started typing? => timer starts when typing starts
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Determines which word we are on
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0); // Determines which letter we are on
  const [words, setWords] = useState([
    // stores objects for each word in our application
    {
      // this is what each word object will look like
      value: "", // the string literal will be stored here
      isIncorrect: false, // this will determine whether or not the user has incorrectly typed this word
      isCurrent: false, // this will determine if the word is the one that must currently be typed
      letters: [
        // array containing all letters of our word as individual objects
        {
          value: "", // these 3 properties are same as above but for each individual letter of the word containing it
          isIncorrect: false,
          isCurrent: false,
        },
      ],
    },
  ]);

  const checkInput = (input: string) => {
    if (!startedTyping) {
      setStartedTyping(true);
      let interval = window.setInterval(countDown, 1000);
      setIntervalID(interval);
    }

    let updatedWords = words; // we will work on this copy of the words state to manipulate it before updating state
    let currentWord = updatedWords[currentWordIndex];
    let currentLetterOfCurrentWord = currentWord.letters[currentLetterIndex];
    let nextLetterOfCurrentWord = currentWord.letters[currentLetterIndex + 1];

    if (
      // if user input matches the current character to be typed that current character is not a space
      currentLetterOfCurrentWord.value === input
    ) {
      currentLetterOfCurrentWord.isIncorrect = false; // flag letter as correct
      setCPM(CPM + 1);
    } else {
      // otherwise
      currentLetterOfCurrentWord.isIncorrect = true; // flag letter as incorrect
    }

    currentLetterOfCurrentWord.isCurrent = false; // current Letter is no longer current as we will either move on or end the test

    if (nextLetterOfCurrentWord) {
      // if current word has another letter to go to
      setCurrentLetterIndex(currentLetterIndex + 1); // we move to that letter
      nextLetterOfCurrentWord.isCurrent = true; // that letter now becomes current letter
    } else {
      // otherwise we go back to the first letter of the next word BUT
      alert("Press Space to go to the next word!"); // current word is no longer current
    }

    setWords(updatedWords);
  };

  const handleInputChange = (key: any) => {
    let alphabet = /^[a-z]+$/i;
    let letterToType =
      words[currentWordIndex].letters[currentLetterIndex].value;

    if (alphabet.test(key) && key.length === 1) {
      // if a single letter is pressed
      if (letterToType !== " ") {
        checkInput(key); // check the input of the letter for accuracy
      } else {
        alert("Press Space to go to the next word!");
      }
    } else if (key === " ") {
      // if Space is pressed
      console.log(letterToType);

      let updatedWords = words;
      let currentWord = updatedWords[currentWordIndex];
      let nextWord = updatedWords[currentWordIndex + 1];

      if (nextWord) {
        currentWord.isCurrent = false; // current word is no longer current
        nextWord.isCurrent = true; // following word is now current
        currentWord.letters[currentLetterIndex].isCurrent = false; // current letter is no longer current
        nextWord.letters[0].isCurrent = true; // first letter of following word is now current
        if (checkWord(currentWord)) {
          // check if word had any errors and mark accordingly
          currentWord.isIncorrect = true;
        } else {
          let elapsed = (timeLimit - time) / 60;
          setWPM(Math.round(CPM / 5 / elapsed));
          setWordScore(wordScore + 1);
        }
        setWords(updatedWords);
        setCurrentWordIndex(currentWordIndex + 1);
        setCurrentLetterIndex(0);
      } else {
        // if not we are out of words and letters, which means we will give the user their final score
        setCurrentWordIndex(0);
        alert("Press Space to go to the next word!");
        // GIVE USER FINAL SCORE IN THIS CASE
      }
    } else if (key === "Backspace") {
      // let letters = words[currentWordIndex].letters
      // if (letters[currentLetterIndex - 1]) {
      //   if

      // }
      alert("no going back");
    }
  };

  const checkWord = (word: WordModel) => {
    let isIncorrect = false;
    if (
      word.letters.some((letter) => letter.isIncorrect) ||
      word.letters.length > currentLetterIndex + 1
    ) {
      isIncorrect = true;
    }
    return isIncorrect;
  };

  useEffect(() => {
    // on initialization of this application, create an array of word objects with letters
    let initWords = shuffleArray(WordBank).map((word) => {
      return {
        // this is the model each word object will follow
        value: word,
        isIncorrect: false,
        isCurrent: false,
        letters: word
          .concat(" ")
          .split("")
          .map((letter) => {
            return {
              value: letter,
              isIncorrect: false,
              isCurrent: false,
            };
          }),
      };
    });
    initWords[0].isCurrent = true; // initialize first word as current word
    initWords[0].letters[0].isCurrent = true; // iniialize first letter as current letter
    setWords(initWords);
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);
  }, []);

  const countDown = () => {
    setTime((prevTime) => prevTime - 1);
  };

  useEffect(() => {
    if (time <= 0) {
      setEndTimer(true);
    }
  }, [time]);

  useEffect(() => {
    if (endTimer) {
      clearInterval(intervalID);
    }
  }, [endTimer]);

  return (
    <Container>
      {endTimer ? (
        <StatusBar />
      ) : (
        <StatusBar>
          <DataDisplay label="CPM: " data={CPM}></DataDisplay>
          <DataDisplay label="WPM: " data={WPM}></DataDisplay>
          <DataDisplay label="Time: " data={time}></DataDisplay>
          <RestartButton></RestartButton>
        </StatusBar>
      )}

      {endTimer ? (
        <TypeBoxContainer>
          <Results
            words={words}
            CPM={CPM}
            WPM={WPM}
            wordScore={wordScore}
            characterScore={characterScore}
            currentWordIndex={currentWordIndex}
            currentLetterIndex={currentLetterIndex}
          />
        </TypeBoxContainer>
      ) : (
        <TypeBoxContainer>
          <TypeBox
            words={words}
            currentWordIndex={currentWordIndex}
            currentLetterIndex={currentLetterIndex}
            wordStatus
          ></TypeBox>
        </TypeBoxContainer>
      )}

      <TypeBarContainer>
        <TypeBar
          disabled={endTimer}
          handleInputChange={handleInputChange}
        ></TypeBar>
      </TypeBarContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  height: 600px;
  border-radius: 50px;
  margin: 50px auto;
  background-color: gray;
`;

const StatusBar = styled.div`
  display: block;
  width: 70%;
  margin: auto;
  height: 70px;
`;

const TypeBarContainer = styled.div`
  width: 100%;
  height: 70px;
`;

const TypeBoxContainer = styled.div`
  width: 100%;
  height: 460px;
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
