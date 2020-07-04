import React from "react";
import { Link } from "react-router-dom";

const CreateProject = () => {
  return (
    <div>
      <Link to="/addProject" className="btn btn-outline-info">
        Create a Project
      </Link>
    </div>
  );
};

export default CreateProject;
