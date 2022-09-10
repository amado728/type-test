import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DataDisplay from "./components/DataDisplay";
import RestartButton from "./components/RestartButton";
import Timer from "./components/Timer";
import TypeBar from "./components/TypeBar";
import TypeBox from "./components/TypeBox";

function App() {
  const [CPM, setCPM] = useState(0);
  const [WPM, setWPM] = useState(0);
  const [time, setTime] = useState(60);

  useEffect(() => {
    //somtheing here for initialization
  }, []);

  return (
    <Container>
      <StatusBar>
        <DataDisplay label="CPM: " data={CPM}></DataDisplay>
        <DataDisplay label="WPM: " data={WPM}></DataDisplay>
        <DataDisplay label="Time: " data={time}></DataDisplay>
        <RestartButton></RestartButton>
      </StatusBar>

      <TypeBoxContainer>
        <TypeBox></TypeBox>
      </TypeBoxContainer>

      <TypeBarContainer>
        <TypeBar></TypeBar>
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
