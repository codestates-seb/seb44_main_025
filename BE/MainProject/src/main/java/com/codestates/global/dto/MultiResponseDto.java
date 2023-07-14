package com.codestates.global.dto;

import com.codestates.global.PageInfo;
import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MultiResponseDto<T> {
    private PageInfo pageInfo;
    private List<T> data;

    public MultiResponseDto(Page page, List<T> findPerformance) {
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages());
        this.data = findPerformance;
    }
}
