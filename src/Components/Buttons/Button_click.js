import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Camera, Refresh, Setting, Timelapse, Control, Copy } from '../Icons';

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

const Container_hold = styled(Container)`
  background-color: ${(props) =>
    props.value ? props.theme.lightGreyColor : props.theme.classicGray};
  transform: ${(props) => (props.value ? 'translateY(4px)' : 'none')};
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

export const Button_copy = ({ onClick, margin = '0 10px 0 0', value }) => (
  <Container_hold onClick={onClick} margin={margin} value={value}>
    <Copy />
  </Container_hold>
);

export const Button_setting = forwardRef(
  ({ onClick, margin = '0 10px 0 0' }, ref) => (
    <Container ref={ref} onClick={onClick} margin={margin}>
      <Setting />
    </Container>
  ),
);

export default Button_capture;
