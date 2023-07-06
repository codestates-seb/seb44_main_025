package com.codestates.reservation.dto;

import com.codestates.reservation.entity.Reservation;
import lombok.*;

import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

public class ReservationDto {
    @Data
    @Getter
    @Setter
    public static class ReservatioPostDto { // 예약 생성 요청
        private Long performanceId; // 예약하려는 공연의 ID
        private Long memberId; // 예약을 진행하는 회원의 ID
        private String nickName; // 예약을 진행하는 회원의 닉네임
        private LocalDateTime date; // 예약하려는 공연의 날짜와 시간을 보여줌 (예약일시)
        private int price; // 해당 공연 예약에 필요한 가격
        @Pattern(regexp = "^\\d{3}-\\d{3,4}-\\d{4}$", message = "Invalid phone number format")
        private String phone; // 예약자의 전화번호
        private Reservation.ReservationStatus reservationStatus; // 예약의 상태 -> 예약 생성 후에 상태가 업데이트되는 형태
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ReservationResponseDto { // 예약 조회 결과
        private Long reservationId;
        private Long performanceId;
        private Long memberId;
        private String nickName;
        private Long paymentId;
        private LocalDateTime date;
        private Reservation.ReservationStatus reservationStatus;
        private int price;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ReservationRequestDto { // 예약을 생성할 때 사용자로부터 입력받아야하는 정보를 담고 있는 DTO
        // 사용자가 선택한 예약 정보를 담아서 (사용자가 선택한 예약 정보에 대한 필드를 이 클래스에 담아 백엔드로 보내줌)
        private Long performanceId;
        private Long memberId;
        private String nickName;
        private int seatCount = 1; // 한 사람당 한 좌석만 예약하도록 1로 고정해줌.
    }
}
