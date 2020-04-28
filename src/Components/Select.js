import React from "react"
import styled from "styled-components"

const Container = styled.select`
  width: 100%;
  height: 100%;
`

const Select = ({ optionList, option, onChange, id }) => (
  <Container id={id} onChange={onChange}>
    {optionList.map((address, key) => (
      <option key={key} value={key}>
        {address}
      </option>
    ))}
  </Container>
)

export default Select
