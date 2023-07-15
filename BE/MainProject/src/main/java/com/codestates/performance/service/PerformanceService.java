package com.codestates.performance.service;

import com.codestates.performance.dto.PerformanceDto;
import com.codestates.performance.entity.Performance;
import org.springframework.data.domain.Page;

public interface PerformanceService {
    Performance createPerformance(Performance performance, PerformanceDto.Post performanceDto);

    Page<Performance> findPerformances(int page, int size);

    Page<Performance> findPerformancesByCategory(int page, int size, long categoryId);

    void deletePerformance(long performanceId);

    Performance updatePerformance(Performance performance, PerformanceDto.Patch performanceDto);

    Performance findPerformance(long performanceId);
}
