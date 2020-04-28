import React, { useState } from "react"
import styled from "styled-components"
import Button_blue from "../Components/Buttons/Button_inputVer"
import Button_red from "../Components/Buttons/Button_red"
import useInput from "../Hooks/useInput"
import Textarea from "../Components/Textarea"
import { gql } from "apollo-boost"
import { useMutation } from "react-apollo-hooks"
import { toast } from "react-toastify"
import NumericInput from "react-numeric-input"

const CHECK_ATTENDANCE = gql`
  mutation checkAttendance($email: String!) {
    checkAttendance(email: $email)
  }
`

const END_ATTENDANCE = gql`
  mutation endAttendance($email: String!) {
    endAttendance(email: $email)
  }
`

const RE_ATTENDANCE = gql`
  mutation reAttendance($email: String!) {
    reAttendance(email: $email)
  }
`

const CHECK_ABSENCE = gql`
  mutation checkAbsence($email: String!, $absenceReason: String!) {
    checkAbsence(email: $email, absenceReason: $absenceReason)
  }
`

const EDIT_TARGETTIMEBOX = gql`
  mutation edit_myTargetTimeBox(
    $monday: Int!
    $tuesday: Int!
    $wednesday: Int!
    $thursday: Int!
    $friday: Int!
    $saturday: Int!
    $sunday: Int!
  ) {
    edit_myTargetTimeBox(
      monday: $monday
      tuesday: $tuesday
      wednesday: $wednesday
      thursday: $thursday
      friday: $friday
      saturday: $saturday
      sunday: $sunday
    )
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ButtonWrap = styled.div`
  width: 130px;
  height: 33px;
  &:not(:first-child) {
    margin-left: 20px;
  }
`

const AbsenceBox = styled.form`
  width: 590px;
  height: 200px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`

const AttendanceBox = styled.div`
  width: 590px;
  height: 80px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`

const MyStatus = styled.div`
  width: 240px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.classicBlue};
  span {
    color: black;
  }
`

const EtcButtonWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 24px;
  margin-top: 24px;
`

const ReasonText = styled(Textarea)`
  width: 542px;
  height: 100px;
  margin-top: 15px;
  display: inline-block;
  margin-bottom: 15px;
`

const TargetBoxRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-child {
    height: 30%;
  }
  &:nth-child(2) {
    height: 35%;
  }
  &:last-child {
    height: 35%;
    justify-content: flex-end;
  }
`

const TargetBoxButtonWrap = styled.div`
  width: 130px;
  height: 33px;
  margin-right: 20px;
`

const InputAreaColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:not(:first-child) {
    margin-left: 15px;
  }
`
const InputText = styled.div`
  font-size: 16px;
  font-weight: 600;
  &:first-child {
    margin-bottom: 10px;
    color: ${(props) => props.theme.classicBlue};
  }
  &:last-child {
    margin-top: 10px;
  }
`

const TargetBoxTitle = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.classicBlue};
`

const Day_7 = ["월", "화", "수", "목", "금", "토", "일"]

export default ({ Mydata, MyRefetch }) => {
  const StatusReason = useInput(Mydata.me.todayTime.absenceReason)
  const [targetTime_1, setTargetTime_1] = useState(Mydata.me.targetTimeBox.monday) // 월
  const [targetTime_2, setTargetTime_2] = useState(Mydata.me.targetTimeBox.tuesday)
  const [targetTime_3, setTargetTime_3] = useState(Mydata.me.targetTimeBox.wednesday)
  const [targetTime_4, setTargetTime_4] = useState(Mydata.me.targetTimeBox.thursday)
  const [targetTime_5, setTargetTime_5] = useState(Mydata.me.targetTimeBox.friday)
  const [targetTime_6, setTargetTime_6] = useState(Mydata.me.targetTimeBox.saturday)
  const [targetTime_7, setTargetTime_7] = useState(Mydata.me.targetTimeBox.sunday) // 일

  const editTargetTimeBoxMutation = useMutation(EDIT_TARGETTIMEBOX, {
    variables: {
      monday: targetTime_1,
      tuesday: targetTime_2,
      wednesday: targetTime_3,
      thursday: targetTime_4,
      friday: targetTime_5,
      saturday: targetTime_6,
      sunday: targetTime_7,
    },
  })

  const checkAttendanceMutation = useMutation(CHECK_ATTENDANCE, {
    variables: {
      email: Mydata.me.email,
    },
  })

  const endAttendanceMutation = useMutation(END_ATTENDANCE, {
    variables: {
      email: Mydata.me.email,
    },
  })

  const reAttendanceMutation = useMutation(RE_ATTENDANCE, {
    variables: {
      email: Mydata.me.email,
    },
  })

  const checkAbsenceMutation = useMutation(CHECK_ABSENCE, {
    variables: {
      email: Mydata.me.email,
      absenceReason: StatusReason.value,
    },
  })

  const func_attendance = async () => {
    try {
      toast.info("출석 처리 중...")
      const {
        data: { checkAttendance },
      } = await checkAttendanceMutation()
      if (!checkAttendance) {
        toast.error("출석이 불가능합니다.")
      } else {
        await MyRefetch()
        toast.success("출석이 완료되었습니다.")
      }
    } catch (e) {
      const realText = e.message.split("GraphQL error: ")
      toast.error(realText[1])
    }
  }

  const func_endAttendance = async () => {
    try {
      toast.info("학습 종료 중...")
      const {
        data: { endAttendance },
      } = await endAttendanceMutation()
      if (!endAttendance) {
        toast.error("학습 종료가 불가능합니다.")
      } else {
        await MyRefetch()
        toast.success("학습이 종료되었습니다.")
      }
    } catch (e) {
      const realText = e.message.split("GraphQL error: ")
      toast.error(realText[1])
    }
  }

  const func_reAttendance = async () => {
    try {
      toast.info("재학습을 위해 출석 상태 변경 중...")
      const {
        data: { reAttendance },
      } = await reAttendanceMutation()
      if (!reAttendance) {
        toast.error("출석 상태 변경이 불가능합니다.")
      } else {
        await MyRefetch()
        toast.success(
          <div>
            출석 상태 변경이 완료되었습니다.
            <br />
            다시 학습이 가능합니다.
          </div>
        )
      }
    } catch (e) {
      const realText = e.message.split("GraphQL error: ")
      toast.error(realText[1])
    }
  }

  const func_absence = async (e) => {
    e.preventDefault()
    try {
      toast.info("조퇴 처리 중...")
      const {
        data: { checkAbsence },
      } = await checkAbsenceMutation()
      if (!checkAbsence) {
        toast.error("조퇴 처리가 불가능합니다.")
      } else {
        await MyRefetch()
        toast.success("조퇴 처리가 완료되었습니다.")
      }
    } catch (e) {
      const realText = e.message.split("GraphQL error: ")
      toast.error(realText[1])
    }
  }

  const edit_targetTimeBox = async () => {
    try {
      toast.info("목표시간 수정 중...")
      const {
        data: { edit_myTargetTimeBox },
      } = await editTargetTimeBoxMutation()
      if (!edit_myTargetTimeBox) {
        toast.error("목표시간 수정이 불가능합니다.")
      } else {
        await MyRefetch()
        toast.success("목표시간 수정이 완료되었습니다.")
      }
    } catch (e) {
      const realText = e.message.split("GraphQL error: ")
      toast.error(realText[1])
    }
  }

  const myFormat = (num) => {
    return num + "시간"
  }

  return (
    <Wrapper>
      <AttendanceBox>
        <MyStatus>
          오늘의 출석 상태: <span>{Mydata.me.todayTime.attendanceStatus}</span>
        </MyStatus>
        <ButtonWrap>
          <Button_blue type="button" text={"출석하기~!"} onClick={func_attendance} />
        </ButtonWrap>
        <ButtonWrap>
          <Button_red type="button" text={"오늘 학습 끝~!"} onClick={func_endAttendance} />
        </ButtonWrap>
      </AttendanceBox>
      <AbsenceBox onSubmit={func_absence}>
        <EtcButtonWrap>
          <ButtonWrap>
            <Button_blue text={"다시 공부하기~!"} onClick={func_reAttendance} />
          </ButtonWrap>
          <ButtonWrap>
            <Button_red type="submit" text={"조퇴하기"} />
          </ButtonWrap>
        </EtcButtonWrap>
        <ReasonText placeholder={"조퇴 사유"} {...StatusReason} />
      </AbsenceBox>
      <AbsenceBox>
        <TargetBoxRow>
          <TargetBoxTitle>나의 학습 목표시간</TargetBoxTitle>
        </TargetBoxRow>
        <TargetBoxRow>
          {Day_7.map((Day_7, index) => {
            return (
              <InputAreaColumn key={index}>
                <InputText>{Day_7}</InputText>
                <NumericInput
                  min={1}
                  max={24}
                  value={eval("targetTime_" + (index + 1)) / 3600}
                  size={1}
                  format={myFormat}
                  onChange={(num) => eval("setTargetTime_" + (index + 1) + "(num * 3600)")}
                />
              </InputAreaColumn>
            )
          })}
        </TargetBoxRow>
        <TargetBoxRow>
          <TargetBoxButtonWrap>
            <Button_blue type="button" text={"목표시간 변경"} onClick={edit_targetTimeBox} />
          </TargetBoxButtonWrap>
        </TargetBoxRow>
      </AbsenceBox>
    </Wrapper>
  )
}
