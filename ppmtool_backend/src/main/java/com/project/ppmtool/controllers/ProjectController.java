package com.project.ppmtool.controllers;

import com.project.ppmtool.domain.Project;
import com.project.ppmtool.services.MapValidationErrorService;
import com.project.ppmtool.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private MapValidationErrorService errorService;

    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal){

        ResponseEntity<?> errorMap = errorService.MapValidationService(result);
        if(errorMap != null)
           return errorMap;

        return new ResponseEntity<Project>(projectService.saveOrUpdate(project,principal.getName()), HttpStatus.OK);
    }

    @GetMapping("/{projectIdentifier}")
    public ResponseEntity<?> getProjectById(@PathVariable String projectIdentifier,Principal principal){
        return ResponseEntity.ok().body(projectService.findByProjectIdentifier(projectIdentifier,principal.getName()));
    }
    @GetMapping("/all")
    public Iterable<Project> getProjects(Principal principal){
        return projectService.findAll(principal.getName()) ;
    }

    @DeleteMapping("/{projectIdentifier}")
    public ResponseEntity<?> deleteProject(@PathVariable  String projectIdentifier,Principal principal){
        projectService.deleteProjectByIdentifier(projectIdentifier,principal.getName());
        return new ResponseEntity<String>("project deleted",HttpStatus.OK);
    }
}
