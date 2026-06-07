package com.wondertour.tour.dto;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class TourRequestValidationTest {

    private static Validator validator;

    @BeforeAll
    static void createValidator() {
        validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    @Test
    void rejectsMissingNameNonPositivePriceAndMissingCompany() {
        TourRequest request = new TourRequest();
        request.setName(" ");
        request.setPrice(0);

        assertThat(validator.validate(request))
                .extracting(violation -> violation.getPropertyPath().toString())
                .containsExactlyInAnyOrder("name", "price", "companyId");
    }

    @Test
    void acceptsValidTour() {
        TourRequest request = new TourRequest();
        request.setName("Mekong Delta Discovery");
        request.setPrice(90);
        request.setCompanyId(1L);

        assertThat(validator.validate(request)).isEmpty();
    }
}
