package com.codestates.member;

import com.codestates.global.exception.BusinessLogicException;
import com.codestates.global.exception.ExceptionCode;
import com.codestates.global.security.jwt.CustomAuthorityUtils;
import com.codestates.global.security.jwt.JwtTokenizer;
import com.codestates.member.dto.MemberPatchDto;

import org.springframework.security.crypto.password.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final EntityManager em;
    private PasswordEncoder passwordEncoder;

    private JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;


    public MemberService(MemberRepository memberRepository,
                         EntityManager em,
                         PasswordEncoder passwordEncoder,
                         CustomAuthorityUtils authorityUtils,
                         JwtTokenizer jwtTokenizer){
        this.memberRepository = memberRepository;
        this.em = em;
        this.jwtTokenizer = jwtTokenizer;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }


    public Member createMember(Member member){
        verifyEmail(member.getEmail());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

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

    private long findMemberId(String email){
        Optional<Member> optionalMember =
                memberRepository.findByEmail(email);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember.getMemberId();
    }

    private void verifyEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
    //이메일 닉네임 패스워드 검사
    public boolean duplicateEmail(String email){
        boolean result = false;
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()){
            result = true;}
        return result;
    }
    public boolean duplicateNickname(String nickname){
        boolean result = false;
        Optional<Member> member = memberRepository.findByNickname(nickname);
        if (member.isPresent()){
            result = true;}
        return result;
    }
    public boolean checkPassword(long memberId, String password){
        Member member = findVerifiedMember(memberId);
        String findPassword = member.getPassword();

        boolean matches = passwordEncoder.matches(password, findPassword);
        boolean result = false;
        if (matches == true){
            result = true;}
        return result;
    }

}
