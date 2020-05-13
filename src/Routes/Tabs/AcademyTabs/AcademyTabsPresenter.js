import React, { useEffect } from 'react';
import AcademyTab from './AcademyTab';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Popup from 'reactjs-popup';
import Input from '../../../Components/Input';
import Select from '../../../Components/Select';
import PopupButton from '../../../Components/Buttons/PopupButton';
import FatText from '../../../Components/FatText';
import PopButton from '../../../Components/Buttons/PopButton';

const Regist = styled.div`
  width: 100%;
`;

const PopupDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px 30px;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 700px !important;
    height: 400px !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const PBody = styled.div`
  form {
    display: flex;
    flex-direction: column;
    width: 600px;
    padding: 20px 20px;
  }
`;

const SelectDiv = styled.div`
  display: inline-flex;
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  height: 35px;
  font-size: 12px;
  max-width: 100%;
  margin-bottom: 7px;
  span {
    display: inline-flex;
    width: 120px;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
`;

const AcademyKindDiv = styled.div`
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
`;

const SmallInput = styled(Input)`
  width: 200px;
  margin-bottom: 7px;
  margin-right: 15px;
`;

const LargeInput = styled(Input)`
  max-width: 600px;
  margin-bottom: 7px;
`;

const PTitle = styled(FatText)`
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

const openSearchURL = () => {
  const url =
    'https://s.search.naver.com/n/csearch/content/eprender.nhn?where=nexearch&pkid=252&q=%EC%9A%B0%ED%8E%B8%EB%B2%88%ED%98%B8&key=address_kor';
  window.open(url, '_blank');
};

const AcademyRowWrap = styled.div`
  width: 100%;
  padding: 0px 30px;
`;

export default ({
  pageIndex,
  pageIndexChange,
  academyName,
  academyZipCode,
  academyAddress1,
  academyAddress2,
  academyDetailAddress,
  academyKind,
  academyData,
  academyRefetch,
  onSubmitAcademy,
  clearAcademy,
}) => {
  academyRefetch();
  if (pageIndex === 0) {
    if (academyData[0] === undefined) {
      alert(
        '학원 등록 후 통계 정보를 볼 수 있습니다.\n나의 학원으로 이동합니다.',
      );
      pageIndexChange(1);
      return <></>;
    } else {
      return <></>;
    }
  } else if (pageIndex === 1) {
    return (
      <Regist>
        <PopupDiv>
          <PopupCustom
            trigger={<PopButton text={'학원 추가'} />}
            closeOnDocumentClick={false}
            modal
          >
            {(close) => (
              <PBody>
                <form onSubmit={onSubmitAcademy}>
                  <PTitle text={'학원 정보'} />
                  <SmallInput
                    placeholder={'학원명 (예: 아이엠학원)'}
                    {...academyName}
                  />
                  <div>
                    <SmallInput
                      placeholder={'우편번호 (예: 12345)'}
                      {...academyZipCode}
                    />
                    <PopButton
                      type={'button'}
                      onClick={openSearchURL}
                      text={'주소검색'}
                    />
                  </div>
                  <SelectDiv>
                    <span>주소</span>
                    <Select {...academyAddress1} id={'modifyAddress1_1'} />
                    <Select {...academyAddress2} id={'modifyAddress2'} />
                  </SelectDiv>
                  <LargeInput
                    placeholder={
                      '상세주소 (예: 봉은사로72길 13-4 (삼성동) 채움빌딩 203호)'
                    }
                    {...academyDetailAddress}
                  />
                  <AcademyKindDiv>
                    <span>분류</span>
                    <Select {...academyKind} id={'academyKind_id'} />
                  </AcademyKindDiv>
                  <ButtonDiv>
                    <PopupButton text={'등록'} />
                    <PopupButton
                      type="button"
                      onClick={() => {
                        close();
                        clearAcademy();
                      }}
                      text={'닫기'}
                    />
                  </ButtonDiv>
                </form>
              </PBody>
            )}
          </PopupCustom>
        </PopupDiv>
        <AcademyRowWrap>
          {academyData.map((academy, index) => (
            <AcademyTab
              key={index}
              academy={academy}
              academyRefetch={academyRefetch}
              academyName={academyName}
              academyZipCode={academyZipCode}
              academyKind={academyKind}
              academyAddress1={academyAddress1}
              academyAddress2={academyAddress2}
              academyDetailAddress={academyDetailAddress}
              openSearchURL={openSearchURL}
              clearAcademy={clearAcademy}
            />
          ))}
        </AcademyRowWrap>
      </Regist>
    );
  }
};
