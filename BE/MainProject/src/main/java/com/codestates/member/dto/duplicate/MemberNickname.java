package com.codestates.member.dto.duplicate;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class MemberNickname {
    @NotBlank
    @Pattern(regexp = "^([a-zA-Z0-9가-힣]{2,12})$",
            message = "올바른 닉네임 형식이 아닙니다.(영한문, 숫자 2~12)")
    private String nickname;
}
