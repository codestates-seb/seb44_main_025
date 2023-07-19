package com.codestates.reservation.mapper;

import com.codestates.reservation.dto.ReservationDto;
import com.codestates.reservation.entity.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
//@Component
public interface ReservationMapper {
    @Mapping(target = "member", source = "authentication")
    Reservation reservationRequestDtoToReservation(ReservationDto.ReservationRequestDto reservationRequestDto, @Param("authentication") Authentication authentication);
    // ReservationDto의 필드 값을 Reservation 엔티티의 필드에 설정하여 매핑
    ReservationDto.ReservationResponseDto reservationToReservationResponseDto(Reservation reservation);
    // Reservation의 필드 값을 ReservationDto의 필드에 설정하여 매핑
}
