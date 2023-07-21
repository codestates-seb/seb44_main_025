package com.codestates.performancereview.service;

import com.codestates.global.exception.BusinessLogicException;
import com.codestates.global.exception.ExceptionCode;
import com.codestates.image.ImageUploadService;
import com.codestates.member.Member;
import com.codestates.member.MemberRepository;
import com.codestates.member.MemberService;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.repository.PerformanceRepository;
import com.codestates.performancereview.dto.ReviewDto;
import com.codestates.performancereview.entity.Review;
import com.codestates.performancereview.mapper.ReviewMapperImpl;
import com.codestates.performancereview.repository.ReviewRepository;
import com.codestates.reservation.entity.Reservation;
import com.codestates.reservation.service.ReservationService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final PerformanceRepository performanceRepository;
    private final MemberService memberService;
    private final ImageUploadService imageUploadService;
    private final MemberRepository memberRepository;
    private final ReservationService reservationService;

    private final ReviewMapperImpl reviewMapperImpl;
    public ReviewService(ReviewRepository reviewRepository, PerformanceRepository performanceRepository,
                         MemberService memberService, ImageUploadService imageUploadService,
                         ReviewMapperImpl reviewMapperImpl, MemberRepository memberRepository,
                         ReservationService reservationService ) {
        this.reviewRepository = reviewRepository;
        this.performanceRepository = performanceRepository;
        this.memberService = memberService;
        this.imageUploadService = imageUploadService;
        this.reviewMapperImpl = reviewMapperImpl;
        this.memberRepository = memberRepository;
        this.reservationService = reservationService;
    }
    // 현재 사용자의 ID를 가져오는 로직을 구현
    private long getCurrentUserId(Authentication authentication) {
        // 현재 인증된 사용자의 ID를 가져오는 로직
        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();
        return memberId;
    }

    public List<ReviewDto.ReviewResponse> getMyReviews(Authentication authentication) {
        // 현재 사용자의 ID를 가져와서 해당 사용자가 작성한 리뷰 정보를 조회
        long memberId = getCurrentUserId(authentication); // 사용자 ID 가져오는 로직
        Member member = memberService.findVerifiedMember(memberId);

        // 리뷰 정보를 가져오도록
        List<Review> reviews = reviewRepository.findByMember(member);

        if (reviews.isEmpty()) {
            return Collections.emptyList(); // 빈 리스트, 반환
        } else {
            return reviewMapperImpl.toResponseDtoList(reviews);
        }
    }



    public ReviewDto.ReviewResponse createReview(ReviewDto.ReviewPost reviewPost, Authentication authentication) {


        Map<String, Object> principal = (Map<String, Object>) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        Member member = memberService.findVerifiedMember(memberId);
        Performance performance = performanceRepository.findById(reviewPost.getPerformanceId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PERFORMANCE_NOT_FOUND));

        //사용자가 후기를 등록하려는 공연에 대한 예약이 존재하는지 검색. 없으면 예외발생
        reservationService.findReservationByMember(member, performance);

        LocalDateTime currentTime = LocalDateTime.now();
        LocalDateTime performanceDate = performance.getDate();
        if (currentTime.isBefore(performanceDate)) {
            throw new BusinessLogicException(ExceptionCode.PERFORMANCE_NOT_COMPLETED);
        }

            Review review = new Review();
            review.setPerformance(performance);
            review.setMember(member);
            review.setContent(reviewPost.getContent());
            review.setDate(LocalDateTime.now());
            review.setReviewTitle(reviewPost.getReviewTitle());

            Review savedReview = reviewRepository.save(review);
            return reviewMapperImpl.toResponseDto(savedReview);

    }

    public ReviewDto.ReviewResponse updateReview(long reviewId, ReviewDto.ReviewUpdate reviewUpdate, Authentication authentication) {
        Map<String, Object> principal = (Map<String, Object>) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();
        Member member = memberService.findVerifiedMember(memberId);
        Performance performance = performanceRepository.findById(reviewUpdate.getPerformanceId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PERFORMANCE_NOT_FOUND));

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));

        review.setReviewTitle(reviewUpdate.getReviewTitle());
        review.setContent(reviewUpdate.getContent());

        Review updatedReview = reviewRepository.save(review);
        return reviewMapperImpl.toResponseDto(updatedReview);
    }

    public void deleteReview(long reviewId,  Authentication authentication) {
        Map<String, Object> principal = (Map<String, Object>) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));

        if(review.getMember().getMemberId()!=memberId){
            new BusinessLogicException(ExceptionCode.MEMBER_NOT_CORRECT);}

        reviewRepository.delete(review);
    }
}
