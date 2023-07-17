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
    IMAGE_UPLOAD_FAILED(415,"이미지 업로드에 실패하였습니다."),
    REVIEW_NOT_FOUND(404,"해당 리뷰를 찾을 수 없습니다."),
    SEATS_SOLD_OUT(400, "좌석이 모두 매진되었습니다"),
    RESERVATION_NOT_FOUND(404, "해당 공연에 대한 예약 정보를 찾을 수 없습니다."),
    SEAT_RESERVATION_EXCEEDED(400,"현재 예약 가능한 좌석 수를 초과했습니다"),
    LIKE_NOT_FOUND(404, "Like not found"),
    ARTIST_NOT_FOUND(404, "아티스트가 존재하지 않음"),
    ARTIST_EXISTS(409, "이미 존재하는 아티스트명 입니다"),
    CATEGORY_NOT_FOUND(404, "존재하지 않는 카테고리명"),
    CONTENT_NOT_FOUND(404, "존재하지 않는 콘텐츠"),
    PERFORMANCE_COMMENT_NOT_FOUND(404, "존재하지 않는 공연 코멘트입니다."),
    PASSWORD_NOT_CORRECT(404,"패스워드가 일치하지 않습니다"),
    MEMBER_HAS_ARTIST(500, "이미 아티스트가 등록된 회원입니다");



    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }


}
