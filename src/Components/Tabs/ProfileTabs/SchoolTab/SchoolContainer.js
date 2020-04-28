import React from "react"
import { DELETE_SCHOOL, EDIT_SCHOOL } from "./SchoolQueries"
import { useMutation } from "react-apollo-hooks"
import { toast } from "react-toastify"
import SchoolPresenter from "./SchoolPresenter"
import selectChange from "../../../SelectChange"

const SchoolContainer = ({
  school,
  isSelf,
  schoolRefetch,
  schoolAddress,
  schoolName,
  schoolZipCode,
  schoolLevel,
  openSearchURL,
  clearSchool,
}) => {
  const deleteSchoolMutation = useMutation(DELETE_SCHOOL, {
    variables: { zipCode: school.zipCode },
  })
  const editSchoolMutation = useMutation(EDIT_SCHOOL, {
    variables: {
      level: schoolLevel.option,
      name: schoolName.value,
      zipCode: schoolZipCode.value,
      address: schoolAddress.value,
    },
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    toast.info("정보 수정중...")
    const {
      data: { editSchool },
    } = await editSchoolMutation()
    if (!editSchool) {
      toast.error("정보를 수정할 수 없습니다.")
    } else {
      await schoolRefetch()
      toast.success("정보가 수정되었습니다.")
    }
  }

  const loadValue = async () => {
    schoolName.setValue(`${school.name}`)
    schoolZipCode.setValue(`${school.zipCode}`)
    schoolAddress.setValue(`${school.address}`)
    schoolLevel.setOption(`${school.level}`)
    selectChange("modifySchoolLevel", schoolLevel.optionList.indexOf(`${school.level}`))
  }
  return (
    <SchoolPresenter
      school={school}
      isSelf={isSelf}
      schoolRefetch={schoolRefetch}
      schoolName={schoolName}
      schoolZipCode={schoolZipCode}
      schoolLevel={schoolLevel}
      schoolAddress={schoolAddress}
      openSearchURL={openSearchURL}
      clearSchool={clearSchool}
      deleteSchoolMutation={deleteSchoolMutation}
      onSubmit={onSubmit}
      loadValue={loadValue}
    />
  )
}

export default SchoolContainer
