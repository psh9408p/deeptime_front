import React from "react"
import { useSpeechRecognition } from "./useSpeechRecognition"

const useSpeechRecognitionContainer = () => {
  const speech = useSpeechRecognition()

  return (
    <div className="App">
      <h1>React Hook for speech recognition</h1>
      <button onClick={speech.startListening}>
        Listen <i className="fa fa-microphone" />
      </button>
      <h2>Results</h2>

      <p>
        <code>
          browserSupportsSpeechRecognition:
          {speech.browserSupportsSpeechRecognition.toString()}
        </code>{" "}
        {speech.browserSupportsSpeechRecognition ? (
          <span style={{ color: "green" }}>
            <i className="fa fa-check" />
          </span>
        ) : (
          <span style={{ color: "red" }}>
            <i className="fa fa-times" />
          </span>
        )}{" "}
        (as of this writing, only Chrome supports speech recognition)
      </p>
      <p>
        <code>listening: {speech.listening.toString()}</code>{" "}
        {speech.listening ? (
          <span style={{ color: "green" }}>
            <i className="fa fa-circle" />
          </span>
        ) : (
          <span style={{ color: "red" }}>
            <i className="fa fa-stop-circle" />
          </span>
        )}
      </p>
      <p>
        <code>transcript:</code>
        <input type="text" readOnly value={speech.transcript} style={{ width: "100%" }} />
      </p>
    </div>
  )
}

export default useSpeechRecognitionContainer
