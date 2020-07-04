package com.project.ppmtool.controllers;

import com.project.ppmtool.domain.User;
import com.project.ppmtool.payload.JWTLoginSuccessResponse;
import com.project.ppmtool.payload.LoginRequest;
import com.project.ppmtool.security.JwtTokenProvider;
import com.project.ppmtool.services.MapValidationErrorService;
import com.project.ppmtool.services.UserService;
import com.project.ppmtool.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.project.ppmtool.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private MapValidationErrorService errorService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserValidator userValidator;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private AuthenticationManager authenticationManager;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){

        userValidator.validate(user,result);

        ResponseEntity<?> errorMap = errorService.MapValidationService(result);
        if(errorMap != null)
            return errorMap;

        User newUser = userService.saveUser(user);

        return new ResponseEntity<User>(newUser, HttpStatus.OK);
    }

    @PostMapping("/login")
    public  ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,BindingResult result){
        ResponseEntity<?> errorMap = errorService.MapValidationService(result);
        if(errorMap != null)
            return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = TOKEN_PREFIX + tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JWTLoginSuccessResponse(true,token));
    }
}
