package com.codestates.global.security.jwt.dto;

import lombok.Getter;

@Getter
public class LoginDto {
    private String email;
    private String password;
}