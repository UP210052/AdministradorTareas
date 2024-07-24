package com.example.back.repositories;

import com.example.back.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IUserRepository extends JpaRepository<UserModel, Long> {
    UserModel findByEmail(String email);
    @Query(value = "SELECT id, name FROM usuarios;",nativeQuery = true)
    List<Object[]> getIdTask();
}
