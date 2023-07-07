package com.codestates.performance.service;

import com.codestates.performance.entity.Performance;
import com.codestates.performance.repository.PerformanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PerformanceServiceImpl implements PerformanceService{
    private final PerformanceRepository performanceRepository;

    @Override
    public Performance createPerformance(Performance performance) {
        return performanceRepository.save(performance);
    }
}
