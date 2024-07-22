package com.example.back.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.back.models.ProjectModel;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectModel, Long> {
    @Query(value = "SELECT id, name FROM projects;",nativeQuery = true)
    List<Object[]> getIdProjects();
    
}
