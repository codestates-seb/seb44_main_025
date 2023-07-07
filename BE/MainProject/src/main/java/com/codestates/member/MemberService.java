package com.codestates.member;

import com.codestates.global.exception.BusinessLogicException;
import com.codestates.global.exception.ExceptionCode;
import com.codestates.member.dto.MemberPatchDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final EntityManager em;


    public Member createMember(Member member){
        verifyEmail(member.getEmail());

        Member savedMember = memberRepository.save(member);
        return savedMember;
    }

    public Member updateMember(MemberPatchDto memberPatchDto) {
        verifyEmail(memberPatchDto.getEmail());

        Member member = em.find(Member.class, memberPatchDto.getMemberId());
        member.setNickname(memberPatchDto.getNickname());
        member.setEmail(memberPatchDto.getEmail());
        member.setPassword(memberPatchDto.getPassword());

        return memberRepository.save(member);
    }
    public Member findMember(long memberId) {

        return findVerifiedMember(memberId);
    }


    public void deleteMember(long memberId) {
        Member findMember = findVerifiedMember(memberId);

        memberRepository.delete(findMember);
    }

    public Member findVerifiedMember(long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    private void verifyEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
}
