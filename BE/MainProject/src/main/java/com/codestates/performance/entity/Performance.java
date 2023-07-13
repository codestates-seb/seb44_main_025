package com.codestates.performance.entity;

import com.codestates.category.Category;
import com.codestates.content.entity.Content;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class Performance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long performanceId;
    @Column(nullable = false)
    private String title;
    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
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
    @JsonBackReference
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="CATEGORY_ID")
    private Category category;
    @Column(nullable = false)
    private String imageUrl;
    @JsonIgnore
    @OneToMany(mappedBy = "performance", cascade = CascadeType.PERSIST)
    private List<PerformanceArtist> performanceArtists = new ArrayList<>();

    public Performance(String title, LocalDateTime date, int price, String place, int totalSeat, Category category, String imageUrl) {
        this.title = title;
        this.date = date;
        this.price = price;
        this.place = place;
        this.totalSeat = totalSeat;
        this.category = category;
        this.imageUrl = imageUrl;
    }

    public Performance(long performanceId, String title, LocalDateTime date, int price, String place, int totalSeat, Category category, String imageUrl, Content content) {
        this.performanceId = performanceId;
        this.title = title;
        this.date = date;
        this.price = price;
        this.place = place;
        this.totalSeat = totalSeat;
        this.category = category;
        this.imageUrl = imageUrl;
        this.content = content;
    }

    public void setContent(Content content) {
        this.content = content;
        if(this.content.getPerformance() != this) {
            this.content.setPerformance(this);
        }
    }

    public void addPerformanceArtist(PerformanceArtist performanceArtist) {
        this.performanceArtists.add(performanceArtist);
        if(performanceArtist.getPerformance() != this) {
            performanceArtist.setPerformance(this);
        }
    }
}
