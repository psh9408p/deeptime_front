import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  width: 30%;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${(props) => props.theme.classicBlue};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
  &:first-child {
    margin-right: 30px;
  }
  &:nth-child(2) {
    margin-right: 30px;
    background-color: #e74c3c;
    color: black;
  }
`;

const PopupButton = ({ type, text, onClick }) => (
  <Container type={type} onClick={onClick}>
    {text}
  </Container>
);

PopupButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PopupButton;
