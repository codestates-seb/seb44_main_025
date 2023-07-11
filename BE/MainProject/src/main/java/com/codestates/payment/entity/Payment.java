package com.codestates.payment.entity;

import com.codestates.reservation.entity.Reservation;

import javax.persistence.*;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long paymentId;
    @OneToOne
    @JoinColumn(name="RESERVATION_ID")
    private Reservation reservation;
}
