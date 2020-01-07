import React, { useState } from 'react';
import { useInterval } from '../../utils/setInterval';
import styled from "styled-components";
import { moves } from '../../utils/constants';
import Player from './objects/player';
import WorldDisplayer from './displayer';

const playerWidth = 40;

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
    <WorldDisplayer location={location}/>
  );
}

export default World;
