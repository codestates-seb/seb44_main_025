package com.codestates.reservation.mapper;

import com.codestates.reservation.dto.ReservationDto;
import com.codestates.reservation.entity.Reservation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
//@Component
public interface ReservationMapper {
    Reservation reservationRequestDtoToReservation(ReservationDto.ReservationRequestDto reservationRequestDto);
    ReservationDto.ReservationResponseDto reservationToReservationResponseDto(Reservation reservation);
}
