package com.codestates.performance.mapper;

import com.codestates.artist.Artist;
import com.codestates.artist.ArtistService;
import com.codestates.category.Category;
import com.codestates.category.CategoryService;
import com.codestates.content.entity.Content;
import com.codestates.image.ImageUploadService;
import com.codestates.performance.dto.PerformanceDto;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.entity.PerformanceArtist;
import org.mapstruct.Mapper;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PerformanceMapper {
    default Performance performancePostDtoToPerformance(PerformanceDto.Post performanceDto,
                                                        CategoryService categoryService,
                                                        ArtistService artistService) {
        Content content = new Content(performanceDto.getContent());
        LocalDateTime date = LocalDateTime.parse(performanceDto.getDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        Category category = categoryService.findVerifiedCategory(performanceDto.getCategoryId());

        List<PerformanceArtist> performanceArtists = performanceDto.getArtistIds()
                .stream()
                .map(e->new PerformanceArtist(
                        new Performance(),
                        artistService.findArtist(e)
                )).collect(Collectors.toList());

        return new Performance(
                performanceDto.getTitle(),
                performanceArtists,
                content,
                date,
                performanceDto.getPrice(),
                performanceDto.getPlace(),
                performanceDto.getTotalSeat(),
                category,
                performanceDto.getImageUrl()
        );
    }

    default Performance performancePatchDtoToPerformance(PerformanceDto.Patch performanceDto,
                                                         CategoryService categoryService,
                                                         ArtistService artistService) {
        List<PerformanceArtist> performanceArtists = performanceDto.getArtistIds()
                .stream()
                .map(e->new PerformanceArtist(
                        new Performance(),
                        artistService.findArtist(e)
                )).collect(Collectors.toList());

        Content content = new Content(performanceDto.getContent());
        LocalDateTime date = LocalDateTime.parse(performanceDto.getDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        Category category = categoryService.findVerifiedCategory(performanceDto.getCategoryId());

        return new Performance(
                performanceDto.getPerformanceId(),
                performanceDto.getTitle(),
                performanceArtists,
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
        List<Artist> artist = performance.getPerformanceArtists().stream()
                .map(e -> e.getArtist()).collect(Collectors.toList());
        return new PerformanceDto.Response(
                performance.getPerformanceId(),
                performance.getTitle(),
                artist,
                performance.getContent().getBody().toString(),
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
                .map(data->new PerformanceDto.Response(
                        data.getPerformanceId(),
                        data.getTitle(),
                        data.getPerformanceArtists().stream()
                                .map(e->e.getArtist()).collect(Collectors.toList()),
                        data.getContent().getBody().toString(),
                        data.getDate().toString(),
                        data.getPrice(),
                        data.getPlace(),
                        data.getTotalSeat(),
                        data.getCategory().getCategory(),
                        data.getImageUrl()
                )).collect(Collectors.toList());
    }
}
