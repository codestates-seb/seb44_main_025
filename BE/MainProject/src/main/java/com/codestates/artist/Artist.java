package com.codestates.artist;

import com.codestates.category.Category;
import com.codestates.member.Member;
import com.codestates.performance.entity.PerformanceArtist;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "ARTIST")
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "artist_id", nullable = false, updatable = false, unique = true)
    private long artistId;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
    @Column(nullable = false, unique = true, updatable = true, name = "artist_name")
    private String artistName;
    @Column(nullable = true, name = "image_url")
    private String imageUrl;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    @OneToMany(mappedBy = "artist")
    private List<PerformanceArtist> performanceArtists;



    public Artist(String artistName, String imageUrl, String content, Category category,
                  Member member){
        this.artistName = artistName;
        this.imageUrl = imageUrl;
        this.content = content;
        this.category = category;
        this.member = member;
    }
}
