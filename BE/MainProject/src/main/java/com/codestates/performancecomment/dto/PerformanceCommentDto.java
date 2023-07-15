package com.codestates.performancecomment.dto;

import com.codestates.performance.entity.Performance;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class PerformanceCommentDto {
    @Setter
    @Getter
    @AllArgsConstructor
    public static class Post {
        private String title;
        private String content;
        private Performance performance;
    }

    @Setter
    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long performanceId;
        private long commentId;
        private String title;
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long performanceCommentId;
        private String title;
        private String content;
        private long performanceId;
    }
}
