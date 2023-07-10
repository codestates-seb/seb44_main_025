package com.codestates.performance.entity;

import com.codestates.category.Category;
import com.codestates.content.entity.Content;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
public class Performance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long performanceId;
    @Column(nullable = false)
    private String title;
    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name="CONTENT_ID")
    private Content content;
    @Column(nullable = false)
    private LocalDateTime date;
    @Column(nullable = false)
    private int price;
    @Column(nullable = false)
    private String place;
    @Column(nullable = false)
    private int totalSeat;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name="CATEGORY_ID")
    private Category category;
    @Column(nullable = false)
    private String imageUrl;
    @OneToMany(mappedBy = "performance")
    private List<PerformanceArtist> performanceArtists = new ArrayList<>();

    public Performance() {}

    public Performance(String title,
                        List<PerformanceArtist> performanceArtists,
                        Content content,
                        LocalDateTime date,
                        int price,
                        String place,
                        int totalSeat,
                        Category category,
                       String imageUrl) {
        this.title = title;
        this.performanceArtists = performanceArtists;
        this.content = content;
        this.date = date;
        this.price = price;
        this.place = place;
        this.totalSeat = totalSeat;
        this.category = category;
        this.imageUrl = imageUrl;
    }
}
