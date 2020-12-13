import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  width: ${(props) => props.width};
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${(props) => props.theme.classicBlue};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
`;

const PopupButton = ({ type, text, onClick, width = '30%' }) => (
  <Container type={type} onClick={onClick} width={width}>
    {text}
  </Container>
);

PopupButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PopupButton;
