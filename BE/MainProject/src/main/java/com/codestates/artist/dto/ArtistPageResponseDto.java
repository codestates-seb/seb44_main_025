package com.codestates.artist.dto;

import com.codestates.global.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
public class ArtistPageResponseDto {
    private List<ArtistResponseDto> data;
    private PageInfo pageInfo;

    public ArtistPageResponseDto(List<ArtistResponseDto> data, PageInfo pageInfo){
        this.data = data;
        this.pageInfo = pageInfo;
    }
}
