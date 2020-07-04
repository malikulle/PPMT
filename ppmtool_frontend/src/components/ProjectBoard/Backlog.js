import React, { Component } from "react";
import ProjectTask from "./ProjectTask/ProjectTask";

class Backlog extends Component {
  render() {
    const { project_tasks } = this.props;
    let todoItems = project_tasks.filter(x=> x.status === "TO_DO")
    let inProgressItems = project_tasks.filter(x=> x.status === "IN_PROGRESS")
    let doneItems = project_tasks.filter(x=> x.status === "DONE")
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {todoItems.map((item) => (
              <ProjectTask key={item.id} project_task={item} />
            ))}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {inProgressItems.map((item) => (
              <ProjectTask key={item.id} project_task={item} />
            ))}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {doneItems.map((item) => (
              <ProjectTask key={item.id} project_task={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
