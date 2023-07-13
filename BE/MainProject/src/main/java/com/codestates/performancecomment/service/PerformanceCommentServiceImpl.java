package com.codestates.performancecomment.service;

import com.codestates.performance.entity.Performance;
import com.codestates.performancecomment.entity.PerformanceComment;
import com.codestates.performancecomment.repository.PerformanceCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PerformanceCommentServiceImpl implements PerformanceCommentService{
    private final PerformanceCommentRepository performanceCommentRepository;
    @Override
    public PerformanceComment createPerformanceComment(PerformanceComment performanceComment) {
        return performanceCommentRepository.save(performanceComment);
    }

    @Override
    public void deletePerformanceComment(long performanceId, long commentId) {

    }
}
