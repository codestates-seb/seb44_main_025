package com.codestates.content.entity;

import com.codestates.performance.entity.Performance;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    @OneToOne(mappedBy = "content")
    private Performance performance;

    public Content() {}
    public Content(String body) {
        this.body = body;
    }

    public void setPerformance(Performance performance) {
        this.performance = performance;
        if(this.performance.getContent() != this) {
            this.performance.setContent(this);
        }
    }
}
