package com.codestates.performance.controller;

import com.codestates.performance.dto.PerformanceDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequestMapping("/performance")
@RestController
public class PerformanceController {
    @GetMapping("/register")
    public void postPerformance(@RequestBody @Valid PerformanceDto.Post performanceDto) {

    }
}
