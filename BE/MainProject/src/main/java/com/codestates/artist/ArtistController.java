package com.codestates.artist;


import com.codestates.artist.dto.ArtistDto;
import com.codestates.artist.dto.ArtistPageResponseDto;
import com.codestates.artist.dto.ArtistResponseDto;
import com.codestates.category.Category;
import com.codestates.category.CategoryService;
import com.codestates.global.PageInfo;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/artist")
@Validated
public class ArtistController {
    private final ArtistRepository artistRepository;
    private final ArtistService artistService;
    private final ArtistMapper artistMapper;
    private final CategoryService categoryService;

    public ArtistController(ArtistRepository artistRepository,
                            ArtistService artistService,
                            ArtistMapper artistMapper,
                            CategoryService categoryService){
        this.artistRepository = artistRepository;
        this.artistService = artistService;
        this.artistMapper = artistMapper;
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity postArtist(@Valid @RequestBody ArtistDto artistDto){

        Artist response = artistService.createArtist(artistMapper.artistDtoToArtist(artistDto));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{artistId}")
    public ResponseEntity patchArtist(@Valid @PathVariable("artistId") long artistId,
                                      @Valid @RequestBody ArtistDto artistDto){
        artistDto.setArtistId(artistId);

        Artist response =
                artistService.updateArtist(artistDto);

        return new ResponseEntity<>(artistMapper.artistToArtistResponseDto(response),
                HttpStatus.OK);
    }

    @GetMapping("/{artistId}")
    public ResponseEntity getArtist(@PathVariable("artistId") long artistId){
        Artist response = artistService.findArtist(artistId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getArtists(@RequestParam String category,
                                           @Positive @RequestParam int page,
                                           @Positive @RequestParam int size){
        Category findcategory = categoryService.findVerifiedCategory(category);

        Page<Artist> artistPage = artistService.findArtists(findcategory,page,size);
        PageInfo pageInfo = new PageInfo(page, size,(int)artistPage.getTotalElements(), artistPage.getTotalPages());

        List<Artist> artists = artistPage.getContent();


        List<ArtistResponseDto> response =
                artists.stream()
                        .map(artist-> artistMapper.artistToArtistResponseDto(artist))
                        .collect(Collectors.toList());


        return new ResponseEntity<>(new ArtistPageResponseDto(response, pageInfo), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{artistId}")
    public ResponseEntity deleteArtist(@PathVariable("artistId") long artistId){
        artistService.deleteArtist(artistId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
