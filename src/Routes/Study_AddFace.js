import React, { useEffect, useRef, useState, createRef } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as faceapi from 'face-api.js';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { resolvers } from '../Apollo/LocalState';

const UPDATE_EXISTTOGGLETABLE = gql`
  mutation update_existToggleTable($email: String!, $existToggle: Boolean!) {
    update_existToggleTable(email: $email, existToggle: $existToggle)
  }
`;
const UPDATE_EXISTTOGGLE = gql`
  mutation update_existToggle($email: String!, $existToggle: Boolean!) {
    update_existToggle(email: $email, existToggle: $existToggle)
  }
`;

export default function Attendance({ Mydata }) {
  const [modelPose, setModelPose] = useState(null);
  const [modelDetect, setModelDetect] = useState(null);
  const [modelFace, setModelFace] = useState(null);
  const [modelFaceMatcher, setModelFaceMatcher] = useState(null);
  const [detectButton, setDetectbutton] = useState(true);
  const [poseButton, setPosebutton] = useState(true);
  const [faceButton, setFacebutton] = useState(true);
  const [finalDecision, setFinalDecision] = useState(true);
  const [Mutation, setMutation] = useState(false);

  const video1 = useRef();
  const canvas1 = createRef();
  const BOUNDING_BOX_LABEL = 'Student';

  // once
  // 1. LoadModel
  useEffect(() => {
    LoadModel();
    LoadCamera();
  }, []);

  const [existToggleTableMutation] = useMutation(UPDATE_EXISTTOGGLETABLE);
  const [existToggleMutation] = useMutation(UPDATE_EXISTTOGGLE);

  const LoadModel = async () => {
    console.log('Load model');

    const loadedModelPose = await posenet.load();
    setModelPose(loadedModelPose);

    const loadedModelDetect = await cocoSsd.load({ base: 'mobilenet_v2' });
    setModelDetect(loadedModelDetect);

    const MODEL_URL = '/models';

    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

    const loadModelFace = await faceapi.loadFaceRecognitionModel(MODEL_URL);
    setModelFace(loadModelFace);

    function loadLabeledImages() {
      console.log('Facematcher start');
      const labels = ['PYS', 'JSH', 'KTW'];
      return Promise.all(
        labels.map(async (label) => {
          const descriptions = [];
          for (let i = 1; i <= 3; i++) {
            const img = await faceapi.fetchImage(`/image/${label}/${i}.jpeg`);
            const detections = await faceapi
              .detectSingleFace(img)
              .withFaceLandmarks()
              .withFaceDescriptor();
            descriptions.push(detections.descriptor);
          }
          return new faceapi.LabeledFaceDescriptors(label, descriptions);
        }),
      );
    }
    // const labeledFaceDescriptors = await loadLabeledImages()
    // const json_str = "{"parent":" + JSON.stringify(labeledFaceDescriptors) + "}"
    // const labelledDescriptors = await faceapi.fetchDescrfiptors('/files/labeledDescriptors.json');

    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

    setModelFaceMatcher(faceMatcher);
  };

  // for # Camera
  // 1. SetVideoElement
  // 1. LoadCamera
  // 1. ConnectElAndCamera
  const LoadCamera = async () => {
    console.log('Load camera');
    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log('enumerateDevices() not supported.');
      return;
    }

    const deviceIds = await navigator.mediaDevices.enumerateDevices();
    const videoDeviceIds = [];

    deviceIds.forEach(function (deviceId) {
      if (deviceId.kind === 'videoinput') {
        videoDeviceIds.push(deviceId);
      }
    });

    for (let i = 0; i < 1; i++) {
      if (getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { deviceId: videoDeviceIds[i].deviceId } })
          .then(function (stream) {
            video1.current.srcObject = stream;
          })
          .catch(function (error) {
            console.log(error);
            console.log('Something went wrong!');
          });
      }
    }
  };

  const detectFromVideoFrame = async (video, canvas) => {
    try {
      const ctx = canvas.current.getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height); //중요함, video를 그냥 넣어주면 최대 크기의 사진이 들어옴

      // if (poseButton) {

      const posePredictions = await modelPose.estimateMultiplePoses(
        canvas.current,
        {
          flipHorizontal: false,
          maxDetections: 2,
          minPoseConfidence: 0.15,
          minPartConfidence: 0.1,
          scoreThreshold: 0.5,
          nmsRadius: 30,
        },
      );
      // console.log("Pose")
      // console.log(posePredictions)
      // }

      // if (detectButton) {
      // video.width = canvas.current.width
      // video.height = canvas.current.height

      const objectPredictions = await modelDetect.detect(canvas.current);
      // console.log("object")
      // console.log(objectPredictions)
      // }

      // if (faceButton) {
      // video.width = canvas.current.width
      // video.height = canvas.current.height
      let facePredictions = await faceapi
        .detectAllFaces(canvas.current)
        .withFaceLandmarks()
        .withFaceDescriptors();

      // console.log("facePredictions")
      // console.log(facePredictions)

      let faceResults = await facePredictions.map((d) =>
        modelFaceMatcher.findBestMatch(d.descriptor),
      );
      // console.log("faceResults")
      // console.log(faceResults)
      showDetections(
        canvas,
        posePredictions,
        objectPredictions,
        facePredictions,
        faceResults,
      );
      const Finaldecision = await ConcludeFinaldecision(
        posePredictions,
        objectPredictions,
        facePredictions,
        faceResults,
      );
      return Finaldecision;
    } catch (error) {
      console.log("Couldn't start the webcam");
      console.error(error);
    }
  };

  const showDetections = (
    canvas,
    posePredictions,
    objectPredictions,
    facePredinctions,
    faceResults,
  ) => {
    console.log('Show detect');

    const ctx = canvas.current.getContext('2d');
    const font = '20px Arial';
    ctx.font = font;
    if (poseButton) {
      posePredictions.forEach((poses) => {
        const area_data = 3;
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;

        const area = new Array(area_data);
        for (var i = 0; i < area.length; i++) {
          area[i] = false;
        }
        //   const img_width = video.webcamVideoElement.width
        const img_width = canvas.current.width;
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 4;
        for (var j = 0; j < poses.keypoints.length; j++) {
          ctx.strokeRect(
            poses.keypoints[j].position.x,
            poses.keypoints[j].position.y,
            1,
            1,
          );
          area[
            Math.floor(
              (poses.keypoints[0].position.x / img_width) * area.length,
            )
          ] = true;
        }
      });
    }
    if (detectButton) {
      objectPredictions.forEach((prediction) => {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        ctx.strokeRect(...prediction.bbox);

        const x = prediction.bbox[0];
        const y = prediction.bbox[1];
        const height = prediction.bbox[3];

        ctx.fillStyle = 'red';
        const textWidth = ctx.measureText(BOUNDING_BOX_LABEL).width;
        const textHeight = parseInt(font, 10);
        ctx.fillRect(x, y, textWidth + 10, textHeight + 5);
        ctx.fillRect(
          x,
          y + height - textHeight - 5,
          textWidth + 15,
          textHeight + 20,
        );

        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(BOUNDING_BOX_LABEL, x + 5, y);
        ctx.fillText(
          prediction.score.toFixed(2),
          x + 5,
          y + height - textHeight,
        );
      });
    }
    if (faceButton) {
      ctx.textBaseline = 'top';

      facePredinctions.forEach((detection, i) => {
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 4;
        ctx.strokeRect(
          detection.detection.box._x,
          detection.detection.box._y,
          detection.detection.box._width,
          detection.detection.box._height,
        );

        if (faceResults[i].label === Mydata.me.username) {
          ctx.strokeText(
            faceResults[i].toString(),
            detection.detection.box._x,
            detection.detection.box._y,
          );
        } else {
          ctx.strokeText(
            '모르는 얼굴...',
            detection.detection.box._x,
            detection.detection.box._y,
          );
        }
      });
    }
  };

  const ConcludeFinaldecision = (
    posePredictions,
    objectPredictions,
    facePredictions,
    faceResults,
  ) => {
    let allfaceResults = new Array(faceResults.length);
    let result = [];
    for (let i = 0; i < faceResults.length; i++) {
      if (faceResults[i].label === Mydata.me.username) {
        allfaceResults[i] = 1;
      } else {
        allfaceResults[i] = 0;
      }
    }
    console.log(allfaceResults, objectPredictions, posePredictions);
    if (
      Math.max(allfaceResults) === 1 &&
      objectPredictions !== null &&
      posePredictions !== null
    ) {
      result = true;
    } else {
      result = false;
    }
    console.log(result);
    setFinalDecision(result);
  };
  // showDetections(canvas, posePredictions, objectPredictions, facePredictions, faceResults)

  setInterval(() => {
    if (
      modelFace !== null &&
      modelFaceMatcher !== null &&
      modelPose !== null &&
      modelDetect !== null &&
      canvas1.current !== null
    ) {
      detectFromVideoFrame(video1.current, canvas1);

      if (Mutation === true) {
        if (finalDecision === true) {
          existToggleTableMutation({
            variables: { email: Mydata.me.email, existToggle: true },
          });
          existToggleMutation({
            variables: { email: Mydata.me.email, existToggle: true },
          });
        } else {
          existToggleTableMutation({
            variables: { email: Mydata.me.email, existToggle: false },
          });
          existToggleMutation({
            variables: { email: Mydata.me.email, existToggle: false },
          });
        }
      }
    }
  }, 10000);

  const Toggle = (toggleValue, togglesetValue, toggleName) => {
    const toggle = () => togglesetValue(!toggleValue);
    return (
      <div>
        {toggleName}
        <button onClick={toggle}>{toggleValue ? 'ON' : 'OFF'}</button>
      </div>
    );
  };

  return (
    <div>
      <div>인공지능 기술 선택하기</div>
      {(detectButton, poseButton)}
      {Toggle(detectButton, setDetectbutton, 'Detection')}
      {Toggle(poseButton, setPosebutton, 'Pose')}
      {Toggle(faceButton, setFacebutton, 'Face')}
      {Toggle(Mutation, setMutation, 'Mutation')}

      <div>
        <video
          ref={video1}
          playsInline
          width="640"
          height="240"
          autoPlay
          muted
        />
        <canvas ref={canvas1} width="640" height="240" />
      </div>
    </div>
  );
}
