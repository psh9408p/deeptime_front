import React, { useEffect, useRef, useState, createRef, RadioButton } from "react"
import * as tf from "@tensorflow/tfjs"
import * as faceapi from "face-api.js"

export default function Attendance() {
  const [modelFace, setModelFace] = useState(null)
  const [modelFaceMatcher, setModelFaceMatcher] = useState(null)

  const [faceButton, setFacebutton] = useState(true)

  // const videoRef = useRef([createRef(), createRef()])
  const video1 = useRef()
  const video2 = useRef()
  const videos = [video1]
  // const canvasRef = useRef([createRef(), createRef()])
  const canvas1 = createRef()
  const canvas2 = createRef()
  const canvases = [canvas1]

  const BOUNDING_BOX_LABEL = "Student"

  // const videos = [
  //   document.getElementById("video1"),
  //   document.getElementById("video2")
  //   // document.getElementById("video3")
  // ]

  // once
  // 1. LoadModel
  useEffect(() => {
    LoadModel()
    LoadCamera()
  }, [])

  const LoadModel = async () => {
    console.log("Load model")

    const MODEL_URL = "/models"

    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    await faceapi.loadFaceLandmarkModel(MODEL_URL)
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)

    const loadModelFace = await faceapi.loadFaceRecognitionModel(MODEL_URL)
    setModelFace(loadModelFace)
    console.log(loadModelFace)

    function loadLabeledImages() {
      console.log("Facematcher start")
      const labels = ["PYS", "JSH", "KTW"]
      return Promise.all(
        labels.map(async label => {
          const descriptions = []
          for (let i = 1; i <= 3; i++) {
            const img = await faceapi.fetchImage(`/image/${label}/${i}.jpeg`)
            const detections = await faceapi
              .detectSingleFace(img)
              .withFaceLandmarks()
              .withFaceDescriptor()
            descriptions.push(detections.descriptor)
          }
          return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
      )
    }
    const labeledFaceDescriptors = await loadLabeledImages()
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)

    setModelFaceMatcher(faceMatcher)
    // const labeledFaceDescriptors = await loadLabeledImages()

    // const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
    // // let image
    // // let canvas
    // imageUpload.addEventListener("change", async () => {
    //   if (image) image.remove()
    //   if (canvas) canvas.remove()
    //   image = await faceapi.bufferToImage(imageUpload.files[0])
    //   container.append(image)
    //   canvas = faceapi.createCanvasFromMedia(image)
    //   container.append(canvas)
    //   const displaySize = { width: image.width, height: image.height }
    //   faceapi.matchDimensions(canvas, displaySize)
    //   const detections = await faceapi
    //     .detectAllFaces(image)
    //     .withFaceLandmarks()
    //     .withFaceDescriptors()
    //   const resizedDetections = faceapi.resizeResults(detections, displaySize)
    //   const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    //   results.forEach((result, i) => {
    //     const box = resizedDetections[i].detection.box
    //     const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
    //     drawBox.draw(canvas)
    //   })
    // })
  }

  // for # Camera
  // 1. SetVideoElement
  // 1. LoadCamera
  // 1. ConnectElAndCamera
  const LoadCamera = async () => {
    console.log("Load camera")

    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia

    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log("enumerateDevices() not supported.")
      return
    }

    const deviceIds = await navigator.mediaDevices.enumerateDevices()
    const videoDeviceIds = []

    deviceIds.forEach(function(deviceId) {
      if (deviceId.kind === "videoinput") {
        videoDeviceIds.push(deviceId)
      }
    })

    for (let i = 0; i < videoDeviceIds.length; i++) {
      if (getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { deviceId: videoDeviceIds[i].deviceId } })
          .then(function(stream) {
            video1.current.srcObject = stream
          })
          .catch(function(error) {
            console.log(video1)
            console.log(error)
            console.log("Something went wrong!")
          })
      }
    }
  }

  const detectFromVideoFrame = async (video, canvas) => {
    try {
      console.log(faceButton)
      if (faceButton) {
        console.log("Detect !!!")
        console.log(video)
        let facePredinctions = await faceapi
          .detectAllFaces(video)
          .withFaceLandmarks()
          .withFaceDescriptors()
        console.log(facePredinctions)
        //   const displaySize = { width: video.width, height: video.height }
        //   faceapi.matchDimensions(canvas, displaySize)
        //   console.log(video.height)

        //   const resizedDetections = faceapi.resizeResults(facePredinctions, displaySize)
        //   console.log("resizedDetections")
        //   console.log(resizedDetections)
        // console.log(modelFaceMatcher)

        const results = await facePredinctions.map(d =>
          modelFaceMatcher.findBestMatch(d.descriptor)
        )
        console.log(results)
        //   results.forEach((result, i) => {
        //     const box = facePredinctions[i].detection.box
        //     const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
        //     drawBox.draw(canvas)
        //     console.log("in result")
        //   })

        showDetections(video, canvas, facePredinctions, results)
      }
    } catch (error) {
      console.log("Couldn't start the webcam")
      console.error(error)
    }
  }

  const showDetections = (video, canvas, facePredinctions, results) => {
    console.log("Show detect")
    // canvas.width = video.width
    // canvas.height = video.height

    const ctx = canvas.current.getContext("2d")

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(video, 0, 0)
    const font = "40px Arial"
    ctx.font = font
    ctx.textBaseline = "top"
    // console.log(results)
    // console.log(results[0].indexOf(0))

    // console.log(results[0].result)
    // console.log(results[0].label)
    // console.log(results[0].labels)

    // console.log(...results[0].result.label)

    // console.log(...results.labels[0])

    facePredinctions.forEach((detection, i) => {
      //   console.log(detection.detection.box)
      ctx.strokeStyle = "blue"
      ctx.lineWidth = 4
      //   const img_width = video.webcamVideoElement.width
      ctx.strokeRect(
        detection.detection.box._x,
        detection.detection.box._y,
        detection.detection.box._width,
        detection.detection.box._height
      )
      ctx.strokeText(results[i].toString(), detection.detection.box._x, detection.detection.box._y)
    })

    // function sleep(delay) {
    //   var start = new Date().getTime()
    //   while (new Date().getTime() < start + delay);
    // }
    // sleep(1000)
  }

  setInterval(() => {
    if (modelFace !== null && modelFaceMatcher !== null && faceButton === true) {
      console.log(faceButton)
      detectFromVideoFrame(videos1.current, canvase1)
      //   detectFromVideoFrame(videos[1].current, canvases[1])
    }
  }, 3000)

  //   const handleLoadedData = () => {
  //     // console.log("first")
  //     // console.log(videoRef)
  //     // console.log(videoRef.current)
  //     console.log(videos)
  //     detectFromVideoFrame(videos) //맨처음 시작
  //     // console.log("second")
  //     // console.log(videoRef)
  //     // console.log(videoRef.current)
  //     // console.log("third")
  //     // console.log(webcamID)
  //   }

  const Toggle = (toggleValue, togglesetValue, toggleName) => {
    const toggle = () => togglesetValue(!toggleValue)

    return (
      <div>
        {toggleName}
        <button onClick={toggle}>{toggleValue ? "ON" : "OFF"}</button>
      </div>
    )
  }

  return (
    <div>
      <div>출석 기능</div>
      {Toggle(faceButton, setFacebutton, "Face")}
      <div>
        <video
          // onLoadedData={handleLoadedData}
          ref={video1}
          playsInline
          width="640"
          height="480"
          autoPlay
          muted
        />
        <canvas ref={canvases[0]} width="640" height="480" />
      </div>
    </div>
  )

  // and recycle
  // 1. Detection
  // 1. Mutation
}
