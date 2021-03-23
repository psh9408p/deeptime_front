import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 100px;
  padding-inline-start: 1.25rem;
  padding-inline-end: 1.25rem;
`;

const Wrap = styled.div`
  width: 40%;
  min-width: 320px;
  margin: 0 auto;
  display: block;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  font-weight: 600;
  font-size: 2.25rem;
  margin-bottom: 1.25rem;
`;

const Faq = styled.p`
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  min-width: 320px;
`;

const RefUl = styled.ul`
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
  display: block;
`;

const Refli = styled.li`
  padding-bottom: 1em;
  list-style: circle;
`;

const Border = styled.div`
  width: 100%;
  border-bottom: 0.5px solid black;
  margin-bottom: 1.25rem;
`;
const Refund = () => {
  return (
    <div>
      <Wrapper>
        <Wrap>
          <Title>취소 및 환불정책</Title>
          <Faq>
            환불은 이메일을 통해 신청하실 수 있습니다.
            <br /> 평생교육법 시행령 제23조 학습비 반환 규정에 근거하여 환불이
            진행이 되고 있습니다.
          </Faq>
          <Faq>
            {' '}
            수강 기간은 30일 (유료 1개월 + 무료 복습 1개월)을 기준으로 합니다.
            <br />
            환불 의사를 밝힌 다음날부터(영업일 기준) 반올림으로 계산하여
            환불합니다. 반환 사유 발생 시 5 영업일 이내 환불됩니다.
          </Faq>
          <Faq>(예시) 6월 1일. 결제하였을 경우</Faq>
          <RefUl>
            <Refli>6월 1일 ~ 6월 7일: (5강 미만 수강시) 전액 환불 가능</Refli>
            <Refli>6월 8일 ~ 6월 10일: 2/3 환불</Refli>
            <Refli>6월 11일 ~ 6월 15일: 1/2 환불</Refli>
            <Refli>6월 16일 이후: 환불 없음</Refli>
          </RefUl>
          <Border></Border>
          <Faq>
            환불을 원하는 경우 아래와 같이 작성하시어 이메일
            (help@nomadcoders.co) 로 보내주시면 처리해드리도록 하겠습니다.
          </Faq>
          <RefUl>
            <Refli>계정 이메일</Refli>
            <Refli>환불을 원하는 과목</Refli>
            <Refli>취소 사유</Refli>
          </RefUl>
        </Wrap>
      </Wrapper>
    </div>
  );
};

export default Refund;
