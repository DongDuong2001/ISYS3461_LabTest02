package com.wondertour.tour.service;

import com.wondertour.tour.client.CompanyClient;
import com.wondertour.tour.dto.CompanyDTO;
import com.wondertour.tour.dto.TourPageResponse;
import com.wondertour.tour.dto.TourRequest;
import com.wondertour.tour.dto.TourResponse;
import com.wondertour.tour.exception.InvalidCompanyException;
import com.wondertour.tour.exception.ResourceNotFoundException;
import com.wondertour.tour.model.Tour;
import com.wondertour.tour.repository.TourRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DefaultTourService implements TourService {

    private final TourRepository tourRepository;
    private final CompanyClient companyClient;

    public DefaultTourService(TourRepository tourRepository, CompanyClient companyClient) {
        this.tourRepository = tourRepository;
        this.companyClient = companyClient;
    }

    @Override
    public TourPageResponse getToursPaginated(int page, int limit) {
        PageRequest pageRequest = PageRequest.of(
                page - 1,
                limit,
                Sort.by(Sort.Direction.ASC, "id")
        );
        Page<Tour> tourPage = tourRepository.findAll(pageRequest);
        List<TourResponse> tours = mapToResponses(
                tourPage.getContent(),
                companyClient.getCompanyNames()
        );
        return new TourPageResponse(tours, tourPage.getTotalElements());
    }

    @Override
    public TourResponse getTourById(Long id) {
        Tour tour = findTour(id);
        return mapToResponse(tour, companyClient.getCompanyNames());
    }

    @Override
    public List<TourResponse> getToursByCompanyId(Long companyId) {
        Map<Long, String> companyNames = companyClient.getCompanyNames();
        requireCompany(companyId, companyNames);
        return mapToResponses(
                tourRepository.findByCompanyIdOrderByIdAsc(companyId),
                companyNames
        );
    }

    @Override
    public TourResponse createTour(TourRequest request) {
        Map<Long, String> companyNames = companyClient.getCompanyNames();
        requireCompany(request.getCompanyId(), companyNames);

        Tour tour = new Tour();
        tour.setName(request.getName().trim());
        tour.setPrice(request.getPrice());
        tour.setCompanyId(request.getCompanyId());

        return mapToResponse(tourRepository.save(tour), companyNames);
    }

    @Override
    public TourResponse updateTour(Long id, TourRequest request) {
        Tour tour = findTour(id);
        Map<Long, String> companyNames = companyClient.getCompanyNames();
        requireCompany(request.getCompanyId(), companyNames);

        tour.setName(request.getName().trim());
        tour.setPrice(request.getPrice());
        tour.setCompanyId(request.getCompanyId());

        return mapToResponse(tourRepository.save(tour), companyNames);
    }

    @Override
    public void deleteTour(Long id) {
        Tour tour = findTour(id);
        tourRepository.delete(tour);
    }

    private Tour findTour(Long id) {
        return tourRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tour not found with id " + id));
    }

    private void requireCompany(Long companyId, Map<Long, String> companyNames) {
        if (!companyNames.containsKey(companyId)) {
            throw new InvalidCompanyException("Company not found with id " + companyId);
        }
    }

    private List<TourResponse> mapToResponses(
            List<Tour> tours,
            Map<Long, String> companyNames
    ) {
        return tours.stream()
                .map(tour -> mapToResponse(tour, companyNames))
                .toList();
    }

    private TourResponse mapToResponse(Tour tour, Map<Long, String> companyNames) {
        CompanyDTO company = new CompanyDTO(
                tour.getCompanyId(),
                companyNames.getOrDefault(tour.getCompanyId(), "Unknown Company")
        );
        return new TourResponse(tour.getId(), tour.getName(), tour.getPrice(), company);
    }
}
