package com.codestates.performance.controller;

import com.codestates.performance.dto.PerformanceDto;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.mapper.PerformanceMapper;
import com.codestates.performance.service.PerformanceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public void postPerformance(@RequestBody @Valid PerformanceDto.Post performanceDto) {
        Performance performance = mapper.performanceDtoToPerformance(performanceDto);
        Performance response = performanceService.createPerformance(performance);
    }
}
