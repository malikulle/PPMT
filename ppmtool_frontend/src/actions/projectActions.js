import axios from "axios";
import {
  GET_ERRORS,
  GET_PROJECTS,
  GET_PROJECT,
  DELETE_PROJECT,
} from "./types";

export const createProject = (project, history) => async (dispatch) => {
  try {
    await axios.post("/api/project", project);
    history.push("/dashboard");
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const getProjects = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/project/all");
    dispatch({ type: GET_PROJECTS, payload: data });
  } catch (error) {}
};

export const getProject = (projectIdentifier) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/project/${projectIdentifier}`);
    dispatch({ type: GET_PROJECT, payload: data });
  } catch (error) {}
};

export const deleteProject = (projectIdentifier) => async (dispatch) => {
  try {
    await axios.delete(`/api/project/${projectIdentifier}`);
    dispatch({ type: DELETE_PROJECT, payload: projectIdentifier });
  } catch (error) {}
};

