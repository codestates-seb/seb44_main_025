package com.codestates.performance.controller;

import com.codestates.performance.dto.PerformanceDto;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.mapper.PerformanceMapper;
import com.codestates.performance.service.PerformanceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequestMapping("/performance")
@RestController
public class PerformanceController {
    private final PerformanceMapper mapper;
    private final PerformanceService performanceService;
    public PerformanceController(PerformanceMapper mapper, PerformanceService performanceService) {
        this.mapper = mapper;
        this.performanceService = performanceService;
    }
    @GetMapping("/register")
    public void postPerformance(@RequestBody @Valid PerformanceDto.Post performanceDto) {
        // 카테고리명, 공연명, 이미지, 날짜, 금액. 총 좌석, 설명, 위치, 아티스트를 저장하는 DTO
        Performance performance = mapper.performanceDtoToPerformance(performanceDto);
        performanceService.createPerformance(performance);
    }
}
