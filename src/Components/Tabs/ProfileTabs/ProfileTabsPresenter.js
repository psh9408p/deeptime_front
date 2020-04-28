import React from "react"
import styled from "styled-components"
import Popup from "reactjs-popup"
import SchoolTab from "./SchoolTab"
import AcademyTab from "./AcademyTab"
import ReadingRoomTab from "./ReadingRoomTab"
import Input from "../../Input"
import Select from "../../Select"
import PopupButton from "../../../Components/Buttons/PopupButton"
import FatText from "../../FatText"
import { toast } from "react-toastify"
import PopButton from "../../Buttons/PopButton"

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
    width: 900px !important;
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
    width: 600px;
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
  width: 200px;
  margin-bottom: 7px;
  margin-right: 15px;
`

const LargeInput = styled(Input)`
  max-width: 600px;
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

const openSearchURL = () => {
  const url =
    "https://s.search.naver.com/n/csearch/content/eprender.nhn?where=nexearch&pkid=252&q=%EC%9A%B0%ED%8E%B8%EB%B2%88%ED%98%B8&key=address_kor"
  window.open(url, "_blank")
}

export default ({
  pageIndex,
  isSelf,
  loginPosition,
  schoolData,
  schoolLevel,
  schoolName,
  schoolZipCode,
  schoolAddress,
  onSubmitSchool,
  schoolRefetch,
  clearSchool,
  academyData,
  academyKind,
  academyName,
  academyZipCode,
  academyAddress,
  academyDetailAddress,
  onSubmitAcademy,
  academyRefetch,
  clearAcademy,
  readingRoomData,
  readingRoomKind,
  readingRoomName,
  readingRoomZipCode,
  readingRoomAddress,
  readingRoomDetailAddress,
  onSubmitReadingRoom,
  readingRoomRefetch,
  clearReadingRoom,
}) => {
  if (pageIndex === 0) {
    return (
      <Regist>
        <PopupDiv>
          <PopupCustom trigger={<PopButton text={"학교 추가"} />} modal>
            {(close) => (
              <PBody>
                <form onSubmit={onSubmitSchool}>
                  <PTitle text={"학교 정보"} />
                  <SmallInput placeholder={"학교명 (예: 아이엠고등학교)"} {...schoolName} />
                  <div>
                    <SmallInput placeholder={"우편번호 (예: 12345)"} {...schoolZipCode} />
                    <PopButton type={"button"} onClick={openSearchURL} text={"주소검색"} />
                  </div>
                  <LargeInput
                    placeholder={
                      "도로명 주소 (예: 서울특별시 강남구 봉은사로72길 13-4 (삼성동, 아이엠고등학교))"
                    }
                    {...schoolAddress}
                  />
                  <SelectDiv>
                    <span>분류 :</span>
                    <Select {...schoolLevel} />
                  </SelectDiv>
                  <ButtonDiv>
                    <PopupButton text={"등록"} />
                    <PopupButton
                      type="button"
                      onClick={() => {
                        close()
                        clearSchool()
                      }}
                      text={"닫기"}
                    />
                  </ButtonDiv>
                </form>
              </PBody>
            )}
          </PopupCustom>
        </PopupDiv>
        {schoolData.map((school, index) => (
          <SchoolTab
            key={index}
            school={school}
            isSelf={isSelf}
            schoolRefetch={schoolRefetch}
            schoolName={schoolName}
            schoolZipCode={schoolZipCode}
            schoolLevel={schoolLevel}
            schoolAddress={schoolAddress}
            openSearchURL={openSearchURL}
            clearSchool={clearSchool}
          />
        ))}
      </Regist>
    )
  } else if (pageIndex === 1) {
    if (loginPosition !== "manager_academy") {
      toast.error("사용 권한이 없습니다.")
      return <></>
    } else {
      return (
        <Regist>
          <PopupDiv>
            <PopupCustom trigger={<PopButton text={"학원 추가"} />} modal>
              {(close) => (
                <PBody>
                  <form onSubmit={onSubmitAcademy}>
                    <PTitle text={"학원 정보"} />
                    <SmallInput placeholder={"학원명 (예: 아이엠학원)"} {...academyName} />
                    <div>
                      <SmallInput placeholder={"우편번호 (예: 12345)"} {...academyZipCode} />
                      <PopButton type={"button"} onClick={openSearchURL} text={"주소검색"} />
                    </div>
                    <LargeInput
                      placeholder={"도로명 주소 (예: 서울특별시 강남구 봉은사로72길 13-4 (삼성동))"}
                      {...academyAddress}
                    />
                    <LargeInput
                      placeholder={"상세주소 (예: 채움빌딩 203호)"}
                      {...academyDetailAddress}
                    />
                    <SelectDiv>
                      <span>분류 :</span>
                      <Select {...academyKind} />
                    </SelectDiv>
                    <ButtonDiv>
                      <PopupButton text={"등록"} />
                      <PopupButton
                        type="button"
                        onClick={() => {
                          close()
                          clearAcademy()
                        }}
                        text={"닫기"}
                      />
                    </ButtonDiv>
                  </form>
                </PBody>
              )}
            </PopupCustom>
          </PopupDiv>
          {academyData.map((academy, index) => (
            <AcademyTab
              key={index}
              academy={academy}
              isSelf={isSelf}
              academyRefetch={academyRefetch}
              academyName={academyName}
              academyZipCode={academyZipCode}
              academyKind={academyKind}
              academyAddress={academyAddress}
              academyDetailAddress={academyDetailAddress}
              openSearchURL={openSearchURL}
              clearAcademy={clearAcademy}
            />
          ))}
        </Regist>
      )
    }
  } else if (pageIndex === 2) {
    if (loginPosition !== "manager_readingRoom") {
      toast.error("사용 권한이 없습니다.")
      return <></>
    } else {
      return (
        <Regist>
          <PopupDiv>
            <PopupCustom trigger={<PopButton text={"독서실 추가"} />} modal>
              {(close) => (
                <PBody>
                  <form onSubmit={onSubmitReadingRoom}>
                    <PTitle text={"독서실 정보"} />
                    <SmallInput placeholder={"독서실명 (예: 아이엠독서실)"} {...readingRoomName} />
                    <div>
                      <SmallInput placeholder={"우편번호 (예: 12345)"} {...readingRoomZipCode} />
                      <PopButton type={"button"} onClick={openSearchURL} text={"주소검색"} />
                    </div>
                    <LargeInput
                      placeholder={"도로명 주소 (예: 서울특별시 강남구 봉은사로72길 13-4 (삼성동))"}
                      {...readingRoomAddress}
                    />
                    <LargeInput
                      placeholder={"상세주소 (예: 채움빌딩 203호)"}
                      {...readingRoomDetailAddress}
                    />
                    <SelectDiv>
                      <span>분류</span>
                      <Select {...readingRoomKind} />
                    </SelectDiv>
                    <ButtonDiv>
                      <PopupButton text={"등록"} />
                      <PopupButton
                        type="button"
                        onClick={() => {
                          close()
                          clearReadingRoom()
                        }}
                        text={"닫기"}
                      />
                    </ButtonDiv>
                  </form>
                </PBody>
              )}
            </PopupCustom>
          </PopupDiv>
          {readingRoomData.map((readingRoom, index) => (
            <ReadingRoomTab
              key={index}
              readingRoom={readingRoom}
              isSelf={isSelf}
              readingRoomRefetch={readingRoomRefetch}
              readingRoomName={readingRoomName}
              readingRoomZipCode={readingRoomZipCode}
              readingRoomKind={readingRoomKind}
              readingRoomAddress={readingRoomAddress}
              readingRoomDetailAddress={readingRoomDetailAddress}
              openSearchURL={openSearchURL}
              clearReadingRoom={clearReadingRoom}
            />
          ))}
        </Regist>
      )
    }
  }
}
