package com.codestates.performancereview.dto;

import com.codestates.member.Member;
import com.codestates.performance.entity.Performance;
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
        @NotBlank(message = "리뷰 제목이 작성되지 않았습니다.")
        @Size(min = 5, message = "최소 5글자 이상 입력해주세요.")
        private String reviewTitle;
        @NotBlank(message = "내용이 작성되지 않았습니다.")
        private String content;
        private long performanceId;

    }

    @Getter
    @Setter
    @Builder
    public static class ReviewUpdate {

        @NotBlank(message = "리뷰 제목이 작성되지 않았습니다.")
        @Size(min = 5, message = "최소 5글자 이상 입력해주세요.")
        private String reviewTitle;
        @NotBlank(message = "리뷰 내용이 작성되지 않았습니다.")
        private String content;
    }
    @Getter
    @Setter
    @Builder
    public static class ReviewResponse {
        private long reviewId;
        private String nickname;
        private long performanceId;
        @NotBlank(message = "리뷰 내용이 작성되지 않았습니다.")
        private String content;
        @NotBlank(message = "리뷰 제목이 작성되지 않았습니다.")
        @Size(min = 5, message = "최소 5글자 이상 입력해주세요.")
        private String reviewTitle;
        private LocalDateTime date;
    }
}
