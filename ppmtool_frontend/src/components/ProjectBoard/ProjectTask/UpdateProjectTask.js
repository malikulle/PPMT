import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProjectTask } from "../../../actions/backlogActions";
import classnames from "classnames";
import Axios from "axios";

class UpdateProjectTask extends Component {
  state = {
    id: 0,
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
  componentDidMount() {
    const { backlog_id, pt_id } = this.props.match.params;
    this.props.getProjectTask(backlog_id, pt_id, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.project_task) {
      this.setState({
        ...nextProps.project_task,
      });
    }
  }
  onSubmit = async (e) => {
    e.preventDefault();
    const { backlog_id, pt_id } = this.props.match.params;
    const { errors, ...project_task } = this.state;

    await Axios.patch(`/api/backlog/${backlog_id}/${pt_id}`, project_task);
    alert("Project Task Updated");
    this.props.history.push(`/projectBoard/${backlog_id}`);
    try {
    } catch (error) {}
  };
  render() {
    const { backlog_id } = this.props.match.params;
    const {
      summary,
      acceptanceCriteria,
      dueDate,
      priority,
      status,
      errors,
    } = this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/projectBoard/${backlog_id}`}
                className="btn btn-light"
              >
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">
                Add /Update Project Task
              </h4>
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
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
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
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
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
                    className="form-control form-control-lg"
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

const mapStateToProps = (state) => ({
  project_task: state.backlog.project_task,
});

export default connect(mapStateToProps, { getProjectTask })(UpdateProjectTask);
