package com.codestates.reservation.service;

import com.codestates.global.exception.BusinessLogicException;
import com.codestates.global.exception.ExceptionCode;
import com.codestates.member.Member;
import com.codestates.member.MemberService;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.repository.PerformanceRepository;
import com.codestates.performance.service.PerformanceServiceImpl;
import com.codestates.reservation.dto.ReservationDto;
import com.codestates.reservation.entity.Reservation;
import com.codestates.reservation.mapper.ReservationMapper;
import com.codestates.reservation.repository.ReservationRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final ReservationMapper reservationMapper;
    private final PerformanceRepository performanceRepository;
    private final PerformanceServiceImpl performanceServiceImpl;
    private final MemberService memberService;

    public ReservationService(ReservationRepository reservationRepository, ReservationMapper reservationMapper,PerformanceRepository performanceRepository,
                              PerformanceServiceImpl performanceServiceImpl, MemberService memberService) {
        this.reservationRepository = reservationRepository;
        this.reservationMapper = reservationMapper;
        this.performanceRepository = performanceRepository;
        this.performanceServiceImpl = performanceServiceImpl;
        this.memberService = memberService;
    }
//url
    // 예약 생성
    @Transactional
    public ReservationDto.ReservationResponseDto createReservation(ReservationDto.ReservationRequestDto reservationRequestDto, Authentication authentication) throws AccessDeniedException {
        // 예약 정보를 생성하고 저장
        // 해당 DTO를 Reservation 엔티티로 변환하여 예약 정보를 생성하고 저장
        Map<String, Object> principal = (Map<String, Object>) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        Member member = memberService.findVerifiedMember(memberId);

        Reservation reservation = reservationMapper.reservationRequestDtoToReservation(reservationRequestDto);
        reservation.setMember(member);
        reservation.setReservationStatus(Reservation.ReservationStatus.WAITING);

        Performance performance = performanceRepository.findById(reservationRequestDto.getPerformanceId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PERFORMANCE_NOT_FOUND));

        reservation.setPrice(performance.getPrice()); // 공연에 등록된 가격 정보 가져오기
        reservation.setDate(performance.getDate());
        reservation.setSeatValue(reservationRequestDto.getSeatValue());

        int seatValue = reservationRequestDto.getSeatValue(); // 예약한 좌석 수
        int totalSeats = performance.getTotalSeat(); // 퍼포먼스 객체의 총 남은 토탈 좌석 수

        if (totalSeats == 0) {
            throw new BusinessLogicException(ExceptionCode.SEATS_SOLD_OUT);
        }
        if (seatValue > totalSeats) {
            throw new BusinessLogicException(ExceptionCode.SEAT_RESERVATION_EXCEEDED, totalSeats);
        }
        else{
            performanceServiceImpl.updatePerformanceSeats(performance, seatValue);
        }
        // 예약 정보 저장
        Reservation savedReservation = reservationRepository.save(reservation);
        // 예약 정보를 DTO로 매핑하여 반환
        ReservationDto.ReservationResponseDto result = reservationMapper.reservationToReservationResponseDto(savedReservation);
        result.setNickName(reservation.getMember().getNickname());

        return result;
    }

    // 예약 조회 및 상세 정보 반환
    public ReservationDto.ReservationResponseDto getReservation(long reservationId, Authentication authentication) {
        Map<String, Object> principal = (Map<String, Object>) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);
        Reservation reservation = optionalReservation.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.RESERVATION_NOT_FOUND));

        if(reservation.getMember().getMemberId()!=memberId){
            new BusinessLogicException(ExceptionCode.MEMBER_NOT_CORRECT);
        }
        return reservationMapper.reservationToReservationResponseDto(reservation);
    }
    //회원의 모든 예약정보 불러오기
    public List<ReservationDto.ReservationResponseDto> getMyReservations(long memberId, Performance.PERFORMANCE_STATUS status){
        Member member = memberService.findMember(memberId);
        List<Reservation> reservations = reservationRepository.findByMember(member);

        List<Reservation> findReservations = new ArrayList<>();
        System.out.println(reservations);

        //공연이 진행중일때
        for(int i =0;i<reservations.size();i++) {
            //공연이 진행중일때
            if (status.isCompleted() == 'f'&&LocalDateTime.now().isAfter(reservations.get(i).getPerformance().getDate())) {

                    findReservations.add(reservations.get(i));

            } else if (status.isCompleted() == 't'&&LocalDateTime.now().isBefore(reservations.get(i).getPerformance().getDate())) {

                    findReservations.add(reservations.get(i));

            }
        }
        List<ReservationDto.ReservationResponseDto> response =
                findReservations.stream()
                        .map(reservation-> reservationMapper.reservationToReservationResponseDto(reservation))
                        .collect(Collectors.toList());
        if(response.size()==0)
        new BusinessLogicException(ExceptionCode.RESERVATION_NOT_FOUND);
        return response;
    }

    // 예약 확인 로직 구현
    @Transactional
    public ReservationDto.ReservationResponseDto checkReservation(long reservationId) {
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
    @Transactional
    public void deleteReservation(long reservationId, Authentication authentication) {
        //사실 결제취소도 해야됨.
        Map<String, Object> principal = (Map<String, Object>) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.RESERVATION_NOT_FOUND));

        if(reservation.getMember().getMemberId()!=memberId){
            new BusinessLogicException(ExceptionCode.MEMBER_NOT_CORRECT);}
        reservationRepository.delete(reservation);
    }
    //예약이 존재하는지 검증
    public List<Reservation> findReservationByMember(Member member, Performance performance){

        List<Reservation> findReservation = reservationRepository.findByMemberAndPerformance(member, performance);
        if(findReservation.size()<1)
               new BusinessLogicException(ExceptionCode.RESERVATION_NOT_FOUND);
        return findReservation;

    }

}
