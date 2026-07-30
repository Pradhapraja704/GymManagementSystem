package com.gymmanagement.exception;

public class DuplicateWorkoutPlanException extends RuntimeException {

    public DuplicateWorkoutPlanException(String message) {
        super(message);
    }
}