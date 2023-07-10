package com.codestates.performance.mapper;

import com.codestates.category.Category;
import com.codestates.category.CategoryService;
import com.codestates.content.entity.Content;
import com.codestates.image.ImageUploadService;
import com.codestates.performance.dto.PerformanceDto;
import com.codestates.performance.entity.Performance;
import org.mapstruct.Mapper;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PerformanceMapper {
    default Performance performancePostDtoToPerformance(PerformanceDto.Post performanceDto, CategoryService categoryService) {
        Content content = new Content(performanceDto.getContent());
        LocalDateTime date = LocalDateTime.parse(performanceDto.getDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        Category category = categoryService.findVerifiedCategory(performanceDto.getCategoryId());

        return new Performance(
                performanceDto.getTitle(),
                performanceDto.getArtistId(),
                content,
                date,
                performanceDto.getPrice(),
                performanceDto.getPlace(),
                performanceDto.getTotalSeat(),
                category,
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
                performance.getCategory().getCategory(),
                performance.getImageUrl()
        );
    }

    default List<PerformanceDto.Response> performancesToPerformanceResponseDtos(List<Performance> findPerformance) {
        return findPerformance.stream()
                .map(e->new PerformanceDto.Response(
                        e.getPerformanceId(),
                        e.getTitle(),
                        e.getArtistId(),
                        e.getContent().getBody().toString(),
                        e.getDate().toString(),
                        e.getPrice(),
                        e.getPlace(),
                        e.getTotalSeat(),
                        e.getCategory().getCategory(),
                        e.getImageUrl()
                )).collect(Collectors.toList());
    }
}
