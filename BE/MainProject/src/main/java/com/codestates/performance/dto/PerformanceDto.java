package com.codestates.performance.dto;

import com.codestates.artist.Artist;
import com.codestates.performance.entity.PerformanceArtist;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

public class PerformanceDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        private String title;
        private List<Long> artistIds;
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
    public static class Patch {
        private long performanceId;
        private String title;
        private List<Long> artistIds;
        private String content;
        private String date;
        private int price;
        private String place;
        private int totalSeat;
        private long categoryId;
        private String imageUrl;

        public void setPerformanceId(long performanceId) {
            this.performanceId = performanceId;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long performanceId;
        private String title;
        private List<Artist> artists;
        private String content;
        private String date;
        private int price;
        private String place;
        private int totalSeat;
        private String category;
        private String imageUrl;
    }

}
