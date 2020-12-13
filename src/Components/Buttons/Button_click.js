import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Camera, Refresh, Setting, Timelapse, Control } from '../Icons';

const Container = styled.button`
  font-size: 24px;
  padding: 3px 5px;
  margin: ${(props) => props.margin};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  color: #fff;
  background-color: ${(props) => props.theme.classicGray};
  border: none;
  outline: none;
  border-radius: 5px;
  /* box-shadow: 0 3px #999; */
  :hover {
    background-color: ${(props) => props.theme.lightGreyColor};
    filter: none;
  }
  :active {
    background-color: ${(props) => props.theme.lightGreyColor};
    /* box-shadow: 0 3px #666; */
    transform: translateY(4px);
  }
`;

export const Button_refresh = ({ onClick, margin = '0 10px 0 0' }) => (
  <Container onClick={onClick} margin={margin}>
    <Refresh />
  </Container>
);

export const Button_capture = ({ onClick, margin = '0 10px 0 0' }) => (
  <Container onClick={onClick} margin={margin}>
    <Camera />
  </Container>
);

export const Button_timelapse = ({ onClick, margin = '0 10px 0 0' }) => (
  <Container onClick={onClick} margin={margin}>
    <Timelapse />
  </Container>
);

export const Button_control = ({ onClick, margin = '0 10px 0 0' }) => (
  <Container onClick={onClick} margin={margin}>
    <Control />
  </Container>
);

export const Button_setting = forwardRef(
  ({ onClick, margin = '0 10px 0 0' }, ref) => (
    <Container ref={ref} onClick={onClick} margin={margin}>
      <Setting />
    </Container>
  ),
);

export default Button_capture;
