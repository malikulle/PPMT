import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import classnames from "classnames";

class AddProject extends Component {
  state = {
    projectName: "",
    projectIdentifier: "",
    description: "",
    startDate: null,
    endDate: null,
    errors: {},
  };
  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: null,
      },
    });
  };
  handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      projectName,
      projectIdentifier,
      description,
      startDate,
      endDate,
    } = this.state;
    const newProject = {
      projectName,
      projectIdentifier,
      description,
      startDate,
      endDate,
    };
    this.props.createProject(newProject, this.props.history);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  render() {
    const {
      projectName,
      projectIdentifier,
      description,
      startDate,
      endDate,
      errors,
    } = this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">
                Create / Edit Project form
              </h5>
              <hr />
              <form onSubmit={this.handleOnSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      " is-invalid ": errors.projectName,
                    })}
                    placeholder="Project Name"
                    name="projectName"
                    value={projectName}
                    onChange={this.handleOnChange}
                  />
                  {errors.projectName && (
                    <p className="text-danger">{errors.projectName}</p>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      " is-invalid ": errors.projectIdentifier,
                    })}
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={projectIdentifier}
                    onChange={this.handleOnChange}
                  />
                  {errors.projectIdentifier && (
                    <p className="text-danger">{errors.projectIdentifier}</p>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      " is-invalid ": errors.description,
                    })}
                    placeholder="Project Description"
                    name="description"
                    value={description}
                    onChange={this.handleOnChange}
                  ></textarea>
                  {errors.description && (
                    <p className="text-danger">{errors.description}</p>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="startDate"
                    onChange={this.handleOnChange}
                    value={startDate}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="endDate"
                    onChange={this.handleOnChange}
                    value={endDate}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};
export default connect(mapStateToProps, { createProject })(AddProject);
