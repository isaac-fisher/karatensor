import React, { useState } from 'react';
import { useInterval } from '../../utils/setInterval';
import styled from "styled-components";

const screenWidth = 640;
const screenHeight = 480;
const playerWidth = 40;
const playerHeight = 40;
const movment = 5;

const Scene = styled('div')`
  position: absolute;
  bottom: 0;
  width: ${screenWidth}px;
  height: ${screenHeight}px;
  border: black solid 1px;
  display: flex;
`;

const Player = styled('div')`
  background-color: rebeccapurple;
  width: ${playerWidth}px;
  height: ${playerHeight}px;
  border-radius: 12px;
  align-self: flex-end;
  margin-left: ${({location}) => location}px;
`;

function World({ move }) {
  const [location, setLocation] = useState(0);

  useInterval(async () => {
    move = move.toLowerCase();
    console.log(move);
    if (move === "left") {
      setLocation(location - movment < 0 ? 0 : location - movment);
    } else if (move === "right") {
      setLocation(location + movment > screenWidth - playerWidth ? screenWidth - playerWidth : location + movment)
    }
  }, 80);

  return (
    <Scene>
      <Player location={location}/>
    </Scene>
  );
}

export default World;
