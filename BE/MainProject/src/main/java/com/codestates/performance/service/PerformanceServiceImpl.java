package com.codestates.performance.service;

import com.codestates.performance.entity.Performance;
import com.codestates.performance.registory.PerformanceRegistory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PerformanceServiceImpl implements PerformanceService{
    private final PerformanceRegistory performanceRegistory;

    @Override
    public Performance createPerformance(Performance performance) {
        return performanceRegistory.save(performance);
    }
}
