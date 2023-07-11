package com.codestates.performance.service;

import com.codestates.performance.entity.Performance;
import org.springframework.data.domain.Page;

public interface PerformanceService {
    Performance createPerformance(Performance performance);

    Page<Performance> findPerformances(int page, int size);

    void deletePerformance(long performanceId);
}
