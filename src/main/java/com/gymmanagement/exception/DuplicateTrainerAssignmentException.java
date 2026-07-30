package com.gymmanagement.exception;

public class DuplicateTrainerAssignmentException extends RuntimeException {

    public DuplicateTrainerAssignmentException(String message) {
        super(message);
    }
}