package com.example.back.controllers;

import java.util.*;

import com.example.back.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.back.dto.ProjectDto;
import com.example.back.models.ProjectModel;
import com.example.back.services.ProjectService;

@RestController
@RequestMapping("/api/project")
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
    public ResponseEntity<Boolean> deleteTask(@PathVariable("id") Long id) {
        boolean deleted = this.projectService.deleteProject(id);
        if (!deleted) {
            throw new NotFoundException("El proyecto con id " + id + " no existe.");
        }
        return ResponseEntity.ok(true);
    }
    @PutMapping(path = "/{id}")
    public ResponseEntity<ProjectModel> modifyProject(@PathVariable("id") Long id, @RequestBody ProjectDto project) {
        ProjectModel projectModel = this.projectService.modifyProject(id, project);
        if (projectModel == null) {
            throw new NotFoundException("El proyecto con id " + id + " no existe.");
        }
        return ResponseEntity.ok(projectModel);
    }
}
