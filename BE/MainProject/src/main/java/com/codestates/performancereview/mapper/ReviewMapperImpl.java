package com.codestates.performancereview.mapper;

import com.codestates.global.exception.BusinessLogicException;
import com.codestates.global.exception.ExceptionCode;
import com.codestates.member.Member;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.repository.PerformanceRepository;
import com.codestates.performancereview.dto.ReviewDto;
import com.codestates.performancereview.entity.Review;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ReviewMapperImpl implements ReviewMapper {
    private final PerformanceRepository performanceRepository;
    public ReviewMapperImpl(PerformanceRepository performanceRepository) {
        this.performanceRepository = performanceRepository;
    }
    @Override
    public ReviewDto toDto(Review review) { // Review 엔티티를 ReviewDto로 변환
        return ReviewDto.builder()
                .reviewId(review.getReviewId())
                .memberId(review.getMember().getMemberId())
                .performanceId(review.getPerformance().getPerformanceId())
                .title(review.getTitle())
                .reviewTitle(review.getReviewTitle())
                .nickName(review.getNickName())
                .content(review.getContent())
                .imageUrl(review.getImageUrl())
                .date(review.getDate())
                .build();
    }
    @Override
    public Review toEntity(ReviewDto reviewDto) { // ReviewDto 객체에서 Review 엔티티로의 변환
        Review review = new Review();
        review.setReviewId(reviewDto.getReviewId());
        review.setNickName(reviewDto.getNickName());
        review.setTitle(reviewDto.getTitle());
        review.setReviewTitle(reviewDto.getReviewTitle());
        review.setContent(reviewDto.getContent());
        review.setImageUrl(reviewDto.getImageUrl());
        review.setDate(reviewDto.getDate());

        // Member와 Performance 엔티티는 ID만 설정하여 연결
        Member member = new Member();
        member.setMemberId(reviewDto.getMemberId());
        review.setMember(member);

        Performance performance = performanceRepository.findById(reviewDto.getPerformanceId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PERFORMANCE_NOT_FOUND));

        review.setPerformance(performance);

        return review;
    }
    @Override
    public ReviewDto.ReviewResponse toResponseDto(Review review) { // Review 엔티티를 ReviewDto.Response로 변환
        return ReviewDto.ReviewResponse.builder()
                .reviewId(review.getReviewId())
                .memberId(review.getMember().getMemberId())
                .performanceId(review.getPerformance().getPerformanceId())
                .nickName(review.getNickName())
                .title(review.getTitle())
                .reviewTitle(review.getReviewTitle())
                .content(review.getContent())
                .imageUrl(review.getImageUrl())
                .date(review.getDate())
                .build();
    }

    @Override
    public List<ReviewDto.ReviewResponse> toResponseDtoList(List<Review> reviews) { // Review 엔티티 리스트를 ReviewDto.Response 리스트로 변환
        return reviews.stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }
}
