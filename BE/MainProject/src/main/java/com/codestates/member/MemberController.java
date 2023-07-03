package com.codestates.member;



import com.codestates.member.dto.MemberPostDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/member")
@Validated
public class MemberController {

    @PostMapping
    public ResponseEntity postUser(@Valid @RequestBody MemberPostDto memberPostDto){

        MemberPostDto response = memberPostDto;


        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
