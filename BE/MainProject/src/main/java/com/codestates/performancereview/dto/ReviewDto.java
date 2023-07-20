package com.codestates.performancereview.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDto {
    private Long reviewId;
    private Long memberId;
    private Long performanceId;
    private String nickName;
    @NotBlank(message = "내용이 작성되지 않았습니다.")
    @Size(min = 5, message = "최소 5글자 이상 입력해주세요.")
    private String title;
    @NotBlank(message = "내용이 작성되지 않았습니다.")
    private String content;
    private String imageUrl;
    private LocalDateTime date;
    @NotBlank(message = "리뷰 제목이 작성되지 않았습니다.")
    @Size(min = 5, message = "최소 5글자 이상 입력해주세요.")
    private String reviewTitle;

    @Getter
    @Setter
    @Builder
    public static class ReviewPost {
        private long memberId;
        private long performanceId;
        @NotBlank(message = "내용이 작성되지 않았습니다.")
        @Size(min = 5, message = "최소 5글자 이상 입력해주세요.")
        private String title;
        private String nickName;
        @NotBlank(message = "리뷰 제목이 작성되지 않았습니다.")
        @Size(min = 5, message = "최소 5글자 이상 입력해주세요.")
        private String reviewTitle;
        @NotBlank(message = "내용이 작성되지 않았습니다.")
        private String content;
        private String imageUrl;
        private LocalDateTime date;
    }

    @Getter
    @Setter
    @Builder
    public static class ReviewUpdate {
        private long reviewId;
        private String title;
        @NotBlank(message = "리뷰 제목이 작성되지 않았습니다.")
        @Size(min = 5, message = "최소 5글자 이상 입력해주세요.")
        private String reviewTitle;
        @NotBlank(message = "리뷰 내용이 작성되지 않았습니다.")
        private String content;
        private String imageUrl;
    }
    @Getter
    @Setter
    @Builder
    public static class ReviewResponse {
        private long reviewId;
        private long memberId;
        private long performanceId;
        private String nickName;
        private String title;
        @NotBlank(message = "리뷰 내용이 작성되지 않았습니다.")
        private String content;
        private String imageUrl;
        @NotBlank(message = "리뷰 제목이 작성되지 않았습니다.")
        @Size(min = 5, message = "최소 5글자 이상 입력해주세요.")
        private String reviewTitle;
        private LocalDateTime date;
    }
}
