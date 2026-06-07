package com.wondertour.company.client;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Arrays;
import java.util.Optional;

@Component
public class RestCountriesFlagClient implements CountryFlagClient {

    private static final Logger LOGGER =
            LoggerFactory.getLogger(RestCountriesFlagClient.class);

    private final RestTemplate restTemplate;
    private final String restCountriesApiUrl;

    public RestCountriesFlagClient(
            RestTemplate restTemplate,
            @Value("${restcountries.api.url}") String restCountriesApiUrl
    ) {
        this.restTemplate = restTemplate;
        this.restCountriesApiUrl = restCountriesApiUrl;
    }

    @Override
    public Optional<String> getFlagUrl(String countryName) {
        URI uri = UriComponentsBuilder.fromHttpUrl(restCountriesApiUrl)
                .pathSegment(countryName)
                .queryParam("fullText", true)
                .build()
                .encode()
                .toUri();

        try {
            RestCountryResponse[] response =
                    restTemplate.getForObject(uri, RestCountryResponse[].class);
            if (response == null) {
                return Optional.empty();
            }
            return Arrays.stream(response)
                    .map(RestCountryResponse::flags)
                    .filter(flags -> flags != null && flags.png() != null)
                    .map(RestCountryResponse.Flags::png)
                    .findFirst();
        } catch (RestClientException exception) {
            LOGGER.warn("Unable to load flag for {}", countryName, exception);
            return Optional.empty();
        }
    }
}
