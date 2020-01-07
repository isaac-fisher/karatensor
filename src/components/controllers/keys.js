import React, { useEffect, useState } from 'react';
import { useInterval } from '../../utils/setInterval';
import { moves } from '../../utils/constants';

const keyToClass = {
  'ArrowRight': moves.RIGHT,
  'ArrowLeft': moves.LEFT,
  'dd': moves.RIGHT,
  'a': moves.LEFT,
  'd': moves.RIGHT,
  'w': moves.PUNCH,
  '': moves.NONE,
};

function Keys({setMove}) {
  const [keyPressed, setKeyPressed] = useState('');
  const mapKey = (key) => {
    return keyToClass[key] || moves.NONE
  }

  useInterval(async () => {
    setMove(mapKey(keyPressed))
  }, 80);
  
  const upHandler = ({ key }) => { setKeyPressed(''); }
  const downHandler = ({ key }) => { setKeyPressed(key); }

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return <div/>
}

export default Keys;
