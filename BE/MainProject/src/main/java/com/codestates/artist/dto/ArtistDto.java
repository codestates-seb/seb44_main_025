package com.codestates.artist.dto;

import com.codestates.category.Category;
import com.codestates.member.Member;
import com.codestates.snslink.SnsLink;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
public class ArtistDto {

    private Member member;
    private long artistId;
    @NotBlank
    @Pattern(regexp = "^([a-zA-Z0-9가-힣]{2,12})$",
    message = "올바른 닉네임 형식이 아닙니다")
    private String artistName;
    @NotBlank
    private String imageUrl;
    @NotBlank
    private String content;
    private SnsLink snsLink;
    private Category category;

}
