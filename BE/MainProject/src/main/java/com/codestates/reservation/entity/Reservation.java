package com.codestates.reservation.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reservationId;
    private Long performanceId;
    private Long memberId;
    private Long PaymentId;
    @Column(nullable = false)
    private String nickName;
    @Column(nullable = false)
    private LocalDateTime date;
    @Column(nullable = false)
    private int price;
    @Enumerated(EnumType.STRING)
    private ReservationStatus reservationStatus;
    //@Enumerated(EnumType.STRING)
    //private PaymentStatus paymentStatus;

    @OneToOne(mappedBy = "reservation")
    private Payment payment;


    @Getter
    public enum ReservationStatus {
        PENDING("Pending"), // 대기 중 - 예약이 아직 처리되지 않은 상태
        CONFIRMED("Confirmed"), // 확인된 상태를 - 예약이 확인되고 처리된 상태
        // 예약이 접수되었으나 아직 필요한 작업(결제, 자원 예약 등)이 진행 중이거나 아직 완료되지않았을 수 있을 때의 상태
        // 결제 여부를 따로 확인하는 과정이 필요
        CANCELLED("Cancelled"), // 취소된 상태 -  예약이 취소된 상태
        COMPLETED("Completed"); //완료된 상태 - 예약이 정상적으로 완료된 상태
        // 예약 확인, 결제, 좌석 선택 등등 모든 완료가 되었을때 최종 완료
        private String status;

        ReservationStatus(String status) {
            this.status = status;
        }

        public String getReservationStatus() {
            return status;
        }
    }
//public enum PaymentStatus {
//    PENDING("Pending"),
//    COMPLETED("Completed"),
//    FAILED("Failed");

//    private String status;

//    PaymentStatus(String status) {
//        this.status = status;
//    }

//    public String getStatus() {
//        return status;
//    }
//}
}
