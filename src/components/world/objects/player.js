import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import spriteWalk from "../../../imgs/sprites_walking.png"
import spritePunch from "../../../imgs/sprites_kick.png"
import { moves } from '../../../utils/constants';

const PlayerLook = styled('div')`
  background-image: url(${({sprite}) => sprite});
  background-position-x: ${({step}) => (step * -64)}px;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  color: greenyellow;
`;

let lastMove;
let step;

function Player({move}) {
  useEffect(() => { 
    step = 0; 
  }, []);  
  let sprite = spriteWalk;
  if (move === moves.RIGHT) {
    step = (step + 1) % 10;
  } else if (move === moves.LEFT) {
    step = (step === 0 ? 9 : step - 1) % 10;
  } else if (move === moves.PUNCH) {
    if (lastMove !== moves.PUNCH) step = -1;
    sprite = spritePunch;
    step = (step + 1) % 4;
  }
  lastMove = move;
    
  return (
    <PlayerLook step={step} sprite={sprite}>{move}</PlayerLook>
  );
}

export default Player;
