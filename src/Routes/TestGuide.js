import React from 'react';
import GuideHeader from './GuideHeader';
import styled from 'styled-components';

const GuideWrap = styled.div`
  align-items: center;
  margin: 0 auto;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  width: 900px;
`;

const TestGuide = () => {
  return (
    <GuideWrap>
      <div>딥타임 가이드</div>
      <GuideHeader />
    </GuideWrap>
  );
};

export default TestGuide;
