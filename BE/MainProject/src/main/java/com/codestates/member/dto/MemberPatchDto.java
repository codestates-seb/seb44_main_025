package com.codestates.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
public class MemberPatchDto {

    private long memberId;
    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Pattern(regexp = "^([a-zA-Z0-9가-힣]{2,12})$")
    private String nickname;
    @NotBlank
//    @Pattern(regexp = "^([a-zA-Z0-9!@#$%^&*]{8,12})$")
    private String password;


}
