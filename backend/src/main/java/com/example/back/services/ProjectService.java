package com.example.back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.back.dto.ProjectDto;
import com.example.back.models.ProjectModel;
import com.example.back.models.UserModel;
import com.example.back.repositories.IUserRepository;
import com.example.back.repositories.ProjectRepository;
import java.util.*;

@Service
public class ProjectService {
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    IUserRepository iUserRepository;

    public List<ProjectModel> getProjects(){
        return (List<ProjectModel>) projectRepository.findAll();
    }
    public List<Object[]> getIdProject(){
        return projectRepository.getIdProjects();
    }

    public ProjectModel createProject (ProjectDto project)  {
        ProjectModel projectModel = new ProjectModel();
        projectModel.setId(project.getId());
        projectModel.setDescription(project.getDescription());
        projectModel.setEndDate(project.getEndDate());
        projectModel.setName(project.getName());
        projectModel.setStartDate(project.getStartDate());
        if (project.getUserLeaderId() == null) {
            throw new RuntimeException("Leader ID must not be null");
        }
        Optional<UserModel> optionalUser = iUserRepository.findById(project.getUserLeaderId());
        if (optionalUser.isPresent()) {
            projectModel.setUserLeader(optionalUser.get());
        } else {
            throw new RuntimeException("User not found with id: " + project.getUserLeaderId());
        }
        if (project.getUserIds() == null || project.getUserIds().isEmpty()) {
            throw new RuntimeException("User IDs must not be null or empty");
        }
        List<UserModel> users = iUserRepository.findAllById(project.getUserIds());
        projectModel.setAssignadosUsers(users);
        projectRepository.saveAndFlush(projectModel);
        return projectModel;
    }

}
