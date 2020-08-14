import React from 'react';
import styled from 'styled-components';

const TmpDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0 30px 0;
`;

const Content = styled.p`
  margin-top: 10px;
  line-height: 1.7em;
  font-weight: bold;
  font-size: 20px;
`;

const Content_ul = styled.ul`
  padding: 10px 0 10px 20px;
  list-style-position: outside;
  list-style-type: disc;
  li {
    line-height: 1.7em;
  }
`;

export default () => {
  return (
    <TmpDiv>
      <Content>[임시 고객서비스 담당]</Content>
      <Content_ul>
        <li>이름 : 박영석</li>
        <li>연락처 : 070-8955-8107 (010-9381-8107)</li>
        <li>이메일 : iam.ai.project.pl@gamil.com</li>
      </Content_ul>
    </TmpDiv>
  );
};
