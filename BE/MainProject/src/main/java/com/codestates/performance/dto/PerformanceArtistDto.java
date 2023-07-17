package com.codestates.performance.dto;

import com.codestates.artist.Artist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

public class PerformanceArtistDto {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private long performanceId;
        private Map<Long, Long> performanceArtistList;

        public void setPerformanceId(long performanceId) {
            this.performanceId = performanceId;
        }

        public void setPerformanceArtistList(Map<Long, Long> performanceArtistList) {
            this.performanceArtistList = performanceArtistList;
        }
    }
}
