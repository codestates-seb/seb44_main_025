package com.codestates.reservation.repository;

import com.codestates.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Optional<Reservation> findById(Long reservationId); //예약 정보 반환
    Reservation save(Reservation reservation);
    void delete(Reservation reservation);
}
