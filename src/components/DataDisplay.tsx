import React from "react";
import styled from "styled-components";

function DataDisplay(props: any) {
  const { label, data } = props;

  return (
    <InlineDiv>
      <label htmlFor="data">{label}</label>
      <input type="text" readOnly value={data} />
    </InlineDiv>
  );
}

export default DataDisplay;

const InlineDiv = styled.div`
  display: inline-block;
  margin: 20px;
`;
