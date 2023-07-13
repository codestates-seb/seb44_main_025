package com.codestates.performancecomment.mapper;

import com.codestates.performance.entity.Performance;
import com.codestates.performancecomment.dto.PerformanceCommentDto;
import com.codestates.performancecomment.entity.PerformanceComment;
import org.mapstruct.Mapper;

@Mapper
public interface PerformanceCommentMapper {
    PerformanceComment performanceCommentDtoToPerformanceComment(PerformanceCommentDto.Post performanceCommentDto);

    PerformanceCommentDto.Response performanceToPerformanceCommentResponseDto(PerformanceComment performanceComment);
}
