import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Container = styled.button`
  width: 100px;
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${props => props.theme.classicBlue};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
`

const Button = ({ text, onClick, key }) => {
  return (
    <Container key={key} onClick={onClick}>
      {text}
    </Container>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired
}

export default Button
