import React, { useEffect, useRef, useState, createRef, RadioButton } from "react"
import * as cocoSsd from "@tensorflow-models/coco-ssd"
import * as posenet from "@tensorflow-models/posenet"
import * as faceapi from "face-api.js"

export default function ForGOD2() {
  const [modelDetect, setModelDetect] = useState(null)
  const [modelPose, setModelPose] = useState(null)
  const [modelFace, setModelFace] = useState(null)
  const [detectButton, setDetectbutton] = useState(true)
  const [poseButton, setPosebutton] = useState(true)
  const [faceButton, setFacebutton] = useState(true)

  const [value, setValue] = useState("on")

  // const videoRef = useRef([createRef(), createRef()])
  const video1 = useRef()
  // const video2 = useRef()
  const videos = [video1]
  // const canvasRef = useRef([createRef(), createRef()])
  const canvas1 = createRef()
  // const canvas2 = createRef()
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

    const loadedModelDetect = await cocoSsd.load({ base: "mobilenet_v2" })
    setModelDetect(loadedModelDetect)

    const loadedModelPose = await posenet.load()
    setModelPose(loadedModelPose)
    console.log(modelPose)

    const MODEL_URL = "/models"

    await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
    await faceapi.loadFaceLandmarkModel(MODEL_URL)
    const loadModelFace = await faceapi.loadFaceRecognitionModel(MODEL_URL)
    setModelFace(loadModelFace)
    console.log(loadModelFace)
  }

  // for # Camera
  // 1. SetVideoElement
  // 1. LoadCamera
  // 1. ConnectElAndCamera
  const LoadCamera = async () => {
    console.log("Load camera")

    console.log(videos)
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
            console.log("Something went wrong!")
          })
      }
    }

    //   videoDeviceIds.forEach(function(videoDeviceId) {
    //     if (getUserMedia) {
    //       navigator.mediaDevices
    //         .getUserMedia({ video: { deviceId: videoDeviceId.deviceId } })
    //         .then(function(stream) {
    //           videos[1].srcObject = stream
    //         })
    //         .catch(function(error) {
    //           console.log("Something went wrong!")
    //         })
    //     }
    //   })
  }

  //   const webcamElement = document.getElementById("webcam")
  //   console.log(webcamElement)
  //   const webcam = await tf.data.webcam(webcamElement)

  const detectFromVideoFrame = async (video, canvas) => {
    try {
      const posePredictions = await modelPose.estimateMultiplePoses(video, {
        flipHorizontal: false,
        maxDetections: 5,
        scoreThreshold: 0.5,
        nmsRadius: 20
      })
      console.log("Pose")
      console.log(posePredictions)

      const objectPredictions = await modelDetect.detect(video)
      console.log("object")
      console.log(objectPredictions)

      let facePredinctions = await faceapi
        .detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceDescriptors()
      console.log(facePredinctions)

      // const personDetections = objectPredictions.filter(p => p.class === "person")
      showDetections(video, canvas, posePredictions, objectPredictions, facePredinctions)
    } catch (error) {
      console.log("Couldn't start the webcam")
      console.error(error)
    }
  }

  const showDetections = (video, canvas, posePredictions, objectPredictions, facePredinctions) => {
    const area_data = 3
    const ctx = canvas.current.getContext("2d")
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.drawImage(video, 0, 0)
    const font = "24px helvetica"
    ctx.font = font
    ctx.textBaseline = "top"

    if (detectButton) {
      objectPredictions.forEach(prediction => {
        ctx.strokeStyle = "red"
        ctx.lineWidth = 6
        ctx.strokeRect(...prediction.bbox)

        const x = prediction.bbox[0]
        const y = prediction.bbox[1]
        const height = prediction.bbox[3]

        ctx.fillStyle = "red"
        const textWidth = ctx.measureText(BOUNDING_BOX_LABEL).width
        const textHeight = parseInt(font, 10)
        ctx.fillRect(x, y, textWidth + 10, textHeight + 5)
        ctx.fillRect(x, y + height - textHeight - 5, textWidth + 15, textHeight + 20)

        ctx.fillStyle = "#FFFFFF"
        ctx.fillText(BOUNDING_BOX_LABEL, x + 5, y)
        ctx.fillText(prediction.score.toFixed(2), x + 5, y + height - textHeight)
      })
    }
    // poses[i].keypoints[j].position.x, poses[i].keypoints[j].position.y
    if (poseButton) {
      posePredictions.forEach(poses => {
        ctx.strokeStyle = "red"
        ctx.lineWidth = 6

        const area = new Array(area_data)
        for (var i = 0; i < area.length; i++) {
          area[i] = false
        }
        //   const img_width = video.webcamVideoElement.width
        const img_width = video.width
        ctx.strokeStyle = "#00FFFF"
        ctx.lineWidth = 4
        for (var j = 0; j < poses.keypoints.length; j++) {
          ctx.strokeRect(poses.keypoints[j].position.x, poses.keypoints[j].position.y, 1, 1)

          // console.log("in stroke")
          area[Math.floor((poses.keypoints[0].position.x / img_width) * area.length)] = true
          // console.log(ctx)
        }

        console.log(area)

        //   ctx.fillStyle = "red"
        //   const textWidth = ctx.measureText(BOUNDING_BOX_LABEL).width
        //   const textHeight = parseInt(font, 10)
        //   ctx.fillRect(x, y, textWidth + 10, textHeight + 5)
        //   ctx.fillRect(x, y + height - textHeight - 5, textWidth + 15, textHeight + 20)

        //   ctx.fillStyle = "#FFFFFF"
        //   ctx.fillText(BOUNDING_BOX_LABEL, x + 5, y)
        //   ctx.fillText(prediction.score.toFixed(2), x + 5, y + height - textHeight)
      })
    }
    if (faceButton) {
      facePredinctions.forEach(detection => {
        //   console.log(detection.detection.box)
        ctx.strokeStyle = "red"
        ctx.lineWidth = 6
        const labels = ["PYS", "JSH", "KTW"]

        //   const img_width = video.webcamVideoElement.width
        ctx.strokeRect(
          detection.detection.box._x,
          detection.detection.box._y,
          detection.detection.box._width,
          detection.detection.box._height
        )
      })
    }
    // function sleep(delay) {
    //   var start = new Date().getTime()
    //   while (new Date().getTime() < start + delay);
    // }
    // sleep(1000)
  }

  setInterval(() => {
    if (modelPose !== null && modelDetect !== null && modelDetect !== null) {
      detectFromVideoFrame(videos[0].current, canvases[0])
      // detectFromVideoFrame(videos[1].current, canvases[1])
    }
  }, 2000)

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
      <div>인공지능 기술 선택하기</div>
      {(detectButton, poseButton)}
      {Toggle(detectButton, setDetectbutton, "Detection")}
      {Toggle(poseButton, setPosebutton, "Pose")}
      {Toggle(faceButton, setFacebutton, "Face")}

      <div>
        <video
          // onLoadedData={handleLoadedData}
          // id="video1"
          playsInline
          width="640"
          height="480"
          autoPlay
          muted
          ref={video1}
        />
        {/* <video
          // onLoadedData={handleLoadedData}
          id="video2"
          playsInline
          width="640"
          height="480"
          autoPlay
          muted
          ref={videos[1]}
        /> */}
      </div>
      <div>
        <canvas ref={canvas1} width="640" height="480" />
        {/* <canvas ref={canvas2} width="640" height="480" /> */}
      </div>
    </div>
  )

  // and recycle
  // 1. Detection
  // 1. Mutation
}
