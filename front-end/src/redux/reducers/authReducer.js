import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REFRESH_SESSION,
  ERROR_USER
} from "../types/authActionTypes";

const initialState = {
  userIsAuthenticated: false,
  user: {}
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case REGISTER_USER:
      return {
        ...state,
        user:payload
      };


    case LOGIN_USER:
      return {
        ...state,
        userIsAuthenticated: true,
        user: payload
      };

    case REFRESH_SESSION:
      return state;

    case LOGOUT_USER:
      return {
        ...state,
        user:null,
        userIsAuthenticated: false,
      }

      case ERROR_USER:
        return state;

    default:
      return state;
  }
}
