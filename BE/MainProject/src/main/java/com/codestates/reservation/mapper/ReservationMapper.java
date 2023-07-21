package com.codestates.reservation.mapper;

import com.codestates.performance.entity.Performance;
import com.codestates.reservation.dto.ReservationDto;
import com.codestates.reservation.entity.Reservation;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

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
                reservation.getSeatValue(),
                reservation.getPrice());
    }

    public Reservation reservationRequestDtoToReservation(ReservationDto.ReservationRequestDto requestDto){
        return  new Reservation(
                new Performance(requestDto.getPerformanceId()),
                requestDto.getSeatValue());
    }
}
