package com.codestates.performance.entity;

import com.codestates.artist.Artist;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class PerformanceArtist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long performanceArtistId;

    @ManyToOne
    @JoinColumn(name="PERFORMANCE_ID")
    private Performance performance;
    @ManyToOne
    @JoinColumn(name="ARTIST_ID")
    private Artist artist;

    public PerformanceArtist(Performance performance, Artist artist) {
        this.performance = performance;
        this.artist = artist;
    }
}
