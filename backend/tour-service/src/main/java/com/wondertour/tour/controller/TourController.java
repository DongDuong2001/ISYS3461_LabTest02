package com.wondertour.tour.controller;

import com.wondertour.tour.dto.TourPageResponse;
import com.wondertour.tour.dto.TourRequest;
import com.wondertour.tour.dto.TourResponse;
import com.wondertour.tour.service.TourService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tours")
@CrossOrigin(origins = "http://localhost:3000")
public class TourController {

    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    // GET /tours - with optional pagination and companyId filter
    @GetMapping
    public ResponseEntity<?> getTours(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer limit,
            @RequestParam(required = false) Long companyId) {

        if (companyId != null) {
            List<TourResponse> tours = tourService.getToursByCompanyId(companyId);
            return ResponseEntity.ok(tours);
        }

        if (page != null && limit != null) {
            TourPageResponse response = tourService.getToursPaginated(page, limit);
            return ResponseEntity.ok(response);
        }

        List<TourResponse> tours = tourService.getAllTours();
        return ResponseEntity.ok(tours);
    }

    // GET /tours/:id
    @GetMapping("/{id}")
    public ResponseEntity<TourResponse> getTourById(@PathVariable Long id) {
        TourResponse tour = tourService.getTourById(id);
        return ResponseEntity.ok(tour);
    }

    // POST /tours
    @PostMapping
    public ResponseEntity<TourResponse> createTour(@Valid @RequestBody TourRequest request) {
        TourResponse tour = tourService.createTour(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(tour);
    }

    // PUT /tours/:id
    @PutMapping("/{id}")
    public ResponseEntity<TourResponse> updateTour(
            @PathVariable Long id,
            @Valid @RequestBody TourRequest request) {
        TourResponse tour = tourService.updateTour(id, request);
        return ResponseEntity.ok(tour);
    }

    // DELETE /tours/:id
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteTour(@PathVariable Long id) {
        tourService.deleteTour(id);
        return ResponseEntity.ok(Map.of("message", "Tour deleted successfully"));
    }
}
