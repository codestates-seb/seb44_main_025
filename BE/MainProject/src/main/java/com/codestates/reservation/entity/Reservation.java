package com.codestates.reservation.entity;


import com.codestates.member.Member;
import com.codestates.payment.entity.Payment;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
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
    private Long PaymentId;
    private Long memberId;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
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
        WAITING("Waiting"), // 대기 중 - 예약은 되었으나 결제 완료 단계 전 (최종 결제 확인중)
        // 결제 여부를 따로 확인하는 과정이 필요
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
    public Reservation(Member member) {
        this.member = member;
        this.memberId = member.getMemberId();
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
