package com.codestates.performancecomment.service;

import com.codestates.performance.entity.Performance;
import com.codestates.performancecomment.entity.PerformanceComment;
import com.codestates.performancecomment.repository.PerformanceCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

public interface PerformanceCommentService {
    PerformanceComment createPerformanceComment(PerformanceComment performanceComment);

    void deletePerformanceComment(long performanceId, long commentId);
}
