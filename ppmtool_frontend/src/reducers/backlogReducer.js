import {
  GET_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK,
} from "../actions/types";

const initalState = {
  project_tasks: [],
  project_task: {},
};

export default function (state = initalState, action) {
  switch (action.type) {
    case GET_BACKLOG:
      return {
        ...state,
        project_tasks: action.payload,
      };
    case GET_PROJECT_TASK:
      return {
        ...state,
        project_task: action.payload,
      };
    case DELETE_PROJECT_TASK:
      return {
        ...state,
        project_tasks: state.project_tasks.filter(
          (x) => x.projectSequence !== action.payload
        ),
      };
    default:
      return state;
  }
}
