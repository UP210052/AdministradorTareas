package com.example.back.services;

import com.example.back.dto.UserDto;
import com.example.back.mapper.UserMapper;
import com.example.back.models.UserModel;
import com.example.back.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Autowired
    public UserService(IUserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    public UserDto getUserDtoFromUser(UserModel userModel) {
        return userMapper.userToUserDto(userModel);
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
        try {
            UserModel user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setNombre(request.getNombre());
            user.setAdmin(request.isAdmin());
            userRepository.save(user);
            return user;
        }
        catch (Exception e){
            return null;
        }
    }

    public Boolean deleteById(Long id) {
        try {
            userRepository.deleteById(id);
            if (userRepository.findById(id).isPresent()) {
                return true;
            }
            return false;
        }
        catch (Exception e) {
            return false;
        }
    }
    public Optional<UserModel> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<UserModel> getAdminUsers() {
        return userRepository.findAll().stream()
                .filter(UserModel::isAdmin)
                .collect(Collectors.toList());
    }

    public List<String> getUpperCaseUserNames(List<UserModel> users) {
        return users.stream()
                .map(user -> user.getNombre().toUpperCase())
                .collect(Collectors.toList());
    }

    public List<String> getCapitalizedUserNames(List<UserModel> users) {
        return users.stream()
                .map(user -> capitalize(user.getNombre()))
                .collect(Collectors.toList());
    }

    private String capitalize(String name) {
        if (name == null || name.isEmpty()) {
            return name;
        }
        return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
    }

    public List<String> getSortedUserNames(List<UserModel> users) {
        return users.stream()
                .map(UserModel::getNombre) //
                .sorted() //
                .collect(Collectors.toList());
    }
  
    public List<Object[]> getIdUsers(){
        return userRepository.getIdUsers();
    }
}
