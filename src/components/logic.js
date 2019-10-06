import React, { useState } from 'react';
import World from "./world/container";
import Vid from "./controllers/video";

function Logic() {
  const [move, setMove] = useState("");
  return (
    <>
      <Vid setMove={setMove}/>
      <World move={move}/>
    </>
  );
}

export default Logic;
