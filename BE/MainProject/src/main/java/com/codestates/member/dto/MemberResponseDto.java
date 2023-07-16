package com.codestates.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MemberResponseDto {
    private long memberId;
    private String email;
    private String nickname;
    private String password;
    private boolean hasArtist;
    private long artistId;
}
