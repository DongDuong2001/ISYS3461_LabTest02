package com.wondertour.tour.controller;

import com.wondertour.tour.dto.TourPageResponse;
import com.wondertour.tour.dto.TourRequest;
import com.wondertour.tour.dto.TourResponse;
import com.wondertour.tour.service.TourService;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tours")
@Validated
public class TourController {

    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    @GetMapping
    public ResponseEntity<?> getTours(
            @RequestParam(defaultValue = "1") @Min(1) int page,
            @RequestParam(defaultValue = "5") @Min(1) @Max(50) int limit,
            @RequestParam(required = false) Long companyId) {

        if (companyId != null) {
            List<TourResponse> tours = tourService.getToursByCompanyId(companyId);
            return ResponseEntity.ok(tours);
        }

        TourPageResponse response = tourService.getToursPaginated(page, limit);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TourResponse> getTourById(@PathVariable Long id) {
        TourResponse tour = tourService.getTourById(id);
        return ResponseEntity.ok(tour);
    }

    @PostMapping
    public ResponseEntity<TourResponse> createTour(@Valid @RequestBody TourRequest request) {
        TourResponse tour = tourService.createTour(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(tour);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TourResponse> updateTour(
            @PathVariable Long id,
            @Valid @RequestBody TourRequest request) {
        TourResponse tour = tourService.updateTour(id, request);
        return ResponseEntity.ok(tour);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTour(@PathVariable Long id) {
        tourService.deleteTour(id);
        return ResponseEntity.ok(Map.of("message", "Tour deleted successfully"));
    }
}
