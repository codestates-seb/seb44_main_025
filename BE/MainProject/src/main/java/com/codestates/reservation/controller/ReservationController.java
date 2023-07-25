package com.codestates.reservation.controller;

import com.codestates.artist.dto.ArtistResponseDto;
import com.codestates.global.exception.BusinessLogicException;
import com.codestates.member.MemberService;
import com.codestates.performance.entity.Performance;
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
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    @PostMapping
    public ReservationDto.ReservationResponseDto createReservation(@RequestBody ReservationDto.ReservationRequestDto reservationRequestDto,
                                                                   Authentication authentication) throws AccessDeniedException {
        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        ReservationDto.ReservationResponseDto responseDto = reservationService.createReservation(reservationRequestDto, authentication);
        return responseDto;
    }
    // 특정 예약 조회
    @GetMapping("/{reservationId}") // 예약의 정보의 반환타입이 바뀔 수 있음 그래서 <?> 와일드카드 적 (유연한 코드)
    public ResponseEntity<?> getReservation (@PathVariable("reservationId") long reservationId, Authentication authentication){
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
    //자신의 예약 목록 출력(공연 진행 중)
    @GetMapping("/mypage")
    public ResponseEntity getMyReservations(@RequestParam(value="performanceStatus", required = false) String performanceStatus, Authentication authentication){
        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        List<ReservationDto.ReservationResponseDto> reservations = reservationService.getMyReservations(memberId, Performance.PERFORMANCE_STATUS.of(performanceStatus));

        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }


    // 예약 삭제
    @DeleteMapping("/{reservationId}")
    public ResponseEntity<String> deleteReservation (@PathVariable("reservationId") long reservationId,
                                                     Authentication authentication){
        try {
            reservationService.deleteReservation(reservationId, authentication);
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

