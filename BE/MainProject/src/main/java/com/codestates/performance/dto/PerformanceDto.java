package com.codestates.performance.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

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
        private String imageUrl;

        public void setImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long performanceId;
        private String title;
        private long artistId;
        private String content;
        private String date;
        private int price;
        private String place;
        private int totalSeat;
        private String category;
        private String imageUrl;
    }
}
