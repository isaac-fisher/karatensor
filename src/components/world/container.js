import React, { useState } from 'react';
import { useInterval } from '../../utils/setInterval';
import styled from "styled-components";
import { moves } from '../../utils/constants';
import Player from './objects/player';
import WorldDisplayer from './displayer';

const playerWidth = 64;

function World({ move, children }) {
  
  const screenWidth = window.innerWidth;

  const movment = 5;

  const [location, setLocation] = useState(0);
  // const [isPunch, setIsPunch] = useState(false);
  console.log(move);
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
    <WorldDisplayer
      playerLocation={location}
      move={move}
    >
      { children }
    </WorldDisplayer>
  );
}

export default World;
