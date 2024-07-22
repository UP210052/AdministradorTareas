package com.example.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.back.models.TaskModel;

import java.util.*;


@Repository
public interface TaskRepository extends JpaRepository<TaskModel, Long> {
    @Query(value = "SELECT tasks.id, tasks.name, tasks.description, tasks.start_date, tasks.end_date, tasks.status, usuarios.id, usuarios.name FROM tasks JOIN task_assignments ON tasks.id = task_assignments.task_id JOIN usuarios ON task_assignments.user_id = usuarios.id;", nativeQuery = true)
    List<Object[]> getAllTasks();
}