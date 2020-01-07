import React, { useState } from 'react';
import World from "./world/container";
import Vid from "./controllers/video";
import Keys from "./controllers/keys"

function Logic() {
  const [move, setMove] = useState("");
  const Controller = true ? Keys : Vid
  return (
    <>
      <Controller setMove={setMove}/>
      <World move={move}/>
    </>
  );
}

export default Logic;
