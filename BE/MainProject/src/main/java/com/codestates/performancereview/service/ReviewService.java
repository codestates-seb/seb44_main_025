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
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    private final ReviewMapperImpl reviewMapperImpl;
    public ReviewService(ReviewRepository reviewRepository, PerformanceRepository performanceRepository,
                         MemberService memberService, ImageUploadService imageUploadService,
                         ReviewMapperImpl reviewMapperImpl, MemberRepository memberRepository) {
        this.reviewRepository = reviewRepository;
        this.performanceRepository = performanceRepository;
        this.memberService = memberService;
        this.imageUploadService = imageUploadService;
        this.reviewMapperImpl = reviewMapperImpl;
        this.memberRepository = memberRepository;
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



    public ReviewDto.ReviewResponse createReview(ReviewDto.ReviewPost reviewPost,MultipartFile imageUrl
                                                ,Authentication authentication) {
        Performance performance = performanceRepository.findById(reviewPost.getPerformanceId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PERFORMANCE_NOT_FOUND));
        // 로그인 한 멤버와 요청받은 리뷰의 멤버가 동일(일치) 하는지 검증
        Map<String, Object> principal = (Map<String, Object>) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        Member member = memberService.findVerifiedMember(memberId);

        if (reviewPost.getMemberId() != memberId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_CORRECT);
        }
        // 리뷰 제목이 빠져있을 때 예외 처리
        if (reviewPost.getTitle() == null || reviewPost.getTitle().isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.REVIEW_TITLE_EMPTY);
        }

        // 이미지 업로드 처리 (이미지 관련해서는 합치고 다시 수정할 계획)
        String uploadedImageUrl = null;
        if (imageUrl != null) {
            try {
                uploadedImageUrl = imageUploadService.imageUpload(imageUrl);
            } catch (IOException e) {
                // 이미지 업로드 실패 예외 처리
                throw new BusinessLogicException(ExceptionCode.IMAGE_UPLOAD_FAILED);
            }
        }

        Review review = new Review();
        review.setPerformance(performance);
        review.setMember(member);
        review.setTitle(reviewPost.getTitle());
        review.setNickName(reviewPost.getNickName());
        review.setContent(reviewPost.getContent());
        review.setImageUrl(uploadedImageUrl);
        review.setDate(reviewPost.getDate());
        review.setReviewTitle(reviewPost.getReviewTitle());

        Review savedReview = reviewRepository.save(review); // 리뷰저 (예외는 없을까?)
        return reviewMapperImpl.toResponseDto(savedReview);
    }

    public ReviewDto.ReviewResponse updateReview(long reviewId, ReviewDto.ReviewUpdate reviewUpdate,
                                                 MultipartFile imageUrl, Authentication authentication) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));

        // 이미지 업로드 처리
        String uploadedImageUrl = null;
        if (imageUrl != null) {
            try {
                uploadedImageUrl = imageUploadService.imageUpload(imageUrl);
            } catch (IOException e) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_UPLOAD_FAILED);
            }
        }

        review.setTitle(reviewUpdate.getTitle());
        review.setContent(reviewUpdate.getContent());

        Review updatedReview = reviewRepository.save(review);
        return reviewMapperImpl.toResponseDto(updatedReview);
    }

    public void deleteReview(long reviewId,  Authentication authentication) {
        Map<String, Object> principal = (Map<String, Object>) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
        reviewRepository.delete(review);

        if(review.getMember().getMemberId()!=memberId){
            new BusinessLogicException(ExceptionCode.MEMBER_NOT_CORRECT);}
        reviewRepository.delete(review);
    }
}
