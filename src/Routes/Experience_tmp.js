import React, { useEffect, useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import styled, { keyframes } from 'styled-components';
import useInterval from '../Hooks/useInterval';
import videoCanvas from 'video-canvas';
import { Study_true, Study_false } from '../Components/Icons';
import moment from 'moment';
import html2canvas from 'html2canvas';
import { Button_capture } from '../Components/Buttons/Button_click';
import RowBarChart_now from '../Components/Charts/RowBarChart_now';
import Loader from '../Components/Loader';

import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

const Wrapper = styled.div`
  display: flex;
  width: 960px;
  height: 380px;
  margin: 20px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const VideoBox = styled.video`
  position: absolute;
  z-index: 2;
  width: 450px;
  height: 340px;
  border-radius: ${(props) => props.theme.borderRadius};
`;

const CanvasBox = styled.canvas`
  position: absolute;
  z-index: 2;
  width: 450px;
  height: 340px;
  border-radius: ${(props) => props.theme.borderRadius};
`;

const VideoWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 470px;
  height: 360px;
  margin: 10px 0 10px 10px;
  padding: 10px 10px 10px 10px;
  font-size: 16px;
  font-weight: 600;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const VideoText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 10px 0;
`;

const GraphDiv = styled.div`
  width: 480px;
  height: 360px;
  padding: 10px;
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 60px;
  width: 100%;
  margin-bottom: 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  &:nth-child(2) {
    justify-content: center;
  }
`;

const ChartWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 220px;
  margin-bottom: 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const RowBarWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
`;

const AvatarDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 0 15px;
`;

const SetDiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0 15px 0 0;
`;

const StatusSpan = styled.span`
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
`;

const GuideSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
`;

const jumpKey = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
`;

const CountSpan = styled.span`
  animation: ${jumpKey} 0.5s ease-in 1;
`;

const CountSpan2 = styled(CountSpan)``;
const CountSpan3 = styled(CountSpan)``;

//????????????


export default () => {
  // ?????? ?????? ??????
  const [modelPose, setModelPose] = useState(null);
  const [modelDetect, setModelDetect] = useState(null);
  const [studyBool, setStudyBool] = useState(false);
  const [existTime, setExistTime] = useState(0);
  const [targetTime, setTargetTime] = useState(10);
  const [finalView, setFinalView] = useState(false);
  const [aniToggle, setAniToggle] = useState(false);

  const startDate = new Date();
  const [chartTitle, setChartTitle] = useState(
    moment(startDate).format('hh:mma') +
      ' ~ ' +
      moment(startDate).add(30, 'minutes').format('hh:mma'),
  );

  const video1 = useRef();
  const canvas1 = useRef();

  const onImgSave = () => {
    // const ctx = canvas1.current.getContext('2d');
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // ctx.drawImage(video1.current, 0, 0, ctx.canvas.width, ctx.canvas.height); //?????????, video??? ?????? ???????????? ?????? ????????? ????????? ?????????
    videoCanvas(video1.current, {
      canvas: canvas1.current,
    });

    const saveAs = (uri, filename) => {
      var link = document.createElement('a');
      if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.open(uri);
      }
    };

    const now_Date = new Date();
    const file_tail = moment(now_Date).format('YYMMDD_HHmmss');
    html2canvas(document.querySelector('#capture')).then((canvas) => {
      // document.body.appendChild(canvas);
      saveAs(
        canvas.toDataURL('image/png'),
        'deeptime_play_' + file_tail + '.png',
      );
    });
  };

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
      navigator.mediaDevices.getUserMedia ||
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

  const detectFromVideoFrame = async (video) => {
    try {
      const posePredictions = await modelPose.estimateMultiplePoses(video, {
        flipHorizontal: false,
        maxDetections: 1,
        minPoseConfidence: 0.15,
        minPartConfidence: 0.1,
        scoreThreshold: 0.5,
        nmsRadius: 30,
      });

      const objectPredictions = await modelDetect.detect(video);
      const personDetections = objectPredictions.filter(
        (p) => p.class === 'person',
      );

      // showDetections(posePredictions, personDetections);
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

  const createPredictionArray = (prediction) => {
    const bbox = prediction.bbox;
    const len_x = bbox[2];
    // const len_y = bbox[3];
    return len_x; //x?????? ???????????? ?????? ?????? ?????? ?????? ??????
  };

  const ConcludeFinaldecision = (posePredictions, objectPredictions) => {
    // 1. ?????? ?????? ?????? ????????? array ???????????? ??????
    // 2. ????????? ?????? ?????? ?????? ??????
    // 3. objectPrediction??? ?????? ?????? ?????? 1. ????????? 2. ????????? 3. ???
    let result = [];
    let maxBboxArea = 100000;
    if (objectPredictions.length > 0) {
      const temp = objectPredictions.map(createPredictionArray);
      const maxObject = objectPredictions[temp.indexOf(Math.max(...temp))];
      maxBboxArea = maxObject.bbox[2] * maxObject.bbox[3];
      // console.log(maxBboxArea);
      detection_area = detection_area.slice(1);
      detection_area = [...detection_area, maxBboxArea];
    }
    if (
      objectPredictions.length > 0 &&
      posePredictions.length > 0 &&
      maxBboxArea > 90000
    ) {
      result = true;
    } else {
      result = false;
    }

    decision = decision.slice(1);
    decision = [...decision, result];

    const temp = decision.reduce((obj, value, index, array) => {
      if (obj.hasOwnProperty(value)) {
        obj[value] += 1;
      } else {
        obj[value] = 1;
      }
      return obj;
    }, {});

    if (temp.true > 2) {
      finalDecision = 1; //??????
      setStudyBool(true);
      if (aniToggle) {
        setAniToggle(false);
      } else {
        setAniToggle(true);
      }
    } else {
      finalDecision = 2; //?????????
      // console.log(finalDecision);
      setStudyBool(false);
    }
  };
  useInterval(async () => {
    if (existTime === 10) {
      alert(
        '???????????? ???????????? ????????? ???????????????.\n???????????? ??? ??? ?????? ????????? ???????????????.',
      );
      window.close();
    }

    // 2?????? ?????? ?????? ?????? ???????????? 10?????? ??? ??? 5??? ??????????????? ?????? ??????
    if (modelPose !== null && modelDetect !== null) {
      timeCount = timeCount + 1;
      if (timeCount % 2 === 0) {
        await detectFromVideoFrame(video1.current);
        // console.log(timeCount);
      }
      if (timeCount % 10 === 2) {
        setFinalView(false);
      }

      if (timeCount % 10 === 0) {
        if (finalDecision === 1) {
          // console.log('Final decision : true');
          setExistTime(existTime + 1 / 6);
          setFinalView(true);
        } else if (finalDecision === 2) {
          // console.log('Final decision : false');
        }
      }
    }
  }, 1000);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      LoadCamera();
      LoadModel();
      isFirstRun.current = false;
      return;
    }
  }, []);

  return (
    <Wrapper id="capture">
      <VideoWrap>
        <Loader />
        <br />
        <VideoText>????????? ?????????...</VideoText>
        <span style={{ color: '#DB4437' }}>
          (?????? ??? ??????, ??? ?????? ??????!!!)
        </span>
        <VideoBox ref={video1} playsInline autoPlay muted />
        <CanvasBox ref={canvas1} />
      </VideoWrap>
      <GraphDiv>
        <HeaderDiv>
          <AvatarDiv>
            {studyBool ? (
              <>
                <Study_true />
                <StatusSpan>Deep Time</StatusSpan>
              </>
            ) : (
              <>
                <Study_false />
                <StatusSpan>Where are you...?</StatusSpan>
              </>
            )}
          </AvatarDiv>
          <SetDiv>
            <Button_capture
              onClick={() => {
                onImgSave();
              }}
              margin={'0'}
            />
          </SetDiv>
        </HeaderDiv>
        <HeaderDiv>
          {finalView ? (
            <GuideSpan style={{ color: '#0F4C82' }}>
              ?????? ??????<CountSpan3>&nbsp;??????~!</CountSpan3>
            </GuideSpan>
          ) : studyBool ? (
            aniToggle ? (
              <GuideSpan style={{ color: '#0F4C82' }}>
                ????????? ?????? ????????? <CountSpan>&nbsp;??????~!</CountSpan>
              </GuideSpan>
            ) : (
              <GuideSpan style={{ color: '#0F4C82' }}>
                ????????? ?????? ????????? <CountSpan2>&nbsp;??????~!</CountSpan2>
              </GuideSpan>
            )
          ) : (
            <GuideSpan style={{ color: '#DB4437' }}>????????? ?????????</GuideSpan>
          )}
        </HeaderDiv>
        <ChartWrap>
          <RowBarWrap>
            <RowBarChart_now
              title1={'?????? (????????? 1~2??? ??????)'}
              title2={chartTitle}
              data_1={existTime}
              data_2={targetTime - existTime}
              scheduleColor={'rgba(123, 169, 235, 1)'}
            />
          </RowBarWrap>
        </ChartWrap>
      </GraphDiv>
    </Wrapper>
  );
};
