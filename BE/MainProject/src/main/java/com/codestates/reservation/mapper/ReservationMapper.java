package com.codestates.reservation.mapper;

import com.codestates.member.Member;
import com.codestates.payment.entity.Payment;
import com.codestates.performance.entity.Performance;
import com.codestates.reservation.dto.ReservationDto;
import com.codestates.reservation.entity.Reservation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.time.LocalDateTime;

@Component
@Getter
@Setter
public class ReservationMapper {
    public ReservationDto.ReservationResponseDto reservationToReservationResponseDto(Reservation reservation){
        return new ReservationDto.ReservationResponseDto(
                reservation.getReservationId(),
                reservation.getPerformance().getPerformanceId(),
                reservation.getMember().getNickname(),
                0,
                reservation.getDate(),
                reservation.getReservationStatus(),
                reservation.getPrice());
    }

    public Reservation reservationRequestDtoToReservation(ReservationDto.ReservationRequestDto requestDto){
        return  new Reservation(
                new Performance(requestDto.getPerformanceId()),
                requestDto.getSeatValue());
    }
}
