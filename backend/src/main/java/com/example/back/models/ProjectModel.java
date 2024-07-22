package com.example.back.models;
import jakarta.persistence.*;
import lombok.Data;
import java.util.*;
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
    
    @Column(name = "start_date")
    private java.sql.Date startDate;

    @Column(name = "end_date")
    private java.sql.Date endDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "leader_id")
    private UserModel userLeader;
    

    @ManyToMany
    @JoinTable(name ="project_assignments", joinColumns = @JoinColumn(name = "project_id"), inverseJoinColumns = @JoinColumn(name= "user_id"))
    private Set<UserModel> assignadosUsers;

}
