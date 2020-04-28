import React, { useEffect, useRef, useState, createRef, forwardRef } from "react"
import * as posenet from "@tensorflow-models/posenet"
import * as cocoSsd from "@tensorflow-models/coco-ssd"
// import * as faceapi from "face-api.js"
import { useMutation } from "react-apollo-hooks"
import gql from "graphql-tag"
import Loader from "../../Components/Loader"
import styled from "styled-components"
// import LoadCamera from "../Components/LoadCamera/LoadCamera"
import useInterval from "../../Hooks/useInterval"
// const UPDATE_EXISTTOGGLETABLE = gql`
//   mutation update_existToggleTable($email: String!, $existToggle: Boolean!) {
//     update_existToggleTable(email: $email, existToggle: $existToggle)
//   }
// `

//아래 내가했떤거
import Select from "../../Components/Select"
import Avatar from "../../Components/Avatar"
import AreaChart from "../../Components/Charts/AreaChart"
// import RowBarChart from "../../Components/Charts/RowBarChart"
import DonutChart from "../../Components/Charts/DonutChart"
import twoArraySum from "../../Components/twoArraySum"
import GaugeChart from "react-gauge-chart"
import SumArray from "../../Components/Array/SumArray"
import SplitArray from "../../Components/Array/SplitArray"
import ReactTooltip from "react-tooltip"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"

//위에 내가했던거

const UPDATE_EXISTTOGGLE = gql`
  mutation update_existToggle($email: String!, $existToggle: Boolean!) {
    update_existToggle(email: $email, existToggle: $existToggle)
  }
`

//아래부터 익스포트 전까지 다 내가했던거

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`

const BigBox = styled.div`
  background-color: white;
  &:first-child {
    border: ${(props) => props.theme.boxBorder};
    border-radius: ${(props) => props.theme.borderRadius};
    width: 70%;
    height: 1095px;
  }
  &:last-child {
    background-color: ${(props) => props.theme.bgColor};
    width: 30%;
    height: 1095px;
  }
`

const Title = styled.div`
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  padding: 10px 20px;
  width: 100%;
  height: 70px;
`

const TitleGraph = styled.div`
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`

const TitleGraphWrap = styled.div`
  height: 100%;
  width: 80%;
`

const ClassSelect = styled.div`
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  width: 100%;
  height: 30px;
`

const StudentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  padding: 5px 5px;
  width: 100%;
  height: 895px;
`

const ClassName = styled.div`
  display: flex;
  align-items: center;
  height: 50%;
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => props.theme.darkGreyColor};
  &:last-child {
    flex-direction: row-reverse;
    font-size: 20px;
    color: black;
  }
`

const StudentList = styled.div`
  display: flex;
  align-items: center;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  width: 100%;
  height: 50px;
  &:not(:first-child) {
    margin-top: 5px;
  }
`

const SmallToggleRed = styled.div`
  border: 0;
  border-radius: 5px;
  background-color: red;
  height: 10px;
  width: 40px;
  margin: 5px 5px;
`

const SmallToggleBlue = styled.div`
  border: 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.classicBlue};
  height: 10px;
  width: 40px;
  margin: 5px 5px;
`

const ToggleRed = styled.div`
  border: 0;
  border-radius: 5px;
  background-color: red;
  height: 40px;
  width: 10px;
  margin: 5px 5px;
`

const ToggleBlue = styled.div`
  border: 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.classicBlue};
  height: 40px;
  width: 10px;
  margin: 5px 5px;
`

const AvatarWrap = styled.div`
  margin-left: 5px;
  height: 40px;
`

const StudentName = styled.div`
  width: 90px;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  margin-left: 10px;
`

const ListColumn = styled.div`
  border: 0;
  border-radius: 15px;
  margin-left: 10px;
  width: 80px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.darkGreyColor};
  font-weight: 600;
  background-color: ${(props) => props.theme.bgColor};
`

const LightBio = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const StatisRow = styled.div`
  width: 634.5px;
  margin: 10px 10px 0px 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: relative; */

  &:first-child {
    height: 50px;
  }
  &:nth-child(2) {
    height: 50px;
  }
  &:nth-child(3) {
    height: 310px;
  }
  &:nth-child(4) {
    height: 310px;
  }
  &:last-child {
    position: relative;
    height: 310px;
    margin-bottom: 10px;
  }
`

const ChartWrap = styled.div`
  width: 570px;
  height: 280px;
`

const DonutChartValue = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  font-size: 30px;
  font-weight: 600;
  padding-top: 163px;
`

const ClassButton = styled.button`
  width: 100px;
  border: 0;
  outline-color: black;
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 600;
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 60px;
  }
`

const GaugeChart_2 = styled(GaugeChart)`
  font-weight: 600;
`

const TitleGraphText = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  text-align: left;
  font-size: 17px;
  font-weight: 600;
  padding: 30px 0px 0px 20px;
`
const TitleGraphText_2 = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  text-align: left;
  font-size: 17px;
  font-weight: 600;
  padding: 50px 0px 0px 20px;
`

const DatePickButton = styled.button`
  border: 0;
  outline-color: black;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.classicBlue};
  font-weight: 600;
  color: white;
  text-align: center;
  padding: 7px 10px;
  font-size: 14px;
  cursor: pointer;
`

const StudentTooltip = styled.span`
  line-height: 1.5;
`

let taskArray = new Array(24).fill(0)
// let taskArray_schedule = []
// let taskArray_scheduleT = []
// let schedule_label = []
// let scheduleList_selectDay = []
const tmpTime = { existTime: 0, targetTime: 0, time_24: new Array(288).fill(0) }
let total_targetTime = 0
let total_existTime = 0
let donutData_1 = 0
let donutData_2 = 0
let donutPercent = 0
let countToggle = 0
let gaugePercent = 0
// let scheduleList_selectDay_length = 0

export default ({
  Mydata,
  myClassList,
  selectClass,
  loginPosition,
  StaTabs,
  selectDate,
  setSelectDate,
  studentData,
  studentRefetch,
  networkStatus,
}) => {
  console.log(Mydata)

  const [modelPose, setModelPose] = useState(null)
  const [modelDetect, setModelDetect] = useState(null)
  // const [modelFace, setModelFace] = useState(null)
  // const [modelFaceMatcher, setModelFaceMatcher] = useState(null)
  const [detectButton, setDetectbutton] = useState(true)
  const [poseButton, setPosebutton] = useState(true)
  // const [faceButton, setFacebutton] = useState(true)
  const [decision, setDecision] = useState([true])
  const [finalDecision, setFinalDecision] = useState(true)
  const [Mutation, setMutation] = useState(true)

  const [timeCount, setTimeCount] = useState(0)
  const [camearLoad, setCameraLoad] = useState(false)
  const [modelLoad, setModelLoad] = useState(false)

  const video1 = useRef()
  const canvas1 = createRef()

  // once
  // 1. LoadModel
  useEffect(() => {
    LoadCamera()
    LoadModel()
  }, [])

  const existToggleMutation = useMutation(UPDATE_EXISTTOGGLE)

  const LoadModel = async () => {
    console.log("Load model")

    const loadedModelPose = await posenet.load()
    const loadedModelDetect = await cocoSsd.load({ base: "mobilenet_v2" })
    setModelPose(loadedModelPose)
    setModelDetect(loadedModelDetect)
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

    deviceIds.forEach(function (deviceId) {
      if (deviceId.kind === "videoinput") {
        videoDeviceIds.push(deviceId)
      }
    })

    for (let i = 0; i < 1; i++) {
      if (getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { deviceId: videoDeviceIds[i].deviceId } })
          .then(function (stream) {
            video1.current.srcObject = stream
          })
          .catch(function (error) {
            console.log(error)
            console.log("Something went wrong!")
          })
      }
    }
    setCameraLoad(true)
  }

  const detectFromVideoFrame = async (video, canvas) => {
    try {
      console.log(timeCount)
      const ctx = canvas.current.getContext("2d")
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.drawImage(video, 0, 0, ctx.canvas.width, ctx.canvas.height) //중요함, video를 그냥 넣어주면 최대 크기의 사진이 들어옴

      // if (poseButton) {

      const posePredictions = await modelPose.estimateMultiplePoses(canvas.current, {
        flipHorizontal: false,
        maxDetections: 1,
        minPoseConfidence: 0.15,
        minPartConfidence: 0.1,
        scoreThreshold: 0.5,
        nmsRadius: 30,
      })

      const objectPredictions = await modelDetect.detect(canvas.current)
      const personDetections = objectPredictions.filter((p) => p.class === "person")

      showDetections(canvas, posePredictions, personDetections)
      const Finaldecision = await ConcludeFinaldecision(posePredictions, personDetections)
      return Finaldecision
    } catch (error) {
      console.log("Couldn't start the webcam")
      console.error(error)
    }
  }

  const showDetections = (canvas, posePredictions, objectPredictions) => {
    console.log("Show detect")

    const ctx = canvas.current.getContext("2d")
    const font = "20px Arial"
    ctx.font = font
    if (poseButton) {
      posePredictions.forEach((poses) => {
        const area_data = 3
        ctx.strokeStyle = "red"
        ctx.lineWidth = 4

        const area = new Array(area_data)
        for (var i = 0; i < area.length; i++) {
          area[i] = false
        }
        //   const img_width = video.webcamVideoElement.width
        const img_width = canvas.current.width
        ctx.strokeStyle = "#00FFFF"
        ctx.lineWidth = 4
        for (var j = 0; j < poses.keypoints.length; j++) {
          ctx.strokeRect(poses.keypoints[j].position.x, poses.keypoints[j].position.y, 1, 1)
          area[Math.floor((poses.keypoints[0].position.x / img_width) * area.length)] = true
        }
      })
    }
    if (detectButton) {
      objectPredictions.forEach((prediction) => {
        ctx.strokeStyle = "red"
        ctx.lineWidth = 4
        ctx.strokeRect(...prediction.bbox)

        const x = prediction.bbox[0]
        const y = prediction.bbox[1]
        const height = prediction.bbox[3]
        const label = prediction.class
        // console.log(prediction.class)
        ctx.fillStyle = "red"
        const textWidth = ctx.measureText(label).width
        const textHeight = parseInt(font, 10)
        ctx.fillRect(x, y, textWidth + 10, textHeight + 5)
        // ctx.fillRect(x, y + height - textHeight - 5, textWidth + 15, textHeight + 20)

        ctx.fillStyle = "#FFFFFF"
        ctx.fillText(label, x, y + textHeight)
        // ctx.fillText(prediction.score.toFixed(2), x + 5, y + height - textHeight)
      })
    }
  }

  const ConcludeFinaldecision = (posePredictions, objectPredictions) => {
    let result = []

    if (objectPredictions.length > 0 && posePredictions.length > 0) {
      result = true
    } else {
      result = false
    }
    setTimeCount(timeCount + 1)
    setDecision([...decision, result])

    const temp = decision.reduce((obj, value, index, array) => {
      if (obj.hasOwnProperty(value)) {
        obj[value] += 1
      } else {
        obj[value] = 1
      }
      return obj
    }, {})
    console.log(temp)
    if (decision.length === 5) {
      console.log(decision)
      // setDecision([])
      // console.log(decision)

      if (temp.true > 2) {
        setFinalDecision(true)
        console.log(finalDecision)
      } else {
        setFinalDecision(false)
        console.log(finalDecision)
      }
    }
  }
  useInterval(() => {
    console.log(timeCount)
    console.log(decision)

    if (modelPose !== null && modelDetect !== null && canvas1.current !== null) {
      if (timeCount % 6 === 1) {
        console.log("a", video1, canvas1)
        detectFromVideoFrame(video1.current, canvas1)
      } else {
        setTimeCount(timeCount + 1)
      }
      console.log("b", video1, canvas1, Mutation)
      // setTimeCount(timeCount + 1)
      if (Mutation === true) {
        if (finalDecision === true && decision.length === 5) {
          // existToggleTableMutation({ variables: { email: Mydata.me.email, existToggle: true } })
          console.log("Final decision : true")
          existToggleMutation({ variables: { email: Mydata.me.email, existToggle: true } })
          setDecision([])
          // setFinalDecision([])
        } else if (finalDecision === false) {
          // existToggleTableMutation({ variables: { email: Mydata.me.email, existToggle: false } })
          console.log("Final decision : false")
          existToggleMutation({ variables: { email: Mydata.me.email, existToggle: false } })
          setDecision([])
          // setFinalDecision([])
        }
      }
    }
  }, 2000)

  const Toggle = (toggleValue, togglesetValue, toggleName) => {
    const toggle = () => togglesetValue(!toggleValue)
    return (
      <div>
        {toggleName}
        <button onClick={toggle}>{toggleValue ? "ON" : "OFF"}</button>
      </div>
    )
  }

  // 여기부터 가져온거

  // const todaySchedule_calculate = () => {
  //   scheduleList_selectDay = []
  //   schedule_label = []
  //   if (scheduleList && scheduleLoading === false) {
  //     for (let i = 0; i < scheduleList.length; i++) {
  //       const startYear = new Date(scheduleList[i].start).getFullYear()
  //       const startMonth = new Date(scheduleList[i].start).getMonth()
  //       const startDate = new Date(scheduleList[i].start).getDate()
  //       if (
  //         startYear === selectDate.getFullYear() &&
  //         startMonth === selectDate.getMonth() &&
  //         startDate === selectDate.getDate()
  //       ) {
  //         scheduleList_selectDay.push(scheduleList[i])
  //         schedule_label.push(scheduleList[i].title)
  //       }
  //     }
  //     scheduleList_selectDay_length = scheduleList_selectDay.length
  //   }
  // }

  const graph_calculate = () => {
    // 초기화
    taskArray = new Array(24).fill(0)
    // taskArray_schedule = new Array(scheduleList_selectDay_length).fill(0)
    // taskArray_scheduleT = new Array(scheduleList_selectDay_length).fill(0)
    total_targetTime = 0
    total_existTime = 0
    donutData_1 = 0
    donutData_2 = 0
    donutPercent = 0
    gaugePercent = 0
    if (
      networkStatus === 7 &&
      studentData?.studentOfClass
      // &&
      // scheduleList &&
      // scheduleLoading === false
    ) {
      countToggle = 0
      for (let i = 0; i < studentData.studentOfClass.length; i++) {
        // 오늘 생선된 시간이 있는 인덱스 구하기
        let indexOfToday = studentData.studentOfClass[i].times.findIndex(
          (i) =>
            new Date(i.createdAt).getFullYear() == selectDate.getFullYear() &&
            new Date(i.createdAt).getMonth() == selectDate.getMonth() &&
            new Date(i.createdAt).getDate() == selectDate.getDate()
        )
        // today Time 없을 경우 값이 0인 Time 추가해주기
        if (indexOfToday === -1) {
          studentData.studentOfClass[i].times.push(tmpTime)
          indexOfToday = studentData.studentOfClass[i].times.length - 1
        }
        const todayTime = studentData.studentOfClass[i].times[indexOfToday]

        // AreaChart 계산
        const arrayBox = SplitArray(todayTime.time_24, 12)
        let resultArray = []
        for (let j = 0; j < 24; j++) {
          resultArray.push(SumArray(arrayBox[j]))
        }
        taskArray = twoArraySum(taskArray, resultArray)
        // 스케줄 별 그래프 계산
        // let resultArray_schedule = [] // exist 타임 용
        // let resultArray_scheduleT = [] // 타겟타임용
        // for (let j = 0; j < scheduleList_selectDay_length; j++) {
        //   const totalMin_start =
        //     new Date(scheduleList_selectDay[j].start).getHours() * 60 +
        //     new Date(scheduleList_selectDay[j].start).getMinutes()
        //   const totalMin_end =
        //     new Date(scheduleList_selectDay[j].end).getHours() * 60 +
        //     new Date(scheduleList_selectDay[j].end).getMinutes()
        //   const indexMin_start = totalMin_start / 5
        //   const indexMin_end = totalMin_end / 5
        //   const slicedTime = todayTime.time_24.slice(indexMin_start, indexMin_end)
        //   resultArray_schedule.push(SumArray(slicedTime))
        //   // 타겟타임은 학생마다 더할필요 없고 한번만 실행하면됨
        //   if (i === 0) {
        //     resultArray_scheduleT.push(totalMin_end - totalMin_start)
        //   }
        // }
        // taskArray_schedule = twoArraySum(taskArray_schedule, resultArray_schedule)
        // // 타겟타임은 학생마다 더할필요 없고 한번만 실행하면됨
        // if (i === 0) {
        //   taskArray_scheduleT = twoArraySum(taskArray_scheduleT, resultArray_scheduleT)
        // }
        // 도넛차트 계산
        total_targetTime = total_targetTime + todayTime.targetTime
        total_existTime = total_existTime + todayTime.existTime
        // 토글개수(현재 있는 사람) 계산
        if (studentData.studentOfClass[i].existToggle === true) {
          countToggle = countToggle + 1
        }

        if (i === studentData.studentOfClass.length - 1) {
          // AreaChart 계산
          taskArray.forEach(function (item, index) {
            taskArray[index] = item / 60
          })
          // 스케줄 그래프 계산
          // if (taskArray_schedule !== []) {
          //   taskArray_schedule.forEach(function (item, index) {
          //     taskArray_schedule[index] = item / 60
          //   })
          // }
          // 도넛차트 계산
          donutData_1 = total_existTime
          donutData_2 = total_targetTime - total_existTime
          donutPercent = ((total_existTime / total_targetTime) * 100).toFixed(1)
          if (total_targetTime === 0) {
            donutData_2 = 1
            donutPercent = 0
          }
          // 게이지 퍼센트 계산
          gaugePercent = countToggle / studentData.studentOfClass.length
          if (studentData.studentOfClass.length === 0) {
            gaugePercent = 0
          }
        }
      }
    }
  }

  if (networkStatus === 7) {
    // todaySchedule_calculate()
    graph_calculate()
  }

  const CustomInput = forwardRef(({ value, onClick }, ref) => {
    return (
      <DatePickButton ref={ref} onClick={onClick}>
        {value} (Click)
      </DatePickButton>
    )
  })

  // const isFirstRun = useRef(true)
  // useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false
  //     return
  //   }
  //   console.log("Aa")
  //   studentRefetch()
  // }, [])

  if (camearLoad === false) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    )
  } else {
    return (
      <Wrapper>
        <BigBox>
          {/* {6 <= networkStatus <= 7 && studentData?.studentOfClass ? (
             &&
            scheduleList &&
            scheduleLoading === false */}
          <>
            <StatisRow>
              <DatePicker
                selected={selectDate}
                onChange={(date) => setSelectDate(date)}
                customInput={<CustomInput />}
              />
            </StatisRow>
            <StatisRow>
              {StaTabs.content.map((section, index) => (
                <ClassButton key={index} onClick={() => StaTabs.changeItem(index)}>
                  {section}
                </ClassButton>
              ))}
            </StatisRow>
            {StaTabs.currentIndex === 0 && (
              <>
                <StatisRow>
                  <ChartWrap>
                    {/* <RowBarChart
                      data_1={taskArray_schedule}
                      data_2={taskArray_scheduleT}
                      labels={schedule_label}
                    /> */}
                    <div>
                      <div>IAM AI 판단 결과</div>
                      {/* {(detectButton, poseButton)}
        {Toggle(detectButton, setDetectbutton, "Detection")}
        {Toggle(poseButton, setPosebutton, "Pose")}
        <div>데이터 전송</div>
        {Toggle(Mutation, setMutation, "Mutation")} */}
                      <div>
                        <video ref={video1} playsInline width="280" height="210" autoPlay muted />
                        <canvas ref={canvas1} width="280" height="210" />
                      </div>
                    </div>
                  </ChartWrap>
                </StatisRow>
                {6 <= networkStatus <= 7 && studentData?.studentOfClass ? (
                  <>
                    <StatisRow>
                      <ChartWrap>
                        <AreaChart data_1={taskArray} />
                      </ChartWrap>
                    </StatisRow>
                    <StatisRow>
                      <ChartWrap>
                        <DonutChart data_1={donutData_1} data_2={donutData_2} />
                      </ChartWrap>
                      <DonutChartValue>{donutPercent}%</DonutChartValue>
                    </StatisRow>
                  </>
                ) : (
                  <LoaderWrapper>
                    <Loader />
                  </LoaderWrapper>
                )}
              </>
            )}
            {StaTabs.currentIndex === 1 && (
              <>
                <StatisRow>준비중...</StatisRow>
                <StatisRow>준비중...</StatisRow>
                <StatisRow>준비중...</StatisRow>
              </>
            )}
            {StaTabs.currentIndex === 2 && (
              <>
                <StatisRow>준비중...</StatisRow>
                <StatisRow>준비중...</StatisRow>
                <StatisRow>준비중...</StatisRow>
              </>
            )}
          </>
          )
        </BigBox>
        <BigBox>
          <Title>
            {loginPosition === "manager_school" && <ClassName>{selectClass.school.name}</ClassName>}
            {loginPosition === "manager_academy" && (
              <ClassName>{selectClass.academy.name}</ClassName>
            )}
            {loginPosition === "manager_readingRoom" && (
              <ClassName>{selectClass.readingRoom.name}</ClassName>
            )}
            <ClassName>{selectClass.name}</ClassName>
          </Title>
          <TitleGraph>
            <TitleGraphWrap>
              <GaugeChart_2
                id="gauge-chart1"
                nrOfLevels={20}
                percent={gaugePercent}
                textColor={"black"}
                colors={["red", "#0F4C82"]}
              />
            </TitleGraphWrap>
            <TitleGraphText>참석률</TitleGraphText>
            <TitleGraphText_2>
              {countToggle}/{studentData?.studentOfClass?.length}
            </TitleGraphText_2>
          </TitleGraph>
          <ClassSelect>
            <Select {...myClassList} />
          </ClassSelect>
          <StudentBox>
            <LightBio>
              <SmallToggleBlue />: 학습 중 　 <SmallToggleRed />: 자리 비움
            </LightBio>
            {6 <= networkStatus <= 7 && studentData?.studentOfClass ? (
              studentData.studentOfClass.map((student, index) => (
                <StudentList key={index}>
                  {student.existToggle === true && <ToggleBlue />}
                  {student.existToggle === false && <ToggleRed />}
                  <AvatarWrap>
                    <Avatar size="sm2" url={student.avatar} />
                  </AvatarWrap>
                  <StudentName>{student.fullName}</StudentName>
                  {student.todayTime.attendanceStatus === "조퇴" ? (
                    <ListColumn data-tip data-for="absence">
                      {student.todayTime.attendanceStatus}
                      <ReactTooltip id="absence">
                        <StudentTooltip>
                          조퇴 사유: {student.todayTime.absenceReason}
                        </StudentTooltip>
                      </ReactTooltip>
                    </ListColumn>
                  ) : (
                    <ListColumn>{student.todayTime.attendanceStatus}</ListColumn>
                  )}
                </StudentList>
              ))
            ) : (
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            )}
          </StudentBox>
        </BigBox>
      </Wrapper>
    )
  }
}
