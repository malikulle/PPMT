package com.project.ppmtool.services;

import com.project.ppmtool.domain.Backlog;
import com.project.ppmtool.domain.Project;
import com.project.ppmtool.domain.ProjectTask;
import com.project.ppmtool.domain.User;
import com.project.ppmtool.exceptions.ProjectNotFoundException;
import com.project.ppmtool.repositories.BacklogRepository;
import com.project.ppmtool.repositories.ProjectTaskRepository;
import com.project.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {
    @Autowired
    private BacklogRepository backlogRepository;
    @Autowired
    private ProjectTaskRepository projectTaskRepository;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private UserRepository userRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask,String username) {

        try {
            Backlog backlog = projectService.findByProjectIdentifier(projectIdentifier,username).getBacklog();

            projectTask.setBacklog(backlog);

            Integer BacklogSequence = backlog.getPtSequence();
            BacklogSequence++;

            backlog.setPtSequence(BacklogSequence);

            projectTask.setProjectSequence(projectIdentifier + "-" + BacklogSequence.toString());
            projectTask.setProjectIdentifier(projectIdentifier);

            if (projectTask.getPriority() == null || projectTask.getPriority() ==  0) {
                projectTask.setPriority(3);
            }
            if (projectTask.getStatus() == "" || projectTask.getStatus() == null) {
                projectTask.setStatus("TO_DO");
            }

            return projectTaskRepository.save(projectTask);
        } catch (Exception ex) {
            throw new ProjectNotFoundException("Project Not Found");
        }


    }

    public List<ProjectTask> findBacklogById(String backlog_id,String username) {
        projectService.findByProjectIdentifier(backlog_id,username);
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlog_id);
    }

    public ProjectTask findPTByProjectSequence(String backlog_id, String pt_id,String username) {

        // exist Backlog
        Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
        if (backlog == null)
            throw new ProjectNotFoundException("Project Not Found");

        //Project Task Exist
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);
        if (projectTask == null)
            throw new ProjectNotFoundException("Project Task " + pt_id + " Not Found");

        if (!projectTask.getBacklog().getProjectIdentifier().equals(backlog_id))
            throw new ProjectNotFoundException("Project Task " + pt_id + " does not exist in project " + backlog_id);

        User user = userRepository.findByUsername(username);

        if(projectTask.getBacklog().getProject().getUser().getId() != user.getId())
            throw new ProjectNotFoundException("Project Task " + pt_id + " does not exist in project " + backlog_id);

        return projectTask;
    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlog_id, String pt_id,String username) {

        ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id,username);
        User user = userRepository.findByUsername(username);
        if(projectTask.getBacklog().getProject().getUser().getId() != user.getId())
            throw new ProjectNotFoundException("Project Not Found");


        projectTask = updatedTask;

        return projectTaskRepository.save(projectTask);
    }

    public void deletePTByProjectSequence(String backlog_id, String pt_id,String username) {
        ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id,username);

        projectTaskRepository.delete(projectTask);
    }
}
