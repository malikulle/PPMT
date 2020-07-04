package com.project.ppmtool.payload;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

public class LoginRequest {
    @NotBlank(message = "Username can not be blank")
    private String username;
    @NotBlank(message = "Password can not be blank")
    @Length(min = 6 ,message = "Password must be 6 char")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
