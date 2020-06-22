import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Regist = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  margin: 0 auto;
  padding: 25px 0;
`;

const ContentLink = styled(Link)`
  cursor: pointer;
  width: 320px;
  height: 45px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: black;
  font-weight: 700;
`;

export default ({ pageIndex }) => {
  if (pageIndex === 0) {
    return (
      <Regist>
        <ContentLink to="/manage-subscription" replace>
          구독 관리
        </ContentLink>
        <ContentLink to="/order-history" replace>
          결제/이용권 내역
        </ContentLink>
        <ContentLink to="/voucher" replace>
          이용권 등록
        </ContentLink>
      </Regist>
    );
  } else if (pageIndex === 1) {
    return <Regist>2</Regist>;
  }
};
