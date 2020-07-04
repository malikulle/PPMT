package com.project.ppmtool.exceptions;

public class ProjectIdExeptionResposne {

    private String projectIdentifier;

    public ProjectIdExeptionResposne(String projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    }

    public String getProjectIdentifier() {
        return projectIdentifier;
    }

    public void setProjectIdentifier(String projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    }
}
