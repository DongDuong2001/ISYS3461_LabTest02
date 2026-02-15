package com.wondertour.tour.repository;

import com.wondertour.tour.model.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {
    List<Tour> findByCompanyId(Long companyId);
    Page<Tour> findAll(Pageable pageable);
}
