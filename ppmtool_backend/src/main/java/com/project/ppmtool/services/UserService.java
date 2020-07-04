package com.project.ppmtool.services;

import com.project.ppmtool.domain.User;
import com.project.ppmtool.exceptions.UsernameAlreadyExistException;
import com.project.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User saveUser(User user){
        User isExist = userRepository.findByUsername(user.getUsername());
        if (isExist != null)
            throw new UsernameAlreadyExistException("Username is already Exist");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setConfirmPassword("");
        return userRepository.save(user);
    }
}
