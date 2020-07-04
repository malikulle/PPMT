package com.project.ppmtool.services;

import com.project.ppmtool.domain.Backlog;
import com.project.ppmtool.domain.Project;
import com.project.ppmtool.domain.User;
import com.project.ppmtool.exceptions.ProjectIdException;
import com.project.ppmtool.exceptions.ProjectNotFoundException;
import com.project.ppmtool.repositories.BacklogRepository;
import com.project.ppmtool.repositories.ProjectRepository;
import com.project.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private BacklogRepository backlogRepository;
    @Autowired
    private UserRepository userRepository;

    public Project saveOrUpdate(Project project, String username){

        if(project.getId() != null){
            Project existingProject = projectRepository.getById(project.getId());

            if(project != null && (!existingProject.getProjectLeader().equals(username))){
                throw new ProjectNotFoundException("Project Not Found");
            } else if(project == null){
                throw new ProjectNotFoundException("Project Not Found");
            }
        }

        String projectIdentifier = project.getProjectIdentifier().toUpperCase();
        try {

            User user = userRepository.findByUsername(username);

            project.setUser(user);
            project.setProjectLeader(user.getUsername());

            project.setProjectIdentifier(projectIdentifier);

            if(project.getId() == null){
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(projectIdentifier);
            }
            if(project.getId() != null){
                project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
            }

            return projectRepository.save(project);

        }catch (Exception ex){
            throw new ProjectIdException("Project ID " + projectIdentifier +" already exist");
        }
    }

    public Project findByProjectIdentifier(String projectIdentifier,String username){
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier);
        if(project == null)
            throw new ProjectIdException("Project ID " + projectIdentifier.toUpperCase() +" doesn't exist");

        User user = userRepository.findByUsername(username);

        if(!project.getProjectLeader().equals(user.getUsername()))
            throw new ProjectNotFoundException("Project not found in your count");
        return project;
    }

    public Iterable<Project> findAll(String username){
        User user = userRepository.findByUsername(username);
        return projectRepository.findAllByProjectLeader(username);
    }

    public void deleteProjectByIdentifier(String projectIdentifier,String username){
        projectRepository.delete(findByProjectIdentifier(projectIdentifier,username));
    }



}
