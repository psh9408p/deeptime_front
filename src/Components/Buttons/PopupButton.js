import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  width: ${(props) => props.width};
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: ${(props) => props.color};
  font-weight: 600;
  background-color: ${(props) => props.bgColor};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
  &:first-child {
    margin-right: 100px;
  }
`;

const PopupButton = ({
  type,
  text,
  onClick,
  width = '30%',
  bgColor = '#0F4C82',
  color = 'white',
}) => (
  <Container
    type={type}
    onClick={onClick}
    width={width}
    bgColor={bgColor}
    color={color}
  >
    {text}
  </Container>
);

PopupButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PopupButton;
