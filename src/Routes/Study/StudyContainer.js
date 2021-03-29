import React, { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import StudyPresenter from './StudyPresenter';
import { ME } from './StudyQueries';
import Loader from '../../Components/Loader';
import todayDateRange from '../../Components/Date/todayDateRange';
import useInput from '../../Hooks/useInput';
import useKey_oneUp from '../../Hooks/useKey_oneUp';
import ChannelService from '../../Components/ChannelService';
import {
  MY_TODOLIST,
  FINISH_TODOLIST,
  DELETE_TODOLIST,
  MY_SUBJECT,
  ADD_TODOLIST,
  EDIT_TODOLIST,
} from '../Tabs/MyStudyTabs/MySchedule/MyScheduleQueries';
import {
  START_SCHEDULE,
  STOP_SCHEDULE,
  PULL_SCHEDULE,
  CUT_SCHEDULE,
  EXTENSION_SCHEDULE,
  EDIT_STUDYSET,
  GO_WITH,
  UPDATE_EXISTTOGGLE,
} from './StudyQueries';
import videoCanvas from 'video-canvas';
import html2canvas from 'html2canvas';
import moment from 'moment';
import useInterval from '../../Hooks/useInterval';

const LoaderWrapper = styled.div`
  margin: 250px 0px;
`;

let videoDevices = [];

// val : pixel's diff
let normArray = new Array(24).fill(5000);
// 1.personBbox area
let personDecisionArray = new Array(24).fill(0);

let cellphoneDecisionArray = [0, 0, 0, 0, 0, 0]; // 1.true 2.false

// let finalDecisionArray = []; // 1.study 2.none 3.cell phone 4.sleep

let detect_interval = 9900 * 1;
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
let detect_count = 5;
let doDrawResult = false;

let ssd_model = null;
let videoWidth = null;
let videoHeight = null;
let beforeImg = null;

export default () => {
  ChannelService.shutdown();

  const canvasRef = useRef();
  const webcamRef = useRef();

  const todolistName = useInput('');
  const todoModiName = useInput('');
  const scheduleTitle = useInput('');

  // const camSelect = useSelect();

  const [todoModiId, setTodoModiId] = useState('');
  const [todoModi, setTodoModi] = useState(false);
  const [studyBool, setStudyBool] = useState(true);
  const [aniBool, setAniBool] = useState(true);
  const [newTodoView, setNewTodoView] = useState(false);
  const [popupView, setPopupView] = useState(false);
  const [onLoading, setOnLoading] = useState(false);
  const [coverView, setCoverView] = useState(false);
  const [timelapse, setTimelapse] = useState(false);
  const [isAm, setIsAm] = useState(new Date().getHours() < 12);
  const [reCount, setReCount] = useState(0);
  const [camEmpty, setCamEmpty] = useState(false);

  // ESC누르면 Popup 꺼지게
  useKey_oneUp('Escape', [popupView], [setPopupView]);

  const [deleteTodolistMutation] = useMutation(DELETE_TODOLIST);
  const [finishTodolistMutation] = useMutation(FINISH_TODOLIST);
  const [editTodolistMutation] = useMutation(EDIT_TODOLIST);
  const [addTodolistMutation] = useMutation(ADD_TODOLIST);
  const [startScheduleMutation] = useMutation(START_SCHEDULE);
  const [stopScheduleMutation] = useMutation(STOP_SCHEDULE);
  const [pullScheduleMutation] = useMutation(PULL_SCHEDULE);
  const [cutScheduleMutation] = useMutation(CUT_SCHEDULE);
  const [extensionScheduleMutation] = useMutation(EXTENSION_SCHEDULE);
  const [editStudySetMutation] = useMutation(EDIT_STUDYSET);
  const [goWithMutation] = useMutation(GO_WITH);
  const [existToggleMutation] = useMutation(UPDATE_EXISTTOGGLE);

  const {
    data: myInfoData,
    loading: myInfoLoading,
    refetch: myInfoRefetch,
    startPolling,
    stopPolling,
    networkStatus,
  } = useQuery(ME, {
    notifyOnNetworkStatusChange: true,
  });
  const {
    data: todolistData,
    loading: todolistLoading,
    refetch: todolistRefetch,
  } = useQuery(MY_TODOLIST);
  const {
    data: subjectData,
    loading: subjectLoading,
    refetch: subjectRefetch,
  } = useQuery(MY_SUBJECT);

  //캡쳐 코드
  const onImgSave = () => {
    // const ctx = canvas1.current.getContext('2d');
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // ctx.drawImage(video1.current, 0, 0, ctx.canvas.width, ctx.canvas.height); //중요함, video를 그냥 넣어주면 최대 크기의 사진이 들어옴
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
    const target = document.querySelector('#capture');
    html2canvas(target, {
      width: target.clientWidth + 20,
      useCORS: true,
      // removeContainer: false,
    }).then((canvas) => {
      // document.body.appendChild(canvas);
      saveAs(
        canvas.toDataURL('image/png'),
        'deeptime_play_' + file_tail + '.png',
      );
    });
    // 팔로워 영역 임시 화면 꺼주기
    setCoverView(false);
    // 주기적으로 캐시 지우기위해 새로고침 30회 마다
    if (reCount === 29) {
      setTimeout(() => window.location.reload(), 1000);
    } else {
      setReCount(reCount + 1);
    }
  };

  ///////////////////////////////////// 학습 판단 코드
  const camSearch = async () => {
    console.log('Cam search');
    // //카메라 권한 요청
    // navigator.mediaDevices.getUserMedia;

    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log('enumerateDevices() not supported.');
      return;
    }

    const deviceIds = await navigator.mediaDevices.enumerateDevices();
    deviceIds.forEach(function (device) {
      if (device.kind === 'videoinput') {
        videoDevices.push(device);
      }
    });
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
    existToggleMutation({
      variables: {
        email: myInfoData.me.email,
        existToggle,
        userStatus,
      },
    });
    setStudyBool(existToggle);
    // 타임랩스용 이미지 저장
    if (timelapse) {
      await setCoverView(true);
      onImgSave();
    }
    console.log('throw time!', existToggle, userStatus);
  };

  const isFirstRun = useRef(true);
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
    if (finalDecisionPerson === true) {
      if (finalDecisionNorm === true) {
        if (finalDecisionCellphone === true) {
          console.log('phone');
          ThrowTime(true, 'phone');
        } else if (finalDecisionCellphone === false) {
          console.log('study');
          ThrowTime(true, 'study');
        }
      } else if (finalDecisionNorm === false) {
        console.log('sleep');
        ThrowTime(false, 'sleep');
      }
    } else if (finalDecisionPerson === false) {
      if (finalDecisionNorm === true) {
        if (normArray_decision_high.length >= decision_size) {
          if (finalDecisionCellphone === true) {
            console.log('phone');
            ThrowTime(true, 'phone');
          } else {
            console.log('study');
            ThrowTime(true, 'study');
          }
        } else if (normArray_decision_high.length < decision_size) {
          console.log('none');
          ThrowTime(false, 'none');
        }
      } else if (finalDecisionNorm === false) {
        console.log('none');
        ThrowTime(false, 'none');
      }
    }
    if (isFirstRun.current) {
      setAniBool(false);
      isFirstRun.current = false;
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

  // Today 도넛 차트 am pm 자동 전환
  useEffect(() => {
    const nowDate = new Date();
    const { startDate, endDate } = todayDateRange(nowDate);
    if (isAm) {
      //43200000 12시간
      const restTime = startDate.getTime() + 43200000 - nowDate.getTime();
      const setTime = isFirstRun.current ? restTime : 43200000;
      setTimeout(() => {
        setIsAm(false);
      }, setTime);
    } else {
      const restTime = endDate.getTime() - nowDate.getTime();
      const setTime = isFirstRun.current ? restTime : 43200000;
      setTimeout(() => {
        setIsAm(true);
      }, setTime);
    }
  }, [isAm]);

  const isFirstRun2 = useRef(true);
  useEffect(() => {
    if (isFirstRun2.current) {
      camSearch();
      isFirstRun2.current = false;
      return;
    }
  }, []);

  if (networkStatus === 1 || todolistLoading || subjectLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  } else {
    return (
      <StudyPresenter
        myInfoData={myInfoData.me}
        networkStatus={networkStatus}
        myInfoRefetch={myInfoRefetch}
        studyBool={studyBool}
        setStudyBool={setStudyBool}
        todolistData={todolistData.myTodolist}
        todolistRefetch={todolistRefetch}
        subjectData={subjectData.mySubject}
        subjectRefetch={subjectRefetch}
        deleteTodolistMutation={deleteTodolistMutation}
        finishTodolistMutation={finishTodolistMutation}
        editTodolistMutation={editTodolistMutation}
        addTodolistMutation={addTodolistMutation}
        startScheduleMutation={startScheduleMutation}
        stopScheduleMutation={stopScheduleMutation}
        pullScheduleMutation={pullScheduleMutation}
        cutScheduleMutation={cutScheduleMutation}
        extensionScheduleMutation={extensionScheduleMutation}
        editStudySetMutation={editStudySetMutation}
        todolistName={todolistName}
        newTodoView={newTodoView}
        setNewTodoView={setNewTodoView}
        scheduleTitle={scheduleTitle}
        startPolling={startPolling}
        stopPolling={stopPolling}
        popupView={popupView}
        setPopupView={setPopupView}
        goWithMutation={goWithMutation}
        onLoading={onLoading}
        setOnLoading={setOnLoading}
        coverView={coverView}
        setCoverView={setCoverView}
        reCount={reCount}
        setReCount={setReCount}
        isAm={isAm}
        setIsAm={setIsAm}
        aniBool={aniBool}
        setAniBool={setAniBool}
        canvasRef={canvasRef}
        webcamRef={webcamRef}
        Predict={Predict}
        timelapse={timelapse}
        setTimelapse={setTimelapse}
        onImgSave={onImgSave}
        camEmpty={camEmpty}
        setCamEmpty={setCamEmpty}
        videoDevices={videoDevices}
        todoModi={todoModi}
        setTodoModi={setTodoModi}
        todoModiName={todoModiName}
        todoModiId={todoModiId}
        setTodoModiId={setTodoModiId}
      />
    );
  }
};
