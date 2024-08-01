package com.example.back.services;

import com.example.back.models.UserModel;
import com.example.back.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserModel> getUsers() {
        return (List<UserModel>) userRepository.findAll();
    }

    public UserModel saveUser(UserModel user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<UserModel> getById(Long id) {
        return userRepository.findById(id);
    }

    public UserModel updateById(UserModel request, Long id) {
        UserModel user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setNombre(request.getNombre());
        user.setAdmin(request.isAdmin());
        userRepository.save(user);
        return user;
    }

    public Boolean deleteById(Long id) {
        try {
            userRepository.deleteById(id);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }
    public Optional<UserModel> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
