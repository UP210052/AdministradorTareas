package com.example.back.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.back.models.ProjectModel;
import com.example.back.services.ProjectService;

@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @GetMapping
    public List<ProjectModel> getProjects() {
        return this.projectService.getProjects();
    }

    @GetMapping("/id")
    public List<Object[]> getIdProjects() {
        return this.projectService.getIdProject();
    }
}
