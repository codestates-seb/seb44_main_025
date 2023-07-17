package com.codestates.member;



import com.codestates.artist.ArtistService;
import com.codestates.global.exception.BusinessLogicException;
import com.codestates.global.exception.ExceptionCode;
import com.codestates.global.security.jwt.JwtTokenizer;
import com.codestates.member.dto.*;
import com.codestates.member.dto.duplicate.MemberEmail;
import com.codestates.member.dto.duplicate.MemberNickname;
import com.codestates.member.dto.duplicate.MemberPassword;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/member")
@Validated
public class MemberController {
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final ArtistService artistService;

    public MemberController(MemberRepository memberRepository,
                            MemberService memberService,
                            MemberMapper memberMapper,
                            ArtistService artistService){
        this.memberRepository = memberRepository;
        this.memberService = memberService;
        this.memberMapper = memberMapper;
        this.artistService = artistService;
    }
    //회원가입
    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto){

        Member response = memberService.createMember(memberMapper.memberPostDtoToMember(memberPostDto));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //회원정보 수정
    @PatchMapping
    public ResponseEntity patchMember(@Valid @RequestBody MemberPatchDto memberPatchDto,
                                      Authentication authentication){
        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        memberPatchDto.setMemberId(memberId);

        Member response =
                memberService.updateMember(memberPatchDto);

        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(response),
                HttpStatus.OK);
    }

    //이메일 중복검사
    @PostMapping("/duplicate/email")
    public ResponseEntity duplicateEmail(@Valid @RequestBody MemberEmail memberEmail){
        String email = memberEmail.getEmail();
        boolean result = memberService.duplicateEmail(email);
        return new ResponseEntity<>(result,
                HttpStatus.OK);
    }
    //닉네임 중복검사
    @PostMapping("/duplicate/nickname")
    public ResponseEntity duplicateNickname(@Valid @RequestBody MemberNickname memberNickname){
        String nickname = memberNickname.getNickname();
        boolean result = memberService.duplicateNickname(nickname);
        return new ResponseEntity<>(result,
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMember(Authentication authentication){
        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();

        Member member = memberService.findMember(memberId);
        MemberResponseDto response = memberMapper.memberToMemberResponseDto(member);

        response.setPassword("안알랴줌");
        boolean hasArtist = artistService.memberHasArtist(member);
        response.setHasArtist(hasArtist);
        if(hasArtist==true)
        response.setArtistId(artistService.findArtistId(member));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteMember(@Valid @RequestBody MemberPassword memberPassword,
                                       Authentication authentication){
        Map<String, Object> principal = (Map) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();
        System.out.println("dkdkdkdkdkdkdkdk"+memberId);

        boolean passwordCorrect = memberService.checkPassword(memberId, memberPassword.getPassword());

        if(passwordCorrect==true){
        memberService.deleteMember(memberId);}
        else {
            throw new BusinessLogicException(ExceptionCode.PASSWORD_NOT_CORRECT);
        }
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
