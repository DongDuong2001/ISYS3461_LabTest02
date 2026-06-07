package com.wondertour.tour.service;

import com.wondertour.tour.dto.TourPageResponse;
import com.wondertour.tour.dto.TourRequest;
import com.wondertour.tour.dto.TourResponse;

import java.util.List;

public interface TourService {

    TourPageResponse getToursPaginated(int page, int limit);

    TourResponse getTourById(Long id);

    List<TourResponse> getToursByCompanyId(Long companyId);

    TourResponse createTour(TourRequest request);

    TourResponse updateTour(Long id, TourRequest request);

    void deleteTour(Long id);
}
