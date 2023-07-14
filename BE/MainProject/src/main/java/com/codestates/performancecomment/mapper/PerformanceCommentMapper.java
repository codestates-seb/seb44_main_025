package com.codestates.performancecomment.mapper;

import com.codestates.performance.entity.Performance;
import com.codestates.performance.service.PerformanceService;
import com.codestates.performancecomment.dto.PerformanceCommentDto;
import com.codestates.performancecomment.entity.PerformanceComment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PerformanceCommentMapper {
    default PerformanceComment performanceCommentPostDtoToPerformanceComment(PerformanceCommentDto.Post performanceCommentDto) {
        return new PerformanceComment(
                performanceCommentDto.getTitle(),
                performanceCommentDto.getContent(),
                performanceCommentDto.getPerformance()
        );
    }

    default PerformanceComment performanceCommentPatchDtoToPerformance(PerformanceCommentDto.Patch performanceCommentDto,
                                                                       PerformanceService performanceService) {
        Performance performance = performanceService.findPerformance(performanceCommentDto.getPerformanceId());

        return new PerformanceComment(
                performanceCommentDto.getCommentId(),
                performanceCommentDto.getTitle(),
                performanceCommentDto.getContent(),
                performance
        );
    }

    default PerformanceCommentDto.Response performanceToPerformanceCommentResponseDto(PerformanceComment performanceComment) {
        return new PerformanceCommentDto.Response(
                performanceComment.getPerformanceCommnetId(),
                performanceComment.getTitle(),
                performanceComment.getContent(),
                performanceComment.getPerformance().getPerformanceId()
        );
    }
}
