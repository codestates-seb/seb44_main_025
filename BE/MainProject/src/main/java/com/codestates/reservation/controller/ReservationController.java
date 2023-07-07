package com.codestates.reservation.controller;

import com.codestates.reservation.dto.ReservationDto;
import com.codestates.reservation.entity.Reservation;
import com.codestates.reservation.service.ReservationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;

@Slf4j
@RestController
@RequestMapping("/reservation")
@Validated
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    // 예약 생성
    @PostMapping
    public ReservationDto.ReservationResponseDto createReservation(@RequestBody ReservationDto.ReservationRequestDto reservationRequestDto) throws AccessDeniedException {
        //예약을 생성하는 데 필요한 정보를 담고 있는 데이터 객체
        // 예약 생성 요청을 ReservationService에 전달
        Reservation.ReservationStatus reservationStatus = reservationService.createReservation(reservationRequestDto);

        // 생성된 예약의 상태를 응답 반환
        ReservationDto.ReservationResponseDto responseDto = new ReservationDto.ReservationResponseDto();
        responseDto.setReservationStatus(reservationStatus);
        return responseDto;
    }

    // 특정 예약 조회
    @GetMapping("/{reservationId}")
    public ReservationDto.ReservationResponseDto getReservation(@PathVariable("reservationId") Long reservationId) {
        // 예약 조회 요청을 ReservationService에 전달
        ReservationDto.ReservationResponseDto responseDto = reservationService.getReservation(reservationId); //예약의 고유 식별자
        if (responseDto == null) {
            // 예약이 없을 경우 예외 처리 또는 예외 반환 등을 수행
            throw new IllegalArgumentException("예약이 없습니다.");
        }
        return responseDto;
    }

    // 예약 삭제
    @DeleteMapping("/{reservationId}")
    public void deleteReservation(@PathVariable("reservationId") Long reservationId) {
        reservationService.deleteReservation(reservationId);
    }
}
