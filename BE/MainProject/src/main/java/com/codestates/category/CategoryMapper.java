package com.codestates.category;

import com.codestates.category.dto.CategoryPostDto;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    public Category categoryPostDtoToCategory(CategoryPostDto categoryPostDto){
        return new Category(categoryPostDto.getCategory());
    }
}
