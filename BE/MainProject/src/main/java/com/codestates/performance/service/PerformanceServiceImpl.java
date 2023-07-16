package com.codestates.performance.service;

import com.codestates.artist.Artist;
import com.codestates.artist.ArtistService;
import com.codestates.category.Category;
import com.codestates.category.CategoryService;
import com.codestates.content.entity.Content;
import com.codestates.global.exception.BusinessLogicException;
import com.codestates.global.exception.ExceptionCode;
import com.codestates.image.ImageUploadService;
import com.codestates.performance.dto.PerformanceArtistDto;
import com.codestates.performance.dto.PerformanceDto;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.entity.PerformanceArtist;
import com.codestates.performance.repository.PerformanceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class PerformanceServiceImpl implements PerformanceService{
    private final PerformanceRepository performanceRepository;
    private final CategoryService categoryService;
    private final ArtistService artistService;

    @Override
    public Performance createPerformance(Performance performance, PerformanceDto.Post performanceDto) {
        performance.addCategory(categoryService.findVerifiedCategory(performanceDto.getCategoryId()));
        performance.addContent(new Content(performanceDto.getContent()));

        List<PerformanceArtist> performanceArtists = performanceDto.getArtistIds()
                .stream()
                .map(key->{
                    PerformanceArtist performanceArtist = new PerformanceArtist();
                    Artist artist = artistService.findVerifiedArtist(key);

                    performanceArtist.addPerformance(performance);
                    performanceArtist.addArtist(artist);
                    return performanceArtist;
                }).collect(Collectors.toList());

        performance.addPerformanceArtists(performanceArtists);

        return performanceRepository.save(performance);
    }

    @Override
    public Performance updatePerformance(Performance performance, PerformanceDto.Patch performanceDto) {
        Performance findPerformance = findVerifyPerformance(performance.getPerformanceId());

        // performanceArtists
        List<PerformanceArtist> performanceArtists = performanceDto.getArtistIds()
                .stream()
                .map(key->{
                    Artist artist = artistService.findVerifiedArtist(key);

                    PerformanceArtist performanceArtist = new PerformanceArtist();
                    performanceArtist.addPerformance(performance);
                    performanceArtist.addArtist(artist);

                    performanceArtist.setPerformanceArtistId(performanceDto.getPerformanceArtistId());
                    return performanceArtist;
                }).collect(Collectors.toList());

        Optional.ofNullable(performance.getTitle())
                .ifPresent(data -> findPerformance.setTitle(data));
        Optional.ofNullable(performance.getPlace())
                .ifPresent(data -> findPerformance.setPlace(data));
        Optional.ofNullable(performance.getImageUrl())
                .ifPresent(data -> findPerformance.setImageUrl(data));

        Optional.ofNullable(performanceDto.getContent())
                .ifPresent(data -> findPerformance.getContent().setBody(data));
        Optional.ofNullable(performanceDto.getCategoryId())
                .ifPresent(data -> findPerformance.addCategory(categoryService.findVerifiedCategory(data)));
        Optional.ofNullable(performanceDto.getArtistIds())
                .ifPresent(data -> findPerformance.addPerformanceArtists(performanceArtists));

        return performanceRepository.save(findPerformance);
    }

    @Override
    public Performance findPerformance(long performanceId) {
        Performance findPerformance = findVerifyPerformance(performanceId);
        return findPerformance;
    }

    @Override
    public Page<Performance> findPerformances(int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("performanceId").descending());
        return performanceRepository.findAll(pageRequest);
    }

    @Override
    public Page<Performance> findPerformancesByCategory(Pageable pageable, long categoryId) {
        Category category = categoryService.findVerifiedCategory(categoryId);
        Page<Performance> page = performanceRepository.findAllByCategory(category, pageable);
        return page;
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
