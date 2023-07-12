package com.codestates.performance.service;

import com.codestates.global.exception.BusinessLogicException;
import com.codestates.global.exception.ExceptionCode;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.repository.PerformanceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class PerformanceServiceImpl implements PerformanceService{
    private final PerformanceRepository performanceRepository;

    @Override
    public Performance createPerformance(Performance performance) {
        return performanceRepository.save(performance);
    }

    @Override
    public Performance updatePerformance(Performance performance) {
        log.info(performance.toString());
        return null;
    }

    @Override
    public Page<Performance> findPerformances(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("performanceId").descending());
        return performanceRepository.findAll(pageRequest);
    }

    @Override
    public void deletePerformance(long performanceId) {
        Performance findPerformance = findVerifyPerformance(performanceId);
        performanceRepository.delete(findPerformance);
    }

    private Performance findVerifyPerformance(long performanceId) {
        Optional<Performance> findPerformance = performanceRepository.findById(performanceId);
        return findPerformance.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PERFORMANCE_NOT_FOUND));
    }
}
