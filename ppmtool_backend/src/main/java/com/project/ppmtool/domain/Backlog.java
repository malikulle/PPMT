package com.project.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Backlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer PtSequence = 0;

    private String projectIdentifier;
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id",nullable = false)
    @JsonIgnore
    private Project project;
    @OneToMany(cascade = CascadeType.REFRESH,fetch = FetchType.EAGER , mappedBy = "backlog",orphanRemoval = true)
    private List<ProjectTask> projectTasks = new ArrayList<>();
}
