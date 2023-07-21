package com.codestates.reservation.repository;

import com.codestates.member.Member;
import com.codestates.performance.entity.Performance;
import com.codestates.reservation.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Optional<Reservation> findById(Long reservationId); //예약 정보 반환
    Reservation save(Reservation reservation);
    List<Reservation> findByMemberAndPerformance(Member member, Performance performance);
    List<Reservation> findByMember(Member member);
    void delete(Reservation reservation);
}
