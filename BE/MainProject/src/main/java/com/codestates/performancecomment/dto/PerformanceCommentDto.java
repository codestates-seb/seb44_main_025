package com.codestates.performancecomment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class PerformanceCommentDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        private String title;
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long performanceCommentId;
        private String title;
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long performanceCommentId;
        private String title;
        private String content;
    }
}
