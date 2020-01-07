import React, { useState } from 'react';
import { useInterval } from '../../utils/setInterval';
import styled from "styled-components";
import { moves } from '../../utils/constants';
import Player from './player';

const playerWidth = 40;
const playerHeight = 100;

const SceneWrapper = styled('div')`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const SceneTop = styled('div')`
  flex-grow: 1;
  background-color: #007cf8;
`

const SceneCenter = styled('div')`
  height: 40%;
  width: 100%;
  display: flex;
  background-color: #111;
`

const SceneBottom = styled('div')`
  width: 100%;
  height: 60px;
  background-image: linear-gradient(45deg, #8989c5 25%, transparent 25%), linear-gradient(-45deg, #8989c5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #8989c5 75%), linear-gradient(-45deg, #54fcfc 75%, #8989c5 75%);
  background-size: 10px 10px;
  background-position: 0 0, 0 5px, 5px -5px, -5px 0px;
`;

const PlayerWrapper = styled('div')`
  position: absolute;
  bottom: 45px;
  width: ${playerWidth}px;
  height: ${playerHeight}px;
  left: ${({location}) => location}px;
  background-color: #aaa;
`;

function World({ move }) {
  
  const screenWidth = window.screen.width;

  const movment = 5;

  const [location, setLocation] = useState(0);

  useInterval(async () => {
    // move = move.toLowerCase();
    // console.log(move);
    if (move === moves.LEFT) {
      setLocation(location - movment < 0 ? 0 : location - movment);
    } else if (move === moves.RIGHT) {
      setLocation(location + movment > screenWidth - playerWidth ? screenWidth - playerWidth : location + movment)
    }
  }, 80);

  return (
    <SceneWrapper>
      <SceneTop/>
      <SceneCenter/>
      <PlayerWrapper location={location}>
        <Player/>
      </PlayerWrapper>
      <SceneBottom/>
    </SceneWrapper>
  );
}

export default World;
