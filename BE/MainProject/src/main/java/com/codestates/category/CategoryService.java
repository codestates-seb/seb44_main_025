package com.codestates.category;

import com.codestates.category.dto.CategoryPostDto;
import com.codestates.global.exception.BusinessLogicException;
import com.codestates.global.exception.ExceptionCode;
import com.codestates.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Category createCategory(Category category){

        return categoryRepository.save(category);
    }

    public Category findVerifiedCategory(long category) {
        Optional<Category> optionalCategory =
                categoryRepository.findByCategoryId(category);
        Category findcategory =
                optionalCategory.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.CATEGORY_NOT_FOUND));
        return findcategory;
    }

}
