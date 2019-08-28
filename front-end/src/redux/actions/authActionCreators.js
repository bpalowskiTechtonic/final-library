import axios from "axios";
import store from "../store";
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REFRESH_SESSION
} from "../types/authActionTypes";

export function register(credentials) {
  console.log(credentials)
  try {
    return axios
      .post("http://localhost:3001/auth/register", credentials)
      .then(res => {
        if (res.status === 200) {
          console.log("successfully added User");
        }
        {
          const newUser = {
            ...credentials,
            token: res.data.token
          };
          const action = {
            type: REGISTER_USER,
            payload: newUser
          };
          store.dispatch(action);
        }
      });
  } catch (err) {
    console.log(err);
  }
}

export function login(credentials) {
  try {
    const { email, password } = credentials;
    return axios
      .post("http://localhost:3001/auth/login", credentials)
      .then(res => {
        if (res.status === 200) {
          console.log("successfully login");
        }
        {
          const login = {
            email: email,
            password: password,
            token: res.data.token
          };
          const action = {
            type: LOGIN_USER,
            payload: login
          };
          store.dispatch(action);
        }
      });
  } catch (err) {
    console.log(err);
  }
}

export function refreshSession() {

}

export async function logout() {
  try {
  let res= await  axios
      .get("http://localhost:3001/auth/logout")
      console.log(res.data)
      const action = {
        type: LOGOUT_USER
      };
      store.dispatch(action);
  } catch (err) {
    console.log(err);
  }
}
