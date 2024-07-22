package com.example.back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.back.models.ProjectModel;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectModel, Long> {
    
}
