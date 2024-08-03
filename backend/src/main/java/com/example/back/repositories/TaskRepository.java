package com.example.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.back.models.TaskModel;

import java.util.*;


@Repository
public interface TaskRepository extends JpaRepository<TaskModel, Long> {
    /*
    SELECT 
        tasks.id, 
        tasks.name, 
        tasks.description, 
        tasks.start_date, 
        tasks.end_date, 
        tasks.status, 
        projects.name AS project_name,
        GROUP_CONCAT(usuarios.name SEPARATOR ', ') AS assigned_users
    FROM 
        tasks
    JOIN 
        task_assignments ON tasks.id = task_assignments.task_id
    JOIN
        usuarios ON task_assignments.user_id = usuarios.id
    JOIN
        projects ON tasks.project_id = projects.id  -- Unión con la tabla de proyectos
    GROUP BY 
        tasks.id, tasks.name, tasks.description, tasks.start_date, tasks.end_date, tasks.status, projects.name;
     */
    @Query(value = "SELECT tasks.id, tasks.name, tasks.description, tasks.start_date, tasks.end_date, tasks.status, projects.name AS project_name, GROUP_CONCAT(usuarios.name SEPARATOR ', ') AS assigned_users FROM tasks JOIN task_assignments ON tasks.id = task_assignments.task_id JOIN usuarios ON task_assignments.user_id = usuarios.id JOIN projects ON tasks.project_id = projects.id GROUP BY tasks.id, tasks.name, tasks.description, tasks.start_date, tasks.end_date, tasks.status, projects.name;", nativeQuery = true)
    List<Object[]> getAllTasks();

    @Query(value = "SELECT tasks.id, tasks.name, tasks.description, tasks.start_date, tasks.end_date, tasks.status, projects.name AS project_name, GROUP_CONCAT(usuarios.name SEPARATOR ', ') AS assigned_users FROM tasks JOIN task_assignments ON tasks.id = task_assignments.task_id JOIN usuarios ON task_assignments.user_id = usuarios.id JOIN projects ON tasks.project_id = projects.id WHERE usuarios.id = :userId GROUP BY tasks.id, tasks.name, tasks.description, tasks.start_date, tasks.end_date, tasks.status, projects.name;", nativeQuery = true)
    List<Object[]> getTasksByUserId(Long userId);

    @Query(value = "SELECT tasks.id AS task_id, tasks.name AS task_name, tasks.start_date, tasks.end_date, tasks.status, GROUP_CONCAT(usuarios.name SEPARATOR ', ') AS assigned_users FROM tasks JOIN task_assignments ON tasks.id = task_assignments.task_id JOIN usuarios ON task_assignments.user_id = usuarios.id WHERE tasks.project_id = :projectId GROUP BY tasks.id, tasks.name, tasks.start_date, tasks.end_date, tasks.status;", nativeQuery = true)
    List<Object[]> getTaskbyProjectId(Integer projectId);
}
