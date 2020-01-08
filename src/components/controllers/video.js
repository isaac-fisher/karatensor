import React, { useEffect, useRef, useState } from 'react';
import { useInterval } from '../../utils/setInterval';
import { moves } from '../../utils/constants';
import styled from 'styled-components';

const Button = styled('button')`
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
`;

function Vid({setMove}) {
  const classes = Object.values(moves)
  const videoEl = useRef(null);
  const [training, setTraining] = useState(null);
  const [testing, setTesting] = useState(false);
  const [knn, setKnn] = useState(null);
  const [mobilenetM, setMobilenetM] = useState(null);

  useEffect(() => {
    async function setModel() {
      setKnn(window.knnClassifier.create());
      setMobilenetM(await window.mobilenet.load());
    }
    setModel();
    console.log("model loaded");
  }, []);

  useEffect(() => {
    if (!videoEl) { return }
    navigator.mediaDevices.getUserMedia({video:true})
      .then(stream => {let video = videoEl.current;
        video.srcObject = stream;
        video.play();
      })
  }, [videoEl]);

  const toggleTesting = () => {
    setTesting(!testing);
  };

  useInterval(async () => {
    if (training === null && !testing) return;
    const image = window.tf.browser.fromPixels(videoEl.current);
    let logits;
    const infer = () => mobilenetM.infer(image, "conv_preds");
    if (training !== null) {
      logits = infer();
      knn.addExample(logits, training);
    }
    if (testing) {
      logits = infer();
      const result = await knn.predictClass(logits);
      setMove(classes[result.label])
    }
  }, 80);

  return (
    <div>
      {/*<button onClick={toggleStreaming}>{streaming ? 'Pause Video' :  'Start Video'}</button>*/}
      <div style={{ position: 'absolute', right: 0, top:0 }}><video ref={videoEl} autoPlay width="100" height="100"/></div>
      <div>
        {classes.map((name, index) => (
          <Button key={index} onMouseDown={() => setTraining(index)} onMouseLeave={()=> setTraining(null)} onMouseUp={()=> setTraining(null)}>{name} gesture</Button>
        ))}
        <br/>
        <button onClick={toggleTesting} style={{color: testing ? 'green' : 'red'}}>Test</button>
        {/*{ training !== null ? <p>Now training {training}</p> : null}*/}
        {/*{ (testing && res !== null) ? <p>{classes[res]}</p> : null }*/}
      </div>
    </div>
  );
}

export default Vid;
