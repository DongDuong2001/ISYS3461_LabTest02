package com.wondertour.company.client;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record RestCountryResponse(Flags flags) {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Flags(String png) {
    }
}
