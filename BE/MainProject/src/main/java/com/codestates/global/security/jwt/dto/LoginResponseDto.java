package com.codestates.global.security.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LoginResponseDto {
    private Long memberId;
    private boolean hasArtist;
    private Integer accessTokenExpirationMinutes;
    private String accessToken;
    private String refreshToken;
}
