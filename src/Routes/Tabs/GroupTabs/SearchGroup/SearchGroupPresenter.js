import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Add, Lock } from '../../../../Components/Icons';
import Popup from 'reactjs-popup';
import CheckBox from '../../../../Components/CheckBox';
import Select from '../../../../Components/Select';
import Button_custom from '../../../../Components/Buttons/Button_custom';
import OneGroup from '../OneGroup/';
import CUGroup from '../CUGroup';

const FilterdSelect = styled.div`
  width: 120px;
  height: 100%;
  margin-right: 10px;
  /* :first-child {
    width: 80px;
    margin-right: 10px;
  } */
`;

const FilterDiv = styled.div`
  display: flex;
  height: 28px;
  margin-right: 10px;
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
  margin: 10px 0 25px 0;
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
  p {
    margin-bottom: 5px;
    span {
      font-weight: 600;
      color: ${(props) => props.theme.lightGreyColor};
    }
  }
`;

const CategoryDiv = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.classicBlue};
  margin-bottom: 5px;
`;

const MemberList = styled.div`
  span {
    margin-right: 10px;
    span {
      margin: 0;
      font-weight: 600;
      color: ${(props) => props.theme.lightGreyColor};
    }
  }
  :not(:last-child) {
    margin-bottom: 5px;
  }
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

const MoreDiv = styled.div`
  width: 100%;
  max-width: 600px;
`;

const dayArray = ['일', '월', '화', '수', '목', '금', '토'];

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
  dayBool,
  setDayBool,
  categroyFilter,
  groupNetwork,
  publicBoolHandler,
  emptyHandler,
  publicBool,
  empty,
  first,
  setFirst,
  feedTerm,
  variables,
  orderFilter,
}) => {
  // 출석률 높은 순으로
  // groupData.sort(function (a, b) {
  //   return b.lastAttendance - a.lastAttendance;
  // });

  return (
    <>
      {viewTabs === 0 ? (
        <>
          <HeaderDiv>
            <FilterDiv>
              <FilterdSelect>
                <Select {...categroyFilter} id={'testSelect'} />
              </FilterdSelect>
              <FilterdSelect>
                <Select {...orderFilter} id={'testSelect2'} />
              </FilterdSelect>
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
            </FilterDiv>
            <Add
              fill={'#0F4C82'}
              onClick={() => {
                setViewTabs(1);
              }}
            />
          </HeaderDiv>
          <GroupListWrap>
            {groupData.map((group) => {
              // 마지막 요일 검출
              const lastDayIndex = group.activeDay.lastIndexOf(true);
              const everyDay = group.activeDay.filter(Boolean).length === 7;
              return (
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
                          <CategoryDiv>{group.category}</CategoryDiv>
                          {/* <p>
                            <span>평균 학습량</span>{' '}
                            {group.lastStudyTime.toFixed(0)} 시간
                          </p> */}
                          <p>
                            <span>평균 출석률</span>{' '}
                            {group.lastAttendance.toFixed(0)} %
                          </p>
                          <p>
                            <span>하루 목표</span> {group.targetTime} 시간
                          </p>
                          <p>
                            <span>활동 요일</span>{' '}
                            {everyDay
                              ? '매일'
                              : group.activeDay.map((bool, index) => {
                                  if (bool) {
                                    if (index === lastDayIndex) {
                                      return dayArray[index];
                                    } else {
                                      return dayArray[index] + ', ';
                                    }
                                  }
                                })}
                          </p>
                          <MemberList>
                            <span>
                              <span>인원</span> {group.memberCount}/
                              {group.maxMember}
                            </span>
                            <span>
                              <span>방장</span> {group.manager.username}
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
                      <OneGroup
                        close={close}
                        groupInfo={group}
                        isSearch={true}
                        variables={variables}
                      />
                    );
                  }}
                </PopupCustom>
              );
            })}
          </GroupListWrap>
          <MoreDiv>
            <Button_custom
              margin={'0 0 30px 0'}
              width={'100%'}
              text={'그룹 더보기'}
              loading={groupNetwork === 2 ? true : false}
              onClick={() => {
                setFirst(first + feedTerm);
              }}
            />
          </MoreDiv>
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
          dayBool={dayBool}
          setDayBool={setDayBool}
        />
      )}
    </>
  );
};

// 필터링 쓰던거
// const getData = () => {
//   if (categroyFilter.option === '전체') {
//     group_tmp = groupData;
//   } else {
//     const filGroup = groupData.filter(
//       (ctr) => ctr.category === categroyFilter.option,
//     );
//     group_tmp = filGroup;
//   }
// };

// const timeSort = () => {
//   if (orderFilter.option === '높은 학습 시간순') {
//     group_tmp.sort(function (a, b) {
//       return b.lastStudyTime - a.lastStudyTime;
//     });
//   } else if (orderFilter.option === '낮은 학습 시간순') {
//     group_tmp.sort(function (a, b) {
//       return a.lastStudyTime - b.lastStudyTime;
//     });
//   } else if (orderFilter.option === '낮은 출석률순') {
//     group_tmp.sort(function (a, b) {
//       return a.lastAttendance - b.lastAttendance;
//     });
//   } else if (orderFilter.option === '높은 출석률순') {
//     group_tmp.sort(function (a, b) {
//       return b.lastAttendance - a.lastAttendance;
//     });
//   }
// };
// const publicHandler = () => {
//   if (publicBool) {
//     const filGroup = group_tmp.filter((ctr) => ctr.publicBool === true);
//     group_tmp = filGroup;
//   }
// };

// const emptyHandle = () => {
//   if (empty) {
//     const filGroup = group_tmp.filter(
//       (ctr) => ctr.maxMember > ctr.memberCount,
//     );
//     group_tmp = filGroup;
//   }
// };

// const isFirstRun = useRef(true);
// useEffect(() => {
//   if (groupNetwork === 7) {
//     getData();
//     timeSort();
//     publicHandler();
//     emptyHandle();
//     setFilData(group_tmp);
//   }
//   // 맨처음 보여질 때 필터한게 적용 안되서 보여서 랜더 한번더
//   if (isFirstRun.current) {
//     setReRen(!reRen);
//     isFirstRun.current = false;
//     return;
//   }
// }, [
//   categroyFilter.option,
//   orderFilter.option,
//   publicBool,
//   empty,
//   groupNetwork,
// ]);
