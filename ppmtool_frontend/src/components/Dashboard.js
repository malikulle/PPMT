import React, { Component } from "react";
import CreateProject from "./Project/CreateProject";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import ProjectItem from "./Project/ProjectItem";
class Dashboard extends Component {
  componentDidMount = async () => {
    await this.props.getProjects();
  };
  render() {
    const { projects } = this.props.projects;
    return (
      <div>
        <div className="projects">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Projects</h1>
                <br />
                <CreateProject />
                <br />
                {projects.map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))}
                <br />
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.project,
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
