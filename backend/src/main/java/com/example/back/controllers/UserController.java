package com.example.back.controllers;

import com.example.back.dto.UserDto;
import com.example.back.exceptions.NotFoundException;
import com.example.back.models.UserModel;
import com.example.back.repositories.IUserRepository;
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

    @Autowired
    private IUserRepository iUserRepository;

    @GetMapping
    public List<UserModel> getUsers() {
        return this.userService.getUsers();
    }

    @PostMapping
    public UserModel saveUser(@RequestBody UserModel user) {
        return this.userService.saveUser(user);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<UserModel> getUserById(@PathVariable("id") Long id) {
        Optional<UserModel> userOpt = this.userService.getById(id);
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        } else {
            throw new NotFoundException("El usuario con id " + id + " no existe.");
        }
    }

    @GetMapping(path = "/mapper/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable("id") Long id) {
        Optional<UserModel> userOpt = iUserRepository.findById(id);
        if (userOpt.isPresent()) {
            UserDto userDTO = userService.getUserDtoFromUser(userOpt.get());
            return ResponseEntity.ok(userDTO);
        } else {
            throw new NotFoundException("El usuario con id " + id + " no existe.");
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<UserModel> updateUserById(@RequestBody UserModel request, @PathVariable Long id) {
        UserModel updatedUser = this.userService.updateById(request, id);
        if (updatedUser == null) {
            throw new NotFoundException("El usuario con id " + id + " no existe.");
        }
        return ResponseEntity.ok(updatedUser);
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

    @GetMapping("/admins")
    public List<UserModel> getAdminUsers() {
        return userService.getAdminUsers();
    }

    @GetMapping("/uppercase-names")
    public List<String> getUpperCaseUserNames() {
        List<UserModel> users = userService.getUsers();
        return userService.getUpperCaseUserNames(users);
    }

    @GetMapping("/capitalized-names")
    public List<String> getCapitalizedUserNames() {
        List<UserModel> users = userService.getUsers();
        return userService.getCapitalizedUserNames(users);
    }

    @GetMapping("/sorted-names")
    public List<String> getSortedUserNames() {
        List<UserModel> users = userService.getUsers();
        return userService.getSortedUserNames(users);
    }
    
    @GetMapping("/id")
    public List<Object[]> getIdUsers() {
        return this.userService.getIdUsers();
    }


}
