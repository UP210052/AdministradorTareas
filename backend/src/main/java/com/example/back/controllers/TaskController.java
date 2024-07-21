package com.example.back.controllers;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.back.dto.TaskDto;
import com.example.back.models.TaskModel;
import com.example.back.services.TaskService;


@RestController
@RequestMapping("/api/task")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<TaskModel> getTasks() {
        return this.taskService.getTasks();
    }
    @GetMapping("/allToDo")
    public List<Object[]> getTaskToDo(){
        return this.taskService.getTaskToDo();
    }

    @GetMapping("/allDone")
    public List<Object[]> getTaskDone(){
        return this.taskService.getTaskDone();
    }
    
    @GetMapping("/toDo/{id}")
    public List<Object[]> getTaskToDoByUser(@PathVariable("id") Long id){
        return this.taskService.getTaskToDoByUser(id);
    }

    @GetMapping("/Done/{id}")
    public List<Object[]> getTaskDoneByUser(@PathVariable("id") Long id){
        return this.taskService.getTaskDoneByUser(id);
    }

    @PostMapping
    public TaskModel saveTask(@RequestBody TaskDto task) {
        return this.taskService.saveTask(task);
    }
    @PutMapping(path = "/{id}")
    public TaskModel updateTask(@RequestBody TaskDto task, @PathVariable("id") Long id){
        return this.taskService.updateTask(task, id);
    }
    
    @PutMapping(path = "status/{id}")
    public TaskModel setDoneTask(@PathVariable("id") Long id){
        return this.taskService.updateStatusTask(id);
    }
    @DeleteMapping(path = "/{id}")
    public Boolean deleteTask(@PathVariable("id") Long id) {
        return this.taskService.deleteTask(id);
    }
}
