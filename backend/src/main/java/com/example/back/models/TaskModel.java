package com.example.back.models;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name = "tasks")
public class TaskModel {
    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Setter
    @Getter
    @Column
    private String name;

    @Setter
    @Getter
    @Column
    private String description;

    @Setter
    @Getter
    @Column(name = "start_date")
    private LocalDate startDate;
    
    @Setter
    @Getter
    @Column(name = "end_date")
    private LocalDate endDate;
    
    @Setter
    @Getter
    @Column 
    private String status;

    @Setter
    @Getter
    @ManyToMany
    @JoinTable(name ="task_assignments", joinColumns = @JoinColumn(name = "task_id"), inverseJoinColumns = @JoinColumn(name= "user_id"))
    private List<UserModel> user;
    
    @Setter
    @Getter
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id")
    private ProjectModel project;
}
