package com.codestates.performance.repository;

import com.codestates.category.Category;
import com.codestates.performance.entity.Performance;
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
}
