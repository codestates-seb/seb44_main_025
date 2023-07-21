package com.codestates.performancereview.repository;

import com.codestates.artist.Artist;
import com.codestates.member.Member;
import com.codestates.performance.entity.Performance;
import com.codestates.performancereview.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findById(long reviewId);
    List<Review> findByMember(Member member);
    List<Review> findByPerformance(Performance performance);
}
