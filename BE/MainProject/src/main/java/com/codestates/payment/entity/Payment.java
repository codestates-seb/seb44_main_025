package com.codestates.payment.entity;

import com.codestates.reservation.entity.Reservation;

import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

public class Payment {
    @OneToOne
    @JoinColumn(name="RESERVATION_ID")
    private Reservation reservation;
}
