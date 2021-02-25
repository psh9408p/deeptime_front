import React, { useState } from 'react';
import styled from 'styled-components';
import { Add, Star } from '../../../../Components/Icons';
import OneGroup from '../OneGroup';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  padding: 10px;
`;

const MyGroupsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 120px;
  width: 800px;
  padding: 10px 15px;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
`;

const IndiGroup = styled.div`
  cursor: pointer;
  width: 250px;
  height: 100px;
  border: ${(props) =>
    props.selectBool ? '3px solid #0F4C82' : props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.lightGreyColor};
  :hover {
    filter: brightness(120%);
  }
  :not(:last-child) {
    margin-right: 10px;
  }
  svg {
    :hover {
      filter: brightness(60%);
    }
  }
`;

const AddBox = styled(IndiGroup)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OneGroupWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 650px;
  padding: 10px;
  margin: 10px auto;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
`;

export default ({ groupData, onBookmark, myTabs }) => {
  // 북마크한 그룹이 처음으로 오게
  groupData.sort(function (a, b) {
    return a.bookmark === true && b.bookmark !== true
      ? -1
      : a.bookmark !== true && b.bookmark === true
      ? 1
      : 0;
  });
  const [selectId, setSelectId] = useState(groupData[0] ? groupData[0].id : '');
  const selectIndex = groupData.findIndex((a) => a.id === selectId);

  return (
    <Wrapper>
      <MyGroupsWrap>
        {groupData.map((group, index) => {
          const selectBool = group.id === selectId;
          return (
            <IndiGroup
              key={index}
              selectBool={selectBool}
              onClick={() => {
                setSelectId(group.id);
              }}
            >
              {group.name}
              <Star
                fill={group.bookmark ? 'yellow' : 'grey'}
                onClick={() => {
                  onBookmark(group.id, !group.bookmark);
                }}
              />
            </IndiGroup>
          );
        })}
        {groupData.length < 3 && (
          <AddBox
            onClick={() => {
              myTabs.changeItem(1);
            }}
          >
            <Add fill={'#0F4C82'} />
          </AddBox>
        )}
      </MyGroupsWrap>
      {groupData[selectIndex] && (
        <OneGroupWrap>
          <OneGroup
            close={() => {}}
            groupInfo={groupData[selectIndex]}
            selectId={selectId}
          />
        </OneGroupWrap>
      )}
    </Wrapper>
  );
};
