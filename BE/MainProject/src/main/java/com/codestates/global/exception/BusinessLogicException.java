package com.codestates.global.exception;

import lombok.Getter;

public class BusinessLogicException extends RuntimeException{
    @Getter
    private ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode){
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
    public BusinessLogicException(ExceptionCode exceptionCode, int maxSeats) {
        super(String.format("%s. 예약 가능한 좌석 수를 초과했습니다. 허용되는 최대 예약 좌석 수: %d", exceptionCode.getMessage(), maxSeats));
    }
}
