import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';
import { Card } from '../Components/Icons';
import Button_pay from '../Components/Buttons/Button_pay';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 66px 30px 80px 30px;
`;

const TitleDiv = styled.div`
  font-size: 42px;
  line-height: 60px;
  margin-top: 20px;
  font-weight: bold;
`;

const DetailUl = styled.ul`
  margin: 16px 0px 40px;
  list-style: none;
  li {
    &:before {
      font-size: 12px;
      content: '■　';
      color: ${(props) => props.theme.lightGreyColor};
    }
    display: list-item;
    font-size: 18px;
    font-weight: 400;
    line-height: 32px;
  }
`;

const ButtonWrap = styled.div`
  width: 300px;
  height: 50px;
`;

export default () => {
  let history = useHistory();

  const billingCallback = (response) => {
    console.log(response);
    const query = queryString.stringify(response);
    history.push(`/payment/result?${query}`);
  };

  const billingOnClick = () => {
    const { IMP } = window;
    IMP.init(process.env.REACT_APP_IMPORT_CODE);
    IMP.request_pay(
      {
        pay_method: 'card', // 'card'만 지원됩니다.
        merchant_uid: 'iam_' + new Date().getTime(),
        name: '최초인증결제',
        amount: 0, // 빌링키 발급만 진행하며 결제승인을 하지 않습니다.
        customer_uid: 'ck9v23v2t009d0741628dfc34', //customer_uid 파라메터가 있어야 빌링키 발급을 시도합니다.
        buyer_email: 'iamport@siot.do',
        buyer_name: '정상헌',
        buyer_tel: '02-1234-1234',
      },
      billingCallback,
    );
  };

  return (
    <Wrapper>
      <Card />
      <TitleDiv>
        1개월 무료 혜택으로
        <br />
        IAM의 모든 학습 기능을 체험해보세요.
      </TitleDiv>
      <DetailUl>
        <li>1개월 무료 이용 후 자동결제 됩니다.</li>
        <li>
          (무료)이용 기간 만료 전에 구독을 해지하시면 다음 예약 결제가
          취소됩니다.
        </li>
        <li>1개월 무료 이용은 계정당 1회만 제공됩니다.</li>
      </DetailUl>
      <ButtonWrap>
        <Button_pay
          text={
            '구독(카드 등록) 하기' + '\xa0\xa0\xa0\xa0\xa0\xa0' + '9,900원/월'
          }
          onClick={billingOnClick}
        />
      </ButtonWrap>
    </Wrapper>
  );
};
