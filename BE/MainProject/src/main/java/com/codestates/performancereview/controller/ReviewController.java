package com.codestates.performancereview.controller;

import com.codestates.image.ImageUploadService;
import com.codestates.performancereview.dto.ReviewDto;
import com.codestates.performancereview.mapper.ReviewMapperImpl;
import com.codestates.performancereview.service.ReviewService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.nio.file.AccessDeniedException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@CrossOrigin
@Slf4j
@RestController
@RequestMapping("/review")
@Validated
public class ReviewController {
    private final ReviewService reviewService;
    private final ReviewMapperImpl reviewMapperImpl;
    private final ImageUploadService imageUploadService;

    @Autowired
    public ReviewController(ReviewService reviewService,ReviewMapperImpl reviewMapperImpl, ImageUploadService imageUploadService) {
        this.reviewService = reviewService;
        this.reviewMapperImpl = reviewMapperImpl;
        this.imageUploadService = imageUploadService;
    }
    @PostMapping("/{performanceId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ReviewDto.ReviewResponse> createReview(@RequestBody ReviewDto.ReviewPost reviewPost,
                                                                 Authentication authentication,
                                                                 @RequestParam("imageUrl") MultipartFile imageUrl) throws AccessDeniedException {
        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        ReviewDto.ReviewResponse responseDto = reviewService.createReview(reviewPost, imageUrl, authentication);
        return ResponseEntity.ok(responseDto);

    }

    @PatchMapping("/{performanceId}/{reviewId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ReviewDto.ReviewResponse> updateReview(@PathVariable("reviewId") long reviewId,
                                                                 @PathVariable("performanceId") long performanceId,
                                                                 @RequestBody @Valid ReviewDto.ReviewUpdate reviewUpdate,
                                                                 @RequestParam("imageUrl") MultipartFile imageUrl) {
        ReviewDto.ReviewResponse responseDto = reviewService.updateReview(reviewId, performanceId,reviewUpdate, imageUrl);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{reviewId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteReview(@PathVariable("reviewId") long reviewId ,Authentication authentication) {
        reviewService.deleteReview(reviewId, authentication);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/mypage/reviews")
    public ResponseEntity<List<ReviewDto.ReviewResponse>> getMyReviews(Authentication authentication) {
        List<ReviewDto.ReviewResponse> responseDtoList = reviewService.getMyReviews(authentication); // 내가 작성한 리뷰 정보를 조회하는 서비스 메서드 호출

        if (responseDtoList.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList()); // 빈 배열을 응답으로
        } else{
            return ResponseEntity.ok(responseDtoList); // 리뷰 목록을 응답으로
        }
    }
}
