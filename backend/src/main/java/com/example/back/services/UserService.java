package com.example.back.services;

import com.example.back.models.UserModel;
import com.example.back.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    IUserRepository userRepository;

    public List<UserModel> getUsers() {
        return (List<UserModel>) userRepository.findAll();
    }

    public UserModel saveUser(UserModel user) {
        return userRepository.save(user);
    }

    public Optional<UserModel> getById(Long id) {
        return userRepository.findById(id);
    }

    public UserModel updateById(UserModel request, Long id) {
        UserModel user = userRepository.findById(id).get();

        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
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

}
