import React from 'react';
import styled from 'styled-components';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

function PaymentResult({ history }) {
  const pushRoute = localStorage.getItem('billingBack');
  const { location } = history;
  const { search } = location;
  const query = queryString.parse(search);
  // console.log(history);
  // console.log(location);
  // console.log(search);
  // console.log(query);

  const { success_msg, error_msg } = query;
  const isSuccessed = getIsSuccessed();
  function getIsSuccessed() {
    const { success, imp_success } = query;
    if (typeof imp_success === 'string') return imp_success === 'true';
    if (typeof imp_success === 'boolean') return imp_success === true;
    if (typeof success === 'string') return success === 'true';
    if (typeof success === 'boolean') return success === true;
  }

  const resultType = isSuccessed ? '성공' : '실패';
  const colorType = isSuccessed ? '#52c41a' : '#f5222d';
  return (
    <Wrapper>
      <Container colorType={colorType}>
        {isSuccessed ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}
        <p>{`결제에 ${resultType}하였습니다`}</p>
        <ul>
          {isSuccessed ? (
            <li>
              <span>결제 결과 메시지</span>
              <span>{success_msg}</span>
            </li>
          ) : (
            <li>
              <span>에러 메시지</span>
              <span>{error_msg}</span>
            </li>
          )}
        </ul>
        <Button
          size="large"
          danger={true}
          onClick={async () => {
            await history.push(pushRoute);
            await localStorage.removeItem('billingBack');
          }}
        >
          <ArrowLeftOutlined />
          돌아가기
        </Button>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  bottom: 2rem;
  padding: 2rem;

  > .anticon {
    font-size: 10rem;
    text-align: center;
    margin-bottom: 2rem;
    color: ${(props) => props.colorType};
  }
  p {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 3rem;

    li {
      display: flex;
      line-height: 2;
      span:first-child {
        width: 8rem;
        color: #888;
      }
      span:last-child {
        width: calc(100% - 8rem);
        color: #333;
      }
    }
  }

  button,
  button:hover {
    border-color: ${(props) => props.colorType};
    color: ${(props) => props.colorType};
  }
  button:hover {
    opacity: 0.7;
  }
`;

export default withRouter(PaymentResult);
