package com.codestates.artist.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ArtistResponseDto {
    private long memberId;
    private String category;
    private long artistId;
    private String artistName;
    private String imageUrl;
    private String content;
    private LocalDateTime createdAt;

}
