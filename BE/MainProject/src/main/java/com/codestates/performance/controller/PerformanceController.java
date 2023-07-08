package com.codestates.performance.controller;

import com.codestates.image.ImageUploadService;
import com.codestates.performance.dto.PerformanceDto;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.mapper.PerformanceMapper;
import com.codestates.performance.service.PerformanceService;
import com.codestates.global.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.File;
import java.io.IOException;

@Slf4j
@RequestMapping("/performance")
@RestController
@RequiredArgsConstructor
public class PerformanceController {
    private final PerformanceMapper mapper;
    private final PerformanceService performanceService;
    private final ImageUploadService imageUploadService;

    /* 공연 생성 */
    @PostMapping(value = "/register", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postPerformance(@RequestPart PerformanceDto.Post performanceDto,
                                          @RequestPart("image_file") MultipartFile imageFile) throws IOException {
        String imageUrl = imageUploadService.imageUpload(imageFile);
        performanceDto.setImageUrl(imageUrl);

        Performance performance = mapper.performancePostDtoToPerformance(performanceDto);
        Performance response = performanceService.createPerformance(performance);

        return new ResponseEntity(new SingleResponseDto<>(mapper.performanceToPerformanceResponseDto(response)), HttpStatus.CREATED);
    }
}
