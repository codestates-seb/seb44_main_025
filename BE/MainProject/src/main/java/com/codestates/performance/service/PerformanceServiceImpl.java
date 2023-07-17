package com.codestates.performance.service;

import com.codestates.category.Category;
import com.codestates.category.CategoryService;
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
    private final CategoryService categoryService;

    @Override
    public Performance createPerformance(Performance performance) {
        return performanceRepository.save(performance);
    }

    @Override
    public Performance updatePerformance(Performance performance) {
        Performance findPerformance = findVerifyPerformance(performance.getPerformanceId());

        Optional.ofNullable(performance.getTitle())
                .ifPresent(title -> findPerformance.setTitle(title));
        Optional.ofNullable(performance.getContent())
                .ifPresent(content -> findPerformance.setContent(content));
        Optional.ofNullable(performance.getPerformanceArtists())
                .ifPresent(performanceArtists -> findPerformance.setPerformanceArtists(performanceArtists));
        Optional.ofNullable(performance.getPlace())
                .ifPresent(place -> findPerformance.setPlace(place));
        Optional.ofNullable(performance.getCategory())
                .ifPresent(category -> findPerformance.setCategory(category));
        Optional.ofNullable(performance.getImageUrl())
                .ifPresent(imageUrl -> findPerformance.setImageUrl(imageUrl));

        return performanceRepository.save(findPerformance);
    }

    @Override
    public Performance findPerformance(long performanceId) {
        return findVerifyPerformance(performanceId);
    }

    @Override
    public Page<Performance> findPerformances(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("performanceId").descending());
        return performanceRepository.findAll(pageRequest);
    }

    @Override
    public Page<Performance> findPerformancesByCategory(int page, int size, long categoryId) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("performance").descending());
        Category category = categoryService.findVerifiedCategory(categoryId);
        return performanceRepository.findAllByCategory(category, pageRequest);
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
