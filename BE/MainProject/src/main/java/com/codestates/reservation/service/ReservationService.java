package com.codestates.reservation.service;

import com.codestates.performance.entity.Performance;
import com.codestates.performance.repository.PerformanceRepository;
import com.codestates.reservation.dto.ReservationDto;
import com.codestates.reservation.entity.Reservation;
import com.codestates.reservation.mapper.ReservationMapper;
import com.codestates.reservation.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;

    private final PerformanceRepository performanceRepository;

    public ReservationService(ReservationRepository reservationRepository, ReservationMapper reservationMapper, PerformanceRepository performanceRepository) {
        this.reservationRepository = reservationRepository;
        this.reservationMapper = reservationMapper;
        this.performanceRepository = performanceRepository;
    }

    // 예약 생성
    public Reservation.ReservationStatus createReservation(ReservationDto.ReservationRequestDto reservationRequestDto) throws AccessDeniedException {
        // 예약 정보를 생성하고 저장
        Reservation reservation = new Reservation();
        reservation.setPerformanceId(reservationRequestDto.getPerformanceId());
        reservation.setMemberId(reservationRequestDto.getMemberId());
        reservation.setNickName(reservationRequestDto.getNickName());
        reservation.setReservationStatus(Reservation.ReservationStatus.PENDING);
        //reservation.setReservationStatus(Reservation.ReservationStatus.PENDING.getReservationStatus());

        // 가격 설정  -> 가격 설정위해 해당공연과 공연자 데이터 확인 필요
        Performance performance = performanceRepository.findById(reservationRequestDto.getPerformanceId())
                .orElseThrow(() -> new IllegalArgumentException("공연 정보를 찾을 수 없습니다."));

        // 공연자 권한 확인 -> 해당 공연의 공연자만 공연에 대한 가격을 설정할 수 있다
        List<Long> performerId = performance.getPerformanceArtists().stream()
                .map(e->e.getArtist()
                        .getArtistId())
                .collect(Collectors.toList());
//        if (performerId.equals(userId)) {
//            int price = performance.getPrice();
//            reservation.setPrice(price);
//
//            // 남은 좌석 업데이트 (한 이용자는 한 좌석만 예약핧 수 있다 그렇기에 -1)
//            int remainingSeats = performance.getTotalSeat() - 1; //현재 공연의 총 좌석 수 - 1
//            performance.setTotalseat(remainingSeats); // 한 사람당 한 좌석만 예약 가능하도록 남은 좌석 수를 업데이트
//            performanceRepository.save(performance); //업데이트된 좌석 수를 데이터베이스에 저장
//        } else {
//            throw new AccessDeniedException("가격을 설정할 수 있는 권한이 없습니다.");
//        }
        // 예약 정보 저장
        Reservation savedReservation = reservationRepository.save(reservation);

        return savedReservation.getReservationStatus();
    }


    // 예약 조회 및 상세 정보 반환
    public ReservationDto.ReservationResponseDto getReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
        if (reservation == null) {
            // 예약이 없을 경우 예외 처리 또는 예외 반환 등을 수행 (필요한 정보가 유효하지 않을 때 발생할 수 있는 예외)
            throw new IllegalArgumentException("예약에 대한 조회를 할 수 없습니다.");
        }

        // ReservatioResponseDto로 변환
        ReservationDto.ReservationResponseDto responseDto = new ReservationDto.ReservationResponseDto();
        responseDto.setReservationId(reservation.getReservationId());
        responseDto.setPerformanceId(reservation.getPerformanceId());
        responseDto.setMemberId(reservation.getMemberId());
        responseDto.setNickName(reservation.getNickName());
        responseDto.setPaymentId(reservation.getPaymentId());
        responseDto.setDate(reservation.getDate());
        responseDto.setReservationStatus(reservation.getReservationStatus());
        responseDto.setPrice(reservation.getPrice());

        return responseDto;
    }

    // 예약 확인 로직 구현
    public ReservationDto.ReservationResponseDto checkReservation(Long reservationId) {
        // 예약 ID로 예약 정보를 조회하고 예약 상태를 "CONFIRMED"로 변경한 뒤 ReservatioResponseDto로 변환하여 반환하는 코드 작성
        // 예약 조회
        Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
        if (reservation == null) {
            // 예약이 없을 경우 예외 처리 또는 예외 반환 등을 수행
            throw new IllegalArgumentException("예약이 확인 되지 않습니다.");
        }
        // 예약 상태 변경
        reservation.setReservationStatus(Reservation.ReservationStatus.CONFIRMED);
        // 예약 정보 저장
        Reservation savedReservation = reservationRepository.save(reservation);

        // ReservatioResponseDto로 변환
        ReservationDto.ReservationResponseDto responseDto = new ReservationDto.ReservationResponseDto();
        responseDto.setReservationId(savedReservation.getReservationId());
        responseDto.setPerformanceId(savedReservation.getPerformanceId());
        responseDto.setMemberId(savedReservation.getMemberId());
        responseDto.setNickName(savedReservation.getNickName());
        responseDto.setPaymentId(savedReservation.getPaymentId());
        responseDto.setDate(savedReservation.getDate());
        responseDto.setReservationStatus(savedReservation.getReservationStatus());
        responseDto.setPrice(savedReservation.getPrice());

        return responseDto;
    }

    // 예약 삭제 로직
    public void deleteReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("예약이 존재하지 않습니다."));
        reservationRepository.delete(reservation);
    }
}
