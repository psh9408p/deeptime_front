import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useQuery, useMutation } from "react-apollo-hooks"
import StudentTabsPresenter from "./StudentTabsPresenter"
import { MY_STUDENT, CONFIRM_STUDENT, ADD_STUDENT, CON_SEAT } from "./StudentTabsQueries"
import Loader from "../../Loader"
import useInput from "../../../Hooks/useInput"
import { toast } from "react-toastify"
import useSelect from "../../../Hooks/useSelect"
import selectChange from "../../SelectChange"

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`

const StudentTabsContainer = ({
  pageIndex,
  pageIndexChange,
  loginPosition,
  schoolList,
  academyList,
  readingRoomList,
  classList,
}) => {
  const studentEmail = useInput("")
  const studentEmail_seat = useInput("")
  const mySchoolList = useSelect(
    schoolList.map((List) => List.name),
    schoolList.map((List) => List.id)
  )
  const myAcademyList = useSelect(
    academyList.map((List) => List.name),
    academyList.map((List) => List.id)
  )
  const myReadingRoomList = useSelect(
    readingRoomList.map((List) => List.name),
    readingRoomList.map((List) => List.id)
  )

  const myClassList = useSelect(
    classList.map((List) => `${List.name}(${List.organizationName})`),
    classList.map((List) => List.id)
  )
  const seatId = useInput("")

  const { data: studentData, loading: studentLoading, refetch: studentRefetch } = useQuery(
    MY_STUDENT
  )
  const confirmStudentMutation = useMutation(CONFIRM_STUDENT, {
    variables: { email: studentEmail.value },
  })

  const addStudentMutation = useMutation(ADD_STUDENT)
  const connectSeatMutation = useMutation(CON_SEAT, {
    variables: { email: studentEmail_seat.value, seatId: seatId.value },
  })

  let schoolValue = ""
  let academyValue = ""
  let readingRoomValue = ""
  let classValue = ""
  if (mySchoolList.valueList[0]) {
    schoolValue = mySchoolList.valueList[0]
  }
  if (myAcademyList.valueList[0]) {
    academyValue = myAcademyList.valueList[0]
  }
  if (myReadingRoomList.valueList[0]) {
    readingRoomValue = myReadingRoomList.valueList[0]
  }
  if (myClassList.valueList[0]) {
    classValue = myClassList.valueList[0]
  }
  const confirmStudent = async (e) => {
    e.preventDefault()
    if (studentEmail.value !== "") {
      try {
        toast.info("등록 가능 여부 확인 중...")
        const { data } = await confirmStudentMutation()
        if (!data.confirmStudent) {
          toast.error("등록이 불가능한 사용자입니다.")
        } else {
          toast.success("등록이 가능한 사용자입니다.")
          localStorage.setItem("email_confirm", "Confirm")
        }
      } catch {
        toast.error(
          <div>
            확인이 불가능합니다.
            <br />
            다시 시도하세요.
          </div>
        )
      }
    } else {
      toast.error("이메일을 입력하세요.")
    }
  }
  const onSubmitStudent = async (e) => {
    e.preventDefault()
    const email_confirm = localStorage.getItem("email_confirm")
    if (email_confirm === "None") {
      toast.error("먼저 Email 유효성을 확인하세요.")
    } else if (email_confirm === "Confirm") {
      let schoolMuValue = ""
      let academyMuValue = ""
      let readingRoomMuValue = ""
      let classMuValue = ""
      if (loginPosition === "manager_school") {
        schoolMuValue = mySchoolList.option !== undefined ? mySchoolList.option : ""
      } else if (loginPosition === "manager_academy") {
        academyMuValue = myAcademyList.option !== undefined ? myAcademyList.option : ""
      } else if (loginPosition === "manager_readingRoom") {
        readingRoomMuValue = myReadingRoomList.option !== undefined ? myReadingRoomList.option : ""
      }
      classMuValue = myClassList.option !== undefined ? myClassList.option : ""

      try {
        toast.info("새로운 학생을 등록 중...")
        const {
          data: { addStudent },
        } = await addStudentMutation({
          variables: {
            email: studentEmail.value,
            schoolId: schoolMuValue,
            academyId: academyMuValue,
            readingRoomId: readingRoomMuValue,
            classId: classMuValue,
            loginPosition,
          },
        })
        if (!addStudent) {
          toast.error("학생을 등록할 수 없습니다.")
        } else {
          clearStudent()
          await studentRefetch()
          toast.success("새로운 학생이 등록되었습니다.")
          localStorage.setItem("email_confirm", "None")
        }
      } catch (e) {
        const realText = e.message.split("GraphQL error: ")
        toast.error(realText[1])
      }
    }
  }
  const onSubmitConSeat = async (e) => {
    e.preventDefault()
    try {
      toast.info("좌석을 배정 중...")
      const {
        data: { conSeat },
      } = await connectSeatMutation()
      if (!conSeat) {
        toast.error("좌석을 배정할 수 없습니다.")
      } else {
        await studentRefetch()
        studentEmail_seat.setValue("")
        seatId.setValue("")
        toast.success("좌석이 배정되었습니다.")
      }
    } catch (e) {
      const realText = e.message.split("GraphQL error: ")
      toast.error(realText[1])
    }
  }

  const clearStudent = () => {
    studentEmail.setValue("")
    mySchoolList.setOption(schoolValue)
    myAcademyList.setOption(academyValue)
    myReadingRoomList.setOption(readingRoomValue)
    myClassList.setOption(classValue)
    if (loginPosition === "manager_school") {
      selectChange("modifySchool", 0)
    } else if (loginPosition === "manager_academy") {
      selectChange("modifyAcademy", 0)
    } else if (loginPosition === "manager_readingRoom") {
      selectChange("modifyReadingRoom", 0)
    }
    selectChange("modifyClass", 0)
  }
  const clearSeatForm = () => {
    studentEmail_seat.setValue("")
    seatId.setValue("")
  }

  useEffect(() => {
    localStorage.setItem("email_confirm", "None")
  }, [])

  if (studentLoading === true) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    )
  } else if (!studentLoading && studentData && studentData.myStudent) {
    studentRefetch()
    return (
      <StudentTabsPresenter
        pageIndex={pageIndex}
        pageIndexChange={pageIndexChange}
        loginPosition={loginPosition}
        studentData={studentData}
        studentRefetch={studentRefetch}
        studentEmail={studentEmail}
        studentEmail_seat={studentEmail_seat}
        confirmStudent={confirmStudent}
        mySchoolList={mySchoolList}
        myAcademyList={myAcademyList}
        myReadingRoomList={myReadingRoomList}
        myClassList={myClassList}
        clearStudent={clearStudent}
        onSubmitStudent={onSubmitStudent}
        seatId={seatId}
        onSubmitConSeat={onSubmitConSeat}
        clearSeatForm={clearSeatForm}
      />
    )
  }
}

export default StudentTabsContainer
