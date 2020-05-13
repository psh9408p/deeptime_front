import React from 'react';
import styled from 'styled-components';

const Regist = styled.div`
  width: 100%;
`;

export default ({ pageIndex }) => {
  if (pageIndex === 0) {
    return <Regist>1</Regist>;
  } else if (pageIndex === 1) {
    return <Regist>2</Regist>;
  } else if (pageIndex === 2) {
    return <Regist>3</Regist>;
  }
};
