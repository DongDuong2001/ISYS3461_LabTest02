package com.wondertour.tour.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TourRequest {

    @NotBlank(message = "Tour name is required")
    private String name;

    @NotNull(message = "Tour price is required")
    @Min(value = 1, message = "Price must be larger than 0")
    private Integer price;

    @NotNull(message = "Operating company is required")
    private Long companyId;
}
