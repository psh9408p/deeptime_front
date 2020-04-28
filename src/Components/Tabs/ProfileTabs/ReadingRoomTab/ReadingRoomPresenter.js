import React from "react"
import styled from "styled-components"
import EditButton from "../../../Buttons/EditButton"
import FatText from "../../../FatText"
import { School } from "../../../Icons"
import { toast } from "react-toastify"
import Popup from "reactjs-popup"
import Input from "../../../Input"
import Select from "../../../Select"
import PopupButton from "../../../Buttons/PopupButton"

const ReadingRoomRow = styled.div`
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

const Adress = styled.ul`
  display: flex;
  flex-direction: column;
`

const DetailAdress = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
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
    width: 600px;
    padding: 20px 20px;
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

const ReadingRoomKindDiv = styled.div`
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

const ReadingRoomPresenter = ({
  readingRoom,
  isSelf,
  readingRoomRefetch,
  readingRoomName,
  readingRoomZipCode,
  readingRoomKind,
  readingRoomAddress,
  readingRoomDetailAddress,
  openSearchURL,
  clearReadingRoom,
  deleteReadingRoomMutation,
  onSubmit,
  loadValue,
}) => {
  return (
    <ReadingRoomRow>
      <HeaderColumn>
        <School />
      </HeaderColumn>
      <HeaderColumn>
        <NameRow>
          <Name>{readingRoom.name}</Name>
          {isSelf ? (
            <>
              <PopupCustom trigger={<PopButton>수정</PopButton>} modal>
                {(close) => (
                  <PBody>
                    <form onSubmit={onSubmit}>
                      <PTitle text={"독서실 정보"} />
                      <div>
                        <SmallInput
                          placeholder={"독서실명 (예: 아이엠독서실)"}
                          {...readingRoomName}
                        />
                        <LoadButton type="button" onClick={loadValue}>
                          기존정보 불러오기
                        </LoadButton>
                      </div>
                      <div>
                        <SmallInput placeholder={"우편번호 (예: 12345)"} {...readingRoomZipCode} />
                        <PopButton type="button" onClick={openSearchURL}>
                          주소검색
                        </PopButton>
                      </div>
                      <LargeInput
                        placeholder={
                          "도로명 주소 (예: 서울특별시 강남구 봉은사로72길 13-4 (삼성동))"
                        }
                        {...readingRoomAddress}
                      />
                      <LargeInput
                        placeholder={"상세주소 (예: 채움빌딩 203호)"}
                        {...readingRoomDetailAddress}
                      />
                      <ReadingRoomKindDiv>
                        <span>분류 :</span>
                        <Select {...readingRoomKind} id={"modifyReadingRoomKind"} />
                      </ReadingRoomKindDiv>
                      <ButtonDiv>
                        <PopupButton text={"수정"} />
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
              <EditButton
                type="button"
                onClick={async () => {
                  toast.info(`'${readingRoom.name}'를 관리 목록에서 삭제 중...`)
                  await deleteReadingRoomMutation()
                  await readingRoomRefetch()
                  toast.success(`'${readingRoom.name}'가 관리 목록에서 삭제되었습니다.`)
                }}
                text="삭제"
              />
            </>
          ) : (
            <></>
          )}
        </NameRow>
        {readingRoom.studentsCount === undefined && (
          <Count>
            <FatText text={"0"} /> 학생
          </Count>
        )}
        {readingRoom.studentsCount !== undefined && (
          <Count>
            <FatText text={String(readingRoom.studentsCount)} /> 학생
          </Count>
        )}
        <Adress>
          <DetailAdress>
            <FatText text="우편번호: " />
            {readingRoom.zipCode}
          </DetailAdress>
          <DetailAdress>
            <FatText text="주소: " />
            {readingRoom.address} {readingRoom.detailAddress}
          </DetailAdress>
        </Adress>
      </HeaderColumn>
    </ReadingRoomRow>
  )
}

export default ReadingRoomPresenter
