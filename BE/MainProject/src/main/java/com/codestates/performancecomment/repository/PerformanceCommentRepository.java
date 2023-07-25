package com.codestates.performancecomment.repository;

import com.codestates.performancecomment.entity.PerformanceComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PerformanceCommentRepository extends JpaRepository<PerformanceComment, Long> {
    @Override
    Optional<PerformanceComment> findById(Long performanceCommentId);
}
