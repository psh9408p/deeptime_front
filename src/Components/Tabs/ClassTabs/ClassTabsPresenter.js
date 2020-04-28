import React from "react"
import styled from "styled-components"
import Popup from "reactjs-popup"
import PopButton from "../../Buttons/PopButton"
import ClassTab from "./ClassTab"
import Input from "../../Input"
import FatText from "../../FatText"
import Select from "../../Select"
import PopupButton from "../../Buttons/PopupButton"
import ClassStatistics from "./ClassStatistics"
import ClassSchedule from "./ClassSchedule"
import { toast } from "react-toastify"

const Regist = styled.div`
  width: 100%;
`

const PopupDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px 0px;
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

const PBody = styled.div`
  form {
    display: flex;
    flex-direction: column;
    width: 500px;
    padding: 20px 20px;
  }
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

const SmallInput = styled(Input)`
  width: 300px;
  margin-bottom: 7px;
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

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`

const InputWrapper = styled.div`
  margin-bottom: 10px;
`

export default ({
  pageIndex,
  pageIndexChange,
  loginPosition,
  className,
  classBio,
  classData,
  mySchoolList,
  myAcademyList,
  myReadingRoomList,
  classGrade,
  classFloor,
  clearClass,
  onSubmitClass,
  classRefetch,
}) => {
  if (pageIndex === 0) {
    if (classData.myClass[0] === undefined) {
      toast.error("클래스 등록 후 통계 정보를 볼 수 있습니다.")
      pageIndexChange(1)
      return null
    } else {
      return <ClassStatistics classList={classData.myClass} loginPosition={loginPosition} />
    }
  } else if (pageIndex === 1) {
    return (
      <Regist>
        <PopupDiv>
          <PopupCustom trigger={<PopButton text={"클래스 추가"} />} modal>
            {(close) => (
              <PBody>
                <form onSubmit={onSubmitClass}>
                  <PTitle text={"클래스 정보"} />
                  <InputWrapper>
                    <SmallInput
                      placeholder={"클래스 이름 (예: 1학년 1반 or 101호)"}
                      {...className}
                    />
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
                    <PopupButton text={"등록"} />
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
        </PopupDiv>
        {classData.myClass.map((classRoom, index) => (
          <ClassTab
            key={index}
            loginPosition={loginPosition}
            classRoom={classRoom}
            classRefetch={classRefetch}
            mySchoolList={mySchoolList}
            myAcademyList={myAcademyList}
            myReadingRoomList={myReadingRoomList}
            clearClass={clearClass}
            className={className}
            classBio={classBio}
            classGrade={classGrade}
            classFloor={classFloor}
          />
        ))}
      </Regist>
    )
  } else if (pageIndex === 2) {
    if (classData.myClass[0] === undefined) {
      toast.error("클래스 등록 후 스케줄 기능을 사용할 수 있습니다.")
      pageIndexChange(1)
      return null
    } else {
      return <ClassSchedule classRoom={classData.myClass} />
    }
  }
}
