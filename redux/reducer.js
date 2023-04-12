import { SET_USER_DATA } from "./types";

const initialState = {
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
