package com.codestates.artist;


import com.codestates.artist.dto.ArtistDto;
import com.codestates.artist.dto.ArtistDtoToArtist;
import com.codestates.artist.dto.ArtistPageResponseDto;
import com.codestates.artist.dto.ArtistResponseDto;
import com.codestates.category.Category;
import com.codestates.category.CategoryService;
import com.codestates.global.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("/artist")
@Validated
public class ArtistController {
    private final ArtistRepository artistRepository;
    private final ArtistService artistService;
    private final ArtistMapper artistMapper;
    private final CategoryService categoryService;

    private final ArtistDtoToArtist artistDtoToArtist;

    public ArtistController(ArtistRepository artistRepository,
                            ArtistService artistService,
                            ArtistMapper artistMapper,
                            CategoryService categoryService,
                            ArtistDtoToArtist artistDtoToArtist){
        this.artistRepository = artistRepository;
        this.artistService = artistService;
        this.artistMapper = artistMapper;
        this.categoryService = categoryService;
        this.artistDtoToArtist = artistDtoToArtist;
    }

    //아티스트 등록
    @PostMapping
    public ResponseEntity postArtist(@Valid @RequestBody ArtistDto artistDto){

        Artist savedartist = artistService.createArtist(artistDtoToArtist.change(artistDto));
        ArtistResponseDto response = artistMapper.artistToArtistResponseDto(savedartist);


        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    //아티스트 프로필 수정
    @PatchMapping("/{artistId}")
    public ResponseEntity patchArtist(@Valid @PathVariable("artistId") long artistId,
                                      @Valid @RequestBody ArtistDto artistDto){
        artistDto.setArtistId(artistId);

        Artist response =
                artistService.updateArtist(artistDto);

        return new ResponseEntity<>(artistMapper.artistToArtistResponseDto(response),
                HttpStatus.OK);
    }

    //아티스트id로 아티스트 프로필 조회
    @GetMapping("/{artistId}")
    public ResponseEntity getArtist(@PathVariable("artistId") long artistId){
        Artist response = artistService.findArtist(artistId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //카테고리별 아티스트 리스트 출력
    @GetMapping
    public ResponseEntity getArtists(@Positive @RequestParam long category,
                                           @Positive @RequestParam int page,
                                           @Positive @RequestParam int size){
        Category findcategory = categoryService.findVerifiedCategory(category);

        Page<Artist> artistPage = artistService.findPageArtist(findcategory,page-1, size);
        PageInfo pageInfo = new PageInfo(page, size,(int)artistPage.getTotalElements(), artistPage.getTotalPages());

        List<Artist> artists = artistPage.getContent();
        List<ArtistResponseDto> response =
                artists.stream()
                        .map(artist-> artistMapper.artistToArtistResponseDto(artist))
                        .collect(Collectors.toList());

        return new ResponseEntity<>(new ArtistPageResponseDto(response, pageInfo), HttpStatus.OK);
    }

    //아티스트 삭제
    @DeleteMapping("/delete/{artistId}")
    public ResponseEntity deleteArtist(@PathVariable("artistId") long artistId){
        artistService.deleteArtist(artistId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
