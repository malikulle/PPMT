package com.project.ppmtool.repositories;

import com.project.ppmtool.domain.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project,Long> {

    Project findByProjectIdentifier(String projectIdentifier);

    Iterable<Project> findAllByProjectLeader(String projectLeader);

    Project getById(Long id);
}
