package com.wondertour.tour.service;

import com.wondertour.tour.dto.CompanyDTO;
import com.wondertour.tour.dto.TourPageResponse;
import com.wondertour.tour.dto.TourRequest;
import com.wondertour.tour.dto.TourResponse;
import com.wondertour.tour.model.Tour;
import com.wondertour.tour.repository.TourRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TourService {

    private final TourRepository tourRepository;
    private final RestTemplate restTemplate;

    @Value("${company.service.url}")
    private String companyServiceUrl;

    public TourService(TourRepository tourRepository, RestTemplate restTemplate) {
        this.tourRepository = tourRepository;
        this.restTemplate = restTemplate;
    }

    public List<TourResponse> getAllTours() {
        List<Tour> tours = tourRepository.findAll();
        return mapToResponses(tours);
    }

    public TourPageResponse getToursPaginated(int page, int limit) {
        Page<Tour> tourPage = tourRepository.findAll(PageRequest.of(page - 1, limit));
        List<TourResponse> tourResponses = mapToResponses(tourPage.getContent());
        return new TourPageResponse(tourResponses, tourPage.getTotalElements());
    }

    public TourResponse getTourById(Long id) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found"));
        return mapToResponse(tour, fetchCompanyMap());
    }

    public List<TourResponse> getToursByCompanyId(Long companyId) {
        List<Tour> tours = tourRepository.findByCompanyId(companyId);
        return mapToResponses(tours);
    }

    public TourResponse createTour(TourRequest request) {
        Tour tour = new Tour();
        tour.setName(request.getName());
        tour.setPrice(request.getPrice());
        tour.setCompanyId(request.getCompanyId());
        Tour saved = tourRepository.save(tour);
        return mapToResponse(saved, fetchCompanyMap());
    }

    public TourResponse updateTour(Long id, TourRequest request) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found"));
        tour.setName(request.getName());
        tour.setPrice(request.getPrice());
        tour.setCompanyId(request.getCompanyId());
        Tour updated = tourRepository.save(tour);
        return mapToResponse(updated, fetchCompanyMap());
    }

    public void deleteTour(Long id) {
        if (!tourRepository.existsById(id)) {
            throw new RuntimeException("Tour not found");
        }
        tourRepository.deleteById(id);
    }

    // --- Helper methods ---

    private Map<Long, String> fetchCompanyMap() {
        try {
            String url = companyServiceUrl + "/companies/dropdown";
            ResponseEntity<List<CompanyDTO>> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<CompanyDTO>>() {}
            );
            List<CompanyDTO> companies = response.getBody();
            if (companies != null) {
                return companies.stream()
                        .collect(Collectors.toMap(CompanyDTO::getId, CompanyDTO::getName));
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch companies: " + e.getMessage());
        }
        return Collections.emptyMap();
    }

    private List<TourResponse> mapToResponses(List<Tour> tours) {
        Map<Long, String> companyMap = fetchCompanyMap();
        return tours.stream()
                .map(tour -> mapToResponse(tour, companyMap))
                .collect(Collectors.toList());
    }

    private TourResponse mapToResponse(Tour tour, Map<Long, String> companyMap) {
        CompanyDTO company = null;
        if (tour.getCompanyId() != null) {
            String companyName = companyMap.getOrDefault(tour.getCompanyId(), "Unknown");
            company = new CompanyDTO(tour.getCompanyId(), companyName);
        }
        return new TourResponse(tour.getId(), tour.getName(), tour.getPrice(), company);
    }
}
