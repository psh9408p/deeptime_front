import React from "react"
import styled from "styled-components"
import EditButton from "../../../Buttons/EditButton"
import { useMutation } from "react-apollo-hooks"
import FatText from "../../../FatText"
import { toast } from "react-toastify"
import Popup from "reactjs-popup"
import Input from "../../../Input"
import Select from "../../../Select"
import PopupButton from "../../../Buttons/PopupButton"
import { DELETE_CLASS, EDIT_CLASS } from "./ClassTabQueries"
import { ClassRoom } from "../../../Icons"
import selectChange from "../../../SelectChange"

const ClassRow = styled.div`
  width: 100%;
  display: inline-flex;
  background-color: white;
  height: 200px;
  border: ${(props) => props.theme.boxBorder};
  padding: 15px 30px;
  border-radius: ${(props) => props.theme.borderRadius};
  margin: 10px 0px;
`

const HeaderColumn = styled.div`
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:first-child {
    img {
      width: 120px;
      height: 120px;
      margin: 0px 10px;
    }
  }
  &:last-child {
    align-items: flex-start;
    margin-left: 30px;
  }
`

const NameRow = styled.div`
  display: flex;
  align-items: center;
`

const Name = styled.span`
  font-size: 26px;
  display: block;
  margin-right: 25px;
`

const Count = styled.div`
  margin: 15px 0px;
  font-size: 16px;
`

const Info = styled.ul`
  display: flex;
  flex-direction: column;
`

const DetailInfo = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-bottom: 12px;
  }
`

const PopupCustom = styled(Popup)`
  &-content {
    width: 800px !important;
    height: 400px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const PopButton = styled.button`
  border: 0;
  width: 100px;
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 600;
  text-align: center;
  padding: 5px 0px;
  font-size: 12px;
  outline-color: black;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 10px;
  }
`

const LoadButton = styled(PopButton)`
  width: 140px;
  background-color: #e74c3c;
`

const PBody = styled.div`
  form {
    display: flex;
    flex-direction: column;
    width: 500px;
    padding: 20px 20px;
  }
`

const SmallInput = styled(Input)`
  width: 300px;
  margin-right: 15px;
`

const LargeInput = styled(Input)`
  width: 500px;
  margin-bottom: 7px;
  margin-right: 15px;
`

const NumberInput = styled(Input)`
  width: 100px;
  margin-bottom: 7px;
  margin-right: 15px;
`

const LoadAddDiv = styled.div`
  display: flex;
  margin-bottom: 7px;
`

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`

const SelectDiv = styled.div`
  display: inline-flex;
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  max-width: 250px;
  margin-bottom: 15px;
  span {
    display: inline-flex;
    width: 70px;
    align-items: center;
    justify-content: left;
    font-weight: 600;
    padding-left: 15px;
  }
`

const InputWrapper = styled.div`
  margin-bottom: 10px;
`

export default ({
  classRoom,
  classRefetch,
  mySchoolList,
  myAcademyList,
  myReadingRoomList,
  className,
  classBio,
  classGrade,
  classFloor,
  clearClass,
  loginPosition,
}) => {
  const deleteClassMutation = useMutation(DELETE_CLASS, {
    variables: { id: classRoom.id, loginPosition },
  })

  const editClassMutation = useMutation(EDIT_CLASS)

  const onSubmit = async (e) => {
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

    toast.info("정보 수정중...")
    try {
      const {
        data: { editClass },
      } = await editClassMutation({
        variables: {
          classId: classRoom.id,
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
      if (!editClass) {
        toast.error("정보를 수정할 수 없습니다.")
      } else {
        await classRefetch()
        await clearClass()
        toast.success("정보가 수정되었습니다.")
      }
    } catch (e) {
      const realText = e.message.split("GraphQL error: ")
      toast.error(realText[1])
    }
  }

  const loadValue = async () => {
    className.setValue(`${classRoom.name}`)
    classBio.setValue(`${classRoom.bio}`)
    if (loginPosition === "manager_school") {
      mySchoolList.setOption(`${classRoom.school.id}`)
      selectChange("modifySchool", mySchoolList.optionList.indexOf(`${classRoom.school.name}`))
    } else if (loginPosition === "manager_academy") {
      myAcademyList.setOption(`${classRoom.academy.id}`)
      selectChange("modifyAcademy", myAcademyList.optionList.indexOf(`${classRoom.academy.name}`))
    } else if (loginPosition === "manager_readingRoom") {
      myReadingRoomList.setOption(`${classRoom.readingRoom.id}`)
      selectChange(
        "modifyReadingRoom",
        myReadingRoomList.optionList.indexOf(`${classRoom.readingRoom.name}`)
      )
    }
    if (loginPosition === "manager_school") {
      classGrade.setOption(classRoom.grade)
      selectChange("modifyGrade", classGrade.optionList.indexOf(`${classRoom.grade}학년`))
    } else {
      classFloor.setValue(`${classRoom.floor}`)
    }
  }
  return (
    <ClassRow>
      <HeaderColumn>
        <ClassRoom />
      </HeaderColumn>
      <HeaderColumn>
        <NameRow>
          <Name>{classRoom.name}</Name>
          <PopupCustom trigger={<PopButton>수정</PopButton>} modal>
            {(close) => (
              <PBody>
                <form onSubmit={onSubmit}>
                  <PTitle text={"클래스 정보"} />
                  <InputWrapper>
                    <LoadAddDiv>
                      <SmallInput
                        placeholder={"클래스 이름 (예: 1학년 1반 or 101호)"}
                        {...className}
                      />
                      <LoadButton type="button" onClick={loadValue}>
                        기존정보 불러오기
                      </LoadButton>
                    </LoadAddDiv>
                    <LargeInput placeholder={"클래스 소개 (40자 이내)"} {...classBio} />
                  </InputWrapper>
                  {loginPosition === "manager_school" && (
                    <SelectDiv>
                      <span>학교 :</span>
                      <Select {...mySchoolList} id={"modifySchool"} />
                    </SelectDiv>
                  )}
                  {loginPosition === "manager_academy" && (
                    <SelectDiv>
                      <span>학원 :</span>
                      <Select {...myAcademyList} id={"modifyAcademy"} />
                    </SelectDiv>
                  )}
                  {loginPosition === "manager_readingRoom" && (
                    <SelectDiv>
                      <span>독서실 :</span>
                      <Select {...myReadingRoomList} id={"modifyReadingRoom"} />
                    </SelectDiv>
                  )}
                  {loginPosition === "manager_school" && (
                    <SelectDiv>
                      <span>학년 :</span>
                      <Select {...classGrade} id={"modifyGrade"} />
                    </SelectDiv>
                  )}
                  {loginPosition !== "manager_school" && (
                    <SelectDiv>
                      <span>층수 :</span>
                      <NumberInput {...classFloor} type="number" />
                    </SelectDiv>
                  )}
                  <ButtonDiv>
                    <PopupButton text={"수정"} />
                    <PopupButton
                      type="button"
                      onClick={() => {
                        close()
                        clearClass()
                      }}
                      text={"닫기"}
                    />
                  </ButtonDiv>
                </form>
              </PBody>
            )}
          </PopupCustom>
          <EditButton
            type="button"
            onClick={async () => {
              toast.info(`'${classRoom.name}'(을)를 관리 목록에서 삭제 중...`)
              await deleteClassMutation()
              await classRefetch()
              toast.success(`'${classRoom.name}'(이)가 관리 목록에서 삭제되었습니다.`)
            }}
            text="삭제"
          />
        </NameRow>
        {classRoom.studentsCount === undefined && (
          <Count>
            <FatText text={"0"} /> 학생
          </Count>
        )}
        {classRoom.studentsCount !== undefined && (
          <Count>
            <FatText text={String(classRoom.studentsCount)} /> 학생
          </Count>
        )}
        <Info>
          {loginPosition === "manager_school" && (
            <DetailInfo>
              <FatText text="학교: " />
              {classRoom.school.name}
            </DetailInfo>
          )}
          {loginPosition === "manager_academy" && (
            <DetailInfo>
              <FatText text="학원: " />
              {classRoom.academy.name}
            </DetailInfo>
          )}
          {loginPosition === "manager_readingRoom" && (
            <DetailInfo>
              <FatText text="독서실: " />
              {classRoom.readingRoom.name}
            </DetailInfo>
          )}
          <DetailInfo>
            <FatText text="좌석 배치: " />
            {classRoom.maxRow &&
              classRoom.maxColumn &&
              `${String(classRoom.maxRow)} 행 ${String(classRoom.maxColumn)} 열`}
          </DetailInfo>
          <DetailInfo>
            <FatText text="소개: " />
            {classRoom.bio}
          </DetailInfo>
        </Info>
      </HeaderColumn>
    </ClassRow>
  )
}
