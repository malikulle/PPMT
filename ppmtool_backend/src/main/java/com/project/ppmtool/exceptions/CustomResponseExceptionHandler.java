package com.project.ppmtool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<?> handleProjectIdException(ProjectIdException ex , WebRequest request){
        ProjectIdExeptionResposne exeptionResponse = new ProjectIdExeptionResposne(ex.getMessage());
        return new ResponseEntity(exeptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<?> handleProjectNotFoundException(ProjectNotFoundException ex , WebRequest request){
        ProjectNotFoundExceptionResponse exeptionResponse = new ProjectNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity(exeptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<?> handleUseranemAlreadyExistException(UsernameAlreadyExistException ex,WebRequest request){
        UsernameAlreadyExistResponse existResponse = new UsernameAlreadyExistResponse(ex.getMessage());
        return new ResponseEntity(existResponse,HttpStatus.BAD_REQUEST);
    }
}
