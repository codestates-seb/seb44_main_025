package com.codestates.performance.dto;

import com.codestates.artist.Artist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

public class PerformanceArtistDto {
    @Setter
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private long performanceId;
        private Map<Long, Artist> performanceArtist;
    }
}
