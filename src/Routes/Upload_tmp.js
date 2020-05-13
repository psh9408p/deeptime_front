import React, { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default () => {
  const [selectFile, setSelectFile] = useState(null)

  const handleFileInput = (e) => {
    console.log(e.target)
    setSelectFile(e.target.files)
    console.log(selectFile)
  }
  const handlePost = async () => {
    console.log(selectFile)
    const formData = new FormData()
    formData.append("files", selectFile[0])
    formData.append("files", selectFile[1])
    try {
      const { data } = await axios.post(
        process.env.REACT_APP_BACKEND_URI + "/api/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      console.log(data)
    } catch (e) {
      console.log(e)
      toast.error(
        <div>
          업로드가 불가능합니다.
          <br />
          다시 시도하세요.
        </div>
      )
    }
  }
  return (
    <div>
      <input type="file" onChange={(e) => handleFileInput(e)} multiple />
      <button type="button" onClick={() => handlePost()}>
        업로드
      </button>
    </div>
  )
}
