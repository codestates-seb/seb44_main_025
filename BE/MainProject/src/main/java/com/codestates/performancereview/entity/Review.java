package com.codestates.performancereview.entity;

import com.codestates.member.Member;
import com.codestates.performance.entity.Performance;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "review")
@Getter
@Setter
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewId;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "PERFORMANCE_ID")
    private Performance performance;
    @Column(nullable = false)
    private String content;
    @Column(nullable = false)
    private String reviewTitle;
    @Column(nullable = false)
    private LocalDateTime date;

    public Review(String content, String reviewTitle){
        this.content = content;
        this.reviewTitle = reviewTitle;
    }
}
