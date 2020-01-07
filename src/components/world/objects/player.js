import React, { useState } from 'react';
import styled from "styled-components";

const PlayerLook = styled('div')`
  background-color: red;
  display: block;
`;

function Player({move}) {
  
  return (
    <PlayerLook/>
  );
}

export default Player;
