import React, { useState } from 'react';
import styled from 'styled-components';

const FaqWrap = styled.div`
  display: flex;
  justify-content: space-between;
  div:nth-child(1) {
    margin-right: 30px;
  }
`;

const HiddenFaq = styled.ul`
  display: ${(props) => (props.visible ? 'none' : 'block')};
  font-size: 20px;
  padding-bottom: 18px;
`;

const HiddenLi = styled.li`
  padding: 8px 0;
`;

const TitleFaq = styled.div`
  margin-bottom: 15px;

  font-size: 22px;
`;

const SectionFaq = styled.div`
  width: 600px;
`;

const Jilmoon = () => {
  const [visible, setVisible] = useState();

  const VisibleHandler = () => {
    setVisible(!visible);
  };
  return (
    <FaqWrap>
      <SectionFaq>
        <TitleFaq onClick={VisibleHandler}>
          <div style={{ marginBottom: '14px' }}>
            <span style={{ marginRight: '8px' }}>Q</span> .[DEEPTIME PLAYER]
            시간 측정이 안돼요.
          </div>
          <HiddenFaq visible={visible}>
            <li>1 . 내용내용내용</li>
            <HiddenLi>2. 내용내용내용</HiddenLi>
            <li>3. 내용내용내용</li>
          </HiddenFaq>
        </TitleFaq>
        <TitleFaq>
          <div style={{ display: 'flex', marginBottom: '14px' }}>
            <span style={{ marginRight: '8px' }}>Q</span> .[DEEPTIME PLAYER]
            자동 캡쳐 된 파일의 알람이 계속 뜨는 경우.
          </div>
          <HiddenFaq visible={visible}>
            <li>1 . 내용내용내용</li>
            <HiddenLi>2. 내용내용내용</HiddenLi>
            <li>3. 내용내용내용</li>
          </HiddenFaq>
        </TitleFaq>
        <TitleFaq>
          <div style={{ display: 'flex', marginBottom: '14px' }}>
            <span style={{ marginRight: '8px' }}>Q</span> .[DEEPTIME PLAYER]
            자동 캡쳐 된
          </div>{' '}
          <HiddenFaq visible={visible}>
            <li>1 . 내용내용내용</li>
            <HiddenLi>2. 내용내용내용</HiddenLi>
            <li>3. 내용내용내용</li>
          </HiddenFaq>
        </TitleFaq>
      </SectionFaq>
    </FaqWrap>
  );
};

export default Jilmoon;
