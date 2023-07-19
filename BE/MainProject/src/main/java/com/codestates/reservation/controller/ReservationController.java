package com.codestates.reservation.controller;

import com.codestates.global.exception.BusinessLogicException;
import com.codestates.member.Member;
import com.codestates.member.MemberService;
import com.codestates.reservation.dto.ReservationDto;
import com.codestates.reservation.entity.Reservation;
import com.codestates.reservation.service.ReservationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.Map;

@CrossOrigin
@Slf4j
@RestController
@RequestMapping("/reservation")
@Validated
public class ReservationController {
    private final ReservationService reservationService;
    private final MemberService memberService;
    public ReservationController(ReservationService reservationService,
                                 MemberService memberService) {
        this.reservationService = reservationService;
        this.memberService = memberService;
    }
    // 예약 생성
    @PostMapping("/reservation/{performanceid}")
    public ReservationDto.ReservationResponseDto createReservation(@PathVariable("performanceid") Long performanceId,
                                                                   @RequestBody ReservationDto.ReservationRequestDto reservationRequestDto,
                                                                   Authentication authentication) throws AccessDeniedException {
        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        ReservationDto.ReservationResponseDto responseDto = reservationService.createReservation(reservationRequestDto, authentication);
        return responseDto;
    }
    // 특정 예약 조회
    @GetMapping("/reservation/{memberid}/{reservationid}")
    public ResponseEntity<?> getReservation (@PathVariable("reservationId") Long reservationId, Authentication authentication){
        // 예약 조회 요청을 ReservationService에 전달
        ReservationDto.ReservationResponseDto responseDto = reservationService.getReservation(reservationId, authentication); //예약의 고유 식별자
        if (responseDto == null) {
            // 예약이 없을 경우 예외 처리 또는 예외 반환 등을 수행
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("해당 예약 ID에 대한 예약이 존재하지 않습니다.");
        }
        return ResponseEntity.ok(responseDto);
    }
    // 예약 삭제
    @DeleteMapping("/reservation/{memberid}/{reservationid}")
    public ResponseEntity<String> deleteReservation (@PathVariable("reservationId") Long reservationId){
        try {
            reservationService.deleteReservation(reservationId);
            // 예약 삭제 성공 -> 200 OK 응답 코드와 메시지 반환
            return ResponseEntity.ok("해당 예약을 삭제하는 것에 성공하였습니다.");
        } catch (BusinessLogicException e) {
            // 예약이 존재하지 않을 경우 -> 404
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 예약 ID에 대한 예약이 존재하지 않습니다.");
        } catch (Exception e) {
            // 그 외의 예외 발생으로 예약 삭제 실패 시 -> 500
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("해당 예약을 삭제하는 것에 실패하였습니다");
        }
    }
}

