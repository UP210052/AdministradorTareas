package com.example.back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.back.models.ProjectModel;
import com.example.back.repositories.ProjectRepository;
import java.util.*;

@Service
public class ProjectService {
    @Autowired
    ProjectRepository projectRepository;

    public List<ProjectModel> getProjects(){
        return (List<ProjectModel>) projectRepository.findAll();
    }
}
