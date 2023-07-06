package com.codestates.performance.controller;

import com.codestates.performance.dto.PerformanceDto;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.mapper.PerformanceMapper;
import com.codestates.performance.service.PerformanceService;
import com.codestates.global.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RequestMapping("/performance")
@RestController
@RequiredArgsConstructor
public class PerformanceController {
    private final PerformanceMapper mapper;
    private final PerformanceService performanceService;

    /* 공연 생성 */
    @PostMapping("/register")
    public ResponseEntity postPerformance(@RequestBody @Valid PerformanceDto.Post performanceDto) {
        // Content 인스턴스를 생성해서 Performance에 전달 필요
        Performance performance = mapper.performancePostDtoToPerformance(performanceDto);
        Performance response = performanceService.createPerformance(performance);

        return new ResponseEntity(new SingleResponseDto<>(mapper.performanceToPerformanceResponseDto(response)), HttpStatus.CREATED);
    }
}
