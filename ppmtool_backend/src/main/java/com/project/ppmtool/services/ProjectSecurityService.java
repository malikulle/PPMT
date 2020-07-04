package com.project.ppmtool.services;

import com.project.ppmtool.domain.ProjectTask;
import com.project.ppmtool.domain.User;
import com.project.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectSecurityService {

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public boolean isAllowedToDelete(String pt_id , User user){
        String test ="";
        return true;
    }
}
