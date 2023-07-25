package com.codestates.reservation.dto;

import com.codestates.reservation.entity.Reservation;
import lombok.*;

import java.time.LocalDateTime;

public class ReservationDto {
    @Data
    @Getter
    @Setter
    public static class ReservatioPostDto { // 예약 생성 요청
        private Long performanceId; // 예약하려는 공연의 ID
        private LocalDateTime date; // 예약하려는 공연의 날짜와 시간을 보여줌 (예약일시)
        private int price; // 해당 공연 예약에 필요한 가격
        private Reservation.ReservationStatus reservationStatus; // 예약의 상태 -> 예약 생성 후에 상태가 업데이트되는 형태
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ReservationResponseDto { // 예약 조회 결과
        private long reservationId;
        private long performanceId;
        private String nickName;
        private long paymentId;
        private LocalDateTime date;
        private Reservation.ReservationStatus reservationStatus;
        private long seatValue;
        private int price;
        private String imageUrl;
    }
    @Getter
        @Setter
        @AllArgsConstructor
        @NoArgsConstructor
        public static class ReservationRequestDto { // 예약을 생성할 때 사용자로부터 입력받아야하는 정보를 담고 있는 DTO
            // 사용자가 선택한 예약 정보를 담아서 (사용자가 선택한 예약 정보에 대한 필드를 이 클래스에 담아 백엔드로 보내줌)
            private long performanceId;
            private int seatValue;
        //@Pattern(regexp = "^\\d{3}-\\d{3,4}-\\d{4}$", message = "올바른 전화번호 형식으로 작성해주세요")
        //private String phone; // 예약자의 전화번호 -> 멤버에서 관리하기로
    }
}

