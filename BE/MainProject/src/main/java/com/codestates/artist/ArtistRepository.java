package com.codestates.artist;

import com.codestates.category.Category;
import com.codestates.member.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface ArtistRepository extends JpaRepository<Artist, Long> {
    Optional<Artist> findByArtistName(String artistName);
    Optional<Artist> findByMember(Member member);
    List<Artist> findAll();
    Page<Artist> findAllByCategoryOrderByArtistIdDesc(Category Category, Pageable pageable);

}
