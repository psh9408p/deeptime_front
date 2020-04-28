import React, { useEffect } from "react"
import styled from "styled-components"
import { useQuery, useMutation } from "react-apollo-hooks"
import ClassTabsPresenter from "./ClassTabsPresenter"
import { MY_CLASS, ADD_CLASS } from "./ClassTabsQueries"
import Loader from "../../Loader"
import useInput from "../../../Hooks/useInput"
import { toast } from "react-toastify"
import useSelect from "../../../Hooks/useSelect"
import selectChange from "../../SelectChange"

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`

const ClassTabsContainer = ({
  pageIndex,
  pageIndexChange,
  loginPosition,
  schoolList,
  academyList,
  readingRoomList,
}) => {
  const nonSpace = (value) => !value.includes(" ")
  const maxLen = (value) => value.length <= 40

  const className = useInput("")
  const classBio = useInput("", maxLen)
  const classFloor = useInput("1", nonSpace)
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
  const classGrade = useSelect(
    ["1학년", "2학년", "3학년", "4학년", "5학년", "6학년"],
    [1, 2, 3, 4, 5, 6]
  )

  const { data: classData, loading: classLoading, refetch: classRefetch } = useQuery(MY_CLASS)
  const addClassMutation = useMutation(ADD_CLASS)

  let schoolValue = ""
  let academyValue = ""
  let readingRoomValue = ""
  if (mySchoolList.valueList[0]) {
    schoolValue = mySchoolList.valueList[0]
  }
  if (myAcademyList.valueList[0]) {
    academyValue = myAcademyList.valueList[0]
  }
  if (myReadingRoomList.valueList[0]) {
    readingRoomValue = myReadingRoomList.valueList[0]
  }

  const onSubmitClass = async (e) => {
    e.preventDefault()
    let schoolMuValue = ""
    let academyMuValue = ""
    let readingRoomMuValue = ""
    if (loginPosition === "manager_school") {
      schoolMuValue = mySchoolList.option !== undefined ? mySchoolList.option : ""
    } else if (loginPosition === "manager_academy") {
      academyMuValue = myAcademyList.option !== undefined ? myAcademyList.option : ""
    } else if (loginPosition === "manager_readingRoom") {
      readingRoomMuValue = myReadingRoomList.option !== undefined ? myReadingRoomList.option : ""
    }

    try {
      toast.info("새로운 클래스를 등록 중...")
      const {
        data: { addClass },
      } = await addClassMutation({
        variables: {
          name: className.value,
          bio: classBio.value,
          loginPosition,
          schoolId: schoolMuValue,
          academyId: academyMuValue,
          readingRoomId: readingRoomMuValue,
          grade: classGrade.option,
          floor: Number(classFloor.value),
        },
      })
      if (!addClass) {
        toast.error("클래스를 등록할 수 없습니다.")
      } else {
        clearClass()
        await classRefetch()
        toast.success("새로운 클래스가 등록되었습니다.")
      }
    } catch (e) {
      const realText = e.message.split("GraphQL error: ")
      toast.error(realText[1])
    }
  }

  const clearClass = () => {
    className.setValue("")
    classBio.setValue("")
    mySchoolList.setOption(schoolValue)
    myAcademyList.setOption(academyValue)
    myReadingRoomList.setOption(readingRoomValue)
    classGrade.setOption(classGrade.valueList[0])
    classFloor.setValue("1")
    if (loginPosition === "manager_school") {
      selectChange("modifySchool", 0)
      selectChange("modifyGrade", 0)
    } else if (loginPosition === "manager_academy") {
      selectChange("modifyAcademy", 0)
    } else if (loginPosition === "manager_readingRoom") {
      selectChange("modifyReadingRoom", 0)
    }
  }

  if (classLoading === true) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    )
  } else if (!classLoading && classData && classData.myClass) {
    return (
      <ClassTabsPresenter
        pageIndex={pageIndex}
        pageIndexChange={pageIndexChange}
        loginPosition={loginPosition}
        className={className}
        classBio={classBio}
        classData={classData}
        classGrade={classGrade}
        classFloor={classFloor}
        mySchoolList={mySchoolList}
        myAcademyList={myAcademyList}
        myReadingRoomList={myReadingRoomList}
        onSubmitClass={onSubmitClass}
        clearClass={clearClass}
        classRefetch={classRefetch}
      />
    )
  }
}

export default ClassTabsContainer
