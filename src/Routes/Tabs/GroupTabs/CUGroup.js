import React from 'react';
import styled from 'styled-components';
import PopupButton from '../../../Components/Buttons/PopupButton';
import FatText from '../../../Components/FatText';
import Input_100 from '../../../Components/Input_100';
import Textarea from '../../../Components/Textarea';
import Select from '../../../Components/Select';
import Loader from '../../../Components/Loader';

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

export default ({
  CU_check,
  setViewTabs,
  maxMember,
  groupCategory,
  targetTime,
  password,
  bio,
  name,
  onSubmit,
  groupClear,
  loading,
}) => {
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
          <span>수용인원(2~50) :</span>
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
          <span>최소 학습 시간(1~18) :</span>
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
