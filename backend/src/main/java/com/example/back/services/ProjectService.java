package com.example.back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.back.dto.ProjectDto;
import com.example.back.models.ProjectModel;
import com.example.back.models.UserModel;
import com.example.back.repositories.IUserRepository;
import com.example.back.repositories.ProjectRepository;
import com.example.back.repositories.TaskRepository;

import java.util.*;

@Service
public class ProjectService {
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    IUserRepository iUserRepository;
    @Autowired
    TaskRepository taskRepository;

    public List<ProjectModel> getProjects(){
        return projectRepository.findAll();
    }
    public List<Object[]> getIdP(){
        return projectRepository.getIdP();
    }

    public ProjectModel modifyProject(Long id, ProjectDto project) {
        ProjectModel projectModel = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));

        projectModel.setName(project.getName());
        projectModel.setDescription(project.getDescription());
        projectModel.setStartDate(project.getStartDate());
        projectModel.setEndDate(project.getEndDate());

        if (project.getUserLeaderId() == null) {
            throw new RuntimeException("Leader ID must not be null");
        }

        Optional<UserModel> optionalUser = iUserRepository.findById(project.getUserLeaderId());
        if (optionalUser.isPresent()) {
            projectModel.setUserLeader(optionalUser.get());
        } else {
            throw new RuntimeException("User not found with id: " + project.getUserLeaderId());
        }

        if (project.getUserIds() != null && !project.getUserIds().isEmpty()) {
            List<UserModel> users = iUserRepository.findAllById(project.getUserIds());
            projectModel.setAssignadosUsers(users);
        } else {
            projectModel.setAssignadosUsers(Collections.emptyList());
        }

        projectRepository.saveAndFlush(projectModel);
        return projectModel;
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

    public List<Map<String, Object>> getProjectsAndTask() {
        List<Object[]> projectTask = projectRepository.getProjectAndLeader();
        List<Map<String, Object>> result = new ArrayList<>();
    
        for (Object[] project : projectTask) {
            Integer projectId = (Integer) project[0];
            
            List<Object[]> taskList = taskRepository.getTaskbyProjectId(projectId);
            List<Map<String, Object>> tasks = new ArrayList<>();
            
            for (Object[] task : taskList) {
                Map<String, Object> taskData = new HashMap<>();
                taskData.put("taskId", task[0]);
                taskData.put("taskName", task[1]);
                taskData.put("startDate", task[2]);
                taskData.put("endDate", task[3]);
                taskData.put("status", task[4]);
                taskData.put("assignedUsers", task[5]);
                tasks.add(taskData);
            }
            
            Map<String, Object> projectData = new HashMap<>();
            projectData.put("projectId", projectId);
            projectData.put("projectName", project[1]);
            projectData.put("leaderName", project[2]);
            projectData.put("tasks", tasks);
            
            result.add(projectData);
        }
    
        return result;
    }
    
    public Boolean deleteProject(Long id){
        try {
            projectRepository.deleteById(id);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }
}


