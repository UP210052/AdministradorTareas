package com.example.back.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.back.models.ProjectModel;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectModel, Long> {
    @Query(value = "SELECT id, name FROM projects;",nativeQuery = true)

    List<Object[]> getIdP();

    @Query(value = "SELECT projects.id AS project_id, projects.name AS project_name, usuarios.name AS leader_name FROM projects JOIN usuarios ON projects.leader_id = usuarios.id;",nativeQuery = true)
    List<Object[]> getProjectAndLeader();

}
