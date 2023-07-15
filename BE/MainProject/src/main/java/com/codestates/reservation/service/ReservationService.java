package com.codestates.reservation.service;

import com.codestates.global.exception.BusinessLogicException;
import com.codestates.global.exception.ExceptionCode;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.repository.PerformanceRepository;
import com.codestates.reservation.dto.ReservationDto;
import com.codestates.reservation.entity.Reservation;
import com.codestates.reservation.mapper.ReservationMapper;
import com.codestates.reservation.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.nio.file.AccessDeniedException;
import java.util.Optional;

@Service
@Transactional
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;
    private final PerformanceRepository performanceRepository;

    public ReservationService(ReservationRepository reservationRepository, ReservationMapper reservationMapper,PerformanceRepository performanceRepository) {
        this.reservationRepository = reservationRepository;
        this.reservationMapper = reservationMapper;
        this.performanceRepository = performanceRepository;
    }

    // 예약 생성
    public ReservationDto.ReservationResponseDto createReservation(ReservationDto.ReservationRequestDto reservationRequestDto) throws AccessDeniedException {
        // 예약 정보를 생성하고 저장
        // 해당 DTO를 Reservation 엔티티로 변환하여 예약 정보를 생성하고 저장
        Reservation reservation = reservationMapper.reservationRequestDtoToReservation(reservationRequestDto);
        // getMemberId()); // jwt 후 레포지스토리 - findbyid
        reservation.setReservationStatus(Reservation.ReservationStatus.WAITING);

        Performance performance = performanceRepository.findById(reservationRequestDto.getPerformanceId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PERFORMANCE_NOT_FOUND));

        reservation.setPrice(performance.getPrice()); // 공연에 등록된 가격 정보 가져오기

        int seatValue = reservationRequestDto.getSeatValue(); // 예약한 좌석 수
        int totalSeats = performance.getTotalSeat(); // 퍼포먼스 객체의 총 남은 토탈 좌석 수

        if (seatValue > totalSeats) {
            int maxSeats = performance.getTotalSeat();
            throw new BusinessLogicException(ExceptionCode.SEAT_RESERVATION_EXCEEDED, maxSeats);
        }
        // 예약 정보 저장
        Reservation savedReservation = reservationRepository.save(reservation);

        // 예약 정보를 DTO로 매핑하여 반환
        return reservationMapper.reservationToReservationResponseDto(savedReservation);
    }

    // 예약 조회 및 상세 정보 반환
    public ReservationDto.ReservationResponseDto getReservation(Long reservationId) {
    // 예약을 검증
        Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);
        Reservation reservation = optionalReservation.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.RESERVATION_NOT_FOUND));

        return reservationMapper.reservationToReservationResponseDto(reservation);
    }

    // 예약 확인 로직 구현
    public ReservationDto.ReservationResponseDto checkReservation(Long reservationId) {
        // 예약 ID로 예약 정보를 조회하고 예약 상태 변경한 뒤 ReservatioResponseDto로 변환하여 반환하는 코드 작성
        // 예약 조회
        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
        if (reservation == null) {
            // 예약이 없을 경우 예외 처리 또는 예외 반환 등을 수행
            throw new BusinessLogicException(ExceptionCode.RESERVATION_NOT_FOUND);
        }
        // 예약 상태 변경
        reservation.setReservationStatus(Reservation.ReservationStatus.COMPLETED);
        // 예약 정보 저장
        Reservation savedReservation = reservationRepository.save(reservation);

        // ReservatioResponseDto로 변환
        return reservationMapper.reservationToReservationResponseDto(savedReservation);
    }

    // 예약 삭제 로직
    public void deleteReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.RESERVATION_NOT_FOUND));
        reservationRepository.delete(reservation);
    }
}
