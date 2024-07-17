package com.example.back.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "usuarios")
public class UserModel {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column
    private Long id;

    @Setter
    @Getter
    @Column(name = "name")
    private String nombre;

    @Setter
    @Getter
    @Column
    private String email;

    @Setter
    @Getter
    @Column
    private String password;

    @Column(name = "is_admin")
    private boolean isAdmin;

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}
