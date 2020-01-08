import React, { useState } from 'react';
import World from "./world/container";
import Vid from "./controllers/video";
import Keys from "./controllers/keys"

function Logic() {
  const [move, setMove] = useState("");
  const Controller = false ? Keys : Vid
  return (
      <World move={move}>
        <Controller setMove={setMove}/>
      </World>
  );
}

export default Logic;
