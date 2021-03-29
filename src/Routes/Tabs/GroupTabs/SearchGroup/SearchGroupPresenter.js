import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Add, Lock } from '../../../../Components/Icons';
import Popup from 'reactjs-popup';
import CheckBox from '../../../../Components/CheckBox';
import Select from '../../../../Components/Select';
import useSelect from '../../../../Hooks/useSelect';
import OneGroup from '../OneGroup/';
import CUGroup from '../CUGroup';

import { studyOption_group } from '../../../../Components/LongArray';

const FilterdSelect = styled.div`
  width: 100px;
  height: 100%;
`;

const FilterDiv = styled.div`
  display: flex;
  div:nth-child(1) {
    margin-right: 10px;
  }
`;

const CheckedDiv = styled.div`
  display: flex;

  margin-right: 150px;
`;

const Check_Box = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 50px;
  padding: 10px;
  margin-top: 10px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  /* position: fixed !important;
  z-index: 10; */
`;

const GroupListWrap = styled.div`
  margin-top: 10px;
  width: 100%;
  max-width: 600px;
`;

const GroupBox = styled.div`
  cursor: pointer;
  display: flex;
  padding: 10px;
  width: 100%;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  :hover {
    filter: brightness(80%);
  }
  :not(:last-child) {
    margin-bottom: 10px;
  }
`;
const ImageWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageBox = styled.div`
  width: 200px;
  height: 112.5px;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center center;
  border-radius: 4px;
`;
const MemberWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

const MemberTitle = styled.div`
  display: flex;
`;

const MemberDiv = styled.div`
  display: flex;
  margin-top: 8px;
  flex-direction: column;
`;

const MemberList = styled.p`
  display: flex;
`;

const PopupCustom = styled(Popup)`
  &-content {
    width: 650px !important;
    max-height: 820px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => props.theme.borderRadius};
  }
`;
let group_tmp = [];

export default ({
  viewTabs,
  setViewTabs,
  maxMember,
  groupCategory,
  targetTime,
  password,
  bio,
  name,
  onCreateGroup,
  groupClear,
  groupData,
  makeLoad,
  setSelectFile,
}) => {
  const getAll = studyOption_group.slice();
  getAll.unshift('전체');

  const group1 = useSelect(getAll, getAll, groupData.category);

  const arr3 = ['높은 시간순', '낮은 시간순', '높은 출석률순', '낮은 출석률순'];
  const sTime = useSelect(arr3, arr3);

  const [filData, setFilData] = useState(groupData);
  const [publicBool, setPublicBool] = useState(false);
  const [empty, setEmpty] = useState(false);

  const getData = () => {
    if (group1.option === '전체') {
      group_tmp = groupData;
    } else {
      const filGroup = groupData.filter(
        (ctr) => ctr.category === group1.option,
      );
      group_tmp = filGroup;
    }
  };

  const timeSort = () => {
    if (sTime.option === '높은 시간순') {
      group_tmp.sort(function (a, b) {
        return b.lastStudyTime - a.lastStudyTime;
      });
    } else if (sTime.option === '낮은 시간순') {
      group_tmp.sort(function (a, b) {
        return a.lastStudyTime - b.lastStudyTime;
      });
    } else if (sTime.option === '낮은 출석률순') {
      group_tmp.sort(function (a, b) {
        return a.lastAttendance - b.lastAttendance;
      });
    } else if (sTime.option === '높은 출석률순') {
      group_tmp.sort(function (a, b) {
        return b.lastAttendance - a.lastAttendance;
      });
    }
  };
  const publicHandler = () => {
    if (publicBool) {
      const filGroup = group_tmp.filter((ctr) => ctr.publicBool === true);
      group_tmp = filGroup;
    }
  };

  const emptyHandle = () => {
    if (empty) {
      const filGroup = group_tmp.filter(
        (ctr) => ctr.maxMember > ctr.memberCount,
      );
      group_tmp = filGroup;
    }
  };

  const publicBoolHandler = () => {
    setPublicBool(!publicBool);
  };

  const emptyHandler = () => {
    setEmpty(!empty);
  };

  useEffect(() => {
    getData();
    timeSort();
    publicHandler();
    emptyHandle();
    setFilData(group_tmp);
  }, [group1.option, sTime.option, publicBool, empty]);

  return (
    <>
      {viewTabs === 0 ? (
        <>
          <HeaderDiv>
            <FilterDiv>
              <FilterdSelect>
                <Select {...group1} id={'testSelect'} />
              </FilterdSelect>
              <FilterdSelect>
                <Select {...sTime} id={'testSelect2'} />
              </FilterdSelect>
            </FilterDiv>
            <CheckedDiv>
              <Check_Box>
                <CheckBox
                  id={'publicCheck'}
                  boxSize={'30px'}
                  margin={'0 5px'}
                  checked={publicBool}
                  onChange={publicBoolHandler}
                />
                <span style={{ marginRight: '10px' }}>공개</span>
              </Check_Box>
              <Check_Box>
                <CheckBox
                  id={'emptyCheck'}
                  boxSize={'30px'}
                  margin={' 0 5px'}
                  checked={empty}
                  onChange={emptyHandler}
                />
                <span>빈방</span>
              </Check_Box>
            </CheckedDiv>
            <Add
              fill={'#0F4C82'}
              onClick={() => {
                setViewTabs(1);
              }}
            />
          </HeaderDiv>
          <GroupListWrap>
            {filData.map((group) => (
              <PopupCustom
                key={group.id}
                trigger={
                  <GroupBox>
                    <ImageWrap>
                      <ImageBox url={group.imgUrl} />
                    </ImageWrap>
                    <MemberWrap>
                      <MemberTitle>
                        <p style={{ fontSize: '16px', fontWeight: '600' }}>
                          {group.name}
                        </p>
                        {!group.publicBool && <Lock marginLeft={'6px'} />}
                      </MemberTitle>
                      <MemberDiv>
                        <p style={{ marginBottom: '5px' }}>{group.category}</p>
                        <p style={{ marginBottom: '5px' }}>
                          목표 시간: {group.targetTime} 시간
                        </p>
                        <p style={{ marginBottom: '5px' }}>
                          평균 학습 시간: {group.lastStudyTime.toFixed(0)} 시간
                        </p>
                        <p style={{ marginBottom: '5px' }}>
                          평균 출석률: {group.lastAttendance.toFixed(0)} %
                        </p>
                        <MemberList>
                          <span style={{ marginRight: '10px' }}>
                            인원: {group.memberCount}/{group.maxMember}
                          </span>
                          <span style={{ marginRight: '10px' }}>
                            방장: {group.manager.username}
                          </span>
                        </MemberList>
                      </MemberDiv>
                    </MemberWrap>
                  </GroupBox>
                }
                closeOnDocumentClick={false}
                modal
              >
                {(close) => {
                  return (
                    <OneGroup close={close} groupInfo={group} isSearch={true} />
                  );
                }}
              </PopupCustom>
            ))}
          </GroupListWrap>
        </>
      ) : (
        <CUGroup
          CU_check={'create'}
          setViewTabs={setViewTabs}
          maxMember={maxMember}
          groupCategory={groupCategory}
          targetTime={targetTime}
          password={password}
          bio={bio}
          name={name}
          onSubmit={onCreateGroup}
          groupClear={groupClear}
          loading={makeLoad}
          setSelectFile={setSelectFile}
        />
      )}
    </>
  );
};
