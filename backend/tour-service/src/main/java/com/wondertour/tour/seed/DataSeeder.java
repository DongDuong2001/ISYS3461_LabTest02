package com.wondertour.tour.seed;

import com.wondertour.tour.model.Tour;
import com.wondertour.tour.repository.TourRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final TourRepository tourRepository;

    public DataSeeder(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }

    @Override
    public void run(String... args) {
        if (tourRepository.count() == 0) {
            List<Tour> tours = List.of(
                new Tour(null, "Ha Long Bay Cruise", 150, 1L, LocalDateTime.now()),
                new Tour(null, "Hoi An Heritage Walk", 65, 1L, LocalDateTime.now()),
                new Tour(null, "Mekong Delta Discovery", 90, 1L, LocalDateTime.now()),
                new Tour(null, "Da Nang Coastal Escape", 110, 1L, LocalDateTime.now()),
                new Tour(null, "Bangkok Temple Trail", 80, 2L, LocalDateTime.now()),
                new Tour(null, "Chiang Mai Mountain Trek", 130, 2L, LocalDateTime.now()),
                new Tour(null, "Phuket Island Adventure", 175, 2L, LocalDateTime.now()),
                new Tour(null, "Ayutthaya History Tour", 75, 2L, LocalDateTime.now()),
                new Tour(null, "Bali Culture Experience", 120, 3L, LocalDateTime.now()),
                new Tour(null, "Komodo Island Expedition", 280, 3L, LocalDateTime.now()),
                new Tour(null, "Yogyakarta Temple Journey", 105, 3L, LocalDateTime.now()),
                new Tour(null, "Lombok Beach Retreat", 145, 3L, LocalDateTime.now())
            );
            tourRepository.saveAll(tours);
            System.out.println("Seeded " + tours.size() + " tours.");
        }
    }
}
