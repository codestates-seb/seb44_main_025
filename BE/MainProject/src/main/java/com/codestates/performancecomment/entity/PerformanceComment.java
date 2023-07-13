package com.codestates.performancecomment.entity;

import com.codestates.performance.entity.Performance;
import lombok.Getter;

import javax.persistence.*;

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
}
