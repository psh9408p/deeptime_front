import { useState } from "react"

export default (options, values) => {
  const [option, setOption] = useState(values[0])
  const [optionIndex, setOptionIndex] = useState(0)
  const optionList = options
  const valueList = values

  const onChange = e => {
    const {
      target: { value }
    } = e
    setOption(values[value])
    setOptionIndex(value)
  }

  const optionIndexSet = num => {
    setOptionIndex(num)
  }

  return { option, onChange, setOption, optionList, valueList, optionIndex, optionIndexSet }
}
