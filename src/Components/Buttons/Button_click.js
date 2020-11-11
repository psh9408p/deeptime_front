import React from 'react';
import styled from 'styled-components';
import { Camera, Refresh } from '../Icons';

const Container = styled.button`
  font-size: 24px;
  padding: 3px 5px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  outline: none;
  color: #fff;
  background-color: ${(props) => props.theme.classicGray};
  border: none;
  border-radius: 5px;
  /* box-shadow: 0 3px #999; */
  :hover {
    background-color: ${(props) => props.theme.lightGreyColor};
  }
  :active {
    background-color: ${(props) => props.theme.lightGreyColor};
    /* box-shadow: 0 3px #666; */
    transform: translateY(4px);
  }
`;

export const Button_refresh = ({ onClick }) => (
  <Container onClick={onClick}>
    <Refresh />
  </Container>
);

export const Button_capture = ({ onClick }) => (
  <Container onClick={onClick}>
    <Camera />
  </Container>
);

export default Button_capture;