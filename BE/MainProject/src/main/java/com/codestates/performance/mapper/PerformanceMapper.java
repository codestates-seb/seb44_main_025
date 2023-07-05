package com.codestates.performance.mapper;

import com.codestates.content.Content;
import com.codestates.performance.dto.PerformanceDto;
import com.codestates.performance.entity.Performance;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Mapper(componentModel = "spring")
public interface PerformanceMapper {
    default Performance performanceDtoToPerformance(PerformanceDto.Post performanceDto) {
        // Content 클래스로 감싸서 전달
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
                performanceDto.getCategoryId()
        );
    }
}
