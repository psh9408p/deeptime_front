import React from 'react';
import styled from 'styled-components';
import PopupButton from '../../../Components/Buttons/PopupButton';
import FatText from '../../../Components/FatText';
import Input_100 from '../../../Components/Input_100';
import Textarea from '../../../Components/Textarea';
import Select from '../../../Components/Select';
import Loader from '../../../Components/Loader';
import imageResize from '../../../Components/imageResize';
import CheckBox from '../../../Components/CheckBox';

const LoaderWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  /* height: 100%;
  width: 100%; */
`;

const ContentBody = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 500px;
  padding: 20px 20px;
`;

const ContentTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin: 10px 0 30px 0;
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CaptionText = styled(Textarea)`
  width: 376px;
  height: 100px;
  display: inline-block;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 376px;
  height: 35px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: #f1f0ef;
  padding-left: 15px;
  font-size: 12px;
  margin-bottom: 10px;
  span {
    margin-right: 5px;
  }
`;

const ActiveDateDiv = styled(InputWrap)`
  padding: 0;
  flex-direction: column;
  justify-content: center;
  width: 376px;
  height: 100px;
  font-size: 14px;
`;

const SubTDiv = styled.div`
  font-size: 12px;
  margin-top: 3px;
`;

const ImgWrap = styled(InputWrap)`
  margin-top: 10px;
  height: auto;
  padding: 15px;
  span {
    margin-right: 35px;
  }
`;

const PreviewImg = styled.canvas`
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center center;
  border-radius: 4px;
  width: 200px;
  height: 112.5px;
  margin-bottom: 5px;
`;

const ImgSelectDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const DayWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

const DayIndiWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const dayList = ['일', '월', '화', '수', '목', '금', '토'];
const defaultImg =
  'https://slog-iam.s3.ap-northeast-2.amazonaws.com/group/groupimg.png';

export default ({
  CU_check,
  setViewTabs,
  maxMember,
  groupCategory,
  targetTime,
  password,
  bio,
  imgUrl,
  name,
  onSubmit,
  groupClear,
  loading,
  setSelectFile,
  dayBool,
  setDayBool,
}) => {
  const handleFileInput = (e) => {
    imageResize(e.target.files, 'pre-img-group', 640, setSelectFile, false);
  };

  const onCheckDay = (index) => (e) => {
    let newArr = [...dayBool];
    newArr[index] = e.target.checked;
    setDayBool(newArr);
  };

  return (
    <ContentBody onSubmit={onSubmit}>
      {loading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      <ContentTitle
        text={CU_check === 'create' ? '그룹 만들기' : '그룹 수정'}
      />
      <ContentDiv>
        <Input_100
          placeholder={'(필수) 그룹 이름'}
          width={'376px'}
          height={'35px'}
          margin={'0 0 10px 0'}
          bgColor={'#f1f0ef'}
          {...name}
        />
        <InputWrap>
          <span>수용인원(2~30) :</span>
          <Input_100
            placeholder={''}
            {...maxMember}
            type={'number'}
            step={1}
            width={'80px'}
            height={'25px'}
          />
          명
        </InputWrap>
        <InputWrap>
          <span>카테고리 :</span>
          <Select
            {...groupCategory}
            id={'groupCategory_id'}
            width={'100px'}
            height={'25px'}
          />
        </InputWrap>
        <InputWrap>
          <span>하루 목표 학습 시간(1~18) :</span>
          <Input_100
            placeholder={''}
            {...targetTime}
            type={'number'}
            step={1}
            width={'80px'}
            height={'25px'}
          />
          시간
        </InputWrap>
        <ActiveDateDiv>
          <div>활동 요일</div>
          <SubTDiv>(출석 및 통계에 반영)</SubTDiv>
          <DayWrap>
            {dayList.map((day, index) => {
              return (
                <DayIndiWrap key={index}>
                  {day}
                  <br />
                  <CheckBox
                    checked={dayBool[index]}
                    onChange={onCheckDay(index)}
                    boxSize={'25px'}
                    margin={'0'}
                  />
                </DayIndiWrap>
              );
            })}
          </DayWrap>
        </ActiveDateDiv>
        <Input_100
          placeholder={'(선택) 비밀번호'}
          width={'376px'}
          height={'35px'}
          margin={'0 0 10px 0'}
          bgColor={'#f1f0ef'}
          {...password}
          type="password"
          required={false}
        />
        <CaptionText
          placeholder={'(선택) 그룹 소개'}
          bgColor={'#f1f0ef'}
          {...bio}
          required={false}
        />
        <ImgWrap>
          <span>그룹 이미지 :</span>
          <ImgSelectDiv>
            <PreviewImg
              id="pre-img-group"
              url={CU_check === 'create' ? defaultImg : imgUrl}
            ></PreviewImg>
            <input
              id="group-img-file"
              type="file"
              accept="image/*"
              style={{ width: '200px' }}
              onChange={(e) => handleFileInput(e)}
            />
          </ImgSelectDiv>
        </ImgWrap>
      </ContentDiv>
      <ButtonDiv>
        <PopupButton text={CU_check === 'create' ? '만들기' : '수정'} />
        <PopupButton
          type="button"
          onClick={() => {
            setViewTabs(0);
            groupClear();
          }}
          text={'돌아가기'}
        />
      </ButtonDiv>
    </ContentBody>
  );
};

// 이미지 기본값 설정 후 다시 다른 이미지 넣으면 오류 떠서 포기
// const canvas = document.getElementById('pre-img-group');
// var img = new Image();
// img.src = 'https://slog-iam.s3.ap-northeast-2.amazonaws.com/group/groupimg.png';
// // imageResizeDraw(img, 'pre-img-group', 640, false);
// canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
// document.getElementById('group-img-file').value = '';
