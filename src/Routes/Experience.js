import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
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

//영상처리
let videoDeviceIds = [];

// val : pixel's diff
let normArray = new Array(24).fill(5000);
// 1.personBbox area
let personDecisionArray = new Array(24).fill(0);

let cellphoneDecisionArray = [0, 0, 0, 0, 0, 0]; // 1.true 2.false

// let finalDecisionArray = []; // 1.study 2.none 3.cell phone 4.sleep

let detect_interval = (10000 * 1) / 6;
let mutation_interval = 6;

let decision_size = 6;
let normDecision_size = decision_size * 3;
let personDecision_size = decision_size;
let cellphoneDecision_size = decision_size;
let window_size = decision_size * 5;

const personSizeThreshold = 29999;
const normArrayThreshold_low = 2000;
const normArrayThreshold_midle = 3000;
const normArrayThreshold_high = 10000;

let displayDetectResult = true;
let camera_width = 640;
let camera_height = 480;
let detect_count = 1;
let doDrawResult = false;

let ssd_model = null;
let videoWidth = null;
let videoHeight = null;
let beforeImg = null;

export default () => {
  // 영상 처리 변수
  const [studyBool, setStudyBool] = useState(false);
  const [existTime, setExistTime] = useState(0);
  const [targetTime, setTargetTime] = useState(10);
  // const [finalView, setFinalView] = useState(false);
  const [aniToggle, setAniToggle] = useState(false);

  const startDate = new Date();
  const [chartTitle, setChartTitle] = useState(
    moment(startDate).format('hh:mma') +
      ' ~ ' +
      moment(startDate).add(30, 'minutes').format('hh:mma'),
  );

  const webcamRef = useRef();
  const canvasRef = useRef();

  const onImgSave = () => {
    // const ctx = canvasRef.current.getContext('2d');
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // ctx.drawImage(webcamRef.current, 0, 0, ctx.canvas.width, ctx.canvas.height); //중요함, video를 그냥 넣어주면 최대 크기의 사진이 들어옴
    videoCanvas(webcamRef.current, {
      canvas: canvasRef.current,
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

  ///////////////////////////////////// 학습 판단 코드
  const LoadCamera = async () => {
    console.log('Load camera');
    const getUserMedia = await navigator.mediaDevices.getUserMedia;

    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log('enumerateDevices() not supported.');
      return;
    }

    const deviceIds = await navigator.mediaDevices.enumerateDevices();

    deviceIds.forEach(function (deviceId) {
      if (deviceId.kind === 'videoinput') {
        videoDeviceIds.push(deviceId);
      }
    });

    if (getUserMedia) {
      await navigator.mediaDevices
        .getUserMedia({ video: { deviceId: videoDeviceIds[0].deviceId } })
        .then(function (stream) {
          webcamRef.current.srcObject = stream;
        })
        .catch(function (error) {
          console.log(error);
          console.log('Something went wrong!');
        });
    }
  };

  const Predict = async () => {
    // const posenet_model = await posenet.load({
    //   architecture: "ResNet50",
    //   outputStride: 32,
    //   inputResolution: { width: 257, height: 200 },
    //   quantBytes: 2,
    // })
    ssd_model = await cocoSsd.load({ base: 'mobilenet_v2' });

    videoWidth = webcamRef.current.width;
    videoHeight = webcamRef.current.height;
    beforeImg = tf.zeros([camera_height, camera_width, 3]);
  };

  const drawResult = (
    // pose_result,
    personDetections,
    cellphoneDetections,
    video,
    videoWidth,
    videoHeight,
    canvas,
  ) => {
    const ctx = canvas.current.getContext('2d');
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    if (personDetections !== null && displayDetectResult === true) {
      // console.log(personDetections)
      drawBbox(ctx, personDetections, 'blue');
    }
    if (cellphoneDetections !== null && displayDetectResult === true) {
      // console.log(cellphoneDetections)
      drawBbox(ctx, cellphoneDetections, 'red');
    }
    // if (pose_result !== null) {
    //   console.log(pose_result)
    //   drawPoses(ctx, pose_result, "aqua")
    // }
  };

  const drawBbox = (ctx, objectPredictions, color) => {
    objectPredictions.forEach((prediction) => {
      const font = '20px Arial';
      ctx.font = font;
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.strokeRect(...prediction.bbox);

      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const height = prediction.bbox[3];
      const label = prediction.class;
      // console.log(prediction.class)
      ctx.fillStyle = color;
      const textWidth = ctx.measureText(label).width;
      const textHeight = parseInt(font, 10);
      ctx.fillRect(x, y, textWidth + 10, textHeight + 5);
      // ctx.fillRect(x, y + height - textHeight - 5, textWidth + 15, textHeight + 20)

      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(label, x, y + textHeight);
      // ctx.fillText(prediction.score.toFixed(2), x + 5, y + height - textHeight)
    });
  };

  // const drawPoses = (ctx, posePredictions, color) => {
  //   posePredictions.forEach((poses) => {
  //     ctx.strokeStyle = color
  //     ctx.lineWidth = 4

  //     console.log(poses)
  //     for (var j = 0; j < poses.keypoints.length; j++) {
  //       ctx.strokeRect(poses.keypoints[j].position.x, poses.keypoints[j].position.y, 1, 1)
  //     }
  //   })
  // }

  // let normArray = [] // val : pixel's diff
  // let personDecisionArray=[] // 1.true 2.false
  // let cellphoneDecisionArray=[] // 1.true 2.false

  // let finalDecisionArray=[] // 1.study 2.none 3.cell phone 4.sleep
  const personDecision = (personDetections) => {
    if (personDecisionArray.length >= window_size) {
      personDecisionArray.pop();
    }
    let bbox_area = 0;
    let personBboxArray = [];
    if (personDetections.length > 0) {
      for (var i = 0; i < personDetections.length; i++) {
        bbox_area = personDetections[i].bbox[2] * personDetections[i].bbox[3];
        personBboxArray = [bbox_area, ...personBboxArray];
      }
      personDecisionArray = [
        Math.max(...personBboxArray),
        ...personDecisionArray,
      ];
    } else {
      personDecisionArray = [0, ...personDecisionArray];
    }
    // console.log(personDecisionArray)
  };

  const cellphoneDecision = (cellphoneDetections) => {
    if (cellphoneDecisionArray.length >= window_size) {
      cellphoneDecisionArray.pop();
    }

    let cellphoneDecision = 0;

    if (cellphoneDetections.length > 0) {
      cellphoneDecision = cellphoneDetections.length;
    }
    cellphoneDecisionArray = [cellphoneDecision, ...cellphoneDecisionArray];
    // console.log(cellphoneDecisionArray)
  };

  const ThrowTime = async (existToggle, userStatus) => {
    setStudyBool(existToggle);
    if (existToggle) {
      setExistTime(existTime + 1 / 6);
      if (aniToggle) {
        setAniToggle(false);
      } else {
        setAniToggle(true);
      }
    }
    console.log('throw time!');
  };

  const ConcludeFinalDecision = () => {
    // normArray = [] // val : pixel's diff
    // personDecisionArray = [] // 1.true 2.false
    // cellphoneDecisionArray = [] // 1.true 2.false

    let finalDecision = 0; // 0.study 1.none 2.sleep
    let finalDecisionPerson = true;
    let finalDecisionNorm = true;
    let finalDecisionCellphone = true;

    //person data preprocessing
    let personDecisionArray_decision = personDecisionArray.slice(
      0,
      personDecision_size,
    ); //detect using the data for 2 min

    personDecisionArray_decision = personDecisionArray_decision.filter(
      (Decision) => Decision > personSizeThreshold,
    );

    if (personDecisionArray_decision.length > 1) {
      finalDecisionPerson = true;
    } else {
      finalDecisionPerson = false;
    }

    //norm data preprocessing
    let normArray_decision = normArray.slice(0, normDecision_size); //detect using the data for 2 min

    let normArray_decision_sum = normArray_decision.reduce((a, b) => a + b);
    let normArray_decision_Average =
      normArray_decision_sum / normArray_decision.length;
    // console.log(normArray_decision_Average)
    let normArray_decision_high = normArray_decision.filter(
      (Decision) => Decision > normArrayThreshold_high,
    );

    if (
      normArray_decision_Average > normArrayThreshold_midle ||
      normArray_decision_high.length > 9
    ) {
      finalDecisionNorm = true;
    } else {
      finalDecisionNorm = false;
    }

    //cell phone data preprocessing
    let cellphoneDecisionArray_decision = cellphoneDecisionArray.slice(
      0,
      cellphoneDecision_size,
    ); //detect using the data for 1 min
    let cellphoneDecisionArray_decisionSum = cellphoneDecisionArray_decision.reduce(
      (a, b) => a + b,
    );

    if (cellphoneDecisionArray_decisionSum > 0) {
      finalDecisionCellphone = true;
    } else {
      finalDecisionCellphone = false;
    }

    //final decision
    //   if (finalDecisionPerson === true) {
    //     if (finalDecisionNorm === true) {
    //       if (finalDecisionCellphone === true) {
    //         console.log('phone');
    //         ThrowTime(true, 'phone');
    //       } else if (finalDecisionCellphone === false) {
    //         console.log('study');
    //         ThrowTime(true, 'study');
    //       }
    //     } else if (finalDecisionNorm === false) {
    //       console.log('sleep');
    //       ThrowTime(false, 'sleep');
    //     }
    //   } else if (finalDecisionPerson === false) {
    //     if (finalDecisionNorm === true) {
    //       if (normArray_decision_high.length >= decision_size) {
    //         if (finalDecisionCellphone === true) {
    //           console.log('phone');
    //           ThrowTime(true, 'phone');
    //         } else {
    //           console.log('study');
    //           ThrowTime(true, 'study');
    //         }
    //       } else if (normArray_decision_high.length < decision_size) {
    //         console.log('none');
    //         ThrowTime(false, 'none');
    //       }
    //     } else if (finalDecisionNorm === false) {
    //       console.log('none');
    //       ThrowTime(false, 'none');
    //     }
    //   }

    if (finalDecisionPerson === true) {
      console.log('study');
      ThrowTime(true, 'study');
    } else {
      console.log('none');
      ThrowTime(false, 'none');
    }
  };

  /////////////////////////////////////

  // while (true) {
  useInterval(async () => {
    // await sleep(detect_interval);
    if (ssd_model && webcamRef.current && webcamRef.current.readyState >= 3) {
      const ssd_result = await ssd_model.detect(webcamRef.current);
      // const pose_result = await posenet_model.estimateMultiplePoses(webcamRef.current)
      // console.log(pose_result)
      const personDetections = ssd_result.filter((p) => p.class === 'person');
      // console.log(personDetections)

      const cellphoneDetections = ssd_result.filter(
        (p) => p.class === 'cell phone',
      );
      // console.log(cellphoneDetections)

      let img = tf.browser.fromPixels(webcamRef.current);

      let sub = tf.sub(img, beforeImg);
      let temp = sub.norm(2).sum();
      let norm = await temp.array(1);
      if (norm > 11000) {
        norm = 11000;
      }

      if (normArray.length >= window_size) {
        normArray.pop();
      }

      normArray = [norm, ...normArray];
      sub.dispose();
      temp.dispose();
      beforeImg.dispose();
      // console.log(normArray)
      beforeImg = img;

      if (doDrawResult === true) {
        drawResult(
          // pose_result,
          personDetections,
          cellphoneDetections,
          webcamRef.current,
          videoWidth,
          videoHeight,
          canvasRef,
        );
      }

      personDecision(personDetections);
      cellphoneDecision(cellphoneDetections);

      console.log(detect_count);
      if (detect_count % mutation_interval === 0) {
        ConcludeFinalDecision();
        detect_count = 0;
      }

      // if (imgTensorArray.length === window_size + 1) {
      //   console.log("here")
      //   // console.log(imgTensorArray.length)
      //   await imgTensorArray[window_size].dispose()
      //   imgTensorArray[window_size].print()
      // }
      detect_count = detect_count + 1;

      await tf.nextFrame();
    }
  }, detect_interval);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      LoadCamera();
      Predict();
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
        <VideoBox ref={webcamRef} playsInline autoPlay muted />
        <CanvasBox ref={canvasRef} />
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
          {studyBool ? (
            aniToggle ? (
              <GuideSpan style={{ color: '#0F4C82' }}>
                활동 시간 <CountSpan>&nbsp;추가~!</CountSpan>
              </GuideSpan>
            ) : (
              <GuideSpan style={{ color: '#0F4C82' }}>
                활동 시간 <CountSpan2>&nbsp;추가~!</CountSpan2>
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
