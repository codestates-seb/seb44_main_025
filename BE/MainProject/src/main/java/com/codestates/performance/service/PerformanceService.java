package com.codestates.performance.service;

import com.codestates.performance.dto.PerformanceDto;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.entity.Performance.PERFORMANCE_STATUS;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public interface PerformanceService {
    Performance createPerformance(Performance performance, PerformanceDto.Post performanceDto);

    Page<Performance> findPerformancesByCategory(Pageable pageable, long categoryId, PERFORMANCE_STATUS performanceStatus);

    void deletePerformance(long performanceId);

    Performance updatePerformance(Performance performance, PerformanceDto.Patch performanceDto);

    Performance findPerformance(long performanceId);

    Page<Performance> findPerformances(PageRequest pageRequest, PERFORMANCE_STATUS performanceStatus);


    Page<Performance> findPerformancesByArtist(Pageable pageable, long artistId, PERFORMANCE_STATUS performanceStatus);
  
    Performance updatePerformanceSeats(Performance performance, int SeatValue);
}
