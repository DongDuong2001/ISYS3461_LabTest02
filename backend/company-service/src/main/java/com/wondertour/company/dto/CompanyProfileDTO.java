package com.wondertour.company.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyProfileDTO {
    private Long id;
    private String name;
    private String country;
    private double revenue;
    private String flagUrl;
}
