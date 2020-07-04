import React from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTask/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTask/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagment/Register";
import Login from "./components/UserManagment/Login";
import jwt_decode from "jwt-decode";
import { setJwtToken, logout } from "./actions/securityActions";
import { SET_CURRENT_USER } from "./actions/types";
import SecureRoute from "./securityUtils/SecureRoute";

const jwtToken = localStorage.getItem("jwtToken");

if (jwtToken) {
  setJwtToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({ type: SET_CURRENT_USER, payload: decoded_jwtToken });

  const currentTıme = Date.now();
  if (decoded_jwtToken.exp > currentTıme) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="App">
          {
            // Public
          }
          {
            // Pricate
          }
          <Route path="/" exact component={Landing} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Switch>
            <SecureRoute path="/dashboard" exact component={Dashboard} />
            <SecureRoute path="/addProject" exact component={AddProject} />
            <SecureRoute
              path="/updateProject/:id"
              exact
              component={UpdateProject}
            />
            <SecureRoute
              path="/projectBoard/:id"
              exact
              component={ProjectBoard}
            />
            <SecureRoute
              path="/addProjectTask/:id"
              exact
              component={AddProjectTask}
            />
            <SecureRoute
              path="/updateProjectTask/:backlog_id/:pt_id"
              exact
              component={UpdateProjectTask}
            />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
