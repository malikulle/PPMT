package com.project.ppmtool.controllers;

import com.project.ppmtool.domain.Backlog;
import com.project.ppmtool.domain.Project;
import com.project.ppmtool.domain.ProjectTask;
import com.project.ppmtool.exceptions.ProjectNotFoundException;
import com.project.ppmtool.repositories.ProjectRepository;
import com.project.ppmtool.services.MapValidationErrorService;
import com.project.ppmtool.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BackLogContoller {

    @Autowired
    private ProjectTaskService projectTaskService;
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private MapValidationErrorService errorService;


    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addProjectTaskToBacklog(@Valid @RequestBody ProjectTask projectTask
            , BindingResult result, @PathVariable String backlog_id, Principal principal) {

        ResponseEntity<?> erroMap = errorService.MapValidationService(result);
        if (erroMap != null)
            return ResponseEntity.badRequest().body(erroMap);
        String name = principal.getName();
        ProjectTask projectTask1 = projectTaskService.addProjectTask(backlog_id, projectTask,name);

        return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.OK);
    }

    @GetMapping("/{backlog_id}")
    public ResponseEntity<?> getProjectBacklog(@PathVariable String backlog_id,Principal principal) {
        Project project = projectRepository.findByProjectIdentifier(backlog_id);
        if (project == null)
            throw new ProjectNotFoundException("Project Not Found ");
        return new ResponseEntity<>(projectTaskService.findBacklogById(backlog_id,principal.getName()), HttpStatus.OK);
    }

    @GetMapping("/{backlog_id}/{pt_id}")
    public ResponseEntity<ProjectTask> getProjectTask(@PathVariable String backlog_id, @PathVariable String pt_id,Principal principal) {

        ProjectTask projectTask = projectTaskService.findPTByProjectSequence(backlog_id, pt_id,principal.getName());
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @PatchMapping("/{backlog_id}/{pt_id}")
    public ResponseEntity<?> updateProjectTask(@RequestBody ProjectTask projectTask, BindingResult result,
                                               @PathVariable String backlog_id, @PathVariable String pt_id , Principal principal) {

        ResponseEntity<?> erroMap = errorService.MapValidationService(result);
        if (erroMap != null)
            return ResponseEntity.badRequest().body(erroMap);

        ProjectTask updatedTask = projectTaskService.updateByProjectSequence(projectTask, backlog_id, pt_id,principal.getName());

        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/{backlog_id}/{pt_id}")
    @PreAuthorize("@projectSecurityService.isAllowedToDelete(#pt_id,principal)")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String backlog_id, @PathVariable String pt_id ,Principal principal) {
        projectTaskService.deletePTByProjectSequence(backlog_id,pt_id,principal.getName());
        return new ResponseEntity<String>("Project Task Deleted" , HttpStatus.OK);
    }
}
