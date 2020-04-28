import React from "react"
import Button from "../Buttons/Button"

export default ({ isFollowing, onClick }) => (
  <Button text={isFollowing ? "Unfollow" : "Follow"} onClick={onClick} />
)
