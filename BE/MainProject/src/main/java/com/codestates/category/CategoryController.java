package com.codestates.category;

import com.codestates.category.dto.CategoryPostDto;
import com.codestates.member.Member;
import com.codestates.member.dto.MemberPostDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/category")
@Validated
@Slf4j
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryService categoryService,
                              CategoryMapper categoryMapper,
                              CategoryRepository categoryRepository){
        this.categoryService = categoryService;
        this.categoryMapper = categoryMapper;

        this.categoryRepository = categoryRepository;
    }
    @PostMapping
    public ResponseEntity postCategory(@Valid @RequestBody CategoryPostDto categoryPostDto){
        Category response = categoryService.createCategory(categoryMapper.categoryPostDtoToCategory(categoryPostDto));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
