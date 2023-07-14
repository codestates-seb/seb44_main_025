package com.codestates.performance.service;

import com.codestates.performance.entity.Performance;
import org.springframework.data.domain.Page;

public interface PerformanceService {
    Performance createPerformance(Performance performance);

    Page<Performance> findPerformances(int page, int size);

    Page<Performance> findPerformances(int page, int size, long categoryId);

    void deletePerformance(long performanceId);

    Performance updatePerformance(Performance performance);

    Performance findPerformance(long performanceId);
}
