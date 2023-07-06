package com.codestates.artist.dto;

import com.codestates.global.PageInfo;

import java.util.List;

public class ArtistPageResponseDto {
    private List<ArtistResponseDto> data;
    private PageInfo pageInfo;

    public ArtistPageResponseDto(List<ArtistResponseDto> data, PageInfo pageInfo){
        this.data = data;
        this.pageInfo = pageInfo;
    }
}
