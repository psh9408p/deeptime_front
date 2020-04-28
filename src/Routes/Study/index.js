import React, { useEffect } from "react"
import StudyContainer from "./StudyContainer"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"

export default ({ Mydata }) => {
  let history = useHistory()

  if (Mydata.me.classes[0] === undefined) {
    toast.error("관리자를 통해 클래스를 먼저 등록하세요.")
    useEffect(() => history.push("/"), [])

    return ""
  } else {
    return <StudyContainer Mydata={Mydata} />
  }
}
