import { useState } from "react"

export default (defaultValue, validator) => {
  const [value, setValue] = useState(defaultValue)

  const onChange = e => {
    const {
      target: { value }
    } = e

    let willUpdate = true
    if (typeof validator === "function") {
      willUpdate = validator(value)
    }
    if (willUpdate) {
      setValue(value)
    }
  }

  return { value, onChange, setValue }
}
