package com.codestates.performancecomment.repository;

import com.codestates.performancecomment.entity.PerformanceComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerformanceCommentRepository extends JpaRepository<PerformanceComment, Long> {
}
