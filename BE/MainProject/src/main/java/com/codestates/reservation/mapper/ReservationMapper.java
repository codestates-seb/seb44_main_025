package com.codestates.reservation.mapper;

import com.codestates.reservation.dto.ReservationDto;
import com.codestates.reservation.entity.Reservation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
//@Component
public interface ReservationMapper {

    Reservation reservationRequestDtoToReservation(ReservationDto.ReservationRequestDto reservationRequestDto);
    // ReservationDto의 필드 값을 Reservation 엔티티의 필드에 설정하여 매핑
    ReservationDto.ReservationResponseDto reservationToReservationResponseDto(Reservation reservation);
    // Reservation의 필드 값을 ReservationDto의 필드에 설정하여 매핑
}
