package com.example.back.controllers;

import com.example.back.models.UserModel;
import com.example.back.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserModel> getUsers() {
        return this.userService.getUsers();
    }

    @PostMapping
    public UserModel saveUser(@RequestBody UserModel user) {
        return this.userService.saveUser(user);
    }

    @GetMapping(path = "/{id}")
    public Optional<UserModel> getUserById(@PathVariable("id") Long id) {
        return this.userService.getById(id);
    }

    @PutMapping(path = "/{id}")
    public UserModel updateUserById(@RequestBody UserModel request, @PathVariable Long id) {
        return this.userService.updateById(request, id);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable("id") Long id) {
        boolean isDeleted = this.userService.deleteById(id);
        if (isDeleted) {
            return new ResponseEntity<>("User #"+id+" deleted", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("User #"+id+" couldn't be removed.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<UserModel> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserModel currentUser = (UserModel) authentication.getPrincipal();
        return ResponseEntity.ok(currentUser);
    }

    // Nuevo método para obtener todos los usuarios
    @GetMapping("/")
    public ResponseEntity<List<UserModel>> allUsers() {
        List<UserModel> users = userService.getUsers();
        return ResponseEntity.ok(users);

    }

    @GetMapping("/id")
    public List<Object[]> getIdUsers() {
        return this.userService.getIdUsers();
    }

}
