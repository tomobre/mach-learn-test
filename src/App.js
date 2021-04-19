import * as React from "react";
import { imageClassifier } from "ml5";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

import "./App.css";

function App() {
  const webcam = React.useRef(null);
  const [classifier, setClassifier] = React.useState(null);

  function handlePlay() {
    if (!classifier) return;
    classifier.classify(webcam.current, (error, [match]) => {
      if (error) console.error(error);

      Swal.fire(`Probablemente seas ${match.label}`);
      console.log(match.label);
    });
  }

  React.useEffect(() => {
    const classifier = imageClassifier(
      "https://teachablemachine.withgoogle.com/models/wZJW0FN6D/model.json",
      () => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then((stream) => {
            if (!webcam.current) return;

            webcam.current.srcObject = stream;
            webcam.current.play();
          });
      }
    );

    setClassifier(classifier);
  }, []);
  return (
    <div className="d-flex justify-content-center flex-column ">
      <video
        className="container p-5"
        ref={webcam}
        height="640"
        width="488"
      ></video>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handlePlay}>
          Reconocer
        </button>
      </div>
    </div>
  );
}

export default App;
