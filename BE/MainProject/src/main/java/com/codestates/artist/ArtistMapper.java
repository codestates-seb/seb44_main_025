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

    public ArtistResponseDto artistToArtistResponseDto(Artist artist){
        return new ArtistResponseDto(
                1,
                artist.getCategory().getCategory(),
                artist.getArtistId(),
                artist.getArtistName(),
                artist.getImageUrl(),
                artist.getContent(),
                artist.getCreatedAt());
    }
}
