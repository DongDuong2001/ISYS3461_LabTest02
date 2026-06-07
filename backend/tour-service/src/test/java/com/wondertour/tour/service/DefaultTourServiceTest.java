package com.wondertour.tour.service;

import com.wondertour.tour.client.CompanyClient;
import com.wondertour.tour.dto.TourPageResponse;
import com.wondertour.tour.dto.TourRequest;
import com.wondertour.tour.exception.InvalidCompanyException;
import com.wondertour.tour.model.Tour;
import com.wondertour.tour.repository.TourRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DefaultTourServiceTest {

    @Mock
    private TourRepository tourRepository;

    @Mock
    private CompanyClient companyClient;

    private DefaultTourService tourService;

    @BeforeEach
    void setUp() {
        tourService = new DefaultTourService(tourRepository, companyClient);
    }

    @Test
    void returnsPaginatedToursWithCompanySummary() {
        Tour tour = new Tour(
                1L,
                "Ha Long Bay Cruise",
                150,
                10L,
                LocalDateTime.now()
        );
        when(tourRepository.findAll(any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(tour)));
        when(companyClient.getCompanyNames())
                .thenReturn(Map.of(10L, "Vietnam Horizon Travel"));

        TourPageResponse response = tourService.getToursPaginated(1, 5);

        assertThat(response.getTotal()).isEqualTo(1);
        assertThat(response.getTours()).singleElement().satisfies(result -> {
            assertThat(result.getName()).isEqualTo("Ha Long Bay Cruise");
            assertThat(result.getCompany().getId()).isEqualTo(10L);
            assertThat(result.getCompany().getName())
                    .isEqualTo("Vietnam Horizon Travel");
        });
    }

    @Test
    void rejectsCreateWhenCompanyDoesNotExist() {
        TourRequest request = new TourRequest();
        request.setName("New Tour");
        request.setPrice(100);
        request.setCompanyId(99L);
        when(companyClient.getCompanyNames()).thenReturn(Map.of(1L, "Company"));

        assertThatThrownBy(() -> tourService.createTour(request))
                .isInstanceOf(InvalidCompanyException.class)
                .hasMessageContaining("99");
        verify(tourRepository, never()).save(any(Tour.class));
    }
}
