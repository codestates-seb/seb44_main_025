package com.codestates.member;

import com.codestates.member.dto.MemberPatchDto;
import com.codestates.member.dto.MemberPostDto;
import com.codestates.member.dto.MemberResponseDto;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {
    public Member memberPostDtoToMember(MemberPostDto memberPostDto){
        return new Member(
                memberPostDto.getEmail(),
                memberPostDto.getNickname(),
                memberPostDto.getPassword());
    }

    public Member memberPatchDtoToMember(MemberPatchDto memberPatchDto){
        return new Member(
                memberPatchDto.getNickname(),
                memberPatchDto.getPassword());
    }
    public MemberResponseDto memberToMemberResponseDto(Member member){

        return new MemberResponseDto(member.getMemberId(),
                member.getEmail(),
                member.getNickname(),
                member.getPassword(),
                false,
                0,
                null
        );

    }
}
