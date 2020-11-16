import React, { useEffect, useRef, useState } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import * as faceapi from "face-api.js"
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
  z-index: 1;
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

//영상처리
let decision = new Array(5).fill(false);
let detection_area = Array.from({ length: 18 }, (_, i) => i + 1);
let finalDecision = 1; //1.공부 2. 부재중 3. 잠
let timeCount = 0;

export default () => {
  // 영상 처리 변수
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
    // ctx.drawImage(video1.current, 0, 0, ctx.canvas.width, ctx.canvas.height); //중요함, video를 그냥 넣어주면 최대 크기의 사진이 들어옴
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

  // const showDetections = (posePredictions, objectPredictions) => {
  //   console.log('Show detect');

  //   // const ctx = canvas.current.getContext('2d');
  //   const font = '20px Arial';
  //   ctx.font = font;
  //   if (poseButton) {
  //     posePredictions.forEach((poses) => {
  //       const area_data = 3;
  //       ctx.strokeStyle = '0F4C81';
  //       ctx.lineWidth = 4;

  //       const area = new Array(area_data);
  //       for (var i = 0; i < area.length; i++) {
  //         area[i] = false;
  //       }
  //       //   const img_width = video.webcamVideoElement.width
  //       const img_width = canvas1.current.width;
  //       ctx.strokeStyle = '#0F4C81';
  //       ctx.lineWidth = 4;
  //       for (var j = 0; j < poses.keypoints.length; j++) {
  //         ctx.strokeRect(
  //           poses.keypoints[j].position.x,
  //           poses.keypoints[j].position.y,
  //           1,
  //           1,
  //         );
  //         area[
  //           Math.floor(
  //             (poses.keypoints[0].position.x / img_width) * area.length,
  //           )
  //         ] = true;
  //       }
  //     });
  //   }
  //   if (detectButton) {
  //     objectPredictions.forEach((prediction) => {
  //       ctx.strokeStyle = '#0F4C81';
  //       ctx.lineWidth = 4;
  //       ctx.strokeRect(...prediction.bbox);

  //       const x = prediction.bbox[0];
  //       const y = prediction.bbox[1];
  //       const height = prediction.bbox[3];
  //       const label = prediction.class;
  //       // console.log(prediction.class)
  //       ctx.fillStyle = '#0F4C81';
  //       const textWidth = ctx.measureText(label).width;
  //       const textHeight = parseInt(font, 10);
  //       ctx.fillRect(x, y, textWidth + 10, textHeight + 5);
  //       // ctx.fillRect(x, y + height - textHeight - 5, textWidth + 15, textHeight + 20)

  //       ctx.fillStyle = '#FFFFFF';
  //       ctx.fillText(label, x, y + textHeight);
  //       // ctx.fillText(prediction.score.toFixed(2), x + 5, y + height - textHeight)
  //     });
  //   }
  // };

  const createPredictionArray = (prediction) => {
    const bbox = prediction.bbox;
    const len_x = bbox[2];
    // const len_y = bbox[3];
    return len_x; //x값을 이용하여 가장 크게 잡힌 객체 감지
  };

  const ConcludeFinaldecision = (posePredictions, objectPredictions) => {
    // 1. 모든 사람 인식 결과를 array 데이터로 변환
    // 2. 가장큰 사람 인식 결과 판단
    // 3. objectPrediction에 판단 결과 저장 1. 공부중 2. 부재중 3. 잠
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
      finalDecision = 1; //공부
      setStudyBool(true);
      if (aniToggle) {
        setAniToggle(false);
      } else {
        setAniToggle(true);
      }
    } else {
      finalDecision = 2; //부재중
      // console.log(finalDecision);
      setStudyBool(false);
    }
  };
  useInterval(async () => {
    if (existTime === 10) {
      alert(
        '스케줄을 완료하여 체험을 종료합니다.\n회원가입 후 더 많은 기능을 경험하세요.',
      );
      window.close();
    }

    // 2초에 한번 판단 결과 저장해서 10초에 한 번 5개 결과가지고 시간 추가
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
        <VideoText>카메라 로딩중...</VideoText>
        <span style={{ color: '#DB4437' }}>
          (로딩 중 조작, 창 닫기 금지!!!)
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
              활동 시간<CountSpan3>&nbsp;추가~!</CountSpan3>
            </GuideSpan>
          ) : studyBool ? (
            aniToggle ? (
              <GuideSpan style={{ color: '#0F4C82' }}>
                사용자 감지 데이터 <CountSpan>&nbsp;추가~!</CountSpan>
              </GuideSpan>
            ) : (
              <GuideSpan style={{ color: '#0F4C82' }}>
                사용자 감지 데이터 <CountSpan2>&nbsp;추가~!</CountSpan2>
              </GuideSpan>
            )
          ) : (
            <GuideSpan style={{ color: '#DB4437' }}>사용자 미감지</GuideSpan>
          )}
        </HeaderDiv>
        <ChartWrap>
          <RowBarWrap>
            <RowBarChart_now
              title1={'영어 (영단어 1~2장 암기)'}
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
