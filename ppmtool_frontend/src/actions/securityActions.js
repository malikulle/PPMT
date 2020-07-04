import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    await axios.post("/api/users/register", newUser);
    history.push("/login");
    alert("You Are registerd");
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const login = (loginRequest) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/users/login", loginRequest);
    const { token } = data;

    localStorage.setItem("jwtToken", token);
    setJwtToken(token);

    const decoded = jwt_decode(token);
    dispatch({ type: SET_CURRENT_USER, payload: decoded });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setJwtToken(false);
};

export const setJwtToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
