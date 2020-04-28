import React from "react"
import styled from "styled-components"
import useTabs from "../Hooks/useTabs"
import StudentTabs from "../Components/Tabs/StudentTabs"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Tabs = styled.div`
  display: flex;
  justify-content: center;
`

const ProfileButton = styled.button`
  width: 100px;
  border: 0;
  outline-color: black;
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: 600;
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 60px;
  }
`

export default ({ Mydata, MyRefetch }) => {
  MyRefetch()
  const profileTabContents = ["학생 관리", "좌석 배정"]
  const profileTabs = useTabs(0, profileTabContents)
  return (
    <Wrapper>
      <Tabs>
        {profileTabs.content.map((section, index) => (
          <ProfileButton key={index} onClick={() => profileTabs.changeItem(index)}>
            {section}
          </ProfileButton>
        ))}
      </Tabs>
      <StudentTabs
        pageIndex={profileTabs.currentIndex}
        pageIndexChange={profileTabs.changeItem}
        loginPosition={Mydata.me.loginPosition}
        schoolList={Mydata.me.schools}
        academyList={Mydata.me.academies}
        readingRoomList={Mydata.me.readingRooms}
        classList={Mydata.me.classes}
      />
    </Wrapper>
  )
}
