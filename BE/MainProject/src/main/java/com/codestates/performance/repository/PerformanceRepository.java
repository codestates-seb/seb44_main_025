package com.codestates.performance.repository;

import com.codestates.artist.Artist;
import com.codestates.category.Category;
import com.codestates.performance.entity.Performance;
import com.codestates.performance.entity.PerformanceArtist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PerformanceRepository extends JpaRepository<Performance, Long> {
    Page<Performance> findAll(Pageable pageable);

    Optional<Performance> findById(long performanceId);

    @Query(value="SELECT p FROM Performance p WHERE p.category = :category",
            countName="SELECT COUNT(p) FROM Performance p WHERE p.category = :category")
    Page<Performance> findAllByCategory(@Param("category") Category category, Pageable pageable);

    @Query(value="SELECT p FROM Performance p WHERE p.date <= now()")
    Page<Performance> findAllByTimeIsBefore(Pageable pageable);

    @Query(value="SELECT p FROM Performance p WHERE p.date > now()")
    Page<Performance> findAllByTimeIsAfter(Pageable pageable);

    // 공연 날짜가 현재 시간보다
    @Query(value="SELECT p FROM Performance p WHERE p.category = :category and p.date <= now()",
            countName="SELECT COUNT(p) FROM Performance p WHERE p.category = :category")
    Page<Performance> findAllByCategoryAndTimeIsBefore(@Param("category") Category category, Pageable pageable);
    @Query(value="SELECT p FROM Performance p WHERE p.category = :category and p.date > now()",
            countName="SELECT COUNT(p) FROM Performance p WHERE p.category = :category")
    Page<Performance> findAllByCategoryAndTimeIsAfter(@Param("category") Category category, Pageable pageable);

    @Query("SELECT p FROM Performance p JOIN p.performanceArtists pa JOIN pa.artist a WHERE a.artistId = :artistId")
    Page<Performance> findAllByArtistId(@Param("artistId") long artistId, Pageable pageable);

    @Query("SELECT p FROM Performance p JOIN p.performanceArtists pa JOIN pa.artist a WHERE a.artistId = :artistId AND p.date <= now()")
    Page<Performance> findAllByArtistIdTimeIsBefore(@Param("artistId") long artistId, Pageable pageable);

    @Query("SELECT p FROM Performance p JOIN p.performanceArtists pa JOIN pa.artist a WHERE a.artistId = :artistId AND p.date > now()")
    Page<Performance> findAllByArtistIdTimeIsAfter(@Param("artistId") long artistId, Pageable pageable);
}
