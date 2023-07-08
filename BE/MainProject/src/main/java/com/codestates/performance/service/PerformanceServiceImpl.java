package com.codestates.performance.service;

import com.codestates.performance.entity.Performance;
import com.codestates.performance.repository.PerformanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PerformanceServiceImpl implements PerformanceService{
    private final PerformanceRepository performanceRepository;

    @Override
    public Performance createPerformance(Performance performance) {
        return performanceRepository.save(performance);
    }

    @Override
    public Page<Performance> findPerformances(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("performanceId").descending());
        return performanceRepository.findAll(pageRequest);
    }
}
