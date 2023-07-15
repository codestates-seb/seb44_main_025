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
import com.codestates.performancecomment.dto.PerformanceCommentDto;
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
    default Performance performancePostDtoToPerformance(PerformanceDto.Post performanceDto) {
        LocalDateTime date = LocalDateTime.parse(performanceDto.getDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        return new Performance(
                performanceDto.getTitle(),
                date,
                performanceDto.getPrice(),
                performanceDto.getPlace(),
                performanceDto.getTotalSeat(),
                performanceDto.getImageUrl()
        );
    }

    default Performance performancePatchDtoToPerformance(PerformanceDto.Patch performanceDto) {
        LocalDateTime date = LocalDateTime.parse(performanceDto.getDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        return new Performance(
                performanceDto.getPerformanceId(),
                performanceDto.getTitle(),
                date,
                performanceDto.getPrice(),
                performanceDto.getPlace(),
                performanceDto.getTotalSeat(),
                performanceDto.getImageUrl()
        );
    }

    default PerformanceDto.Response performanceToPerformanceResponseDto(Performance performance) {
        PerformanceDto.Response response = new PerformanceDto.Response(
                performance.getPerformanceId(),
                performance.getTitle(),
                performance.getContent(),
                performance.getDate().toString(),
                performance.getPrice(),
                performance.getPlace(),
                performance.getTotalSeat(),
                performance.getCategory().getCategory(),
                performance.getImageUrl()
        );

        PerformanceArtistDto.Response performanceArtistResponseDto = new PerformanceArtistDto.Response();
        performanceArtistResponseDto.setPerformanceId(performance.getPerformanceId());

        Map<Long, Long> performanceArtistMap = new HashMap<>();
        for(PerformanceArtist el : performance.getPerformanceArtists()) {
            Long performanceArtistId = el.getPerformanceArtistId();
            Long artistId = el.getArtist().getArtistId();
            performanceArtistMap.put(performanceArtistId, artistId);
        }

        performanceArtistResponseDto.setPerformanceArtistList(performanceArtistMap);

        response.setPerformanceArtist(performanceArtistResponseDto);
        return response;
    }

    default List<PerformanceDto.Response> performancesToPerformanceResponseDtos(List<Performance> performances) {
        return performances.stream()
                .map(data-> {
                    PerformanceArtistDto.Response performanceArtistResponseDto = new PerformanceArtistDto.Response();
                    performanceArtistResponseDto.setPerformanceId(data.getPerformanceId());

                    // [1,1]

                    Map<Long, Long> performanceArtistMap = new HashMap<>();
                    for(PerformanceArtist el : data.getPerformanceArtists()) {
                        Long performanceArtistId = el.getPerformanceArtistId();
                        Long artistId = el.getArtist().getArtistId();
                        performanceArtistMap.put(performanceArtistId, artistId);
                    }

                    performanceArtistResponseDto.setPerformanceArtistList(performanceArtistMap);

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
