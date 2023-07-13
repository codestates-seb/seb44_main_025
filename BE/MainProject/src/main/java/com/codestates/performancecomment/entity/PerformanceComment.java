package com.codestates.performancecomment.entity;

import com.codestates.performance.entity.Performance;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class PerformanceComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long performanceCommnetId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @ManyToOne
    @JoinColumn(name="PERFORMANCE_ID")
    private Performance performance;

    public PerformanceComment(String title, String content, Performance performance) {
        this.title = title;
        this.content = content;
        this.performance = performance;
    }
    public PerformanceComment(long performanceCommnetId, String title, String content, Performance performance) {
        this.performanceCommnetId = performanceCommnetId;
        this.title = title;
        this.content = content;
        this.performance = performance;
    }
}
