package com.project.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Project name is required")
    @NotNull(message = "Project name is required")
    private String projectName;
    @NotBlank(message = "Project Identifier is required")
    @NotNull(message = "Project Identifier is required")
    @Size(min = 4,max = 5,message = "Please use 4 to 5 characters")
    @Column(updatable = false,unique = true)
    private String projectIdentifier;
    @NotBlank(message = "Project description required")
    @NotNull(message = "Project description required")
    private String description;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date updatedAt;
    @OneToOne(fetch = FetchType.EAGER , cascade = CascadeType.ALL,mappedBy = "project")
    @JsonIgnore
    private Backlog backlog;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private User user;

    private String projectLeader;

    @PrePersist
    protected void onCreate(){
        this.createdAt = new Date();
    }
    @PreUpdate
    protected void onUpdate(){
        this.updatedAt = new Date();
    }

}
