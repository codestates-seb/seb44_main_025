package com.codestates.artist;

import com.codestates.category.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ArtistRepository extends JpaRepository<Artist, Long> {
    Optional<Artist> findByArtistName(String artistName);
    List<Artist> findAllByCategory(Category category);

    Page<Artist> findAllByCategory(Category category, Pageable pageable);
    Page<Artist> findAllByCategoryOrderByArtistIdDesc(Category Category, Pageable pageable);

}
