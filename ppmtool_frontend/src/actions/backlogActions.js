import axios from "axios";
import {
  GET_BACKLOG,
  GET_ERRORS,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
} from "./types";

export const addProjectTaskAction = (
  backlog_id,
  project_task,
  history
) => async (dispatch) => {
  try {
    await axios.post(`/api/backlog/${backlog_id}`, project_task);
    history.push(`/projectBoard/${backlog_id}`);
  } catch (error) {}
};

export const getBacklog = (backlog_id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/backlog/${backlog_id}`);
    dispatch({ type: GET_BACKLOG, payload: data });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const getProjectTask = (backlog_id, pt_id, history) => async (
  dispatch
) => {
  try {
    const { data } = await axios.get(`/api/backlog/${backlog_id}/${pt_id}`);
    dispatch({ type: GET_PROJECT_TASK, payload: data });
  } catch (error) {
    history.push("/");
  }
};

export const deleteProjectTask = (backlog_id, pt_id) => async (dispatch) => {
  try {
    await axios.delete(`/api/backlog/${backlog_id}/${pt_id}`);
    alert("Project Task Deleted Successfully");
    dispatch({ type: DELETE_PROJECT_TASK, payload: pt_id });
  } catch (error) {}
};
