import React from 'react';
import styled from 'styled-components';
const Cts = styled.span`
  padding-top: 30px;
  font-size: 24px;
  margin-right: auto;
  border-bottom: 2px solid black;
  margin-left: 30px;
`;

const ContentsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: auto;
  margin: 0 auto;
  box-shadow: 1px 2px 2px 4px #dee1e7;
  background-color: #fff;
`;

const ContentsOl = styled.ol`
  padding: 30px;
  font-size: 20px;
  font-weight: bold;
`;

const ContentsTitle = styled.div`
  margin: 8px 0 8px 0;
  font-size: 20px;
  font-weight: bold;
`;

const ContentsSubTitle = styled.div`
  font-size: 12px;
  margin-bottom: 8px;
`;

const Contents = () => {
  const TestCts = [
    { Title: '목차입니다', subTitle: 'Mix', subTitle2: 'MixMix' },
    { Title: '목차입니다2', subTitle: 'Mix2' },
    { Title: '목차입니다3', subTitle: 'Mix3' },
  ];

  return (
    <ContentsWrap>
      <Cts>Contents</Cts>
      <ContentsOl style={{ listStyle: 'decimal' }}>
        {TestCts.map((cts, index) => (
          <li key={index}>
            <ContentsTitle>{cts.Title}</ContentsTitle>
            <ol style={{ listStyle: 'decimal' }}>
              <ul>
                <ContentsSubTitle>{cts.subTitle}</ContentsSubTitle>
              </ul>
              <ul>
                <ContentsSubTitle>{cts.subTitle2}</ContentsSubTitle>
              </ul>
            </ol>
          </li>
        ))}
      </ContentsOl>
    </ContentsWrap>
  );
};

export default Contents;
