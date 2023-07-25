package com.codestates.performance.entity;

import com.codestates.artist.Artist;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Setter
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

    public void addPerformance(Performance performance) {
        this.performance = performance;
        if(! this.performance.getPerformanceArtists().contains(this)) {
            this.performance.addPerformanceArtist(this);
        }
    }

    public void addArtist(Artist artist) {
        this.artist = artist;
        if(! this.artist.getPerformanceArtists().contains(this)) {
            this.artist.getPerformanceArtists().add(this);
        }
    }
}
