package com.codestates.performancecomment.controller;

import com.codestates.global.dto.SingleResponseDto;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.mapper.PerformanceMapper;
import com.codestates.performance.service.PerformanceService;
import com.codestates.performancecomment.dto.PerformanceCommentDto;
import com.codestates.performancecomment.entity.PerformanceComment;
import com.codestates.performancecomment.mapper.PerformanceCommentMapper;
import com.codestates.performancecomment.service.PerformanceCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/comment/performance")
@RestController
public class PerformanceCommentController {
    private final PerformanceService performanceService;
    private final PerformanceCommentService performanceCommentService;
    private final PerformanceCommentMapper mapper;
    @PostMapping("/{performance-id}")
    public ResponseEntity postPerformanceComment(@PathVariable("performance-id") @Positive long performanceId,
                                                 @RequestBody @Valid PerformanceCommentDto.Post performanceCommentDto) {
        Performance performance = performanceService.findPerformance(performanceId);
        performanceCommentDto.setPerformance(performance);
        PerformanceComment performanceComment = mapper.performanceCommentPostDtoToPerformanceComment(performanceCommentDto);

        PerformanceComment response = performanceCommentService.createPerformanceComment(performanceComment);
        return new ResponseEntity(new SingleResponseDto<>(mapper.performanceToPerformanceCommentResponseDto(response)), HttpStatus.CREATED);
    }

    @PatchMapping("/{performance-id}/{comment-id}")
    public ResponseEntity patchPerformanceComment(@PathVariable("performance-id") @Positive long performanceId,
                                                  @PathVariable("comment-id") @Positive long commentId,
                                                  @RequestBody @Valid PerformanceCommentDto.Patch performanceCommentDto) {
        performanceCommentDto.setPerformanceId(performanceId);
        performanceCommentDto.setCommentId(commentId);
        PerformanceComment performanceComment = performanceCommentService.updatePerformanceComment(mapper.performanceCommentPatchDtoToPerformance(performanceCommentDto, performanceService));
        return new ResponseEntity(new SingleResponseDto<>(mapper.performanceToPerformanceCommentResponseDto(performanceComment)),HttpStatus.OK);
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getPerformanceComment(@PathVariable("comment-id") @Positive long performanceCommentId) {
        PerformanceComment performanceComment = performanceCommentService.findPerformanceComment(performanceCommentId);
        return new ResponseEntity(new SingleResponseDto<>(mapper.performanceToPerformanceCommentResponseDto(performanceComment)), HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deletePerformanceComment(@PathVariable("comment-id") @Positive long performanceCommentId) {
        performanceCommentService.deletePerformanceComment(performanceCommentId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
