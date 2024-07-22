package com.example.back.services;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.back.dto.TaskDto;
import com.example.back.models.ProjectModel;
import com.example.back.models.TaskModel;
import com.example.back.models.UserModel;
import com.example.back.repositories.IUserRepository;
import com.example.back.repositories.ProjectRepository;
import com.example.back.repositories.TaskRepository;

@Service
public class TaskService {
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    IUserRepository iUserRepository;

    public List<TaskModel> getTasks(){
        return (List<TaskModel>) taskRepository.findAll();
    }

    public List<Object[]> getTaskToDo() {
        List<Object[]> allTasks = taskRepository.getAllTasks();
        return allTasks.stream()
                       .filter(task -> "Pending".equals(task[5]))
                       .collect(Collectors.toList());
    };

    public List<Object[]> getTaskDone() {
        List<Object[]> allTasks = taskRepository.getAllTasks();
        return allTasks.stream()
                       .filter(task -> "Finished".equals(task[5]))
                       .collect(Collectors.toList());
    };
    
    public List<Object[]> getTaskToDoByUser(Long id) {
        List<Object[]> allTasks = taskRepository.getTasksByUserId(id);
        return allTasks.stream()
                       .filter(task -> "Pending".equals(task[5]))
                       .collect(Collectors.toList());
    };

    public List<Object[]> getTaskDoneByUser(Long id) {
        List<Object[]> allTasks = taskRepository.getTasksByUserId(id);
        return allTasks.stream()
                       .filter(task -> "Finished".equals(task[5]))
                       .collect(Collectors.toList());
    };

    // Crear un  convertidor dto a taskmodel y uno al reves 
    public TaskModel saveTask(TaskDto task){
        TaskModel taskModel = new TaskModel();
        taskModel.setId(task.getId());
        taskModel.setName(task.getName());
        taskModel.setDescription(task.getDescription());
        taskModel.setStartDate(task.getStartDate());
        taskModel.setEndDate(task.getEndDate());
        taskModel.setStatus(task.getStatus());
        if (task.getProjectId() == null) {
            throw new RuntimeException("Project ID must not be null");
        }
        Optional<ProjectModel> optionalProject = projectRepository.findById(task.getProjectId());
        if (optionalProject.isPresent()) {
            taskModel.setProject(optionalProject.get());
        } else {
            throw new RuntimeException("Project not found with id: " + task.getProjectId());
        }
        if (task.getUserIds() == null || task.getUserIds().isEmpty()) {
            throw new RuntimeException("User IDs must not be null or empty");
        }
        List<UserModel> users = iUserRepository.findAllById(task.getUserIds());
        taskModel.setUser(users);
        return taskRepository.saveAndFlush(taskModel);
    }

    public TaskModel updateTask(TaskDto task, Long id){
        TaskModel taskModel = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        taskModel.setId(task.getId());
        taskModel.setName(task.getName());
        taskModel.setDescription(task.getDescription());
        taskModel.setStartDate(task.getStartDate());
        taskModel.setEndDate(task.getEndDate());
        taskModel.setStatus(task.getStatus());
        if (task.getProjectId() == null) {
            throw new RuntimeException("Project ID must not be null");
        }
        Optional<ProjectModel> optionalProject = projectRepository.findById(task.getProjectId());
        if (optionalProject.isPresent()) {
            taskModel.setProject(optionalProject.get());
        } else {
            throw new RuntimeException("Project not found with id: " + task.getProjectId());
        }
        if (task.getUserIds() == null || task.getUserIds().isEmpty()) {
            throw new RuntimeException("User IDs must not be null or empty");
        }
        List<UserModel> users = iUserRepository.findAllById(task.getUserIds());
        taskModel.setUser(users);
        taskRepository.saveAndFlush(taskModel);
        return taskModel;
    }
    public TaskModel updateStatusTask(Long id){
        TaskModel taskModel = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        taskModel.setStatus("Finished");
        taskRepository.saveAndFlush(taskModel);
        return taskModel;
    }
    public Boolean deleteTask(Long id){
        try {
            taskRepository.deleteById(id);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }
}
