package com.example.back.repositories;

import com.example.back.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<UserModel, Long> {
    Optional<UserModel> findByEmail(String email);
    
    @Query(value = "SELECT id, name FROM usuarios;",nativeQuery = true)
    List<Object[]> getIdUsers();
}
