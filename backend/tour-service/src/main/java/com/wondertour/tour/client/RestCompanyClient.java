package com.wondertour.tour.client;

import com.wondertour.tour.dto.CompanyDTO;
import com.wondertour.tour.exception.ExternalServiceUnavailableException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class RestCompanyClient implements CompanyClient {

    private final RestTemplate restTemplate;
    private final String companyServiceUrl;

    public RestCompanyClient(
            RestTemplate restTemplate,
            @Value("${company.service.url}") String companyServiceUrl
    ) {
        this.restTemplate = restTemplate;
        this.companyServiceUrl = companyServiceUrl;
    }

    @Override
    public Map<Long, String> getCompanyNames() {
        try {
            ResponseEntity<List<CompanyDTO>> response = restTemplate.exchange(
                    companyServiceUrl + "/companies/dropdown",
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<>() {
                    }
            );
            List<CompanyDTO> companies = response.getBody();
            if (companies == null) {
                return Collections.emptyMap();
            }
            return companies.stream()
                    .collect(Collectors.toMap(CompanyDTO::getId, CompanyDTO::getName));
        } catch (RestClientException exception) {
            throw new ExternalServiceUnavailableException(
                    "Company service is unavailable",
                    exception
            );
        }
    }
}
