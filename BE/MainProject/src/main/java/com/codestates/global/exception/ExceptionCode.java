package com.codestates.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "해당 회원이 존재하지 않음"),
    MEMBER_EXISTS(409, "이미 존재하는 이메일입니다"),
    PERFORMANCE_NOT_FOUND(404, "Performance not found"),
    PERFORMANCE_EXISTS(409, "Performance title exists"),
    CANNOT_CHANGE_PERFORMANCE(403, "Performance can not change"),
    CANNOT_CHANGE_MEMBER(403, "Member can not change"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    RESERVATION_NOT_FOUND(404, "해당 공연에 대한 예약 정보를 찾을 수 없습니다."),
    SEAT_RESERVATION_EXCEEDED(400,"현재 예약 가능한 좌석 수를 초과했습니다"),
    LIKE_NOT_FOUND(404, "Like not found"),
    ARTIST_NOT_FOUND(404, "아티스트가 존재하지 않음"),
    ARTIST_EXISTS(409, "이미 존재하는 아티스트명 입니다"),
    CATEGORY_NOT_FOUND(404, "존재하지 않는 카테고리명"),
    CONTENT_NOT_FOUND(404, "존재하지 않는 콘텐츠");



    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }


}
