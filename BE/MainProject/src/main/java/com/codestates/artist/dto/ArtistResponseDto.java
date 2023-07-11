package com.codestates.artist.dto;

import com.codestates.category.Category;
import com.codestates.member.Member;
import com.codestates.snslink.SnsLink;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
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
