package com.codestates.member;



import com.codestates.member.dto.MemberPatchDto;
import com.codestates.member.dto.MemberPostDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public MemberController(MemberRepository memberRepository,
                            MemberService memberService,
                            MemberMapper memberMapper){
        this.memberRepository = memberRepository;
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberPostDto memberPostDto){

        Member response = memberService.createMember(memberMapper.memberPostDtoToMember(memberPostDto));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{memberId}")
    public ResponseEntity patchMember(@Valid @PathVariable("memberId") long memberId,
                                    @Valid @RequestBody MemberPatchDto memberPatchDto){
        memberPatchDto.setMemberId(memberId);

        Member response =
                memberService.updateMember(memberPatchDto);

        return new ResponseEntity<>(memberMapper.memberToMemberResponseDto(response),
                HttpStatus.OK);
    }

    @GetMapping("/mypage/{memberId}")
    public ResponseEntity getMember(@PathVariable("memberId") long memberId){
        Member response = memberService.findMember(memberId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{memberId}")
    public ResponseEntity deleteMember(@PathVariable("memberId") long memberId){
        memberService.deleteMember(memberId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
