package com.codestates.member.dto.duplicate;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class MemberEmail {
    @NotBlank
    @Pattern(regexp = "^([a-zA-Z0-9@.]{8,50})$")
    @Email
    private String email;
}
