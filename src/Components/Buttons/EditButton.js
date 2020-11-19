import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  border: 0;
  width: 100px;
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

const EditButton = ({ text, onClick }) => (
  <Container onClick={onClick}>{text}</Container>
);

EditButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default EditButton;
