package com.codestates.performance.registory;

import com.codestates.performance.entity.Performance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PerformanceRegistory extends JpaRepository<Performance, Long> {
}
