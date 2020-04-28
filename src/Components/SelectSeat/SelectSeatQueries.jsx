import gql from "graphql-tag"

export const UPDATE_EXISTTOGGLE = gql`
  mutation update_existToggle($userID: String!, $existToggle: Boolean!) {
    update_existToggle(userID: $userID, existToggle: $existToggle)
  }
`

export const EDIT_SEAT = gql`
  mutation uedit_seat($userID: String!, $existToggle: Boolean!) {
    uedit_seat(userID: $userID, existToggle: $existToggle)
  }
`

export const LOAD_SEAT = gql`
  query loadSeat($deviceID: String!) {
    loadSeat(deviceID: $deviceID) {
      seat {
        id
      }
    }
  }
`
