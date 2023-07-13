package com.codestates.performancecomment.controller;

import com.codestates.global.dto.SingleResponseDto;
import com.codestates.performance.mapper.PerformanceMapper;
import com.codestates.performancecomment.dto.PerformanceCommentDto;
import com.codestates.performancecomment.entity.PerformanceComment;
import com.codestates.performancecomment.mapper.PerformanceCommentMapper;
import com.codestates.performancecomment.service.PerformanceCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RequiredArgsConstructor
@RequestMapping("/comment/performance")
@RestController
public class PerformanceCommentController {
    private final PerformanceCommentService performanceCommentService;
    private final PerformanceCommentMapper mapper;
    @PostMapping("/{performance-id}")
    public ResponseEntity postPerformanceComment(@PathVariable("performance-id") @Positive long performanceId,
                                                 @RequestBody @Valid PerformanceCommentDto.Post performanceCommentDto) {
        PerformanceComment performanceComment = performanceCommentService.createPerformanceComment(mapper.performanceCommentDtoToPerformanceComment(performanceCommentDto));
        return new ResponseEntity(new SingleResponseDto<>(mapper.performanceToPerformanceCommentResponseDto(performanceComment)), HttpStatus.CREATED);
    }

    @DeleteMapping("/{performance-id}/{comment-id}")
    public ResponseEntity deletePerformanceComment(@PathVariable("performance-id") @Positive long performanceId,
                                                   @PathVariable("comment-id") @Positive long commentId) {
        performanceCommentService.deletePerformanceComment(performanceId, commentId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
