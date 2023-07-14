package com.codestates.performance.repository;

import com.codestates.category.Category;
import com.codestates.performance.entity.Performance;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PerformanceRepository extends JpaRepository<Performance, Long> {
    Page<Performance> findAll(Pageable pageable);

    Optional<Performance> findById(long performanceId);

    Page<Performance> findAllByCategory(Category category, Pageable pageable);
}
