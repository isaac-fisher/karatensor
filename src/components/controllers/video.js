import React, { useEffect, useRef, useState } from 'react';
import { useInterval } from '../../utils/setInterval';

const classes = ['Left', 'No', 'Right'];

function Vid({setMove}) {
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
      <video ref={videoEl} autoPlay width="227" height="227"/>
      <div>
        {classes.map((name, index) => (
          <button key={index} onMouseDown={() => setTraining(index)} onMouseLeave={()=> setTraining(null)} onMouseUp={()=> setTraining(null)}>{name} gesture</button>
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
