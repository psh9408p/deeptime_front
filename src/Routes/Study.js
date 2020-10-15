import React, { useEffect, useRef, useState, createRef } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import * as faceapi from "face-api.js"
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loader from '../Components/Loader';
import styled from 'styled-components';
// import LoadCamera from "../Components/LoadCamera/LoadCamera"
import useInterval from '../Hooks/useInterval';
import { userEmail } from '../Components/Routes';
// import ClassTabs from '../Components/Tabs/ClassTabs';
// const UPDATE_EXISTTOGGLETABLE = gql`
//   mutation update_existToggleTable($email: String!, $existToggle: Boolean!) {
//     update_existToggleTable(email: $email, existToggle: $existToggle)
//   }
// `

const UPDATE_EXISTTOGGLE = gql`
  mutation update_existToggle($email: String!, $existToggle: Boolean!) {
    update_existToggle(email: $email, existToggle: $existToggle)
  }
`;

export default function Attendance() {
  const [modelPose, setModelPose] = useState(null);
  const [modelDetect, setModelDetect] = useState(null);
  // const [modelFace, setModelFace] = useState(null)
  // const [modelFaceMatcher, setModelFaceMatcher] = useState(null)
  const [detectButton, setDetectbutton] = useState(true);
  const [poseButton, setPosebutton] = useState(true);
  // const [faceButton, setFacebutton] = useState(true)
  const [decision, setDecision] = useState([true]);
  const [finalDecision, setFinalDecision] = useState(true);
  const [Mutation, setMutation] = useState(true);

  const [timeCount, setTimeCount] = useState(0);
  const [cameraLoad, setCameraLoad] = useState(false);
  const [modelLoad, setModelLoad] = useState(false);

  const video1 = useRef();
  const canvas1 = createRef();

  const [existToggleMutation] = useMutation(UPDATE_EXISTTOGGLE);

  const LoadModel = async () => {
    console.log('Load model');

    const loadedModelPose = await posenet.load();
    const loadedModelDetect = await cocoSsd.load({ base: 'mobilenet_v2' });
    setModelPose(loadedModelPose);
    setModelDetect(loadedModelDetect);
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
    setCameraLoad(true);
  };

  const detectFromVideoFrame = async (video, canvas) => {
    try {
      console.log(timeCount);
      const ctx = canvas.current.getContext('2d');
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height); //중요함, video를 그냥 넣어주면 최대 크기의 사진이 들어옴

      // if (poseButton) {

      const posePredictions = await modelPose.estimateMultiplePoses(
        canvas.current,
        {
          flipHorizontal: false,
          maxDetections: 1,
          minPoseConfidence: 0.15,
          minPartConfidence: 0.1,
          scoreThreshold: 0.5,
          nmsRadius: 30,
        },
      );

      const objectPredictions = await modelDetect.detect(canvas.current);
      const personDetections = objectPredictions.filter(
        (p) => p.class === 'person',
      );

      showDetections(canvas, posePredictions, personDetections);
      const Finaldecision = await ConcludeFinaldecision(
        posePredictions,
        personDetections,
      );
      return Finaldecision;
    } catch (error) {
      console.log("Couldn't start the webcam");
      console.error(error);
    }
  };

  const showDetections = (canvas, posePredictions, objectPredictions) => {
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
        const label = prediction.class;
        // console.log(prediction.class)
        ctx.fillStyle = 'red';
        const textWidth = ctx.measureText(label).width;
        const textHeight = parseInt(font, 10);
        ctx.fillRect(x, y, textWidth + 10, textHeight + 5);
        // ctx.fillRect(x, y + height - textHeight - 5, textWidth + 15, textHeight + 20)

        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(label, x, y + textHeight);
        // ctx.fillText(prediction.score.toFixed(2), x + 5, y + height - textHeight)
      });
    }
  };

  const ConcludeFinaldecision = (posePredictions, objectPredictions) => {
    let result = [];

    if (objectPredictions.length > 0 && posePredictions.length > 0) {
      result = true;
    } else {
      result = false;
    }
    setTimeCount(timeCount + 1);
    setDecision([...decision, result]);

    const temp = decision.reduce((obj, value, index, array) => {
      if (obj.hasOwnProperty(value)) {
        obj[value] += 1;
      } else {
        obj[value] = 1;
      }
      return obj;
    }, {});
    console.log(temp);
    if (decision.length === 3) {
      console.log(decision);
      // setDecision([])
      // console.log(decision)

      if (temp.true > 1) {
        setFinalDecision(true);
        console.log(finalDecision);
      } else {
        setFinalDecision(false);
        console.log(finalDecision);
      }
    }
  };
  useInterval(() => {
    console.log(timeCount);
    console.log(decision);
    console.log(canvas1.current);
    console.log(video1.current);
    if (
      modelPose !== null &&
      modelDetect !== null &&
      canvas1.current !== null &&
      video1.current !== null
    ) {
      if (timeCount % 20 === 1) {
        detectFromVideoFrame(video1.current, canvas1);
      } else {
        const ctx = canvas1.current.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(
          video1.current,
          0,
          0,
          ctx.canvas.width,
          ctx.canvas.height,
        );
        setTimeCount(timeCount + 1);
      }
      // setTimeCount(timeCount + 1)
      if (Mutation === true) {
        if (finalDecision === true && decision.length === 3) {
          // existToggleTableMutation({ variables: { email: Mydata.me.email, existToggle: true } })
          console.log('Final decision : true');
          existToggleMutation({
            variables: { email: userEmail, existToggle: true },
          });
          setDecision([]);
          // setFinalDecision([])
        } else if (finalDecision === false) {
          // existToggleTableMutation({ variables: { email: Mydata.me.email, existToggle: false } })
          console.log('Final decision : false');
          existToggleMutation({
            variables: { email: userEmail, existToggle: false },
          });
          setDecision([]);
          // setFinalDecision([])
        }
      }
    }
  }, 5000);

  const Toggle = (toggleValue, togglesetValue, toggleName) => {
    const toggle = () => togglesetValue(!toggleValue);
    return (
      <div>
        {toggleName}
        <button onClick={toggle}>{toggleValue ? 'ON' : 'OFF'}</button>
      </div>
    );
  };
  // const whatNee = () => {
  //   console.log('왔니?');
  // };
  // const donleaveme = () => {
  //   alert('마우스를 화면에 올려 놓으세요!!!');
  //   console.log('날 떠나지마');
  // };

  // useMouseEnter(whatNee);

  // useMouseLeave(donleaveme);

  useEffect(() => {
    LoadCamera();
    LoadModel();
  }, []);

  // if (cameraLoad === false) {
  //   return (
  //     <LoaderWrapper>
  //       <Loader />
  //     </LoaderWrapper>
  //   );
  // } else {
  return (
    <div>
      <div>
        <video ref={video1} playsInline width="1" height="1" autoPlay muted />
        <canvas ref={canvas1} width="480" height="360" />
      </div>
    </div>
  );
  // }
}
