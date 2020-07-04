import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteProject } from "../../actions/projectActions";

class ProjectItem extends Component {
  onDeleteClikc = (id) => {
    if (
      window.confirm("Are you sure ? This will delete the project an all data")
    ) {
      this.props.deleteProject(id);
    }
  };

  render() {
    const { project } = this.props;
    const { projectIdentifier, projectName, description } = project;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{projectIdentifier}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{projectName}</h3>
              <p>{description}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/projectBoard/${projectIdentifier}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1">Project Board </i>
                  </li>
                </Link>
                <Link to={`/updateProject/${projectIdentifier}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1">Update Project Info</i>
                  </li>
                </Link>
                <li
                  style={{ cursor: "pointer" }}
                  className="list-group-item delete"
                  onClick={() => this.onDeleteClikc(projectIdentifier)}
                >
                  <i className="fa fa-minus-circle pr-1">Delete Project</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { deleteProject })(ProjectItem);
