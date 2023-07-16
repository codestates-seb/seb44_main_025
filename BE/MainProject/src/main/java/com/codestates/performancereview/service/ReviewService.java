package com.codestates.performancereview.service;

import com.codestates.global.exception.BusinessLogicException;
import com.codestates.global.exception.ExceptionCode;
import com.codestates.image.ImageUploadService;
import com.codestates.member.Member;
import com.codestates.member.MemberRepository;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.repository.PerformanceRepository;
import com.codestates.performancereview.dto.ReviewDto;
import com.codestates.performancereview.entity.Review;
import com.codestates.performancereview.mapper.ReviewMapper;
import com.codestates.performancereview.repository.ReviewRepository;
import lombok.Builder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final PerformanceRepository performanceRepository;
    private final MemberRepository memberRepository;
    private final ImageUploadService imageUploadService;
    private final ReviewMapper reviewMapper;
    public ReviewService(ReviewRepository reviewRepository, PerformanceRepository performanceRepository,
                         MemberRepository memberRepository, ImageUploadService imageUploadService,
                         ReviewMapper reviewMapper) {
        this.reviewRepository = reviewRepository;
        this.performanceRepository = performanceRepository;
        this.memberRepository = memberRepository;
        this.imageUploadService = imageUploadService;
        this.reviewMapper = reviewMapper;
    }
    public List<ReviewDto.ReviewResponse> getMyReviews() {
        // 현재 사용자의 ID를 가져와서 해당 사용자가 작성한 리뷰 정보를 조회
        Long userId = getCurrentUserId(); // 사용자 ID 가져오는 로직

        // 리뷰 정보를 가져오도록
        List<Review> reviews = reviewRepository.findByUserId(userId);

        if (reviews.isEmpty()) {
            return Collections.emptyList(); // 빈 리스트, 반환
        } else {
            return reviewMapper.toResponseDtoList(reviews);
        }
    }

    // 현재 사용자의 ID를 가져오는 로직을 구현해야 합니다.
    private Long getCurrentUserId() {
        // 현재 인증된 사용자의 ID를 가져오는 로직을 구현합니다.

        return 123L;
    }
    public ReviewDto.ReviewResponse createReview(ReviewDto.ReviewPost reviewPost) {
        Performance performance = performanceRepository.findById(reviewPost.getPerformanceId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PERFORMANCE_NOT_FOUND));
        Member member = memberRepository.findById(reviewPost.getMemberId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 이미지 업로드 처리 (이미지 관련해서는 합치고 다시 수정할 계획)
        String imageUrl = imageUploadService.uploadImage(reviewPost.getImage());

        Review review = new Review();
        review.setPerformance(performance);
        review.setMember(member);
        review.setTitle(reviewPost.getTitle());
        review.setContent(reviewPost.getContent());
        review.setImageUrl(imageUrl);

        Review savedReview = reviewRepository.save(review);
        return reviewMapper.toResponseDto(savedReview);
    }

    public ReviewDto.ReviewResponse updateReview(Long reviewId, ReviewDto.ReviewUpdate reviewUpdate) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));

        // 이미지 업로드 처리
        if (reviewUpdate.getImage() != null) {
            String imageUrl = imageUploadService.uploadImage(reviewUpdate.getImage());
            review.setImageUrl(imageUrl);
        }

        review.setTitle(reviewUpdate.getTitle());
        review.setContent(reviewUpdate.getContent());

        Review updatedReview = reviewRepository.save(review);
        return reviewMapper.toResponseDto(updatedReview);
    }

    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
        reviewRepository.delete(review);
    }
}
