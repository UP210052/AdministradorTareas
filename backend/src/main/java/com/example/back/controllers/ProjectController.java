package com.example.back.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.back.dto.ProjectDto;
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
        return this.projectService.getIdP();
    }

    @PostMapping
    public ProjectModel saveTask(@RequestBody ProjectDto project) {
        return this.projectService.createProject(project);
    }

    @GetMapping("/task")
    public List<Map<String, Object>> getProjectsAndTask() {
        return this.projectService.getProjectsAndTask();
    }

    @DeleteMapping(path = "/{id}")
    public Boolean deleteTask(@PathVariable("id") Long id) {
        return this.projectService.deleteProject(id);
    }
  
    @PutMapping(path = "/{id}")
    public ResponseEntity<ProjectModel> modifyProject(@PathVariable("id") Long id, @RequestBody ProjectDto project) {
        ProjectModel projectModel = this.projectService.modifyProject(id, project);
        return ResponseEntity.ok(projectModel);
    }
}
