import { SET_USER_DATA } from "./types";

export function setUserData(data) {
  return {
    type: SET_USER_DATA,
    payload: data,
  };
}
