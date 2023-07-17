package com.codestates.performancereview.mapper;

import com.codestates.performancereview.dto.ReviewDto;
import com.codestates.performancereview.entity.Review;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    ReviewDto toDto(Review review);
    Review toEntity(ReviewDto reviewDto);
    ReviewDto.ReviewResponse toResponseDto(Review review);
    List<ReviewDto.ReviewResponse> toResponseDtoList(List<Review> reviews);
}
