import React from "react"
import styled from "styled-components"
import { useQuery, useMutation } from "react-apollo-hooks"
import ProfileTabsPresenter from "./ProfileTabsPresenter"
import {
  MY_SCHOOL,
  ADD_SCHOOL,
  ADD_ACADEMY,
  MY_ACADEMY,
  ADD_READINGROOM,
  MY_READINGROOM,
} from "./ProfileTabsQueries"
import Loader from "../../Loader"
import useSelect from "../../../Hooks/useSelect"
import useInput from "../../../Hooks/useInput"
import { toast } from "react-toastify"

const LoaderWrapper = styled.div`
  margin: 100px 0px;
`

const ProfileTabsContainer = ({ pageIndex, isSelf, loginPosition }) => {
  const nonSpace = (value) => !value.includes(" ")
  const maxLen_nonHyphen_nonSpace = (value) =>
    value.length <= 5 && !value.includes("-") && !value.includes(" ")

  const schoolLevel = useSelect(
    ["초등학교", "중학교", "고등학교", "대학교"],
    ["초등학교", "중학교", "고등학교", "대학교"]
  )
  const schoolName = useInput("", nonSpace)
  const schoolZipCode = useInput("", maxLen_nonHyphen_nonSpace)
  const schoolAddress = useInput("")
  const academyKind = useSelect(
    ["재수학원", "단과학원", "종합학원", "외국어 학원"],
    ["재수학원", "단과학원", "종합학원", "외국어 학원"]
  )
  const academyName = useInput("")
  const academyZipCode = useInput("", maxLen_nonHyphen_nonSpace)
  const academyAddress = useInput("")
  const academyDetailAddress = useInput("")
  const readingRoomKind = useSelect(
    ["일반 독서실", "프리미엄 독서실"],
    ["일반 독서실", "프리미엄 독서실"]
  )
  const readingRoomName = useInput("")
  const readingRoomZipCode = useInput("", maxLen_nonHyphen_nonSpace)
  const readingRoomAddress = useInput("")
  const readingRoomDetailAddress = useInput("")

  const addSchoolMutation = useMutation(ADD_SCHOOL, {
    variables: {
      level: schoolLevel.option,
      name: schoolName.value,
      zipCode: schoolZipCode.value,
      address: schoolAddress.value,
    },
  })
  const { data: schoolData, loading: schoolLoading, refetch: schoolRefetch } = useQuery(MY_SCHOOL)
  const addAcademyMutation = useMutation(ADD_ACADEMY, {
    variables: {
      kind: academyKind.option,
      name: academyName.value,
      zipCode: academyZipCode.value,
      address: academyAddress.value,
      detailAddress: academyDetailAddress.value,
    },
  })
  const { data: academyData, loading: academyLoading, refetch: academyRefetch } = useQuery(
    MY_ACADEMY
  )
  const addReadingRoomMutation = useMutation(ADD_READINGROOM, {
    variables: {
      kind: readingRoomKind.option,
      name: readingRoomName.value,
      zipCode: readingRoomZipCode.value,
      address: readingRoomAddress.value,
      detailAddress: readingRoomDetailAddress.value,
    },
  })
  const {
    data: readingRoomData,
    loading: readingRoomLoading,
    refetch: readingRoomRefetch,
  } = useQuery(MY_READINGROOM)

  const onSubmitSchool = async (e) => {
    e.preventDefault()
    try {
      toast.info("새로운 학교를 등록 중...")
      const {
        data: { addSchool },
      } = await addSchoolMutation()
      if (!addSchool) {
        toast.error("학교를 등록할 수 없습니다.")
      } else {
        schoolName.setValue("")
        schoolZipCode.setValue("")
        schoolAddress.setValue("")
        await schoolRefetch()
        toast.success("새로운 학교가 등록되었습니다.")
      }
    } catch (e) {
      const realText = e.message.split("GraphQL error: ")
      toast.error(realText[1])
    }
  }
  const onSubmitAcademy = async (e) => {
    e.preventDefault()
    try {
      toast.info("새로운 학원을 등록 중...")
      const {
        data: { addAcademy },
      } = await addAcademyMutation()
      if (!addAcademy) {
        toast.error("학원을 등록할 수 없습니다.")
      } else {
        academyName.setValue("")
        academyZipCode.setValue("")
        academyAddress.setValue("")
        academyDetailAddress.setValue("")
        await academyRefetch()
        toast.success("새로운 학원이 등록되었습니다.")
      }
    } catch (e) {
      const realText = e.message.split("GraphQL error: ")
      toast.error(realText[1])
    }
  }
  const onSubmitReadingRoom = async (e) => {
    e.preventDefault()
    try {
      toast.info("새로운 독서실을 등록 중...")
      const {
        data: { addReadingRoom },
      } = await addReadingRoomMutation()
      if (!addReadingRoom) {
        toast.error("독서실을 등록할 수 없습니다.")
      } else {
        readingRoomName.setValue("")
        readingRoomZipCode.setValue("")
        readingRoomAddress.setValue("")
        readingRoomDetailAddress.setValue("")
        await readingRoomRefetch()
        toast.success("새로운 독서실이 등록되었습니다.")
      }
    } catch (e) {
      const realText = e.message.split("GraphQL error: ")
      toast.error(realText[1])
    }
  }

  const clearSchool = () => {
    schoolName.setValue("")
    schoolZipCode.setValue("")
    schoolAddress.setValue("")
    schoolLevel.setOption("")
  }
  const clearAcademy = () => {
    academyName.setValue("")
    academyZipCode.setValue("")
    academyAddress.setValue("")
    academyDetailAddress.setValue("")
    academyKind.setOption("")
  }
  const clearReadingRoom = () => {
    readingRoomName.setValue("")
    readingRoomZipCode.setValue("")
    readingRoomAddress.setValue("")
    readingRoomDetailAddress.setValue("")
    readingRoomKind.setOption("")
  }

  if (schoolLoading === true || academyLoading === true || readingRoomLoading === true) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    )
  } else if (
    (!schoolLoading && schoolData && schoolData.mySchool) ||
    (!academyLoading && academyData && academyData.myAcademy) ||
    (!readingRoomLoading && readingRoomData && readingRoomData.myReadingRoom)
  ) {
    return (
      <ProfileTabsPresenter
        pageIndex={pageIndex}
        isSelf={isSelf}
        loginPosition={loginPosition}
        schoolData={schoolData.mySchool}
        schoolLevel={schoolLevel}
        schoolName={schoolName}
        schoolZipCode={schoolZipCode}
        schoolAddress={schoolAddress}
        onSubmitSchool={onSubmitSchool}
        schoolRefetch={schoolRefetch}
        clearSchool={clearSchool}
        academyData={academyData.myAcademy}
        academyKind={academyKind}
        academyName={academyName}
        academyZipCode={academyZipCode}
        academyAddress={academyAddress}
        academyDetailAddress={academyDetailAddress}
        onSubmitAcademy={onSubmitAcademy}
        academyRefetch={academyRefetch}
        clearAcademy={clearAcademy}
        readingRoomData={readingRoomData.myReadingRoom}
        readingRoomKind={readingRoomKind}
        readingRoomName={readingRoomName}
        readingRoomZipCode={readingRoomZipCode}
        readingRoomAddress={readingRoomAddress}
        readingRoomDetailAddress={readingRoomDetailAddress}
        onSubmitReadingRoom={onSubmitReadingRoom}
        readingRoomRefetch={readingRoomRefetch}
        clearReadingRoom={clearReadingRoom}
      />
    )
  }
}

export default ProfileTabsContainer
