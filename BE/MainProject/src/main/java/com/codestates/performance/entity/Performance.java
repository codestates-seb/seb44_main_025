package com.codestates.performance.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Performance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long performanceId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false, updatable = false)
    private long artistId;
    @Column(nullable = false, updatable = false)
    private long contentId;
    @Column(nullable = false)
    private LocalDateTime date;
    @Column(nullable = false)
    private int price;
    @Column(nullable = false)
    private String place;
    @Column(nullable = false)
    private int totalSeat;
    @Column(nullable = false)
    private long categoryId;

    public Performance() {}

    public Performance(String title,
                        long artistId,
                        long contentId,
                        LocalDateTime date,
                        int price,
                        String place,
                        int totalSeat,
                        long categoryId) {
        this.title = title;
        this.artistId = artistId;
        this.contentId = contentId;
        this.date = date;
        this.price = price;
        this.place = place;
        this.totalSeat = totalSeat;
        this.categoryId = categoryId;
    }
}
