package com.project.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data
public class ProjectTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(updatable = false,unique = true)
    private String projectSequence;
    @NotBlank(message = "Please include a project summary")
    @NotNull(message = "Please include a project summary")
    private String summary;
    private String acceptanceCriteria;
    private String status;
    private Integer priority;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dueDate;
    @Column(updatable = false)
    private String projectIdentifier;
    @ManyToOne(fetch =FetchType.EAGER)
    @JoinColumn(name = "backlog_id",updatable = false,nullable = false)
    @JsonIgnore
    private Backlog backlog;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date createAt;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date updatedAt;

    @PrePersist
    public void onCreate(){
        this.createAt = new Date();
    }
    @PreUpdate
    public void onUpdate(){
        this.updatedAt= new Date();
    }

}
