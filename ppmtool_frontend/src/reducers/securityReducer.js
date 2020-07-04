import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
  user: {},
  validToken: false,
};

const securityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: action.payload ? true : false,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default securityReducer;
