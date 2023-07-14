package com.codestates.performance.controller;

import com.codestates.artist.ArtistService;
import com.codestates.category.Category;
import com.codestates.category.CategoryService;
import com.codestates.global.dto.MultiResponseDto;
import com.codestates.image.ImageUploadService;
import com.codestates.performance.dto.PerformanceDto;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.mapper.PerformanceMapper;
import com.codestates.performance.service.PerformanceService;
import com.codestates.global.dto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;

@Slf4j
@RequestMapping("/performance")
@RestController
@RequiredArgsConstructor
public class PerformanceController {
    private final PerformanceMapper mapper;
    private final PerformanceService performanceService;
    private final ImageUploadService imageUploadService;
    private final CategoryService categoryService;
    private final ArtistService artistService;

    /* 공연 생성 */
    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postPerformance(@RequestPart PerformanceDto.Post performanceDto,
                                          @RequestPart("image-file") MultipartFile imageFile) throws IOException {
        String imageUrl = imageUploadService.imageUpload(imageFile);
        performanceDto.setImageUrl(imageUrl);

        Performance performance = mapper.performancePostDtoToPerformance(performanceDto, categoryService, artistService);
        Performance response = performanceService.createPerformance(performance);

        return new ResponseEntity(new SingleResponseDto<>(mapper.performanceToPerformanceResponseDto(response)), HttpStatus.CREATED);
    }

    /* 공연 수정 */
    @PatchMapping("/{performance-id}")
    public ResponseEntity patchPerformance(@PathVariable("performance-id") @Positive long performanceId,
                                           @RequestPart("image-file") MultipartFile imageFile,
                                           @RequestPart @Valid PerformanceDto.Patch performanceDto) throws IOException {
        String imageUrl = imageUploadService.imageUpload(imageFile);
        performanceDto.setImageUrl(imageUrl);

        performanceDto.setPerformanceId(performanceId);
        Performance performance = performanceService.updatePerformance(mapper.performancePatchDtoToPerformance(
                performanceDto,
                performanceService,
                categoryService,
                artistService));
        return new ResponseEntity(new SingleResponseDto<>(mapper.performanceToPerformanceResponseDto(performance)), HttpStatus.OK);
    }

    /* 공연 조회 */
    @GetMapping("{performance-id}")
    public ResponseEntity getPerformance(@PathVariable("performance-id") @Positive long performanceId) {
        Performance performance = performanceService.findPerformance(performanceId);
        return new ResponseEntity(new SingleResponseDto<>(mapper.performanceToPerformanceResponseDto(performance)), HttpStatus.OK);
    }

    /* 공연 전체 조회 */
    @GetMapping
    public ResponseEntity getPerformance(@RequestParam("page") @Positive int page,
                                         @RequestParam("size") @Positive int size) {
        Page<Performance> pagePerformance = performanceService.findPerformances(page - 1, size);
        List<Performance> findPerformance = pagePerformance.toList();

        return new ResponseEntity(new MultiResponseDto<>(pagePerformance, mapper.performancesToPerformanceResponseDtos(findPerformance)), HttpStatus.OK);
    }

    /* 카테고리별 공연 조회 */
    @GetMapping("/category/{category-id}")
    public ResponseEntity getPerformance(@PathVariable("category-id") @Positive long categoryId,
                                         @RequestParam("page") @Positive int page,
                                         @RequestParam("size") @Positive int size) {
        Page<Performance> pagePerformance = performanceService.findPerformances(page - 1, size, categoryId);
        List<Performance> findPerformance = pagePerformance.toList();

        return new ResponseEntity(new MultiResponseDto<>(pagePerformance, mapper.performancesToPerformanceResponseDtos(findPerformance)), HttpStatus.OK);
    }

    /* 공연 삭제 */
    @DeleteMapping("/{performance-id}")
    public ResponseEntity deletePerformance(@PathVariable("performance-id") @Positive long performanceId) {
        performanceService.deletePerformance(performanceId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
