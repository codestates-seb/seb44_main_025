package com.codestates.artist;

import com.codestates.artist.Artist;
import com.codestates.artist.dto.ArtistDto;
import com.codestates.artist.dto.ArtistResponseDto;
import com.codestates.category.Category;
import com.codestates.category.CategoryRepository;
import com.codestates.category.CategoryService;
import org.springframework.stereotype.Component;

@Component
public class ArtistMapper {
    private final CategoryService categoryService;
    public ArtistMapper(CategoryService categoryService){
        this.categoryService = categoryService;
    }

    public Artist artistDtoToArtist(ArtistDto artistDto){


        return new Artist(
                artistDto.getArtistName(),
                artistDto.getImageUrl(),
                artistDto.getContent(),
                artistDto.getCategory(),
                artistDto.getMember());
    }
    public ArtistResponseDto artistToArtistResponseDto(Artist artist){
        return new ArtistResponseDto(
                artist.getMember().getMemberId(),
                artist.getCategory().getCategory(),
                artist.getArtistId(),
                artist.getArtistName(),
                artist.getImageUrl(),
                artist.getContent(),
                artist.getCreatedAt());
    }
}
