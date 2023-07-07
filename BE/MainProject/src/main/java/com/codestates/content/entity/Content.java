package com.codestates.content.entity;

import com.codestates.performance.entity.Performance;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long contentId;
    @Column(columnDefinition = "text")
    private String body;
    @OneToOne(mappedBy = "content")
    private Performance performance;

    public Content() {}
    public Content(String body) {
        this.body = body;
    }
}
