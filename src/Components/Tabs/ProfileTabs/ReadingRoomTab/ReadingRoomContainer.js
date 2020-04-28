import React from "react"
import { DELETE_READINGROOM, EDIT_READINGROOM } from "./ReadingRoomQueries"
import { useMutation } from "react-apollo-hooks"
import { toast } from "react-toastify"
import ReadingRoomPresenter from "./ReadingRoomPresenter"
import selectChange from "../../../SelectChange"

const ReadingRoomContainer = ({
  readingRoom,
  isSelf,
  readingRoomRefetch,
  readingRoomName,
  readingRoomZipCode,
  readingRoomKind,
  readingRoomAddress,
  readingRoomDetailAddress,
  openSearchURL,
  clearReadingRoom,
}) => {
  const deleteReadingRoomMutation = useMutation(DELETE_READINGROOM, {
    variables: { zipCode: readingRoom.zipCode },
  })
  const editReadingRoomMutation = useMutation(EDIT_READINGROOM, {
    variables: {
      kind: readingRoomKind.option,
      name: readingRoomName.value,
      zipCode: readingRoomZipCode.value,
      address: readingRoomAddress.value,
      detailAddress: readingRoomDetailAddress.value,
    },
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    toast.info("정보 수정중...")
    const {
      data: { editReadingRoom },
    } = await editReadingRoomMutation()
    if (!editReadingRoom) {
      toast.error("정보를 수정할 수 없습니다.")
    } else {
      await readingRoomRefetch()
      await clearReadingRoom()
      toast.success("정보가 수정되었습니다.")
    }
  }

  const loadValue = async () => {
    readingRoomName.setValue(`${readingRoom.name}`)
    readingRoomZipCode.setValue(`${readingRoom.zipCode}`)
    readingRoomAddress.setValue(`${readingRoom.address}`)
    readingRoomDetailAddress.setValue(`${readingRoom.detailAddress}`)
    readingRoomKind.setOption(`${readingRoom.kind}`)
    selectChange("modifyReadingRoomKind", readingRoomKind.optionList.indexOf(`${readingRoom.kind}`))
  }
  return (
    <ReadingRoomPresenter
      readingRoom={readingRoom}
      isSelf={isSelf}
      readingRoomRefetch={readingRoomRefetch}
      readingRoomName={readingRoomName}
      readingRoomZipCode={readingRoomZipCode}
      readingRoomKind={readingRoomKind}
      readingRoomAddress={readingRoomAddress}
      readingRoomDetailAddress={readingRoomDetailAddress}
      openSearchURL={openSearchURL}
      clearReadingRoom={clearReadingRoom}
      deleteReadingRoomMutation={deleteReadingRoomMutation}
      onSubmit={onSubmit}
      loadValue={loadValue}
    />
  )
}

export default ReadingRoomContainer
