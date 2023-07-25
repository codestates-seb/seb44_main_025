package com.codestates.performance.service;

import com.codestates.artist.Artist;
import com.codestates.artist.ArtistService;
import com.codestates.category.Category;
import com.codestates.category.CategoryService;
import com.codestates.content.entity.Content;
import com.codestates.global.exception.BusinessLogicException;
import com.codestates.global.exception.ExceptionCode;
import com.codestates.performance.dto.PerformanceDto;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.entity.Performance.PERFORMANCE_STATUS;
import com.codestates.performance.entity.PerformanceArtist;
import com.codestates.performance.repository.PerformanceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional(readOnly = true)
@Slf4j
@RequiredArgsConstructor
@Service
public class PerformanceServiceImpl implements PerformanceService{
    private final PerformanceRepository performanceRepository;
    private final CategoryService categoryService;
    private final ArtistService artistService;

    @Transactional
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

    @Transactional
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

    @Transactional
    @Override
    public void deletePerformance(long performanceId) {
        Performance findPerformance = findVerifyPerformance(performanceId);
        performanceRepository.delete(findPerformance);
    }

    @Override
    public Performance findPerformance(long performanceId) {
        Performance findPerformance = findVerifyPerformance(performanceId);
        return findPerformance;
    }

    @Override
    public Page<Performance> findPerformances(PageRequest pageRequest, PERFORMANCE_STATUS performanceStatus) {
        /*
            before: 진행중인 공연, after: 완료된 공연
            아직 완료되지 않은 공연 = 공연이 현재 날짜보다 뒤
         */
        if(performanceStatus.isNull()) return performanceRepository.findAll(pageRequest);

        if(performanceStatus.isCompleted()) {
            return performanceRepository.findAllByTimeIsBefore(pageRequest);
        } else {
            return performanceRepository.findAllByTimeIsAfter(pageRequest);
        }
    }

    @Override
    public Page<Performance> findPerformancesByCategory(Pageable pageable, long categoryId, PERFORMANCE_STATUS performanceStatus) {
        Category category = categoryService.findVerifiedCategory(categoryId);
        if(performanceStatus.isNull()) return performanceRepository.findAllByCategory(category, pageable);

        if(performanceStatus.isCompleted()) {
            return performanceRepository.findAllByCategoryAndTimeIsBefore(category, pageable);
        } else {
            return performanceRepository.findAllByCategoryAndTimeIsAfter(category, pageable);
        }
    }

    @Override
    public Page<Performance> findPerformancesByArtist(Pageable pageable, long artistId, PERFORMANCE_STATUS performanceStatus) {
        if(performanceStatus.isNull()) return performanceRepository.findAllByArtistId(artistId, pageable);

        if(performanceStatus.isCompleted()) {
            return performanceRepository.findAllByArtistIdTimeIsBefore(artistId, pageable);
        } else {
            return performanceRepository.findAllByArtistIdTimeIsAfter(artistId, pageable);
        }
    }

    private Performance findVerifyPerformance(long performanceId) {
        Optional<Performance> findPerformance = performanceRepository.findById(performanceId);
        return findPerformance.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.PERFORMANCE_NOT_FOUND));
    }

    @Transactional
    @Override
    public Performance updatePerformanceSeats(Performance performance, int SeatValue){
        int remainingSeats = performance.getTotalSeat() - SeatValue;
        performance.setTotalSeat(remainingSeats);
        return performanceRepository.save(performance);
    }
}
