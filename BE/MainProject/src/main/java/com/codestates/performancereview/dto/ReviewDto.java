package com.codestates.performancereview.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
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
    private String title;
    @NotBlank(message = "내용이 작성되지 않았습니다.")
    private String content;
    private String imageUrl;
    private LocalDateTime date;

    @Getter
    @Setter
    @Builder
    public static class ReviewPost {
        private Long memberId;
        private Long performanceId;
        private String title;
        @NotBlank(message = "내용이 작성되지 않았습니다.")
        private String content;
        private String imageUrl;
    }

    @Getter
    @Setter
    @Builder
    public static class ReviewUpdate {
        private Long reviewId;
        private String title;
        @NotBlank(message = "내용이 작성되지 않았습니다.")
        private String content;
        private String imageUrl;
    }
    @Getter
    @Setter
    @Builder
    public static class ReviewResponse {
        private Long reviewId;
        private Long memberId;
        private Long performanceId;
        private String title;
        @NotBlank(message = "내용이 작성되지 않았습니다.")
        private String content;
        private String imageUrl;
        //private LocalDateTime date;
    }
}
