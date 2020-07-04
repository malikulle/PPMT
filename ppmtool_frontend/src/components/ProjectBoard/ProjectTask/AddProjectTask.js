import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addProjectTaskAction } from "../../../actions/backlogActions";
import classnames from "classnames";
import Axios from "axios";

class AddProjectTask extends Component {
  state = {
    summary: "",
    acceptanceCriteria: "",
    status: "",
    priority: 0,
    dueDate: null,
    projectIdentifier: this.props.match.params.id,
    errors: {},
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });

    this.setState({
      errors: {
        [name]: undefined,
      },
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const {
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
    } = this.state;
    const newTask = {
      summary,
      acceptanceCriteria,
      status,
      priority,
      dueDate,
      projectIdentifier,
    };

    try {
      await Axios.post(`/api/backlog/${projectIdentifier}`, newTask);
      alert("Added Successfully");
      this.props.history.push(`/projectBoard/${this.props.match.params.id}`);
    } catch (error) {
      this.setState({
        errors: error.response.data.body,
      });
    }
  };
  render() {
    const { id } = this.props.match.params;
    const {
      summary,
      acceptanceCriteria,
      priority,
      status,
      dueDate,
      errors,
    } = this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to={`/projectBoard/${id}`} className="btn btn-light">
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Add Project Task</h4>
              <p className="lead text-center">Project Name + Project Code</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      " is-invalid ": errors.summary,
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    value={summary}
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <p className="text-danger">{errors.summary}</p>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      " is-invalid ": errors.acceptanceCriteria,
                    })}
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={acceptanceCriteria}
                    onChange={this.onChange}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className={classnames("form-control form-control-lg", {
                      " is-invalid ": errors.dueDate,
                    })}
                    name="dueDate"
                    value={dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className={classnames("form-control form-control-lg", {
                      " is-invalid ": errors.priority,
                    })}
                    name="priority"
                    value={priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className={classnames("form-control form-control-lg", {
                      " is-invalid ": errors.status,
                    })}
                    name="status"
                    value={status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { addProjectTaskAction })(AddProjectTask);
