package com.codestates.member;



import com.codestates.artist.ArtistService;
import com.codestates.member.dto.MemberEmail;
import com.codestates.member.dto.MemberPatchDto;
import com.codestates.member.dto.MemberPostDto;
import com.codestates.member.dto.MemberResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.Map;
import java.util.stream.Collectors;

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

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto){

        Member response = memberService.createMember(memberMapper.memberPostDtoToMember(memberPostDto));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{memberId}")
    public ResponseEntity patchMember(@Valid @RequestBody MemberPatchDto memberPatchDto,
                                      @Valid @PathVariable("memberId") long memberId){

        memberPatchDto.setMemberId(memberId);

        Member response =
                memberService.updateMember(memberPatchDto);

        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(response),
                HttpStatus.OK);
    }
    @PostMapping("/duplicate/email")
    public ResponseEntity duplicateEmail(@Valid @RequestBody MemberEmail memberEmail){
        String email = memberEmail.getEmail();
        boolean result = memberService.duplicateEmail(email);
        return new ResponseEntity<>(result,
                HttpStatus.OK);
    }


    @GetMapping("/{memberId}")
    public ResponseEntity getMember(@Valid @PathVariable("memberId") long memberId){
        Member member = memberService.findMember(memberId);

        MemberResponseDto response = memberMapper.memberToMemberResponseDto(member);

        response.setHasArtist(artistService.memberHasArtist(member));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity deleteMember(@Valid @PathVariable("memberId") long memberId){

        memberService.deleteMember(memberId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
