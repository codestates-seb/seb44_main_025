package com.codestates.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member email not found"),
    MEMBER_EXISTS(409, "Member email exists"),
    PERFORMANCE_NOT_FOUND(404, "Performance not found"),
    PERFORMANCE_EXISTS(409, "Performance title exists"),
    CANNOT_CHANGE_PERFORMANCE(403, "Performance can not change"),
    CANNOT_CHANGE_MEMBER(403, "Member can not change"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    RESERVATION_NOT_FOUND(404, "Reservation not found"),
    LIKE_NOT_FOUND(404, "Like not found");



    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }


}
