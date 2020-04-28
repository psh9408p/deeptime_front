import React from "react"
import { DELETE_ACADEMY, EDIT_ACADEMY } from "./AcademyQueries"
import { useMutation } from "react-apollo-hooks"
import { toast } from "react-toastify"
import AcademyPresenter from "./AcademyPresenter"
import selectChange from "../../../SelectChange"

const AcademyContainer = ({
  academy,
  isSelf,
  academyRefetch,
  academyName,
  academyZipCode,
  academyKind,
  academyAddress,
  academyDetailAddress,
  openSearchURL,
  clearAcademy,
}) => {
  const deleteAcademyMutation = useMutation(DELETE_ACADEMY, {
    variables: { zipCode: academy.zipCode },
  })
  const editAcademyMutation = useMutation(EDIT_ACADEMY, {
    variables: {
      kind: academyKind.option,
      name: academyName.value,
      zipCode: academyZipCode.value,
      address: academyAddress.value,
      detailAddress: academyDetailAddress.value,
    },
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    toast.info("정보 수정중...")
    const {
      data: { editAcademy },
    } = await editAcademyMutation()
    if (!editAcademy) {
      toast.error("정보를 수정할 수 없습니다.")
    } else {
      await academyRefetch()
      await clearAcademy()
      toast.success("정보가 수정되었습니다.")
    }
  }

  const loadValue = async () => {
    academyName.setValue(`${academy.name}`)
    academyZipCode.setValue(`${academy.zipCode}`)
    academyAddress.setValue(`${academy.address}`)
    academyDetailAddress.setValue(`${academy.detailAddress}`)
    academyKind.setOption(`${academy.kind}`)
    selectChange("modifyAcademyKind", academyKind.optionList.indexOf(`${academy.kind}`))
  }
  return (
    <AcademyPresenter
      academy={academy}
      isSelf={isSelf}
      academyRefetch={academyRefetch}
      academyName={academyName}
      academyZipCode={academyZipCode}
      academyKind={academyKind}
      academyAddress={academyAddress}
      academyDetailAddress={academyDetailAddress}
      openSearchURL={openSearchURL}
      clearAcademy={clearAcademy}
      deleteAcademyMutation={deleteAcademyMutation}
      onSubmit={onSubmit}
      loadValue={loadValue}
    />
  )
}

export default AcademyContainer
