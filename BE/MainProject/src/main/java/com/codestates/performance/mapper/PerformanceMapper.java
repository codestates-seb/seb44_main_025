package com.codestates.performance.mapper;

import com.codestates.content.entity.Content;
import com.codestates.performance.dto.PerformanceDto;
import com.codestates.performance.entity.Performance;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface PerformanceMapper {
    default Performance performancePostDtoToPerformance(PerformanceDto.Post performanceDto) {
        Content content = new Content(performanceDto.getContent());
        LocalDateTime date = LocalDateTime.parse(performanceDto.getDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        return new Performance(
                performanceDto.getTitle(),
                performanceDto.getArtistId(),
                content,
                date,
                performanceDto.getPrice(),
                performanceDto.getPlace(),
                performanceDto.getTotalSeat(),
                performanceDto.getCategoryId(),
                performanceDto.getImageUrl()
        );
    }

    default PerformanceDto.Response performanceToPerformanceResponseDto(Performance performance) {
        return new PerformanceDto.Response(
                performance.getPerformanceId(),
                performance.getTitle(),
                performance.getArtistId(),
                performance.getContent().getBody().toString(),
                performance.getDate().toString(),
                performance.getPrice(),
                performance.getPlace(),
                performance.getTotalSeat(),
                performance.getCategoryId(),
                performance.getImageUrl()
        );
    }
}
