package com.codestates.performance.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

public class PerformanceDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        private String title;
        private long artistId;
        private String content;
        private String date;
        private int price;
        private String place;
        private int totalSeat;
        private long categoryId;
    }
}
