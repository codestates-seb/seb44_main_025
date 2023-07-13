package com.codestates.performancecomment.service;

import com.codestates.global.exception.BusinessLogicException;
import com.codestates.global.exception.ExceptionCode;
import com.codestates.performance.entity.Performance;
import com.codestates.performancecomment.entity.PerformanceComment;
import com.codestates.performancecomment.repository.PerformanceCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PerformanceCommentServiceImpl implements PerformanceCommentService{
    private final PerformanceCommentRepository performanceCommentRepository;
    @Override
    public PerformanceComment createPerformanceComment(PerformanceComment performanceComment) {
        return performanceCommentRepository.save(performanceComment);
    }

    @Override
    public PerformanceComment updatePerformanceComment(PerformanceComment performanceComment) {
        PerformanceComment findPerformanceComment = findVerifyPerformanceComment(performanceComment.getPerformanceCommnetId());

        Optional.ofNullable(performanceComment.getTitle())
                .ifPresent(title->findPerformanceComment.setTitle(title));
        Optional.ofNullable(performanceComment.getContent())
                .ifPresent(content->findPerformanceComment.setContent(content));

        return performanceCommentRepository.save(performanceComment);
    }

    @Override
    public void deletePerformanceComment(long performanceCommentId) {
        PerformanceComment performanceComment = findVerifyPerformanceComment(performanceCommentId);
        performanceCommentRepository.delete(performanceComment);
    }

    @Override
    public PerformanceComment findPerformanceComment(long performanceCommentId) {
        return findVerifyPerformanceComment(performanceCommentId);
    }

    private PerformanceComment findVerifyPerformanceComment(long performanceCommnetId) {
        return performanceCommentRepository.findById(performanceCommnetId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.PERFORMANCE_COMMENT_NOT_FOUND));
    }
}
