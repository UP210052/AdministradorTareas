package com.example.back.models;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.*;

import org.springframework.format.annotation.DateTimeFormat;
@Data
@Entity
@Table(name = "projects")
public class ProjectModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String name;

    @Column
    private String description;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "leader_id")
    private UserModel userLeader;


    @ManyToMany
    @JoinTable(name ="project_assignments", joinColumns = @JoinColumn(name = "project_id"), inverseJoinColumns = @JoinColumn(name= "user_id"))
    private List<UserModel> assignadosUsers;

}
