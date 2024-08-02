package com.example.back.controllers;

import java.util.*;

import com.example.back.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.back.dto.TaskDto;
import com.example.back.models.TaskModel;
import com.example.back.services.TaskService;


@RestController
@RequestMapping("/api/task")
@CrossOrigin(origins = "http://localhost:3000")
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
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public TaskModel saveTask(@RequestBody TaskDto task) {
        return this.taskService.saveTask(task);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<TaskModel> updateTask(@RequestBody TaskDto task, @PathVariable("id") Long id){
        TaskModel updatedTask = this.taskService.updateTask(task, id);
        if (updatedTask == null) {
            throw new NotFoundException("La tarea con id " + id + " no existe.");
        }
        return ResponseEntity.ok(updatedTask);
    }

    @PutMapping(path = "status/{id}")
    public ResponseEntity<TaskModel> setDoneTask(@PathVariable("id") Long id){
        TaskModel updatedTask = this.taskService.updateStatusTask(id);
        if (updatedTask == null) {
            throw new NotFoundException("La tarea con id " + id + " no existe.");
        }
        return ResponseEntity.ok(updatedTask);
    }
    public ResponseEntity<TaskDto> getTaskById(@PathVariable("id") Long id){
        TaskDto taskDto = this.taskService.getTaskById(id);
        if (taskDto == null) {
            throw new NotFoundException("La tarea con id " + id + " no existe.");
        }
        return ResponseEntity.ok(taskDto);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Boolean> deleteTask(@PathVariable("id") Long id) {
        boolean deleted = this.taskService.deleteTask(id);
        if (!deleted) {
            throw new NotFoundException("La tarea con id " + id + " no existe.");
        }
        return ResponseEntity.ok(true);
    }
}
