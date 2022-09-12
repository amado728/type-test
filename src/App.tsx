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
  const [intervalID, setIntervalID] = useState(60); // stores our interval for our timer
  const [endTimer, setEndTimer] = useState(false); // flag to stop timer and end the game
  const [startedTyping, setStartedTyping] = useState(false); // has the user started typing? => timer starts when typing starts
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Determines which word we are on
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0); // Determines which letter we are on
  const [moveScreenUp, setMoveScreenUp] = useState(0); // determines how many pixels to move the screen
  const [spaceNotification, setSpaceNotification] = useState(false); // flag to notify user to press space (one time)
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

  const newWords = () => {
    let initWords = shuffleArray(WordBank)
      .slice(0, 39)
      .map((word) => {
        return {
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
  };

  const handleInputChange = (key: string) => {
    let alphabet = /^[a-z]+$/i;
    let updatedWords = words; // we will work on this copy of the words state to manipulate it before updating state
    //creating some shortcut variables here so our code is kept clean
    let currentWord = updatedWords[currentWordIndex];
    let nextWord = updatedWords[currentWordIndex + 1];
    //relative to the current word :
    let currentLetter = currentWord.letters[currentLetterIndex];
    let nextLetter = currentWord.letters[currentLetterIndex + 1];
    let previousLetter = currentWord.letters[currentLetterIndex - 1];

    let letterToType = currentLetter.value;

    if (!startedTyping) {
      setStartedTyping(true);
      let interval = window.setInterval(countDown, 1000);
      setIntervalID(interval);
    }

    if (alphabet.test(key) && key.length === 1) {
      // if a single letter is pressed
      if (letterToType !== " ") {
        if (
          // if user input matches the current character to be typed that current character is not a space
          letterToType === key
        ) {
          currentLetter.isIncorrect = false; // flag letter as correct
          setCPM(CPM + 1);
        } else {
          // otherwise
          currentLetter.isIncorrect = true; // flag letter as incorrect
        }

        currentLetter.isCurrent = false; // current Letter is no longer current as we will either move on or end the test

        if (nextLetter) {
          // if current word has another letter to go to
          setCurrentLetterIndex(currentLetterIndex + 1); // we move to that letter
          nextLetter.isCurrent = true; // that letter now becomes current letter
        }

        setWords(updatedWords);
      } else {
        if (!spaceNotification) {
          alert("Press Space to go to the next word!");
          setSpaceNotification(true);
        }
      }
    } else if (key === " ") {
      // if Space is pressed

      if (nextWord) {
        currentWord.isCurrent = false; // current word is no longer current
        nextWord.isCurrent = true; // following word is now current
        currentWord.letters[currentLetterIndex].isCurrent = false; // current letter is no longer current
        nextWord.letters[0].isCurrent = true; // first letter of following word is now current
        if (letterToType === " ") {
          // space only awards 1 CPM if it is time to press it
          setCPM(CPM + 1);
        }
        if (checkWord(currentWord)) {
          // check if word had any errors and mark accordingly
          currentWord.isIncorrect = true;
        } else {
          let elapsed = (timeLimit - time) / 60;
          setWPM(Math.round(CPM / 5 / elapsed));
        }
        setWords(updatedWords);
        setCurrentWordIndex(currentWordIndex + 1);
        checkMoveScreen();
        setCurrentLetterIndex(0);
      } else {
        // if not we are out of words and letters, which means we will give the user their final score
        setEndTimer(true);
      }
    } else if (key === "Backspace") {
      if (previousLetter) {
        // if current word has a previous letter to go to
        if (!previousLetter.isIncorrect) {
          setCPM(CPM - 1);
        } // we deduct current letter from CPM score
        currentLetter.isCurrent = false; // current letter is no longer current
        previousLetter.isCurrent = true; // previous letter now becomes the current letter
        previousLetter.isIncorrect = false; // since we have gone back to the previous letter, it is no longer incorrect
        setCurrentLetterIndex(currentLetterIndex - 1); // set index to reflect current letter as previous letter
      } else {
        if (currentWordIndex > 0) {
          alert(
            "No going back! It is more efficient to keep typing correct letters instead"
          );
        }
      }
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
    newWords();
  }, []);

  const countDown = () => {
    setTime((prevTime) => prevTime - 1);
    // since setInterval creates a closure, it locks the initial value of time within itself
    // so we cannot refer to time variable here, we must listen for when time updates usiing useEffect (below)
  };

  useEffect(() => {
    if (time <= 0) {
      setEndTimer(true);
      clearInterval(intervalID);
    }
  }, [time]);

  const checkMoveScreen = () => {
    console.log("words typed", currentWordIndex + 1);
    if (currentWordIndex + 1 >= 15 && (currentWordIndex + 1) % 5 === 0) {
      setMoveScreenUp(moveScreenUp - 85);
      console.log("moving screen");
    }
  };

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
            currentWordIndex={currentWordIndex}
            currentLetterIndex={currentLetterIndex}
          />
        </TypeBoxContainer>
      ) : (
        <TypeBoxContainer>
          <TypeBox
            newLine={true}
            words={words}
            currentWordIndex={currentWordIndex}
            currentLetterIndex={currentLetterIndex}
            yPosition={moveScreenUp}
          ></TypeBox>
        </TypeBoxContainer>
      )}

      <TypeBarContainer>
        {endTimer ? (
          <></>
        ) : (
          <TypeBar
            disabled={endTimer}
            handleInputChange={handleInputChange}
          ></TypeBar>
        )}
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
  overflow: hidden;
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
