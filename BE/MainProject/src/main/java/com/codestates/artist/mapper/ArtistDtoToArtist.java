package com.codestates.artist.mapper;

import com.codestates.artist.Artist;
import com.codestates.artist.dto.ArtistDto;
import com.codestates.category.Category;
import com.codestates.category.CategoryService;
import org.springframework.stereotype.Component;

@Component
public class ArtistDtoToArtist {

    public Artist change(ArtistDto artistDto){
        return new Artist(artistDto.getArtistName(),
                artistDto.getImageUrl(),
                artistDto.getContent(),
                new Category(artistDto.getCategoryId()),
                artistDto.getSnsLink(),
                artistDto.getMember());
    }
}
