package com.codestates.performance.service;

import com.codestates.performance.dto.PerformanceDto;
import com.codestates.performance.entity.Performance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public interface PerformanceService {
    Performance createPerformance(Performance performance, PerformanceDto.Post performanceDto);

    Page<Performance> findPerformancesByCategory(Pageable pageable, long categoryId, String performanceStatus);

    void deletePerformance(long performanceId);

    Performance updatePerformance(Performance performance, PerformanceDto.Patch performanceDto);

    Performance findPerformance(long performanceId);

    Page<Performance> findPerformances(PageRequest pageRequest, String performanceStatus);


    Page<Performance> findPerformancesByArtist(Pageable pageable, long artistId, String performanceStatus);
  
    Performance updatePerformanceSeats(Performance performance, int SeatValue);
}
