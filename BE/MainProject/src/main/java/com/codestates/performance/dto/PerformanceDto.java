package com.codestates.performance.dto;

import java.time.LocalDateTime;

public class PerformanceDto {
    public static class Post {
        private String title;
        private String artistName;
        private long contentId;
        private LocalDateTime date;
        private int price;
        private String place;
        private int totalSeat;
        private long categoryId;
    }
}
