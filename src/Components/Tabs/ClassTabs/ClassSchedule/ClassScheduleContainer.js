import React, { useRef, useState } from "react"
import ClassSchedulePresenter from "./ClassSchedulePresenter"
import useSelect from "../../../../Hooks/useSelect"
import { useMutation, useQuery } from "react-apollo-hooks"
import {
  ADD_SCHEDULE,
  SCHEDULE_OF_CLASS,
  DELETE_SCHEDULE,
  UPDATE_SCHEDULE,
} from "./ClassScheduleQueries"

export default ({ classRoom }) => {
  const cal = useRef(null)
  const [startRange, setStartRange] = useState("")
  const [endRange, setEndRange] = useState("")

  const myClassList = useSelect(
    classRoom.map((List) => `${List.name}(${List.organizationName})`),
    classRoom.map((_, index) => index)
  )

  const addScheduleMutation = useMutation(ADD_SCHEDULE)
  const updateScheduleMutation = useMutation(UPDATE_SCHEDULE)
  const deleteScheduleMutation = useMutation(DELETE_SCHEDULE)
  const { data: scheduleData, loading: scheduleLoading, refetch: scheduleRefetch } = useQuery(
    SCHEDULE_OF_CLASS,
    {
      variables: { classId: classRoom[myClassList.option].id },
    }
  )

  return (
    <ClassSchedulePresenter
      cal={cal}
      startRange={startRange}
      setStartRange={setStartRange}
      endRange={endRange}
      setEndRange={setEndRange}
      myClassList={myClassList}
      classRoom={classRoom}
      addScheduleMutation={addScheduleMutation}
      updateScheduleMutation={updateScheduleMutation}
      deleteScheduleMutation={deleteScheduleMutation}
      scheduleList={scheduleData.scheduleOfClass}
      scheduleLoading={scheduleLoading}
      scheduleRefetch={scheduleRefetch}
    />
  )
}
