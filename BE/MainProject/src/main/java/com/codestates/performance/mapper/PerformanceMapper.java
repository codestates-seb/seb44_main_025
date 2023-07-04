package com.codestates.performance.mapper;

import com.codestates.content.Content;
import com.codestates.performance.dto.PerformanceDto;
import com.codestates.performance.entity.Performance;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PerformanceMapper {
    default Performance performanceDtoToPerformance(PerformanceDto.Post performanceDto) {
        // content를 받아서 저장 후 해당 content의 id를 get
        Content content = new Content(performanceDto.getContent());

        return new Performance(
                performanceDto.getTitle(),
                performanceDto.getArtistId(),
                content.getContentId(),
                performanceDto.getDate(),
                performanceDto.getPrice(),
                performanceDto.getPlace(),
                performanceDto.getTotalSeat(),
                performanceDto.getCategoryId()
        );
    }
}
