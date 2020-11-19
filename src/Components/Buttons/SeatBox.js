import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  border: 1px solid black;
  width: 100px;
  height: 100px;
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 600;
  text-align: center;
  padding: 5px 0px;
  font-size: 12px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const SeatBox = ({ text, onClick }) => (
  <Container onClick={onClick}>{text}</Container>
);

SeatBox.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SeatBox;
