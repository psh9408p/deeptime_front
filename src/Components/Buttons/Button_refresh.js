import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Refresh } from '../Icons';

const Container = styled.button`
  font-size: 24px;
  padding: 3px 10px;
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
  border-radius: 10px;
  box-shadow: 0 3px #999;
  :hover {
    background-color: ${(props) => props.theme.lightGreyColor};
  }
  :active {
    background-color: ${(props) => props.theme.lightGreyColor};
    box-shadow: 0 3px #666;
    transform: translateY(4px);
  }
`;

const Button = ({ onClick }) => (
  <Container onClick={onClick}>
    <Refresh />
  </Container>
);

export default Button;
