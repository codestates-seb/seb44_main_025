package com.codestates.performance.mapper;

import com.codestates.artist.Artist;
import com.codestates.artist.ArtistService;
import com.codestates.category.Category;
import com.codestates.category.CategoryService;
import com.codestates.content.entity.Content;
import com.codestates.performance.dto.PerformanceArtistDto;
import com.codestates.performance.dto.PerformanceDto;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.entity.PerformanceArtist;
import com.codestates.performance.service.PerformanceService;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PerformanceMapper {
    default Performance performancePostDtoToPerformance(PerformanceDto.Post performanceDto,
                                                        CategoryService categoryService,
                                                        ArtistService artistService) {
        Content content = new Content(performanceDto.getContent());
        LocalDateTime date = LocalDateTime.parse(performanceDto.getDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        Category category = categoryService.findVerifiedCategory(performanceDto.getCategoryId());

        Performance performance = new Performance(
                performanceDto.getTitle(),
                date,
                performanceDto.getPrice(),
                performanceDto.getPlace(),
                performanceDto.getTotalSeat(),
                category,
                performanceDto.getImageUrl()
        );

        performance.setContent(content);

        List<PerformanceArtist> performanceArtists = performanceDto.getArtistIds()
                .stream()
                .map(key->{
                    PerformanceArtist performanceArtist = new PerformanceArtist();
                    Artist artist = artistService.findVerifiedArtist(key);

                    performanceArtist.addPerformance(performance);
                    performanceArtist.addArtist(artist);
                    return performanceArtist;
                }).collect(Collectors.toList());

        performance.setPerformanceArtists(performanceArtists);

        return performance;
    }

    default Performance performancePatchDtoToPerformance(PerformanceDto.Patch performanceDto,
                                                         PerformanceService performanceService,
                                                         CategoryService categoryService,
                                                         ArtistService artistService) {
        long performanceId = performanceDto.getPerformanceId();
        Performance findPerformance = performanceService.findPerformance(performanceId);

        Content content = new Content(performanceDto.getContent());
        content.setContentId(findPerformance.getContent().getContentId());

        LocalDateTime date = LocalDateTime.parse(performanceDto.getDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        Category category = categoryService.findVerifiedCategory(performanceDto.getCategoryId());

        Performance performance = new Performance(
                performanceDto.getPerformanceId(),
                performanceDto.getTitle(),
                date,
                performanceDto.getPrice(),
                performanceDto.getPlace(),
                performanceDto.getTotalSeat(),
                category,
                performanceDto.getImageUrl(),
                content
        );

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

        performance.setPerformanceArtists(performanceArtists);

        return performance;
    }

    default PerformanceDto.Response performanceToPerformanceResponseDto(Performance performance) {
        PerformanceArtistDto.Response performanceArtistDto = new PerformanceArtistDto.Response();
        performanceArtistDto.setPerformanceId(performance.getPerformanceId());

        Map<Long, Artist> performanceArtistMap = new HashMap<>();
        for(PerformanceArtist el : performance.getPerformanceArtists()) {
            performanceArtistMap.put(el.getPerformanceArtistId(), el.getArtist());
        }

        performanceArtistDto.setPerformanceArtist(performanceArtistMap);

        return new PerformanceDto.Response(
                performance.getPerformanceId(),
                performance.getTitle(),
                performanceArtistDto,
                performance.getContent(),
                performance.getDate().toString(),
                performance.getPrice(),
                performance.getPlace(),
                performance.getTotalSeat(),
                performance.getCategory().getCategory(),
                performance.getImageUrl()
        );
    }

    default List<PerformanceDto.Response> performancesToPerformanceResponseDtos(List<Performance> performances) {
        return performances.stream()
                .map(data-> {
                    PerformanceArtistDto.Response performanceArtistResponseDto = new PerformanceArtistDto.Response();
                    performanceArtistResponseDto.setPerformanceId(data.getPerformanceId());

                    Map<Long, Artist> performanceArtistMap = new HashMap<>();
                    for(PerformanceArtist el : data.getPerformanceArtists()) {
                        performanceArtistMap.put(el.getPerformanceArtistId(), el.getArtist());
                    }

                    performanceArtistResponseDto.setPerformanceArtist(performanceArtistMap);

                    return new PerformanceDto.Response(
                            data.getPerformanceId(),
                            data.getTitle(),
                            performanceArtistResponseDto,
                            data.getContent(),
                            data.getDate().toString(),
                            data.getPrice(),
                            data.getPlace(),
                            data.getTotalSeat(),
                            data.getCategory().getCategory(),
                            data.getImageUrl()
                    );
                }).collect(Collectors.toList());
    }
}
