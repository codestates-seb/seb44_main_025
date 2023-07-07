package com.codestates.artist.dto;

import com.codestates.artist.Artist;
import com.codestates.category.Category;
import com.codestates.category.CategoryService;
import org.springframework.stereotype.Component;

@Component
public class ArtistDtoToArtist {
    private final CategoryService categoryService;
    public ArtistDtoToArtist(CategoryService categoryService){
        this.categoryService = categoryService;
    }
    private Category StringToCategory(ArtistDto artistDto){
        Category category = categoryService.findVerifiedCategory(artistDto.getCategoryId());
        return category;
    }

    public Artist change(ArtistDto artistDto){
        return new Artist(artistDto.getArtistName(),
                artistDto.getImageUrl(),
                artistDto.getContent(),
                StringToCategory(artistDto),
                artistDto.getMember());
    }
}
