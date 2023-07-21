package com.codestates.performance.entity;

import com.codestates.category.Category;
import com.codestates.content.entity.Content;
import com.codestates.performancecomment.entity.PerformanceComment;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.xml.stream.events.Comment;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@ToString
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
    @OneToMany(mappedBy = "performance", cascade = CascadeType.ALL)
    private List<PerformanceArtist> performanceArtists = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "performance", cascade = CascadeType.ALL)
    private List<PerformanceComment> performanceComments = new ArrayList<>();

    public Performance(String title, LocalDateTime date, int price, String place, int totalSeat, String imageUrl) {
        this.title = title;
        this.date = date;
        this.price = price;
        this.place = place;
        this.totalSeat = totalSeat;
        this.imageUrl = imageUrl;
    }

    public Performance(long performanceId, String title, LocalDateTime date, int price, String place, int totalSeat, String imageUrl) {
        this.performanceId = performanceId;
        this.title = title;
        this.date = date;
        this.price = price;
        this.place = place;
        this.totalSeat = totalSeat;
        this.imageUrl = imageUrl;
    }

    public void addContent(Content content) {
        this.content = content;
        if(this.content.getPerformance() != this) {
            this.content.setPerformance(this);
        }
    }

    public void addCategory(Category category) {
        this.category = category;
        if(! this.category.getPerformances().contains(this)) {
            this.category.getPerformances().add(this);
        }
    }

    public void addPerformanceArtists(List<PerformanceArtist> performanceArtists) {
        this.performanceArtists  = performanceArtists;

        for(PerformanceArtist performanceArtist : performanceArtists) {
            if(performanceArtist.getPerformance() != this) {
                performanceArtist.addPerformance(this);
            }
        }
    }

    public void addPerformanceArtist(PerformanceArtist performanceArtist) {
        this.performanceArtists.add(performanceArtist);
        if(performanceArtist.getPerformance() != this) {
            performanceArtist.addPerformance(this);
        }
    }

    /* 진행중인 공연과 완료된 공연을 검색하기 위한 enum */
    @Getter
    public enum PERFORMANCE_STATUS {
        PERFORMANCE_COMPLETED("공연완료"),
        PERFORMANCE_NOT_COMPLETED("공연진행중");

        private String status;

        PERFORMANCE_STATUS(String status) {
            this.status = status;
        }

        public static PERFORMANCE_STATUS of(String performanceStatus) {
            for(PERFORMANCE_STATUS el : PERFORMANCE_STATUS.values()) {
                if(el.status.equals(performanceStatus)) return el;
            }
            return null;
        }

        public String getStatus() {
            return status;
        }
        public char isCompleted() {
            if(this.status == PERFORMANCE_COMPLETED.getStatus()) return 't';
            else if(this.status == PERFORMANCE_NOT_COMPLETED.getStatus()) return 'f';
            return 'x';
        }
    }
}
