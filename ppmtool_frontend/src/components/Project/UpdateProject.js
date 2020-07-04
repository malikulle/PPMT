import React, { Component } from "react";
import { connect } from "react-redux";
import { getProject, createProject } from "../../actions/projectActions";
import classnames from "classnames";

class UpdateProject extends Component {
  state = {
    id: "",
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
      id,
      projectName,
      projectIdentifier,
      description,
      startDate,
      endDate,
    } = this.state;
    const updateProject = {
      id,
      projectName,
      projectIdentifier,
      description,
      startDate,
      endDate,
    };
    this.props.createProject(updateProject, this.props.history);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
    if (nextProps.project) {
      const {
        id,
        projectName,
        projectIdentifier,
        description,
        startDate,
        endDate,
      } = nextProps.project;

      this.setState({
        id,
        projectName,
        projectIdentifier,
        description,
        startDate,
        endDate,
      });
    }
  }
  componentDidMount = async () => {
    const { id } = this.props.match.params;
    await this.props.getProject(id);
  };
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
              <h5 className="display-4 text-center">Update Project form</h5>
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
                    disabled
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
                  value="Submiy"
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
  project: state.project.project,
  errors: state.errors,
});
export default connect(mapStateToProps, { getProject, createProject })(
  UpdateProject
);
